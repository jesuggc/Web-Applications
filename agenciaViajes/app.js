const dao = require("./scripts/DAO.js")
const express = require("express")
const app = express()

 const midao = new dao("localhost","admin_aw","","viajes")

app.use(express.static('public'))
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

function cb_listAll(err, resultado){
    if(err) console.log("Error al listar ", err.toString())
    else return resultado.map(ele => ele.nombre)
}

app.get("/", function(request,response ) {
    
    midao.listAll(function (err, resultado){
        if(err) console.log("Error al listar ", err.toString())
        else {
            let destinos = resultado.map(ele => ele.nombre) 
            console.log("A:" ,destinos)
            response.status(200)
            response.render("index", {destinos:destinos});
        } 
    })
    // response.render("index")
})

app.get("/visorDestinos", function(request,response ) {
    response.status(200)
    response.render("visorDestinos")
})

app.get("/cargarVisor", function (request, response) {
    console.log("QUERY: ", request.query.data);
    
    
    response.render("visorDestinos", {data: request.query.data});
});


app.listen(3000, (error) => { 
    if(!error) console.log("Server is Successfully Running, and App is listening on port "+ 3000) 
    else console.log("Error occurred, server can't start ", error); 
}); 
