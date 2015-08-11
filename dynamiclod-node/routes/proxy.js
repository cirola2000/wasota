var express = require('express');
var request = require('request');
var router = express.Router();


router.get('/', function (req, res, next) {
  
  var query = req.query.serverURL;

  // temporary solution
  if(typeof req.query.rdfFormat != 'undefined'){
    query = query +"&rdfFormat="+req.query.rdfFormat; 
  }

  console.log(query);

  request(query, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(JSON.parse(body));
    }
    else {
      console.log(error);
      res.send({error: error});
    }
  });
});

router.get('/tables', function (req, res, next) {
  
  //http://localhost:9090/dynlod/api?listDistributions&skip=2&limit=4
  
  console.log(req.query.start);
  var query = "http://localhost:9090/dynlod/api?listDistributions&skip="+req.query.start+"&limit="+req.query.length;
  
  var resp;
  var data;
  var total;
  
    request(query, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // res.send(JSON.parse(body));
      
      resp = JSON.parse(body);
      data = resp.distributionList.distributions;
      total  = resp.distributionList.totalDistributions;
  res.send({"draw":req.query.draw,"recordsFiltered":total,"recordsTotal":total,"data":data});
    }
    else {
      console.log(error);
      
      // resp = JSON.parse(body);
      // data = resp.distributionList.distributions;
      // total  = resp.distributionList.totalDistributions;
      
      // res.send({error: error});
      
    }
  });
  
  // res.send({"draw":4,"recordsTotal":11,"recordsFiltered":11,"data":[["Charde","Marshall","Regional Director","3"],["Colleen","Hurst","Javascript Developer","3"]]});
});


module.exports = router;