var express = require('express');
var router = express.Router();
const dao = require("../public/javascripts/DAO.js");
const midao = new dao("localhost","root","","UCM_RIU","3306")
/* GET home page. */
router.use((request, response, next) => {
  response.locals.user = request.session.user;
  next();
});
// ------------ MIDDLEWARE ---------------
const amIlogged = (request,response,next) => {
   next()
}

const amISignedIn = (request,response,next) => {
  if(!request.session.userId) response.redirect("/login")
  else next()
}

router.get("/reservations", amISignedIn, (request,response) => {
  response.redirect("users/reservations")
})

router.get('/', function(req, res, next) {
  midao.getOptions((err,options) => {
    if(err) console.log("Error: ", err)
    else {
      options.forEach(ele => {
        ele.imagen = ele.nombre.replace(/\s/g, '').toLowerCase()
      });
      res.render('index',{options});
    } 
  })
});

router.get("/group/:idFacultad", (request, response) => {
  let idFacultad = request.params.idFacultad
  midao.getGrados(idFacultad, (err,resultado)=> {
    if(err) console.log("Error: ", err)
    else response.json({resultado:resultado});
  })
  
})

router.get("/prueba", (request, response) => {
    response.render("prueba")
})






module.exports = router;
