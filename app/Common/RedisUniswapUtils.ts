import Redis from '@ioc:Adonis/Addons/Redis'

/*
  Uniswap top collections
 */
const getRedisKeyUniswapTopCollections = () => {
  return `uniswap_top_collections`
}

const getRedisUniswapTopCollections = async () => {
  return await Redis.get(getRedisKeyUniswapTopCollections())
}

const setRedisUniswapTopCollections = async (data) => {
  if (!data || data.length < 1) {
    return
  }

  await Redis.set(getRedisKeyUniswapTopCollections(), JSON.stringify(data))
}

const existRedisUniswapTopCollections = async () => {
  return await Redis.exists(getRedisKeyUniswapTopCollections())
}

const deleteRedisUniswapTopCollections = () => {
  let redisKey = getRedisKeyUniswapTopCollections()
  Redis.del(redisKey)
}

/*
  Uniswap collections
 */
const getRedisKeyUniswapSupportCollections = () => {
  return `uniswap_support_collections`
}

const getRedisUniswapSupportCollections = async () => {
  return await Redis.get(getRedisKeyUniswapSupportCollections())
}

const setRedisUniswapSupportCollections = async (data) => {
  if (!data || data.length < 1) {
    return
  }

  await Redis.set(getRedisKeyUniswapSupportCollections(), JSON.stringify(data))
}

const existRedisUniswapSupportCollections = async () => {
  return await Redis.exists(getRedisKeyUniswapSupportCollections())
}

const deleteRedisUniswapSupportCollections = () => {
  let redisKey = getRedisKeyUniswapSupportCollections()
  Redis.del(redisKey)
}

/*
  Uniswap collection detail
 */
const getRedisKeyUniswapCollectionDetail = (id) => {
  return `uniswap_collection_detail_${id}`
}

const getRedisUniswapCollectionDetail = async (id) => {
  return await Redis.get(getRedisKeyUniswapCollectionDetail(id))
}

const setRedisUniswapCollectionDetail = async (id, data) => {
  if (!id) {
    return
  }

  await Redis.set(getRedisKeyUniswapCollectionDetail(id), JSON.stringify(data))
}

const existRedisUniswapCollectionDetail = async (id) => {
  return await Redis.exists(getRedisKeyUniswapCollectionDetail(id))
}

const deleteRedisUniswapCollectionDetail = (id) => {
  let redisKey = getRedisKeyUniswapCollectionDetail(id)
  Redis.del(redisKey)
}

/*
  Uniswap block number
 */
const getRedisKeyUniswapBlockNumber = (event_type) => {
  return `uniswap_block_number_${event_type}`
}

const getRedisUniswapBlockNumber = async (event_type) => {
  return await Redis.get(getRedisKeyUniswapBlockNumber(event_type))
}

const setRedisUniswapBlockNumber = async (data) => {
  return await Redis.set(getRedisKeyUniswapBlockNumber(data.event_type), JSON.stringify(data))
}

const existRedisUniswapBlockNumber = async (event_type) => {
  return await Redis.exists(getRedisKeyUniswapBlockNumber(event_type))
}

/*
  NFT slug
*/
const getRedisKeyUniswapSlug = (token_address) => {
  return `uniswap_slug_${token_address}`
}

const getRedisUniswapSlug = async (token_address) => {
  return await Redis.get(getRedisKeyUniswapSlug(token_address))
}

const setRedisUniswapSlug = async (token_address, slug) => {
  if (!token_address) {
    return
  }

  await Redis.set(getRedisKeyUniswapSlug(token_address), JSON.stringify(slug))
}

const existRedisUniswapSlug = async (token_address) => {
  return await Redis.exists(getRedisKeyUniswapSlug(token_address))
}

const deleteRedisUniswapSlug = (token_address) => {
  let redisKey = getRedisKeyUniswapSlug(token_address)
  Redis.del(redisKey)
}

module.exports = {
  // collections
  getRedisUniswapTopCollections,
  setRedisUniswapTopCollections,
  existRedisUniswapTopCollections,
  deleteRedisUniswapTopCollections,

  getRedisUniswapSupportCollections,
  setRedisUniswapSupportCollections,
  existRedisUniswapSupportCollections,
  deleteRedisUniswapSupportCollections,

  // collection
  getRedisUniswapCollectionDetail,
  setRedisUniswapCollectionDetail,
  existRedisUniswapCollectionDetail,
  deleteRedisUniswapCollectionDetail,

  // marketplace block number
  getRedisUniswapBlockNumber,
  setRedisUniswapBlockNumber,
  existRedisUniswapBlockNumber,

  // marketplace slug
  getRedisKeyUniswapSlug,
  getRedisUniswapSlug,
  setRedisUniswapSlug,
  existRedisUniswapSlug,
  deleteRedisUniswapSlug,
}
