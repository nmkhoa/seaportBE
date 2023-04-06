import Job from '../Jobs/FetchUniswapPoolEventJob'

const UNISWAP_POOL_FACTORY_START_BLOCK = process.env.UNISWAP_POOL_FACTORY_START_BLOCK
import Bull from '@ioc:Rocketseat/Bull'

const POOL_CREATED = 'PairCreated'

let ARRAY_EVENTS = [POOL_CREATED]
const initTask = async () => {
  if (!UNISWAP_POOL_FACTORY_START_BLOCK) {
    return
  }

  try {
    let currentBlock = UNISWAP_POOL_FACTORY_START_BLOCK

    for (const eventType of ARRAY_EVENTS) {
      let data = {
        event_type: eventType,
        from: currentBlock,
        notCached: false,
      }

      const jobKey = new Job().key
      await Bull.getByKey(jobKey).bull.add(jobKey + eventType, data, {
        repeat: {
          every: 1000 * 60, // 1 minutes
          immediately: true,
        },
        removeOnComplete: true,
        removeOnFail: true,
        attempts: 3,
      })
    }
  } catch (e) {
    console.error()
  } finally {
  }
}

module.exports = {
  initTask,
}
