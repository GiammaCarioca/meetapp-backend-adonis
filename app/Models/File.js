'use strict'

const Model = use('Model')
const Env = use('Env')

class File extends Model {
  static get computed () {
    // nome do campo virtual que quero criar
    return ['url']
  }

  // pega o id do model e retorna uma url para mostrar o arquivo
  getUrl ({ id }) {
    return `${Env.get('APP_URL')}/files/${id}`
  }
}

module.exports = File
