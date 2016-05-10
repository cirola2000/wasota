var express = require('express');
var request = require('request');
var router = express.Router();

var fs = require('fs');

var serverURL = "http://localhost:8190"


router.put('/*', function (req, res, next) {
  var query = serverURL + "/dataset/add?namedGraph=ciro&format=ttl";

  console.log(query);

  request(
    
     { 
       method: 'POST',
      uri: query,
      namedGraph: "http://ciro/graph",
      format: "ttl",
      headers: {'Content-type': 'text/turtle',
      'User-Agent': 'curl/7.43.0'},
      body: fs.createReadStream(__dirname + '/../files/1.ttl') 
      
    }
  , function (error, response, body) {
    if (error) {
      return console.error('upload failed:', error);
    }
    console.log('Server responded with:' + body);
  });
  
});



router.get('/*', function (req, res, next) {
  var query = serverURL + req.url;
  console.log(query);
  request(query, function (error, response, body) {
    try {
      var data = body;
      console.log(JSON.parse(data));
      res.send((JSON.parse(data)));
    } catch (E) {
      console.log(E);
    }
  });
});

router.post('/*', function (req, res, next) {
  var query = serverURL + req.url;


  console.log(query);
  console.log(req.body);

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
          res.send((JSON.parse(body)));

  });
  
});


module.exports = router;