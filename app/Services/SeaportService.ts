import BaseException from 'App/Exceptions/BaseException'
const HelperUtils = require('@ioc:App/Common/HelperUtils')
const Moralis = require('moralis').default
const { EvmChain } = require('@moralisweb3/common-evm-utils')
const { ORDER_STATUS, TOKEN_TYPE } = require('@ioc:App/Common/Const.ts')
import CryptoJS from 'crypto-js'
import { ethers } from 'ethers'
const SEAPORT_ABI = require('../../blockchain_configs/contracts/Seaport.json')
const fs = require('fs')

const BigNumber = require('bignumber.js')

export default class SeaportService {
  public SeaportModel = require('@ioc:App/Models/Seaport')
  public NFTModel = require('@ioc:App/Models/NFT')
  public Database = require('@ioc:Adonis/Lucid/Database')

  public async createOrderService(request): Promise<any> {
    const inputOrder = request.input('input_order') //order info
    const orderHash = request.input('order_hash') //seaport order hash
    if (!inputOrder) return HelperUtils.responseErrorInternal('Order required')
    if (!orderHash) return HelperUtils.responseErrorInternal('Order hash required')
    try {
      var bytes = CryptoJS.AES.decrypt(inputOrder, process.env.HASH_KEY)
      var originalText = bytes.toString(CryptoJS.enc.Utf8)

      let data = JSON.parse(originalText)

      //call to marketplace contract to get order hash by order info from FE and compare
      const marketContract = await HelperUtils.getSeaportContractInstance()
      const compareHash = await marketContract.methods.getOrderHash(data).call()
      if (orderHash !== compareHash)
        return HelperUtils.responseErrorInternal('Order hash not compare order info')
      const offerData = data?.offer[0]

      let query = this.SeaportModel.query()
      let items = await query
        .where('identifier_or_criteria', offerData?.identifierOrCriteria)
        .where('event_type', ORDER_STATUS.CREATE)
        .first()
      if (items) {
        return HelperUtils.responseErrorInternal(items.order_hash)
      }
      const considerationData = data?.consideration[0]
      let seaport = new this.SeaportModel()
      seaport.event_type = ORDER_STATUS.CREATE
      seaport.order_hash = compareHash
      seaport.offerer = data?.offerer
      seaport.item_type = offerData?.itemType ? TOKEN_TYPE[offerData?.itemType] : TOKEN_TYPE[0]
      seaport.token_address = offerData?.token
      seaport.start_amount = offerData?.startAmount
      seaport.end_amount = offerData?.endAmount
      seaport.identifier_or_criteria = offerData?.identifierOrCriteria
      seaport.consideration_item_type = considerationData?.itemType
        ? TOKEN_TYPE[considerationData?.itemType]
        : TOKEN_TYPE[0]
      seaport.consideration_token_address = considerationData?.token
      seaport.consideration_start_amount = considerationData?.startAmount
      seaport.consideration_end_amount = considerationData?.endAmount
      seaport.consideration_identifier_or_criteria = considerationData?.identifierOrCriteria
      seaport.start_time = data?.startTime ? data?.startTime : 0

      await seaport.save()

      return HelperUtils.responseSuccess(data)
    } catch (error) {
      console.log(error)

      return HelperUtils.responseErrorInternal(error)
    }
  }

  public async getTokenDetail(request): Promise<any> {
    const tokenId = request.input('token_id') //order info
    if (!tokenId) return HelperUtils.responseErrorInternal('Token id required')
    try {
      const nftContract = await HelperUtils.getNFTContractInstance()
      const tokenOwner = await nftContract.methods.ownerOf(tokenId).call()
      let query = this.SeaportModel.query()
      let nft = this.NFTModel.query()
      let listing = await query
        .where('identifier_or_criteria', tokenId)
        .where('event_type', ORDER_STATUS.CREATE)
        .exec()
      let order = await query
        .where('consideration_identifier_or_criteria', tokenId)
        .where('event_type', ORDER_STATUS.CREATE)
        .exec()
      let metadata = await nft.where('id', tokenId).first()

      return HelperUtils.responseSuccess({ tokenOwner, listing, order, metadata })
    } catch (error) {
      return HelperUtils.responseErrorInternal(error?.message ?? error)
    }
  }

  public async listNftByAddress(request): Promise<any> {
    const address = request.input('address')

    try {
      const chain = EvmChain.BSC_TESTNET

      const response = await Moralis.EvmApi.nft.getWalletNFTs({
        address,
        chain,
        limit: 10,
        tokenAddresses: ['0x3cdA5802ae0e3553192326f5d270771A14bf8D34'],
      })
      return response.raw
    } catch (error) {
      return HelperUtils.responseErrorInternal(error)
    }
  }

  public async cloneMetadata(request): Promise<any> {
    try {
      for (let i = 0; i < 1000; i++) {
        let nft = new this.NFTModel()
        let xx = require(`../../public/metadata/${i + 1}`)
        nft.description = xx.description
        nft.external_url = xx.external_url
        nft.image = xx.image
        nft.image_3d = xx.image_3d
        nft.image_3d_1k = xx.image_3d_1k
        nft.image_3d_2k = xx.image_3d_2k
        nft.name = xx.name
        nft.item_type = xx.attributes[0].value
        nft.weapon_type = xx.attributes[1].value
        nft.rarity_level = xx.attributes[2].value
        nft.atk = xx.attributes[3].value
        nft.rate_of_fire = xx.attributes[4].value
        nft.reload_speed = xx.attributes[5].value
        nft.ammunition = xx.attributes[6].value
        nft.role = xx.attributes[7].value
        nft.depreciation = xx.attributes[8].value

        await nft.save()
      }
      return 'Done'
    } catch (error) {
      console.log(error)
      return HelperUtils.responseErrorInternal(error)
    }
  }
}
