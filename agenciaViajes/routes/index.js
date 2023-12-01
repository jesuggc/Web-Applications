const dao = require("../public/javascripts/DAO.js")
var express = require('express');
const midao = new dao("localhost","admin_aw","","viajes")

var router = express.Router();

router.use((request, response, next) => {
    response.locals.user = request.session.user;
    next();
});

router.get("/", function(request,response ) {
    response.status(200);
    response.render("home");
})

router.get("/destinos", function(request,response) {
    midao.listAll(function (err, resultado){
        if(err) console.log("Error al listar ", err.toString())
        else {
            response.status(200)
            response.render("index", {resultado});
        } 
    })
})

router.get("/informacion", function (request, response) {
    response.status(200)
    let pag = request.query.data
    response.render("informacion", {pag})
});

router.post("/submitSearch", function (request, response) {
    midao.findDestinoByNombre(request.body.search,function (err, resultado){
        if(err) console.log("Error al buscar ", err.toString())
        else {
            if(!resultado.length) response.render("home", {resultado})
            else {
                midao.findCarouselById(resultado.id,function (err,res) {
                    if(err) console.log("Error al abrrir carrousel ", err.toString())
                    else {
                        resultado.imagenes = res
                        resultado.error=err
                        response.render("visorDestinos", {resultado})
                    }
                })
            }
        }
    })
});

router.get("/visorDestinos", function (request, response) {
    midao.findDestinoByNombre(request.query.data,function (err, resultado){
        if(err) console.log("Error al buscar ", err.toString())
        else {
            response.status(200)
            midao.findCarouselById(resultado.id,function (err,res) {
                if(err) console.log("Error al abrrir carrousel ", err.toString())
                else {
                    midao.getFirstComments(resultado.id, (err,comentarios) => {
                        resultado.imagenes = res
                        resultado.error=err
                        resultado.nombre = request.query.data
                        resultado.comentarios= comentarios
                        response.render("visorDestinos", {resultado})

                    })
                }
            })
        }
    })
});

router.post("/submitForm", function (request, response) {
    midao.readIdByName(request.query.data,function(err,id){
        if(err) console.log("ERROR: ", err)
        else {
            midao.createReserva(id,request.body,function (err, resultado){
                if(err) console.log("Error al crear reserva ", err)
                else {
                    midao.findCarouselById(id,function (err,res) {
                        if(err) console.log("Error al abrrir carrousel ", err.toString())
                        else {
                            response.status(200)
                            let reserva = request.body
                            reserva.idReserva = resultado
                            reserva.imagenes = res
                            reserva.destino = request.query.data
                            reserva.nombre = request.query.data
                            response.render("confirmacionRes", {resultado:reserva})
                        }
                    })
                }
            })    
        }
    })
});

router.get("/getAllComments", function (request, response) {
    midao.getAllComments(request.query.id,function (err, resultado){
        if(err) console.log("Error al buscar ", err.toString())
        else response.json(resultado)
         
    })
});

router.post("/postComment", function (request, response) {
    let destino = request.body.id
    let comentario = request.body.comment
    let nombre = response.locals.user.nombre

    console.log(destino)
    console.log(comentario)
    midao.postComment(nombre,destino,comentario, (err, resultado) => {
        if(err) console.log("Error al comentar ", err.toString())
        else {
            let ahora = new Date()
            let fecha = ahora.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' }).split(",")[0]
            let hora = ahora.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' }).split(",")[1]
            let res = {
                id:resultado,
                destino,
                comentario,
                nombre,
                likes:0,
                hora,
                fecha
            }
            response.json(res)
        }
    })
});



module.exports = router;