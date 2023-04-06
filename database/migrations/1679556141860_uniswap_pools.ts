import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UniswapPools extends BaseSchema {
  protected tableName = 'uniswap_pools'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('transaction_hash')
      table.integer('transaction_index')
      table.integer('block_number')
      table.integer('dispatch_at')
      table.string('event_type')
      table.string('token0')
      table.string('token1')
      table.integer('fee')
      table.integer('tickSpacing')
      table.string('pool_address')
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
