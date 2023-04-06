import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class UniswapPool extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'transaction_hash', serializeAs: null })
  public transaction_hash: string

  @column({ columnName: 'transaction_index', serializeAs: null })
  public transaction_index: number

  @column({ columnName: 'block_number', serializeAs: null })
  public block_number: number

  @column({ columnName: 'dispatch_at' })
  public dispatch_at: number

  @column({ columnName: 'event_type' })
  public event_type: string

  // hash from order info
  @column({ columnName: 'token0' })
  public token0: string

  @column({ columnName: 'token1' })
  public token1: string

  @column({ columnName: 'fee' })
  public fee: number

  @column({ columnName: 'tickSpacing' })
  public tickSpacing: number

  @column({ columnName: 'pool_address' })
  public pool_address: string
}

module.exports = UniswapPool
