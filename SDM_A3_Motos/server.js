const restify = require('restify')
const server = restify.createServer({
  name: 'sdm_a3_motos',
  version: '1.0.0'
})

server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser())

// Importar rotas
require('./routes/motos')(server)
require('./routes/clientes')(server)

server.listen(8001, () => {
  console.log(`${server.name} rodando em ${server.url}`)
})

server.get( "/" , (req, res, next) =>{ 
    res.send( { "resposta" : "Sejam bem-vindos à SDM_A3_Motos" } )
 } )