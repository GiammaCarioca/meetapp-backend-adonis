'use strict'

const Schema = use('Schema')

class UserMeetupSchema extends Schema {
  up () {
    this.create('user_meetups', table => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
      // .onDelete('SET NULL')
      table
        .integer('meetup_id')
        .unsigned()
        .references('id')
        .inTable('meetups')
        .onUpdate('CASCADE')
      // .onDelete('SET NULL')
      table.timestamps()
    })
  }

  down () {
    this.drop('user_meetups')
  }
}

module.exports = UserMeetupSchema
