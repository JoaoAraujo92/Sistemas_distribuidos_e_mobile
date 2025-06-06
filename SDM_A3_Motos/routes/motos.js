const motosController = require('../controllers/motosController')

module.exports = function (server) {
  server.get('/moto', motosController.listarMotos)
  server.get('/moto/:idProd', motosController.buscarMotoPorId)
  server.post('/moto', motosController.criarMoto)
  server.put('/moto/:idProd', motosController.atualizarMoto)
  server.patch('/moto/:idProd', motosController.modificarMoto)
  server.del('/moto/:idProd', motosController.deletarMoto)
}