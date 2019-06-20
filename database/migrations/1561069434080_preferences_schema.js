'use strict'

const Schema = use('Schema')

class PreferencesSchema extends Schema {
  up () {
    this.create('preferences', table => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      // .notNullable()
      table.boolean('frontend').defaultTo(false)
      table.boolean('backend').defaultTo(false)
      table.boolean('mobile').defaultTo(false)
      table.boolean('devops').defaultTo(false)
      table.boolean('gestao').defaultTo(false)
      table.boolean('marketing').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('preferences')
  }
}

module.exports = PreferencesSchema
