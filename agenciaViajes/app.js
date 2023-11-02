// const dao = require("./scripts/DAO.js")
const express = require("express")
const app = express()

// const midao = new dao("localhost","admin_aw","","viajes")

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.get("/", function(request,response ) {
    response.status(200)
    // response.type("text/ejs")
    response.render("index")
})


app.listen(3000, (error) => { 
    if(!error) 
        console.log("Server is Successfully Running,  and App is listening on port "+ 3000) 
    else 
        console.log("Error occurred, server can't start", error); 
    } 
); 

// midao.prueba()