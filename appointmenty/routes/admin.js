var express = require('express');
var router = express.Router();
const dao = require("../public/javascripts/DAO.js");
const midao = new dao("localhost","root","","UCM_RIU","3306")
const multer=require('multer');
const multerFactory= multer({storage: multer.memoryStorage()})

const isLoggedIn = (req, res, next) => {
  if (res.locals.user) return next();
  res.redirect('/users/login');
};

const isAdmin = (req, res, next) => {
  if (res.locals.user.admin === 1) return next();
  res.render("accessDenied");
};

const passLocals = (req, res, next) => {
  res.locals.user = req.session.user;
  next();
};

router.use(isLoggedIn)
router.use(isAdmin)
router.use(passLocals)

router.get("/", (request, response) => { //Renderiza pagina de admin
    response.status(200)
    response.render('admin');
})

router.get("/changeRols", (request, response) => { //Llama a vista de usuarios verificados para convertirlo en admin (AJAX)
  midao.getVerifiedUsers((err, res) => {
    if (err) console.log("Error: ", err)
    else response.json(res)
  })
})

router.post("/changeRols", (request, response) => { //Convierte a un usuario por su id en admin (AJAX)
  midao.updateAdmin(request.body.id,(err, res) => {
    if (err) console.log("Error: ", err)
    else response.json(res)
  })
})

//SOLICITUDES
router.get("/solicitudes", (request, response) => { //Llama a vista de usuarios registrados aun pendientes por verificar (AJAX)
  midao.getRequests((err, res) => {
    if (err) console.log("Error: ", err)
    else response.json(res)
  })
})

router.post("/acceptRequest", (request,response) => {//Valida el registro de un usuario (AJAX)
  midao.acceptRequest(request.body.id, (err,res) => {
    if(err) console.log(err)
    else {
      let asunto = "CONFIRMACION DE REGISTRO DE USUARIO"
      let cuerpo = `<p>Es un placer darte la bienvenida al Servicio de Reservas de la Universidad Complutense de Madrid (UCM). Nos complace informarte que tu solicitud para la creación de cuenta ha sido aceptada, y ahora tienes acceso completo a nuestra plataforma de reservas.</p><p>Con este servicio, tendrás la oportunidad de gestionar de manera eficiente tus reservas de espacios y recursos en nuestras instalaciones. Ya sea que necesites reservar una sala de estudio, un laboratorio o cualquier otro recurso disponible, nuestro sistema está diseñado para hacer que el proceso sea simple y conveniente para ti.</p>
<p>A continuación, te proporcionamos algunos pasos básicos para empezar a utilizar el servicio:</p><ol><li><strong>Inicia sesión en tu cuenta:</strong> Utiliza tus credenciales para iniciar sesión en nuestro portal de reservas <a href="/login">aquí</a>.</li>
<li><strong>Explora las opciones de reserva:</strong> Navega por la plataforma y descubre las diversas opciones de reservas disponibles. Puedes seleccionar el tipo de espacio que necesitas, la fecha y hora deseadas, y confirmar tu reserva de manera sencilla.</li>
<li>Una vez realizada tu reserva, recibirás confirmaciones por correo electrónico y recordatorios antes del evento. Esto asegura que estés al tanto de tus reservas y puedas planificar tu tiempo de manera efectiva.</li>
</ol><p>Estamos comprometidos a brindarte un servicio de calidad y facilitar tu experiencia en la Universidad. Si tienes alguna pregunta o necesitas asistencia, no dudes en ponerte en contacto con nuestro equipo de soporte.</p>
<p>Agradecemos tu participación en el Servicio de Reservas de la UCM y esperamos que encuentres útil esta herramienta para optimizar tu uso de los recursos universitarios.</p>
<p>¡Bienvenido y que tengas una excelente experiencia con nosotros!</p>
<hr><p>Universidad Complutense de Madrid (UCM)</p>`
      midao.createMessage(response.locals.user.id, request.body.id, asunto, cuerpo, (err,sent) => {
        if(err) console.log(err)
        else response.json(sent)
      })
    }
  })
})

router.post("/dropRequest", (request,response) => {//Elimina el registro de un usuario (AJAX)
  midao.dropRequest(request.body.id, (err,res) => {
    if(err) console.log(err)
    else response.json(res)
  })
})

router.get("/petitions", (request,response) => {
  midao.getRequests((err, res) => {
    if (err) console.log("Error: ", err)
    else {
      res.forEach(ele => {
        if(ele.curso === 1) ele.anio = "primer"
        else if(ele.curso === 2) ele.anio = "segundo"
        else if(ele.curso === 3) ele.anio = "tercer"
        else if(ele.curso === 4) ele.anio = "cuarto"
        else if(ele.curso === 5) ele.anio = "quinto"
        else ele.anio = "sexto"
      })

      response.render("petitions", {petitions:res})
    }
  })
})

router.get("/rols", (request, response) => {//Llama a vista de usuarios verificados para convertirlos en admin
  midao.getVerifiedUsers((err, res) => {
    if (err) console.log("Error: ", err)
    else response.render("rols",{verifiedUsers:res})
  })
})

router.get("/getStudents", (request, response) => {//Genera en vista de estadisticas una lista de todos los estudiantes en la facultad id (AJAX)
  midao.getStudentsByFacId(request.query.id,(err, res) => {
    if (err) console.log("Error: ", err)
    else response.json(res)
  })
})

