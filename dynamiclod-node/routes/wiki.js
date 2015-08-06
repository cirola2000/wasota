var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('partial/wiki.html');
});


module.exports = router;
