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
      request.session.user = res
      response.locals.user = res
      response.json(true)
    }
  })
});
router.get("/checkEmail", function (request, response) {
  midao.checkEmail(request.query.email, (err, resultado) => {
      let existe = (err) ? false : true
      response.json({existe})
  })
});
module.exports = router;
