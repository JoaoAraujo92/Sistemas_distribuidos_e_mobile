const clientesController = require('../controllers/clientesController');

module.exports = function (server) {
  server.get('/cliente', clientesController.listarClientes);
  server.get('/cliente/:idProd', clientesController.buscarClientePorId);
  server.post('/cliente', clientesController.criarCliente);
  server.put('/cliente/:idProd', clientesController.atualizarCliente);
  server.patch('/cliente/:idProd', clientesController.modificarCliente);
  server.del('/cliente/:idProd', clientesController.deletarCliente);
};
