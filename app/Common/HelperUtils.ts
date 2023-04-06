import crypto from 'crypto'

const isDevelopment = process.env.NODE_ENV === 'development'
const Const = require('@ioc:App/Common/Const')

const SEAPORT_SMART_CONTRACT = process.env.SEAPORT_SMART_CONTRACT
const SEAPORT_ABI = require('../../blockchain_configs/contracts/Seaport.json')

const NFT_SMART_CONTRACT = process.env.NFT_SMART_CONTRACT
const NFT_CONTRACT_ABI = require('../../blockchain_configs/contracts/NFT.json')

const UNISWAP_SMART_CONTRACT = process.env.UNISWAP_SMART_CONTRACT
const UNISWAP_ABI = require('../../blockchain_configs/contracts/UniswapV3Pool.json')

const UNISWAP_POOL_FACTORY_SMART_CONTRACT = process.env.UNISWAP_POOL_FACTORY_SMART_CONTRACT
const UNISWAP_POOL_FACTORY_ABI = require('../../blockchain_configs/contracts/UniswapV3Factory.json')

const getWeb3BscProviderLink = () => {
  return Const.WEB3_BSC_API_URL
}
const getWeb3PolygonProviderLink = () => {
  return Const.WEB3_POLYGON_API_URL
}

const Web3 = require('web3')
const web3Eth = new Web3('https://eth.llamarpc.com')
const web3Bsc = new Web3(getWeb3BscProviderLink())
const web3Polygon = new Web3(getWeb3PolygonProviderLink())

const networkToWeb3 = {
  [Const.NETWORK_AVAILABLE.ETH]: web3Eth,
  [Const.NETWORK_AVAILABLE.BSC]: web3Bsc,
  [Const.NETWORK_AVAILABLE.POLYGON]: web3Polygon,
}

const getWeb3Provider = async () => {
  return networkToWeb3[Const.NETWORK_AVAILABLE.BSC]
}

const getUniswapProvider = async () => {
  return networkToWeb3[Const.NETWORK_AVAILABLE.ETH]
}

const getSeaportContractInstance = async () => {
  const pool = SEAPORT_SMART_CONTRACT
  if (!pool) {
    return null
  }
  const web3 = await getWeb3Provider()

  const instance = new web3.eth.Contract(SEAPORT_ABI.abi, pool)
  if (!instance) {
    return null
  }

  return instance
}

const getNFTContractInstance = async () => {
  const pool = NFT_SMART_CONTRACT
  if (!pool) {
    return null
  }
  const web3 = await getWeb3Provider()

  const instance = new web3.eth.Contract(NFT_CONTRACT_ABI, pool)
  if (!instance) {
    return null
  }

  return instance
}

const getUniswapContractInstance = async () => {
  const pool = UNISWAP_SMART_CONTRACT
  if (!pool) {
    return null
  }
  const web3 = await getUniswapProvider()

  const instance = new web3.eth.Contract(UNISWAP_ABI.abi, pool)
  if (!instance) {
    return null
  }

  return instance
}

const getUniswapPoolContractInstance = async () => {
  const pool = UNISWAP_POOL_FACTORY_SMART_CONTRACT
  if (!pool) {
    return null
  }
  const web3 = await getUniswapProvider()
  const instance = new web3.eth.Contract(UNISWAP_POOL_FACTORY_ABI, pool)
  if (!instance) {
    return null
  }

  return instance
}

const responseErrorInternal = (message) => {
  return {
    status: 500,
    message: message || 'Sorry there seems to be a server error!',
    data: null,
  }
}

const responseNotFound = (message) => {
  return {
    status: 404,
    message: message || 'Not Found !',
    data: null,
  }
}

const responseBadRequest = (message) => {
  return {
    status: 400,
    message: message || 'Looks like this is unkown request, please try again or contact us.',
    data: null,
  }
}

const responseSuccess = (data = null, message) => {
  return {
    status: 200,
    message: message || 'Success !',
    data,
  }
}

const getMFToken = (input: crypto.BinaryLike, algorithm = 'sha256'): string => {
  if (!input) return ''
  return crypto.createHash(algorithm).update(input).digest('hex')
}

const generateRandomCode = () => {
  const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let code = ''
  for (let i = 0; i < 10; i++) {
    code += characters[Math.floor(Math.random() * characters.length)]
  }
  return code
}

module.exports = {
  getWeb3Provider,
  responseErrorInternal,
  responseNotFound,
  responseBadRequest,
  responseSuccess,
  getMFToken,
  generateRandomCode,
  getSeaportContractInstance,
  getUniswapContractInstance,
  getUniswapPoolContractInstance,
  getNFTContractInstance,
}
