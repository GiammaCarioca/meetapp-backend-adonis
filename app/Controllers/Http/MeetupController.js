'use strict'

/**
 * Resourceful controller for interacting with meetups
 */
class MeetupController {
  /**
   * Show a list of all meetups.
   * GET meetups
   */
  async index ({ auth }) {
    // TODOS OS MEETUPS CRIADOS PELO USER LOGADO
    const meetups = await auth.user.meetups().fetch()

    return meetups
  }

  /**
   * Create/save a new meetup.
   * POST meetups
   */
  async store ({ request, auth }) {
    // INFORMACOES QUE VEM DO FORM
    const data = request.only([
      'title',
      'location',
      'category',
      'description',
      'cover-url'
    ])

    const meetup = await auth.user.meetups().create({
      ...data,
      // USER QUE CRIOU O MEETUP
      user_id: auth.user.id
    })

    return meetup
  }

  /**
   * Display a single meetup.
   * GET meetups/:id
   */
  async show ({ params, auth }) {
    // RETORNA O PRIMEIRO REGISTRO
    const meetup = await auth.user
      .meetups()
      .where('meetups.id', params.id)
      .first()

    // EAGER LOADING
    await meetup.load('user')

    return meetup
  }

  /**
   * Update meetup details.
   * PUT or PATCH meetups/:id
   */
  async update ({ params, request, auth }) {
    const data = request.only([
      'title',
      'location',
      'category',
      'description',
      'cover-url'
    ])
    const meetup = await auth.user
      .meetups()
      .where('meetups.id', params.id)
      .first()

    meetup.merge(data)

    await meetup.save()

    return meetup
  }

  /**
   * Delete a meetup with id.
   * DELETE meetups/:id
   */
  async destroy ({ params, auth }) {
    const meetup = await auth.user
      .meetups()
      .where('meetups.id', params.id)
      .first()

    await meetup.delete()
  }
}

module.exports = MeetupController
