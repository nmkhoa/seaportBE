import Redis from '@ioc:Adonis/Addons/Redis'

/*
  Seaport top collections
 */
const getRedisKeySeaportTopCollections = () => {
  return `seaport_top_collections`
}

const getRedisSeaportTopCollections = async () => {
  return await Redis.get(getRedisKeySeaportTopCollections())
}

const setRedisSeaportTopCollections = async (data) => {
  if (!data || data.length < 1) {
    return
  }

  await Redis.set(getRedisKeySeaportTopCollections(), JSON.stringify(data))
}

const existRedisSeaportTopCollections = async () => {
  return await Redis.exists(getRedisKeySeaportTopCollections())
}

const deleteRedisSeaportTopCollections = () => {
  let redisKey = getRedisKeySeaportTopCollections()
  Redis.del(redisKey)
}

/*
  Seaport collections
 */
const getRedisKeySeaportSupportCollections = () => {
  return `seaport_support_collections`
}

const getRedisSeaportSupportCollections = async () => {
  return await Redis.get(getRedisKeySeaportSupportCollections())
}

const setRedisSeaportSupportCollections = async (data) => {
  if (!data || data.length < 1) {
    return
  }

  await Redis.set(getRedisKeySeaportSupportCollections(), JSON.stringify(data))
}

const existRedisSeaportSupportCollections = async () => {
  return await Redis.exists(getRedisKeySeaportSupportCollections())
}

const deleteRedisSeaportSupportCollections = () => {
  let redisKey = getRedisKeySeaportSupportCollections()
  Redis.del(redisKey)
}

/*
  Seaport collection detail
 */
const getRedisKeySeaportCollectionDetail = (id) => {
  return `seaport_collection_detail_${id}`
}

const getRedisSeaportCollectionDetail = async (id) => {
  return await Redis.get(getRedisKeySeaportCollectionDetail(id))
}

const setRedisSeaportCollectionDetail = async (id, data) => {
  if (!id) {
    return
  }

  await Redis.set(getRedisKeySeaportCollectionDetail(id), JSON.stringify(data))
}

const existRedisSeaportCollectionDetail = async (id) => {
  return await Redis.exists(getRedisKeySeaportCollectionDetail(id))
}

const deleteRedisSeaportCollectionDetail = (id) => {
  let redisKey = getRedisKeySeaportCollectionDetail(id)
  Redis.del(redisKey)
}

/*
  Seaport block number
 */
const getRedisKeySeaportBlockNumber = (event_type) => {
  return `seaport_block_number_${event_type}`
}

const getRedisSeaportBlockNumber = async (event_type) => {
  return await Redis.get(getRedisKeySeaportBlockNumber(event_type))
}

const setRedisSeaportBlockNumber = async (data) => {
  return await Redis.set(getRedisKeySeaportBlockNumber(data.event_type), JSON.stringify(data))
}

const existRedisSeaportBlockNumber = async (event_type) => {
  return await Redis.exists(getRedisKeySeaportBlockNumber(event_type))
}

/*
  NFT slug
*/
const getRedisKeySeaportSlug = (token_address) => {
  return `seaport_slug_${token_address}`
}

const getRedisSeaportSlug = async (token_address) => {
  return await Redis.get(getRedisKeySeaportSlug(token_address))
}

const setRedisSeaportSlug = async (token_address, slug) => {
  if (!token_address) {
    return
  }

  await Redis.set(getRedisKeySeaportSlug(token_address), JSON.stringify(slug))
}

const existRedisSeaportSlug = async (token_address) => {
  return await Redis.exists(getRedisKeySeaportSlug(token_address))
}

const deleteRedisSeaportSlug = (token_address) => {
  let redisKey = getRedisKeySeaportSlug(token_address)
  Redis.del(redisKey)
}

module.exports = {
  // collections
  getRedisSeaportTopCollections,
  setRedisSeaportTopCollections,
  existRedisSeaportTopCollections,
  deleteRedisSeaportTopCollections,

  getRedisSeaportSupportCollections,
  setRedisSeaportSupportCollections,
  existRedisSeaportSupportCollections,
  deleteRedisSeaportSupportCollections,

  // collection
  getRedisSeaportCollectionDetail,
  setRedisSeaportCollectionDetail,
  existRedisSeaportCollectionDetail,
  deleteRedisSeaportCollectionDetail,

  // marketplace block number
  getRedisSeaportBlockNumber,
  setRedisSeaportBlockNumber,
  existRedisSeaportBlockNumber,

  // marketplace slug
  getRedisKeySeaportSlug,
  getRedisSeaportSlug,
  setRedisSeaportSlug,
  existRedisSeaportSlug,
  deleteRedisSeaportSlug,
}
