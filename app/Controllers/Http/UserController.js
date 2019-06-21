'use strict'

const User = use('App/Models/User')

class UserController {
  // pegando os dados da requisição via ctx, que possui request, response, etc, usando desestruturação
  async store ({ request }) {
    // filtrando somente os dados que queremos
    const data = request.only(['username', 'email', 'password'])

    // criando novo user passando os dados da requisição
    const user = User.create(data)

    // retornando o usuário no formato json, que é o padrão para api-only
    return user
  }

  async show ({ auth }) {
    const user = await auth.user

    // EAGER LOADING
    await user.load('preferences')

    return user
  }

  async update ({ request, auth }) {
    // NA VERDADE DEVE PODER MUDAR A PASSWORD, NAO O NOME
    const data = request.only(['username'])
    const user = await auth.user

    user.merge(data)

    await user.save()

    return user
  }

  async destroy ({ auth }) {
    const user = await auth.user

    await user.delete()
  }
}

module.exports = UserController
