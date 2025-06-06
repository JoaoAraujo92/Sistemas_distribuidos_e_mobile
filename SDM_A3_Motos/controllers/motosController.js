const conn = require('../database/connection')
const errors = require('restify-errors')

module.exports = {
  listarMotos: (req, res, next) => {
    conn('motos')
      .then(dados => {
        res.setHeader('Cache-Control', 'public, max-age=60')
        res.send(dados)
        return next()
      })
      .catch(err => next(new errors.InternalServerError(err.message)))
  },

  buscarMotoPorId: (req, res, next) => {
    const id = req.params.idProd
    conn('motos')
      .where('id', id)
      .first()
      .then(dados => {
        if (!dados) return next(new errors.NotFoundError('Moto não encontrada'))
        res.setHeader('Cache-Control', 'public, max-age=60')
        res.send(dados)
        return next()
      })
      .catch(err => next(new errors.InternalServerError(err.message)))
  },

  criarMoto: (req, res, next) => {
    conn('motos')
      .insert(req.body)
      .then(dados => {
        if (!dados) return next(new errors.BadRequestError('Não foi possível inserir'))
        res.send(dados)
        return next()
      })
      .catch(err => next(new errors.InternalServerError(err.message)))
  },

  atualizarMoto: (req, res, next) => {
    const id = req.params.idProd
    conn('motos')
      .where('id', id)
      .update(req.body)
      .then(dados => {
        if (!dados) return next(new errors.NotFoundError('Moto não encontrada'))
        res.send(200, { success: true })
        return next()
      })
      .catch(err => next(new errors.InternalServerError(err.message)))
  },

  modificarMoto: (req, res, next) => {
    const id = req.params.idProd
    const dadosUpdate = req.body
    if (Object.keys(dadosUpdate).length === 0) {
      return next(new errors.BadRequestError('Nenhum dado para atualizar'))
    }
    conn('motos')
      .where('id', id)
      .update(dadosUpdate)
      .then(dados => {
        if (!dados) return next(new errors.NotFoundError('Moto não encontrada'))
        res.send(200, { success: true })
        return next()
      })
      .catch(err => next(new errors.InternalServerError(err.message)))
  },

  deletarMoto: (req, res, next) => {
    const id = req.params.idProd
    conn('motos')
      .where('id', id)
      .delete()
      .then(dados => {
        if (!dados) return next(new errors.NotFoundError('Moto não encontrada'))
        res.send(200, { success: true })
        return next()
      })
      .catch(err => next(new errors.InternalServerError(err.message)))
  }
}