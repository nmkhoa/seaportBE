import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class NFT extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'description' })
  public description: string

  @column({ columnName: 'external_url', serializeAs: null })
  public external_url: string

  @column({ columnName: 'image', serializeAs: null })
  public image: string

  @column({ columnName: 'image_3d' })
  public image_3d: string

  @column({ columnName: 'image_3d_1k' })
  public image_3d_1k: string

  @column({ columnName: 'image_3d_2k' })
  public image_3d_2k: string

  @column({ columnName: 'name' })
  public name: string

  @column({ columnName: 'item_type' })
  public item_type: string

  @column({ columnName: 'weapon_type' })
  public weapon_type: string

  @column({ columnName: 'rarity_level' })
  public rarity_level: string

  @column({ columnName: 'atk' })
  public atk: string

  @column({ columnName: 'rate_of_fire' })
  public rate_of_fire: string

  @column({ columnName: 'reload_speed' })
  public reload_speed: string

  @column({ columnName: 'ammunition' })
  public ammunition: string

  @column({ columnName: 'role' })
  public role: string

  @column({ columnName: 'depreciation' })
  public depreciation: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public sent_to_mf_at: number
}

module.exports = NFT
