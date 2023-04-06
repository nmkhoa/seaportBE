import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Seaports extends BaseSchema {
  protected tableName = 'seaports'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('transaction_hash')
      table.integer('transaction_index')
      table.integer('block_number')
      table.integer('dispatch_at')
      table.string('event_type')
      table.string('order_hash')

      table.string('offerer')
      table.string('fulfiller')
      table.string('item_type')
      table.string('token_address')
      table.string('start_amount')
      table.string('end_amount')
      table.string('identifier_or_criteria')
      table.string('consideration_item_type')
      table.string('consideration_token_address')
      table.string('consideration_start_amount')
      table.string('consideration_end_amount')
      table.string('consideration_identifier_or_criteria')
      table.integer('start_time')

      table.index('identifier_or_criteria')
      table.index('consideration_identifier_or_criteria')
      table.index('offerer')
      table.index('fulfiller')

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
