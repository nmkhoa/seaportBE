import Job from '../Jobs/FetchUniswapEventJob'

const UNISWAP_START_BLOCK = process.env.UNISWAP_START_BLOCK
import Bull from '@ioc:Rocketseat/Bull'

const SWAP = 'Swap'

let ARRAY_EVENTS = [SWAP]
const initTask = async () => {
  if (!UNISWAP_START_BLOCK) {
    return
  }

  try {
    let currentBlock = UNISWAP_START_BLOCK

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
