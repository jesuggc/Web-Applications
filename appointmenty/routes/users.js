var express = require('express');
var router = express.Router();
const multer=require('multer');
const multerFactory= multer({storage: multer.memoryStorage()})
const dao = require("../public/javascripts/DAO.js");
const midao = new dao("localhost","root","","UCM_RIU","3306")
router.use((request, response, next) => {
  response.locals.user = request.session.user;
  next();
});

router.get('/', function(req, res, next) {
  console.log("Pagina raiz")
});

router.get("/profilePhoto/:id", (request,response) => {
  let id = Number(request.params.id)
  midao.getProfilePhoto(id,(err,foto) => {
    if(err) console.log(err)
    else response.end(foto)
  })
})

router.get("/logout", (request, response) => { //Redirige a pagina principal, cerrando sesion en locals y session
  request.session.destroy()
  response.locals.user = request.session
  response.status(200)
  response.redirect('/');
})

router.get("/login", (request, response) => {//Renderiza pagina de login
  response.status(200)
  response.render('login');
})

router.post("/login", function (request, response) {//Inicia sesion
  response.status(200)
  let email = request.body.email
  let contrasena = request.body.password
  midao.checkUser(email,contrasena,(err, res) => {
    if (err) console.log("Error: ", err)
    else if(!res) response.json(false)
    else {
      if(res.verificado === 1) {
        request.session.user = res
        response.locals.user = res
      }
      response.json({existe:true, nombre:res.nombre,correo:res.correo,verificado:res.verificado})
    }
  })
});

router.get("/register", (request, response) => {//Renderiza pagina de register
  response.status(200)
  midao.getFacultades((err,resultado)=> {
    if(err) console.log("Error: ", err)
    else response.render('register', {resultado});
  })
})

router.post("/register",multerFactory.single('imagen'), (request, response) => { //Crea el nuevo usuario tras submit en vista de register
  let user = {
    nombre: request.body.nombre,
    apellido1: request.body.apellido1,
    apellido2: request.body.apellido2,
    email: request.body.email,
    password: request.body.password,
    facultad: request.body.facultad,
    grado: request.body.grado,
    curso: request.body.curso,
    foto: null
  }
  if(request.file) user.foto=request.file.buffer;
  user.nombre = user.nombre.charAt(0).toUpperCase() + user.nombre.slice(1).toLowerCase()
  user.apellido1 = user.apellido1.charAt(0).toUpperCase() + user.apellido1.slice(1).toLowerCase()
  user.apellido2 = user.apellido2.charAt(0).toUpperCase() + user.apellido2.slice(1).toLowerCase()

  midao.createUser(user, (err,res) => {
    if (err) console.log("Error: ", err)
    else response.json(true)
  })
  
});

router.get("/checkEmail", function (request, response) {//En validar login y register
  midao.checkEmail(request.query.email, (err, resultado) => {
      let existe = (err) ? false : true
      response.json({existe})
  })
});

router.get("/correo", (request, response) => { //Renderiza pagina de correo
  response.status(200)
  
  midao.getEmails(response.locals.user.id, (err,emails) => {
    if(err) console.log(err)
    else {
      emails.forEach(ele => {
        ele.hora = ele.fecha.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' }).split(",")[1].trim()
        ele.fecha = ele.fecha.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' }).split(",")[0]
      });
      response.render("correo",{emails})
    } 
  })
})

router.get("/emailContent", (request, response) => { //Renderiza pagina de correo
  response.status(200)
  midao.getEmail(request.query.id ,(err,email) => {
    if(err) console.log(err)
    else {
        email.hora = email.fecha.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' }).split(",")[1].trim()
        email.fecha = email.fecha.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' }).split(",")[0]
        response.json(email)
    };
  })
})

router.post("/updateEmail", (request,response) => {
  let id = request.body.id
  let callback = (err,res) => {
    if(err) console.log(err)
    else response.json(res)
  }
  if(request.body.action === "fav") {
    midao.favEmail(id,callback)
  } else if (request.body.action === "archive") {
    midao.archiveEmail(id,callback)
  } else if (request.body.action === "delete") {
    midao.deleteEmail(id,callback)
  } else {
    midao.readEmail(id,callback)  
  }
})

router.post("/sendMessage", (request,response) => {
  response.status(200)
  let id = response.locals.user.id
  midao.getIdByEmail(request.body.email, (err,idDestino) => {
    if(err) console.log(err)
    else {
      midao.createMessage(id, idDestino, request.body.asunto, request.body.cuerpo, (err,res) => {
        if(err) console.log(err)
        else response.json(res)
      })
    }
  })
})

module.exports = router;
