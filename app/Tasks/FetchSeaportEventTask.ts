import Job from '../Jobs/FetchSeaportEventJob'

const SEAPORT_START_BLOCK = process.env.SEAPORT_START_BLOCK
import Bull from '@ioc:Rocketseat/Bull'

const ORDERS_FULLFILLED = 'OrderFulfilled'
const ORDERS_CANCELLED = 'OrderCancelled'
const ORDERS_VALIDATED = 'OrderValidated'
const ORDERS_MATCHED = 'OrdersMatched'

let ARRAY_EVENTS = [ORDERS_FULLFILLED, ORDERS_CANCELLED, ORDERS_VALIDATED, ORDERS_MATCHED]

const initTask = async () => {
  if (!SEAPORT_START_BLOCK) {
    return
  }

  try {
    let currentBlock = SEAPORT_START_BLOCK

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
