var express = require('express');
var router = express.Router();
const dao = require("../public/javascripts/DAO.js");
const midao = new dao("localhost","root","","UCM_RIU","3306");

router.get('/', function(req, response, next) {
    midao.getOptions(((err,options) => {
    if(err) console.log("Error: ", err)
    else {
      options.forEach(ele => {
        ele.imagen = ele.nombre.replace(/\s/g, '').toLowerCase()
      });
      midao.getFacultades(((err,facultades) => {
        if(err) console.log("Error: ", err)
        else response.render('bookings',{options,facultades});
      }))
    } 
  }))
});

router.get('/instalaciones', (request, response) => {
  let facultad = response.locals.user.facultad
  if(response.locals.user.admin === 1) facultad = request.query.facultad
  console.log("Facultad",facultad)
  console.log("Facultad",request.query.tipo)
  midao.getInstallationsByOption(request.query.tipo,facultad,(err,instalaciones) => {
    if(err) console.log("Error: ", err)
    else response.json(instalaciones)
  })
})
module.exports = router;