import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import SeaportService from 'App/Services/SeaportService'
const Moralis = require('moralis').default
const { EvmChain } = require('@moralisweb3/common-evm-utils')

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
    this.app.container.singleton('FXBox/SeaportService', () => new SeaportService())
  }

  public async boot() {
    // IoC container is ready
  }

  public async ready() {
    await Moralis.start({
      apiKey: process.env.MORALIS_KEY,
    })
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
