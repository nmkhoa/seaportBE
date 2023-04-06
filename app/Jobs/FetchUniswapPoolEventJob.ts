import { JobContract } from '@ioc:Rocketseat/Bull'
import Logger from '@ioc:Adonis/Core/Logger'
const RedisUniswapPoolUtils = require('@ioc:App/Common/RedisUniswapPoolUtils')
const HelperUtils = require('@ioc:App/Common/HelperUtils')

const UniswapPoolModel = require('@ioc:App/Models/UniswapPool')

const STEP = parseInt(process.env.CRAWL_STEP || '5000', 10)

/*
|--------------------------------------------------------------------------
| Job setup
|--------------------------------------------------------------------------
|
| This is the basic setup for creating a job, but you can override
| some settings.
|
| You can get more details by looking at the bullmq documentation.
| https://docs.bullmq.io/
*/

export default class FetchUniswapPoolEventJob implements JobContract {
  public key = 'FetchUniswapPoolEventJob'

  public async handle(job) {
    const { data } = job
    console.log('uniswappppoll')

    const eventType = data.event_type
    let from = data.from
    let to = data.to

    if (await RedisUniswapPoolUtils.existRedisUniswapPoolBlockNumber(eventType)) {
      let redisData = await RedisUniswapPoolUtils.getRedisUniswapPoolBlockNumber(eventType)
      redisData = JSON.parse(redisData)
      if (redisData && redisData.current) {
        from = redisData.current
      }
    }
    const notCached = data.notCached

    try {
      if (!isNaN(from)) {
        from = parseInt(from)
      }
      if (!isNaN(to)) {
        to = parseInt(to)
      }
      const provider = await HelperUtils.getWeb3Provider()
      const latestBlockNumber = (await provider.eth.getBlockNumber()) - 1
      if (!to || to > latestBlockNumber || to < from) {
        to = latestBlockNumber
      }
      if (from > latestBlockNumber || from >= to) {
        return
      }
      data.to = to
      // fetch
      const startTime = process.hrtime()
      for (let index = from; index < to; index += STEP) {
        let tmp = index + STEP
        if (tmp >= to) {
          tmp = to
        }
        await this.fetchEvents(provider, eventType, index, tmp)
      }
      const endTime = process.hrtime(startTime)
      Logger.info(
        `fetch ${eventType} from ${from} to ${to} in epic_box: ${endTime[0]}s ${
          endTime[1] / 1000000
        }ms`
      )
      if (notCached) {
        return
      }

      await RedisUniswapPoolUtils.setRedisUniswapPoolBlockNumber({
        current: to,
        event_type: eventType,
      })
    } catch (e) {
      Logger.error(e)
    }
  }

  private async fetchEvents(provider, event_type, from, to) {
    try {
      const instance = await HelperUtils.getUniswapPoolContractInstance()
      //   console.log('1', from, to)
      const events = await instance.getPastEvents(event_type, {
        fromBlock: from,
        toBlock: to,
      })
      //   console.log('2', events)

      for (const event of events) {
        console.log('---job', from, to, event.transactionHash)
        console.log('---data', from, to)

        let data = new UniswapPoolModel()
        data.transaction_hash = event.transactionHash
        data.transaction_index = event.transactionIndex
        data.block_number = event.blockNumber
        data.dispatch_at = 1
        data.event_type = event_type
        data.token0 = event.returnValues?.token0
        data.token1 = event.returnValues?.token1
        data.fee = 0
        data.tickSpacing = 0
        data.pool_address = event.returnValues?.pair

        await data.save()
      }
    } catch (error) {
      Logger.error(error)
    }
  }
  public onCompleted(job) {
    job.remove()
  }
}