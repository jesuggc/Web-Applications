var express = require('express');
var router = express.Router();
const dao = require("../public/javascripts/DAO.js")
const midao = new dao("localhost","root","","UCM_RIU","3306")
/* GET home page. */
router.get('/', function(req, res, next) {
  midao.findQueco((err,ele) => {
    console.log(ele)
  })
  res.render('index', { title: 'Express' });
});


router.get("/login", function (request, response) {
  response.status(200)
  let email = request.query.email
  console.log(email)
  let password = request.query.password
  midao.findByMail(email, (err, res) => {
    if (err) console.log("Error: ", err)
    else console.log("Bienvenido señor",res.nombre)
  })
  // response.render("informacion", {pag})
});


module.exports = router;