router.get("/newInstallation",  (request, response) => {
  midao.getOptions(((err,options) => {
    if(err) console.log("Error: ", err)
    else {
      midao.getFacultades(((err,facultades) => {
        if(err) console.log("Error: ", err)
        else response.render("newInstallation",{options,facultades});
      }))
    } 
  }))
})

router.post("/newTypeInstallation", multerFactory.single("foto"), (request, response) => {
  let horaIni = request.body.horaIni
  let horaFin = request.body.horaFin
  let tipo = request.body.tipo
  let nombreTipo = request.body.nombreTipo
  let foto =request.file.buffer
  console.log("TIPO",foto)
  midao.createTypeInstallation(nombreTipo,horaIni, horaFin, tipo,foto, (err,ok) => {
    if(err) console.log("Error: ", err)
    else response.json(ok)
  })
})

router.post("/newInstallation", multerFactory.single("foto") ,(request, response) => {
  let nombre = request.body["nombreInstalacion"].trim()
  let idFacultad = request.body["idFacultad"]
  let aforo = request.body["aforoMax"].trim()
  let idTipo = request.body["tipoInstalacion"]
  let foto = request.file.buffer
  midao.createInstallation(nombre, idFacultad, aforo, idTipo,foto, (err,ok) => {
    if(err) console.log("Error: ", err)
    else response.json(true)
  })
 
})

router.get("/getFacultades", (request, response) => {
  midao.getFacultades((err, res) => {
    if (err) console.log("Error: ", err)
    else response.json(res)
  })
})


router.get("/getInstalaciones", (request, response) => {
  midao.getInstallationsByOption(request.query.idTipo,request.query.idFacultad,(err, res) => {
    if (err) console.log("Error: ", err)
    else response.json(res)
  })
})


//LIST USERS
router.get("/listUsers", (request, response) => {
  midao.getVerifiedUsers(((err,users) => {
    if(err) console.log("Error: ", err)
    else response.render("listUsers",{users});
  }))
})

router.post("/photoToServer",multerFactory.single('foto'), (request,response)=>{
  response.send({img:request.file.buffer})
})

router.get("/appearance", (request, response) =>{
  response.render("appearance")
})

router.get("/history",(request,response)=>{
  response.render("history")
})
router.get("/historyList", (request,response)=>{
  let inputSearch = request.query.inputSearch;
  midao.getUsersByInput(inputSearch,(err,users) => {
    if(err) console.log("Error: ", err)
    else response.json(users);
  })
})
router.get("/reservationsList", (request,response)=>{
  let name = request.query.name;
  let ap1 = request.query.ap1;
  let ap2 = request.query.ap2;
  midao.listReservationsByName(name,ap1, ap2,(err,reservations) => {
    if(err) console.log("Error: ", err)
    else{
      reservations.forEach(ele=>{
        ele.fechaReserva=ele.fechaReserva.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' }).split(",")[0]  
      })
      response.json(reservations);
  } 
  })
})
router.get("/getResDetails",(request,response)=>{
  let id = request.query.id;
  midao.getResDetailsById(id,(err,details) => {
    if(err) console.log("Error: ", err)
    else {
      
        details.fechaReserva=details.fechaReserva.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' }).split(",")[0]  
      
      response.json(details);
    }
  })
})
router.post("/updateAppearance", multerFactory.fields([{name:"logo"},{name:"favicon"}]), (request,response) => {
  let favicon = request.files["favicon"] ? request.files["favicon"][0] : null
  let logo = request.files["logo"] ? request.files["logo"][0] : null
  let miObjeto = request.body
  for (let clave in miObjeto) {
    if (miObjeto[clave] === '') {
      miObjeto[clave] = null;
    }
  }
  midao.updateAppearance( request.body.titulo, request.body.nombre, request.body.direccion, request.body.numero, request.body.correo, request.body.abreviacion, logo, favicon, (err,updated)=>{
    if(err) console.log("Error: ", err)
    else {
      request.app.locals.configuration.nombre = request.body.nombre ? request.body.nombre : request.app.locals.configuration.nombre
      request.app.locals.configuration.direccion = request.body.direccion ? request.body.direccion : request.app.locals.configuration.direccion
      request.app.locals.configuration.numero = request.body.numero ? request.body.numero : request.app.locals.configuration.numero
      request.app.locals.configuration.titulo = request.body.titulo ? request.body.titulo : request.app.locals.configuration.titulo
      request.app.locals.configuration.correo = request.body.correo ? request.body.correo : request.app.locals.configuration.correo
      request.app.locals.configuration.abreviacion = request.body.abreviacion ? request.body.abreviacion : request.app.locals.configuration.abreviacion
      request.app.locals.configuration.logo = logo ? logo : request.app.locals.configuration.logo
      request.app.locals.configuration.favicon = favicon ? favicon : request.app.locals.configuration.favicon
      response.redirect("/admin/appearance")
    } 
  })
})

router.get("/filterList", (request,response)=>{
  let inputSearch = request.query.inputSearch;
  let option = request.query.option;
  midao.getUsersByInputFiltered(inputSearch,option,(err,users) => {
    if(err) console.log("Error: ", err)
    else response.json(users);
  })
})

router.get("/stats/:id", (request,response) => {
  let id = Number(request.params.id)
  midao.getStatsByUserId(id,(err,res) => {
    if(err) console.log("Error: ", err)
    else response.render("stats",{id,res})
  })
  
})

router.get("/pertecentageStat", (request,response) => {
  let id = Number(request.query.id)
  midao.getPertencageStat(id ,(err,res) => {
    if(err) console.log("Error: ", err)
    else response.json(res)
  })
})

module.exports = router;