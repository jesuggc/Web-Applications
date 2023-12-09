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
  midao.getInstallationsByOption(request.query.tipo,facultad,(err,instalaciones) => {
    if(err) console.log("Error: ", err)
    else response.json(instalaciones)
  })
})

router.get("/busyHours", (request, response) => {
  midao.getReservationsByDayAndInstallation(request.query.fecha,request.query.idInstalacion,(err, horas) => {
    if(err) console.log(err)
    else {
      horas.forEach(ele => {
        if(ele.idUsuario === response.locals.user.id) ele.reservaPropia = true
      })
      if(response.locals.user.admin === 0) {
        midao.getReservationsByDayAndUser(request.query.fecha, response.locals.user.id, (err, reservado) => {
          if (err) console.log(err)
          else {
            response.json({horas,diaYaReservado:reservado}) 
          }
        })
      } else {
          response.json({horas,diaYaReservado:false})
      }
      
    }
  })
})

router.post("/createBooking", (request, response) => {
  midao.createBooking(response.locals.user.id,request.body.idInstalacion, request.body.fecha, request.body.horaIni, request.body.horaFin,(err, res) => {
    if(err) console.log(err)
    else response.json(res)
  })
})
module.exports = router;