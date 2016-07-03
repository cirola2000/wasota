var express = require('express');
var request = require('request');
var router = express.Router();

var fs = require('fs');

// var wasotaAPI = "http://wasota.aksw.org/api";
var wasotaAPI = "http://localhost:8090"


router.get('/*', function (req, res, next) {
  var query = wasotaAPI + req.url;
  console.log(query);
  request(query, function (error, response, body) {
    try {
      var data = body;
      console.log("API response: "+data);
      res.send((JSON.parse(data)));
    } catch (E) {
      console.log(E);
    }
  });
});

router.post('/*', function (req, res, next) {
  var query = wasotaAPI + req.url;
  console.log(query);
  request(
     { 
        method: 'POST',
        uri: query,
        body: JSON.stringify(req.body),     
        headers: {'Content-type': 'text/plain',
        'User-Agent': 'curl/7.43.0'}, 
    }
  , function (error, response, body) {
    if (error) {
        return console.error('error:', error);
    }
    console.log("API response: "+body);
    
    res.send((JSON.parse(body)));

  });
});


router.put('/*', function (req, res, next) {
  var query = wasotaAPI + req.url;
  console.log(query);
  request(
     { 
        method: 'PUT',
        uri: query,
        body: JSON.stringify(req.body),     
        headers: {'Content-type': 'text/plain',
        'User-Agent': 'curl/7.43.0'}, 
    }
  , function (error, response, body) {
    if (error) {
        return console.error('error:', error);
    }
    console.log("API response: "+body);
    
    res.send((JSON.parse(body)));

  });
});


module.exports = router;