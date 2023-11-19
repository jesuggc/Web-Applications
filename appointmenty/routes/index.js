var express = require('express');
var router = express.Router();
const dao = require("../public/javascripts/DAO.js")
const midao = new dao("localhost","root","","UCM_RIU","3306")
/* GET home page. */
router.get('/', function(req, res, next) {
  // midao.findQueco((err,ele) => {
  //   console.log(ele)
  // })
  console.log("BIENVENIDO A LA PAGINA DE RESERVAS")
  res.render('index', { title: 'Express' });
});
router.get("/login", (request, response) => {
    response.status(200)
    response.render('login');
  }
)
router.get("/register", (request, response) => {
    response.status(200)
    response.render('register');
  }
)

router.post("/submitRegister", function (request, response) {
  response.status(200)
  let user = {
    nombre: request.body.nombre,
    apellido1: request.body.apellido1,
    apellido2: request.body.apellido2,
    email: request.body.email,
    contrasena: request.body.contrasena
  }
  console.log("1: user: ", user)
  midao.findByMail(user.email, (err, res) => {
    if (err) console.log("Error: ", err)
    else {
      if(res) console.log("Correo ya existente") 
      else {
        midao.createUser(user, (err,resu) => {
          if (err) console.log("Error: ", err)
          else console.log("Creado con exito, id: ", resu)
        })
      }
    }
  })
});

router.get("/submitLogin", function (request, response) {
  response.status(200)
  let email = request.query.email
  let contrasena = request.query.contrasena
  midao.findByMail(email, (err, res) => {
    if (err) console.log("Error: ", err)
    else {
      if(!res) console.log("Error: correo incorrecto")
      else if(res.contrasena === contrasena) console.log("Bienvenido señor",res.nombre)
      else console.log("Contraseña erronea")
    }
  })
  // response.render("informacion", {pag})
});


module.exports = router;
