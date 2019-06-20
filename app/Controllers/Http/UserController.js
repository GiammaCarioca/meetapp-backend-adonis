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
}

module.exports = UserController
