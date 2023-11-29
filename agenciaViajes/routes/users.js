var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log("LO recoge usuarios")
});

router.get('/reservations', function(req, response, next) {
  response.render('reservations');
});

module.exports = router;
