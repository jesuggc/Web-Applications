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
  console.log("???",response.locals.user)
   next()
}

const amISignedIn = (request,response,next) => {
  if(!request.session.userId) response.redirect("/login")
  else next()
}

router.get("/reservations", amISignedIn, (request,response) => {
  response.redirect("users/reservations")
})

// router.get("/logOut", (request,response) => {
//   request.session.destroy();
//   response.redirect("/")
// })


router.get('/', function(req, res, next) {
  res.render('index');
});

// router.get("/login", (request, response) => {
//   response.status(200)
//   response.render('login');
 
// })

router.get("/group/:idFacultad", (request, response) => {
  let idFacultad = request.params.idFacultad
  midao.getGrados(idFacultad, (err,resultado)=> {
    if(err) console.log("Error: ", err)
    else response.json({resultado:resultado});
  })
  
})







module.exports = router;
