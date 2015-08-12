var express = require('express');
var request = require('request');
var router = express.Router();


// var serverURL = "http://localhost:9090/dynlod";
var serverURL = "http://vmdbpedia.informatik.uni-leipzig.de:9090/dynlod";



router.get('/', function (req, res, next) {

  var query = req.query.serverURL;

  // temporary solution
  if (typeof req.query.rdfFormat != 'undefined') {
    query = query + "&rdfFormat=" + req.query.rdfFormat;
  }

  console.log(query);

  request(query, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(JSON.parse(body));
    }
    else {
      console.log(error);
      res.send({ error: error });
    }
  });
});

router.get('/tables', function (req, res, next) {
  
  //http://localhost:9090/dynlod/api?listDistributions&skip=2&limit=4
  //http://vmdbpedia.informatik.uni-leipzig.de:9090/dynlod/api
  
  console.log(req.query.start);
  var query = serverURL+"/api?listDistributions&skip=" + req.query.start + "&limit=" + req.query.length;

  var resp;
  var data;
  var total;

  request(query, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      resp = JSON.parse(body);
      data = resp.distributionList.distributions;
      total = resp.distributionList.totalDistributions;
      res.send({ "draw": req.query.draw, "recordsFiltered": total, "recordsTotal": total, "data": data });
    }
    else {
      console.log(error);
    }
  });

});


router.post('/ResourceTree', function (req, res, next) {
  //http://localhost:9090/dynlod/ResourceTree"
  //http://vmdbpedia.informatik.uni-leipzig.de:9090/dynlod/ResourceTree"
  console.log(req.query.start);
  var query = serverURL+"/ResourceTree";
  var resp;

  request(query, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      resp = JSON.parse(body);
      res.send(resp);
    }
    else {
      console.log(error);
    }
  });
});


router.post('/CreateD3JSONFormat2', function (req, res, next) {
  //http://localhost:9090/dynlod/ResourceTree"
  //http://vmdbpedia.informatik.uni-leipzig.de:9090/dynlod/ResourceTree"
  var query = serverURL;
  var resp;
  console.log(query+req.url);


  request(query+req.url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
      resp = JSON.parse(body);
      res.send(resp);
    }
    else {
      console.log(error);
    }
  });
});








module.exports = router;