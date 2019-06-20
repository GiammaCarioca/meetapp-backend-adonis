'use strict'

const Model = use('Model')

class Preference extends Model {
  user () {
    return this.belongTo('App/Models/User')
  }
}

module.exports = Preference
