import SeaportService from '@ioc:FXBox/SeaportService'

export default class SeaportController {
  public async createOrder({ request }) {
    return await SeaportService.createOrderService(request)
  }
  public async getListNftByAddress({ request }) {
    return await SeaportService.listNftByAddress(request)
  }
  public async cloneMetadata({ request }) {
    return await SeaportService.cloneMetadata(request)
  }
  public async getTokenDetail({ request }) {
    return await SeaportService.getTokenDetail(request)
}
