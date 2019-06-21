'use strict'

const Preferences = use('App/Models/Preference')

/**
 * Resourceful controller for interacting with preferences
 */
class PreferenceController {
  /**
   * Show a list of all preferences.
   * GET preferences
   */
  async index ({ request, response, view }) {
    // EAGER LOADING
    // const preferences = await Preferences.all()
    const preferences = await Preferences.query()
      .with('user')
      .fetch()

    return preferences
  }
  /**
   * Create/save a new preference.
   * POST preferences
   */
  async store ({ request, auth }) {
    const data = request.only([
      'frontend',
      'backend',
      'mobile',
      'devops',
      'gestao',
      'marketing',
      'first_access'
    ])

    const preferences = await auth.user.preferences().create({
      ...data,
      // USER QUE CRIOU O PREFERENCES
      user_id: auth.user.id
    })

    return preferences
  }
  /**
   * Display a single preference.
   * GET preferences/:id
   */
  async show ({ auth }) {
    const preferences = await auth.user.preferences().fetch()

    return preferences
  }

  /**
   * Update preference details.
   * PUT or PATCH preferences/:id
   */
  async update ({ params, request, auth }) {
    const data = request.only([
      'frontend',
      'backend',
      'mobile',
      'devops',
      'gestao',
      'marketing',
      'first_access'
    ])
    const preferences = await auth.user.preferences().fetch()

    preferences.merge(data)

    await preferences.save()

    return preferences
  }

  /**
   * Delete a preference with id.
   * DELETE preferences/:id
   */
  async destroy ({ params, request, auth }) {
    const preferences = await auth.user.preferences().fetch()

    await preferences.delete()
  }
}

module.exports = PreferenceController
