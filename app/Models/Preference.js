'use strict'

const Model = use('Model')

class Preference extends Model {
  user () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Preference
