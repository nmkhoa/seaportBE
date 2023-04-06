import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Uniswaps extends BaseSchema {
  protected tableName = 'uniswaps'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('transaction_hash')
      table.integer('transaction_index')
      table.integer('block_number')
      table.integer('dispatch_at')
      table.string('event_type')
      table.text('event_info')

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
