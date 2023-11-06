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
            let destinos = resultado.map(ele => ele) 
            response.status(200)
            response.render("index", {destinos});
        } 
    })
})

router.get("/visorDestinos", function (request, response) {
    midao.findDestinoByNombre(request.query.data,function (err, resultado){
        if(err) console.log("Error al buscar ", err.toString())
        else {
            response.status(200)
            response.render("visorDestinos", {resultado})
        }
    })
    
});

router.get("/informacion", function (request, response) {
    midao.prueba(function (err, resultado) {
        if(err) console.log("Error al buscar ", err.toString())
        else {
            response.status(200)
            response.render("informacion", {resultado})
        }
    })    
});
router.post("/submitSearch", function (request, response) {
    //console.log("SOY LA REQUEST:",request.body.search)
    midao.findDestinoByNombre(request.body.search,function (err, resultado){
        if(err) console.log("Error al buscar ", err.toString())
        else {
            if(resultado.length === 0) 
            response.render("home", resultado)
            else 
            //console.log("SOY RESULTADO:",resultado)
            response.render("visorDestinos", {resultado})
        }
    })
});

router.post("/submitForm", function (request, response) {
    midao.readIdByName(request.body.destino,function(err,id){
        if(err) console.log("Error al buscar por nombre ", err.toString())
        else {
            midao.createReserva(id,request.body,function (err, resultado){
                if(err) console.log("Error al crear reserva ", err.toString())
                else {
                    response.status(200)   
                    let reserva = request.body
                    let idReserva = resultado
                    response.render("confirmacionRes", {reserva : {idReserva,reserva}})
                }
            })    
        }
    })
    
});

module.exports = router;