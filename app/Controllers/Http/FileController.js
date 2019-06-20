'use strict'

const File = use('App/Models/File')
const Helpers = use('Helpers')

/**
 * Resourceful controller for interacting with files
 */
class FileController {
  /**
   * Create/save a new file.
   * POST files
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    try {
      // verifica se na requisição existe um arquivo com name 'file'
      if (!request.file('file')) return

      // tamanho do arquivo
      const upload = request.file('file', { size: '2mb' })

      // nome do arquivo criado com a data atual e o subtype como a extensão do arquivo
      const fileName = `${Date.now()}.${upload.subtype}`

      // salvar o arquivo em uma pasta temporária do projeto com a ajuda do helper "tmpPath"
      await upload.move(Helpers.tmpPath('uploads'), {
        // o nome que será salvado no banco de dados
        name: fileName
      })

      if (!upload.moved()) {
        throw upload.error()
      }

      // cria uma nova instância do file no banco de dados passando todos os campos necessários
      const file = await File.create({
        file: fileName,
        name: upload.clientName,
        type: upload.type,
        subtype: upload.subtype
      })

      return file
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: 'Erro no upload de arquivo' } })
    }
  }
}

module.exports = FileController
