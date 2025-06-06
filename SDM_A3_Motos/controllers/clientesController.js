const conn = require('../database/connection')
const errors = require('restify-errors')

module.exports = {
  listarClientes: (req, res, next) => {
    conn('clientes')
      .then(dados => {
        res.setHeader('Cache-Control', 'public, max-age=60')
        res.send(dados)
        return next()
      })
      .catch(err => next(new errors.InternalServerError(err.message)))
  },

  buscarClientePorId: (req, res, next) => {
    const id = req.params.idProd
    conn('clientes')
      .where('id', id)
      .first()
      .then(dados => {
        if (!dados) return next(new errors.NotFoundError('Cliente não encontrado'))
        res.setHeader('Cache-Control', 'public, max-age=60')
        res.send(dados)
        return next()
      })
      .catch(err => next(new errors.InternalServerError(err.message)))
  },

  criarCliente: (req, res, next) => {

        conn('clientes')
          .insert(req.body)
          .then(dados => {
            if (!dados) return next(new errors.BadRequestError('Não foi possível inserir'))
            res.send(dados)
            return next()
          })
          .catch(err => next(new errors.InternalServerError(err.message)))
       },

  atualizarCliente: (req, res, next) => {
    const id = req.params.idProd
    conn('clientes')
      .where('id', id)
      .update(req.body)
      .then(dados => {
        if (!dados) return next(new errors.NotFoundError('Cliente não encontrado'))
        res.send(200, { success: true })
        return next()
      })
      .catch(err => next(new errors.InternalServerError(err.message)))
  },

    modificarCliente: (req, res, next) => {
    const id = req.params.idProd
    const dadosUpdate = req.body
    if (Object.keys(dadosUpdate).length === 0) {
      return next(new errors.BadRequestError('Nenhum dado para atualizar'))
    }
    conn('clientes')
      .where('id', id)
      .update(dadosUpdate)
      .then(dados => {
        if (!dados) return next(new errors.NotFoundError('Cliente não encontrada'))
        res.send(200, { success: true })
        return next()
      })
      .catch(err => next(new errors.InternalServerError(err.message)))
  },

  deletarCliente: (req, res, next) => {
    const id = req.params.idProd
    conn('clientes')
      .where('id', id)
      .delete()
      .then(dados => {
        if (!dados) return next(new errors.NotFoundError('Cliente não encontrado'))
        res.send(200, { success: true })
        return next()
      })
      .catch(err => next(new errors.InternalServerError(err.message)))
  }
}