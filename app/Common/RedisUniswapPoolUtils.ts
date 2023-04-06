import Redis from '@ioc:Adonis/Addons/Redis'

/*
  UniswapPool top collections
 */
const getRedisKeyUniswapPoolTopCollections = () => {
  return `UniswapPool_top_collections`
}

const getRedisUniswapPoolTopCollections = async () => {
  return await Redis.get(getRedisKeyUniswapPoolTopCollections())
}

const setRedisUniswapPoolTopCollections = async (data) => {
  if (!data || data.length < 1) {
    return
  }

  await Redis.set(getRedisKeyUniswapPoolTopCollections(), JSON.stringify(data))
}

const existRedisUniswapPoolTopCollections = async () => {
  return await Redis.exists(getRedisKeyUniswapPoolTopCollections())
}

const deleteRedisUniswapPoolTopCollections = () => {
  let redisKey = getRedisKeyUniswapPoolTopCollections()
  Redis.del(redisKey)
}

/*
  UniswapPool collections
 */
const getRedisKeyUniswapPoolSupportCollections = () => {
  return `UniswapPool_support_collections`
}

const getRedisUniswapPoolSupportCollections = async () => {
  return await Redis.get(getRedisKeyUniswapPoolSupportCollections())
}

const setRedisUniswapPoolSupportCollections = async (data) => {
  if (!data || data.length < 1) {
    return
  }

  await Redis.set(getRedisKeyUniswapPoolSupportCollections(), JSON.stringify(data))
}

const existRedisUniswapPoolSupportCollections = async () => {
  return await Redis.exists(getRedisKeyUniswapPoolSupportCollections())
}

const deleteRedisUniswapPoolSupportCollections = () => {
  let redisKey = getRedisKeyUniswapPoolSupportCollections()
  Redis.del(redisKey)
}

/*
  UniswapPool collection detail
 */
const getRedisKeyUniswapPoolCollectionDetail = (id) => {
  return `UniswapPool_collection_detail_${id}`
}

const getRedisUniswapPoolCollectionDetail = async (id) => {
  return await Redis.get(getRedisKeyUniswapPoolCollectionDetail(id))
}

const setRedisUniswapPoolCollectionDetail = async (id, data) => {
  if (!id) {
    return
  }

  await Redis.set(getRedisKeyUniswapPoolCollectionDetail(id), JSON.stringify(data))
}

const existRedisUniswapPoolCollectionDetail = async (id) => {
  return await Redis.exists(getRedisKeyUniswapPoolCollectionDetail(id))
}

const deleteRedisUniswapPoolCollectionDetail = (id) => {
  let redisKey = getRedisKeyUniswapPoolCollectionDetail(id)
  Redis.del(redisKey)
}

/*
  UniswapPool block number
 */
const getRedisKeyUniswapPoolBlockNumber = (event_type) => {
  return `UniswapPool_block_number_${event_type}`
}

const getRedisUniswapPoolBlockNumber = async (event_type) => {
  return await Redis.get(getRedisKeyUniswapPoolBlockNumber(event_type))
}

const setRedisUniswapPoolBlockNumber = async (data) => {
  return await Redis.set(getRedisKeyUniswapPoolBlockNumber(data.event_type), JSON.stringify(data))
}

const existRedisUniswapPoolBlockNumber = async (event_type) => {
  return await Redis.exists(getRedisKeyUniswapPoolBlockNumber(event_type))
}

/*
  NFT slug
*/
const getRedisKeyUniswapPoolSlug = (token_address) => {
  return `UniswapPool_slug_${token_address}`
}

const getRedisUniswapPoolSlug = async (token_address) => {
  return await Redis.get(getRedisKeyUniswapPoolSlug(token_address))
}

const setRedisUniswapPoolSlug = async (token_address, slug) => {
  if (!token_address) {
    return
  }

  await Redis.set(getRedisKeyUniswapPoolSlug(token_address), JSON.stringify(slug))
}

const existRedisUniswapPoolSlug = async (token_address) => {
  return await Redis.exists(getRedisKeyUniswapPoolSlug(token_address))
}

const deleteRedisUniswapPoolSlug = (token_address) => {
  let redisKey = getRedisKeyUniswapPoolSlug(token_address)
  Redis.del(redisKey)
}

module.exports = {
  // collections
  getRedisUniswapPoolTopCollections,
  setRedisUniswapPoolTopCollections,
  existRedisUniswapPoolTopCollections,
  deleteRedisUniswapPoolTopCollections,

  getRedisUniswapPoolSupportCollections,
  setRedisUniswapPoolSupportCollections,
  existRedisUniswapPoolSupportCollections,
  deleteRedisUniswapPoolSupportCollections,

  // collection
  getRedisUniswapPoolCollectionDetail,
  setRedisUniswapPoolCollectionDetail,
  existRedisUniswapPoolCollectionDetail,
  deleteRedisUniswapPoolCollectionDetail,

  // marketplace block number
  getRedisUniswapPoolBlockNumber,
  setRedisUniswapPoolBlockNumber,
  existRedisUniswapPoolBlockNumber,

  // marketplace slug
  getRedisKeyUniswapPoolSlug,
  getRedisUniswapPoolSlug,
  setRedisUniswapPoolSlug,
  existRedisUniswapPoolSlug,
  deleteRedisUniswapPoolSlug,
}
