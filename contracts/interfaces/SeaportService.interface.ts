export default interface SeaportServiceInterface {
  createOrderService(request): Promise<any>
  listNftByAddress(request): Promise<any>
  cloneMetadata(request): Promise<any>
  getTokenDetail(request): Promise<any>
}
