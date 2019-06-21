'use strict'

const Route = use('Route')

Route.post('users', 'UserController.store')
Route.post('sessions', 'SessionController.store')

Route.get('files/:id', 'FileController.show')

Route.group(() => {
  Route.post('files', 'FileController.store')
  Route.get('users', 'UserController.show')
  Route.put('users', 'UserController.update')
  Route.delete('users', 'UserController.destroy')
  Route.resource('meetups', 'MeetupController').apiOnly()
  Route.resource('preferences', 'PreferenceController').apiOnly()
}).middleware('auth')
