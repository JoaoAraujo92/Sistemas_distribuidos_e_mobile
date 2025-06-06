const restify = require("restify");
const errors = require("restify-errors");

const server = restify.createServer( {
    name : "joaomotos" ,
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
        database : "joaomotos"
    }
} )

server.get( "/moto" , (req, res, next) =>{ 
    conn( "motos" )
        .then(  (dados) =>{
            res.setHeader('Cache-Control', 'public, max-age=60')
            res.send( dados )
        } , next )  
 } )


 server.get( "/moto/:idProd" , (req, res, next) =>{ 
    id = req.params.idProd
    conn( "motos" )
        .where( "id" , id )
        .first()
        .then(  (dados) =>{
            res.setHeader('Cache-Control', 'public, max-age=60')
            res.send( dados )
        } , next )  
 } )

 server.post( "/moto" , (req, res, next) =>{ 
    conn( "motos" )
        .insert( req.body )
        .then(  (dados) =>{
            if( !dados ){
                return res.send( new errors.BadRequestError("Não foi possível inserir") )
            }
            res.send( dados )
        } , next )  
 } )


 server.del("/moto/:idProd", (req, res, next) => {
    const id = req.params.idProd
    conn("motos")
        .where("id", id)
        .delete()
        .then((dados) => {
            if (!dados) {
                return next(new errors.NotFoundError("Moto não encontrada"))
            }
            res.send(200, { success: true })
            return next()
        }, (err) => {
            return next(new errors.BadRequestError("Não foi possível excluir"))
        })
})

 server.put("/moto/:idProd", (req, res, next) => {
    const id = req.params.idProd
    conn("motos")
        .where("id", id)
        .update(req.body)
        .then((dados) => {
            if (!dados) {
                return next(new errors.NotFoundError("Moto não encontrada"))
            }
            res.send(200, { success: true })
            return next()
        }, (err) => {
            return next(new errors.BadRequestError("Não foi possível editar"))
        })
})

server.patch("/moto/:idProd", (req, res, next) => {
    const id = req.params.idProd;
    const dadosUpdate = req.body;

    if (Object.keys(dadosUpdate).length === 0) {
        return res.send(new errors.BadRequestError("Nenhum dado para atualizar"))
    }

    conn("motos")
        .where("id", id)
        .update(dadosUpdate)
        .then((dados) => {
            if (!dados) {
                return next(new errors.NotFoundError("Moto não encontrada"))
            }
            res.send(200, { success: true });
            return next();
        }, (err) => {
            return next(new errors.BadRequestError("Não foi possível atualizar"))
        })
});


server.get( "/" , (req, res, next) =>{ 
    //res.setHeader( 'Content-type' , 'application/json')
    res.send( { "resposta" : "Sejam bem-vindos à Casa das Motos" } )
 } )