const dao = require("../public/javascripts/DAO.js")
var express = require('express');
const midao = new dao("localhost","admin_aw","","viajes")

var router = express.Router();

router.get("/", function(request,response ) {
    
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
    midao.find(request.query.data,function (err, resultado){
        if(err) console.log("Error al buscar ", err.toString())
        else {
            response.status(200)
            response.render("visorDestinos", {resultado})
        }
    })
    
});
router.get("/confirmacionRes", function (request, response) {
    //Añadir info mas adelante con el buscador
    response.render("confirmacionRes")
    
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

router.post("/submitForm", function (request, response) {
    midao.readIdByName(request.body.destino,function(err,id){
        if(err) console.log("Error al buscar por nombre ", err.toString())
        else {
            midao.createReserva(id,request.body,function (err, resultado){
                if(err) console.log("Error al crear reserva ", err.toString())
                else {
                    response.status(200)   
                    console.log("Reserva realizada con exito ");
                    let reserva = request.body
                    let idReserva = resultado
                    response.render("confirmacionRes", {reserva : {idReserva,reserva}})
                }
            })    
        }
    })
    
});

module.exports = router;
// router.listen(3000, (error) => { 
//     if(!error) console.log("Server is Successfully Running, and App is listening on port "+ 3000) 
//     else console.log("Error occurred, server can't start ", error); 
// }); 
