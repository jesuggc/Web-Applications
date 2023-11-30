const dao = require("../public/javascripts/DAO.js")
var express = require('express');
const midao = new dao("localhost","admin_aw","","viajes")

var router = express.Router();

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
                    resultado.imagenes = res
                    resultado.error=err
                    resultado.nombre = request.query.data
                    response.render("visorDestinos", {resultado})
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

module.exports = router;