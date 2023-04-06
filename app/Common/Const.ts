module.exports = Object.freeze({
  FILE_SITE: '2mb',
  FILE_EXT: ['png', 'gif', 'jpg', 'jpeg', 'JPEG'],

  ACCEPT_CURRENCY: {
    ETH: 'eth',
    BNB: 'bnb',
    POLYGON: 'matic',
    USDT: 'usdt',
    USDC: 'usdc',
    BUSD: 'busd',
  },
  NETWORK_AVAILABLE: {
    ETH: 'eth',
    BSC: 'bsc',
    POLYGON: 'polygon',
  },
  WEB3_API_URL: 'https://rpc.firefly.firebirdchain.com/',
  WEB3_BSC_API_URL: 'https://data-seed-prebsc-1-s1.binance.org:8545',
  WEB3_POLYGON_API_URL: 'https://rpc.firefly.firebirdchain.com/',
  OFFER_STATUS: {
    OFFERING: 'OFFERING',
    ACCEPTED: 'ACCEPTED',
    CANCELED: 'CANCELED',
  },
  ADDRESS_ZERO: '0x0000000000000000000000000000000000000000',

  GAME_ENDPOINT_HEADERS: {
    'Content-Type': 'application/json',
    'token': `Bearer ${process.env.GAME_ACCESS_TOKEN}`,
  },
  PROXY_LIST: process.env.PROXY_LIST ? JSON.parse(process.env.PROXY_LIST) : [],
  TOKEN_TYPE: [
    'NATIVE',
    'ERC20',
    'ERC721',
    'ERC1155',
    'ERC721_WITH_CRITERIA',
    'ERC1155_WITH_CRITERIA',
  ],
  ORDER_STATUS: {
    FULLFILL: 'OrderFulfilled',
    CANCEL: 'OrderCancelled',
    CREATE: 'OrderCreated',
  },
})
