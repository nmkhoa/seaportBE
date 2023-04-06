import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Nfts extends BaseSchema {
  protected tableName = 'nfts'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.text('description')
      table.string('external_url')
      table.string('image')
      table.string('image_3d')
      table.string('image_3d_1k')
      table.string('image_3d_2k')
      table.string('name')
      table.string('item_type')
      table.string('weapon_type')
      table.string('rarity_level')
      table.string('atk')
      table.string('rate_of_fire')
      table.string('reload_speed')
      table.string('ammunition')
      table.string('role')
      table.string('depreciation')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
