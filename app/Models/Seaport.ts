import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Seaport extends BaseModel {
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
  @column({ columnName: 'order_hash' })
  public order_hash: string

  @column({ columnName: 'offerer' })
  public offerer: string

  @column({ columnName: 'fulfiller' })
  public fulfiller: string

  // item_type NATIVE || ERC20 || ERC721 || ERC1155 || ERC721_WITH_CRITERIA || ERC1155_WITH_CRITERIA
  @column({ columnName: 'item_type' })
  public item_type: string

  @column({ columnName: 'token_address' })
  public token_address: string

  @column({ columnName: 'start_amount' })
  public start_amount: string

  @column({ columnName: 'end_amount' })
  public end_amount: string

  @column({ columnName: 'identifier_or_criteria' })
  public identifier_or_criteria: string

  @column({ columnName: 'consideration_item_type' })
  public consideration_item_type: string

  @column({ columnName: 'consideration_token_address' })
  public consideration_token_address: string

  @column({ columnName: 'consideration_start_amount' })
  public consideration_start_amount: string

  @column({ columnName: 'consideration_end_amount' })
  public consideration_end_amount: string

  @column({ columnName: 'consideration_identifier_or_criteria' })
  public consideration_identifier_or_criteria: string

  @column({ columnName: 'start_time' })
  public start_time: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public sent_to_mf_at: number
}

module.exports = Seaport
