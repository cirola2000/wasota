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
      try{
        
      res.send(JSON.parse(body.toString()));
      }catch (E){
        console.log(E);
      }
    }
    else {
      console.log(error);
      res.send({ error: error });
    }
  });
});

router.get('/tables', function (req, res, next) {  
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

router.get('/tablesOntologies', function (req, res, next) {  
  var query = serverURL+"/api?listDistributions&ontologies=false&skip=" + req.query.start + "&limit=" + req.query.length;

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
  
  var query = serverURL+"/ResourceTree";
  if(req.query.linkedDatasets)
    query = query + "?linkedDatasets=true";
  var resp;

  request(query, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(JSON.parse(body));
      resp = JSON.parse(body);
      res.send(resp);
    }
    else {
      console.log(error);
    }
  });
});


router.post('/CreateD3JSONFormat2', function (req, res, next) {
  
  var query = serverURL;
  var resp;

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