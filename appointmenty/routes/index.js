var express = require('express');
var router = express.Router();
const dao = require("../public/javascripts/DAO.js")
const midao = new dao("localhost","root","","UCM_RIU","3306")
/* GET home page. */


router.get('/', function(req, res, next) {
  console.log("BIENVENIDO A LA PAGINA DE RESERVAS")
  res.render('index');
});
router.get("/login", (request, response) => {
  response.status(200)
  response.render('login');
 
})

router.get("/group/:idFacultad", (request, response) => {
  let idFacultad = request.params.idFacultad
  midao.getGrados(idFacultad, (err,resultado)=> {
    if(err) console.log("Error: ", err)
    else response.json({resultado:resultado});
  })
  
})

router.get("/register", (request, response) => {
    response.status(200)
    midao.getFacultades((err,resultado)=> {
      if(err) console.log("Error: ", err)
      else response.render('register', {resultado});
    })
  }
)
router.get("/loggedUser", function (request, response) {
  response.render("prueba",{user:request.session.user})

})
router.post("/submitRegister", function (request, response) {
  response.status(200)
  let user = {
    nombre: request.body.nombre,
    apellido1: request.body.apellido1,
    apellido2: request.body.apellido2,
    email: request.body.email,
    contrasena: request.body.contrasena,
    facultad: request.body
    
  }
  console.log("USER :", user)
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
      if(!res) redirect("/login")
      else if(res.contrasena === contrasena) {
        console.log("Bienvenido señor",res.nombre)
        console.log(res)
        request.session.user = res
        response.redirect("/loggedUser")
      }
      else console.log("Contraseña erronea")
    }
  })
});


module.exports = router;
