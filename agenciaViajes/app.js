const dao = require("./scripts/DAO.js")
const express = require("express")
const app = express()

 const midao = new dao("localhost","admin_aw","","viajes")

app.use(express.static('public'))
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.urlencoded({ extended: true }));

function cb_listAll(err, resultado){
    if(err) console.log("Error al listar ", err.toString())
    else return resultado.map(ele => ele.nombre)
}

app.get("/", function(request,response ) {
    
    midao.listAll(function (err, resultado){
        if(err) console.log("Error al listar ", err.toString())
        else {
            let destinos = resultado.map(ele => ele) 
            response.status(200)
            response.render("index", {destinos});
        } 
    })
})


app.get("/visorDestinos", function (request, response) {
    midao.find(request.query.data,function (err, resultado){
        if(err) console.log("Error al buscar ", err.toString())
        else {
            response.status(200)
            response.render("visorDestinos", {resultado})
        }
    })
    
});

app.post("/submitForm", function (request, response) {
    midao.readIdByName(request.body.destino,function(err,id){
        if(err) console.log("Error al buscar por nombre ", err.toString())
        else {
            midao.createReserva(id,request.body,function (err, resultado){
                if(err) console.log("Error al crear reserva ", err.toString())
                else {
                    response.status(200)   
                    console.log("Reserva realizada con exito");
                }
            })    
        }
    })
    
});
app.listen(3000, (error) => { 
    if(!error) console.log("Server is Successfully Running, and App is listening on port "+ 3000) 
    else console.log("Error occurred, server can't start ", error); 
}); 
