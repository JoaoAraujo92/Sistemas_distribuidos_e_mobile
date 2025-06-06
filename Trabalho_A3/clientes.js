const restify = require("restify")
const errors = require("restify-errors")

const server = restify.createServer( {
    name : "sdm_a3_motos" ,
    version : "1.0.0"
})

server.use( restify.plugins.acceptParser( server.acceptable ) )
server.use( restify.plugins.queryParser() )
server.use( restify.plugins.bodyParser() )

server.listen( 8001, function(){
    console.log( "%s executando em: %s" , server.name, server.url)
} )

var conn = require( "knex" )( {
    client : "mysql" ,
    connection : {
        host : "localhost" ,
        user : "root" ,
        password : "" ,
        database : "sdm_a3_motos"
    }
} )

server.get( "/cliente" , (req, res, next) =>{ 
    conn( "clientes" )
        .then(  (dados) =>{
            res.setHeader('Cache-Control', 'public, max-age=60')
            res.send( dados )
        } , next )  
 } )


 server.get( "/cliente/:idProd" , (req, res, next) =>{ 
    id = req.params.idProd
    conn( "clientes" )
        .where( "id" , id )
        .first()
        .then(  (dados) =>{
            res.setHeader('Cache-Control', 'public, max-age=60')
            res.send( dados )
        } , next )  
 } )

 server.post( "/cliente" , (req, res, next) =>{ 
    conn( "clientes" )
        .insert( req.body )
        .then(  (dados) =>{
            if( !dados ){
                return res.send( new errors.BadRequestError("Não foi possível inserir") )
            }
            res.send( dados )
        } , next )  
 } )


 server.del("/cliente/:idProd", (req, res, next) => {
    const id = req.params.idProd
    conn("clientes")
        .where("id", id)
        .delete()
        .then((dados) => {
            if (!dados) {
                return next(new errors.NotFoundError("Cliente não encontradO"))
            }
            res.send(200, { success: true })
            return next()
        }, (err) => {
            return next(new errors.BadRequestError("Não foi possível excluir"))
        })
})

 server.put("/cliente/:idProd", (req, res, next) => {
    const id = req.params.idProd
    conn("clientes")
        .where("id", id)
        .update(req.body)
        .then((dados) => {
            if (!dados) {
                return next(new errors.NotFoundError("Cliente não encontrado"))
            }
            res.send(200, { success: true })
            return next()
        }, (err) => {
            return next(new errors.BadRequestError("Não foi possível editar"))
        })
})

server.patch("/cliente/:idProd", (req, res, next) => {
    const id = req.params.idProd
    const dadosUpdate = req.body

    if (Object.keys(dadosUpdate).length === 0) {
        return res.send(new errors.BadRequestError("Nenhum dado para atualizar"))
    }

    conn("clientes")
        .where("id", id)
        .update(dadosUpdate)
        .then((dados) => {
            if (!dados) {
                return next(new errors.NotFoundError("Cliente não encontrado"))
            }
            res.send(200, { success: true })
            return next()
        }, (err) => {
            return next(new errors.BadRequestError("Não foi possível atualizar"))
        })
})