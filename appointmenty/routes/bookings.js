var express = require('express');
var router = express.Router();
const dao = require("../public/javascripts/DAO.js");
const midao = new dao("localhost","root","","UCM_RIU","3306");

const isLoggedIn = (req, res, next) => {
  if (res.locals.user) {
    return next();
  }
  res.redirect('/users/login');
};

router.use(isLoggedIn)

router.get('/:id', isLoggedIn, function(req, response, next) {
  let idTipo=req.params.id;
  let idFac = response.locals.user.facultad
  
  midao.getInstallationsByOption(idTipo,idFac, (err, installations)=>{
    if(err) console.log("Error: ", err)
    else {
      midao.getFacultadById(response.locals.user.facultad,(err,nombre) => {
        if(err) console.log(err)
        else {
          midao.getTipoById(idTipo,(err,tipo) => {
            if(err) console.log(err)
            else if(installations.length===0) {
              let ini=0;
              let fin=0;
              response.render('bookings',{idTipo,installations,nombre,tipo,ini,fin}); 

            }
            else {
              let ini=installations[0].ini;
              let fin= installations[0].fin;
              response.render('bookings',{idTipo,installations,nombre,tipo,ini,fin}); 
            }
          })
        }
      })
    }
  })
  //   midao.getOptions(((err,options) => {
  //   if(err) console.log("Error: ", err)
  //   else {
  //     options.forEach(ele => {
  //       ele.imagen = ele.nombre.replace(/\s/g, '').toLowerCase()
  //     });
  //     midao.getFacultades(((err,facultades) => {
  //       if(err) console.log("Error: ", err)
  //       else response.render('bookings',{options,facultades});
  //     }))
  //   } 
  // }))
});

router.get('/instalaciones', (request, response) => {
  let facultad = response.locals.user.facultad
  if(response.locals.user.admin === 1) facultad = request.query.facultad
  midao.getInstallationsByOption(request.query.tipo,facultad,(err,instalaciones) => {
    if(err) console.log("Error: ", err)
    else response.json(instalaciones)
  })
})

router.get("/:id/busyHours", (request, response) => {
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

router.post("/:id/createBooking", (request, response) => {
  midao.createBooking(response.locals.user.id,request.body.idInstalacion, request.body.fecha, request.body.horaIni, request.body.horaFin,(err, res) => {
    if(err) console.log(err)
    else response.json(res)
  })
})

router.get("/installationPhoto/:id", (request,response) => { //Devuelve la foto de una instalacion o sala especifica
  let id = Number(request.params.id)
  midao.getInstallationPhoto(id,(err,foto) => {
    if(err) console.log(err)
    else response.end(foto)
  })
})

router.get("/typeInstallationPhoto/:id", (request,response) => { //Devuelve la foto de una instalacion o sala especifica
  let id = Number(request.params.id)
  midao.getTypeInstallationPhoto(id,(err,foto) => {
    if(err) console.log(err)
    else response.end(foto)
  })
})


module.exports = router;