'use strict'

const Model = use('Model')

class Meetup extends Model {
  user () {
    // SUBSCRIBERS
    return this.belongsToMany('App/Models/User').pivotModel(
      'App/Models/UserMeetup'
    )
  }

  file () {
    return this.hasOne('App/Models/File')
  }
  // file () {
  //   return this.belongsTo('App/Models/File')
  // }
}

module.exports = Meetup
