var express = require('express');
var request = require('request');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('partial/quick.html');
});

router.get('/proxy', function (req, res, next) {

  console.log("Making request to: "+req.query.serverURL);

  request(req.query.serverURL, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send({resp: JSON.parse(body)});
    }
    else {
      console.log(error);
      res.send({error: error});
    }
  });
});


module.exports = router;
