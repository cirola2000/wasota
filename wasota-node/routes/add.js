var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('add.html', { title: 'Add' });
  res.render('partial/add.html');
});

module.exports = router;
