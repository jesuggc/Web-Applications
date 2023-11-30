var express = require('express');
var router = express.Router();
const dao = require("../public/javascripts/DAO.js")
const midao = new dao("localhost","admin_aw","","viajes")
/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log("LO recoge usuarios")
});

router.get("/login", function (request, response) {
  response.status(200)
  response.render('login')
});

router.post("/login", function (request, response) {
  response.status(200)
  midao.checkUser(request.body.email,request.body.contrasena,(err, res) => {
    if (err) console.log("Error: ", err)
    else {
      let user = {
        id: res.id,
        email: res.correo,
        nombre: res.nombre,
        apellidos: res.apellidos
      }
      
      request.session.user = user
      response.locals.user = user
      response.redirect("index")
    }
  })
});

router.get("/register", (request, response) => {
  response.status(200)
  response.render('register');
});

router.post("/register", function (request, response) {
  response.status(200)
  let user = {
    nombre: request.body.nombre,
    apellidos: request.body.apellidos,
    email: request.body.email,
    contrasena: request.body.contrasena
  }
  console.log("USER :", user)
  midao.findByMail(user.email, (err, res) => {
    if (err) console.log("Error: ", err)
    else {
      if(res) {
          console.log("Correo ya existente") 
          response.redirect("/register");
      }
      else {
        midao.createUser(user, (err,resu) => {
          if (err) console.log("Error: ", err)
          else{
           console.log("Creado con exito, id: ", resu)
          //  request.session.userId = res.id
          response.redirect("/");
          }
        })
      }
    }
  })
});

module.exports = router;
