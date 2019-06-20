'use strict'

const Model = use('Model')

class UserMeetup extends Model {
  user () {
    return this.belongsTo('App/Models/User')
  }
  meetup () {
    return this.belongsTo('App/Models/Meetup')
  }
}

module.exports = UserMeetup
