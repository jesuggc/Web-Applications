var express = require('express');
var router = express.Router();
const dao = require("../public/javascripts/DAO.js");
const midao = new dao("localhost","root","","UCM_RIU","3306")
router.use((request, response, next) => {
  response.locals.user = request.session.user;
  next();
});
/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log("LO recoge usuarios")
});

router.get('/reservations', function(req, response, next) {
  response.render('reservations');
});

router.get("/logout", (request, response) => {
  request.session.destroy()
  response.locals.user = request.session
  response.status(200)
  response.redirect('/');
})

router.get("/login", (request, response) => {
  response.status(200)
  response.render('login');
})

router.get("/admin", (request, response) => {
  response.status(200)
  response.render('admin');
})

router.get("/solicitudes", (request, response) => {
  midao.getRequests((err, res) => {
    if (err) console.log("Error: ", err)
    else response.json(res)
  })
})

router.post("/login", function (request, response) {
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

router.get("/checkEmail", function (request, response) {
  midao.checkEmail(request.query.email, (err, resultado) => {
      let existe = (err) ? false : true
      response.json({existe})
  })
});

router.post("/acceptRequest", (request,response) => {
  midao.acceptRequest(request.body.id, (err,res) => {
    if(err) console.log(err)
    else response.json(res)
  })
})

router.post("/dropRequest", (request,response) => {
  midao.dropRequest(request.body.id, (err,res) => {
    if(err) console.log(err)
    else response.json(res)
  })
})

module.exports = router;
