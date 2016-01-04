var express = require('express');
var request = require('request');
var router = express.Router();


// var serverURL = "http://localhost:8090";
// var serverURL = "http://vmdbpedia.informatik.uni-leipzig.de:9099/LODVader";
var serverURL = "http://vmdbpedia.informatik.uni-leipzig.de:8090";


// router.get('/', function (req, res, next) {

//   var queryUrl = req.url.replace('/', '');
//   queryUrl = queryUrl.replace('?', '&');
//   var query = serverURL + "/api?" + queryUrl;

//   request(query, function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//       try {
//         res.send(JSON.parse(body.toString()));
//       } catch (E) {
//         console.log(E);
//       }
//     }
//     else {
//       console.log(error);
//       res.send({ error: error });
//     }
//   });
// });

router.get('/distribution/search', function (req, res, next) {
  var query = serverURL + req.url;
  request(query, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      try {
        var data = JSON.parse(body.toString());
        console.log(data);
        var table = [];
        for (var i in data.distributions) {
          var line = [];
          line[0] = data.distributions[i].topDatasetTitle;
          line[1] = data.distributions[i].downloadUrl;
          line[2] = data.distributions[i].status;
          line[3] = data.distributions[i].lastTimeStreamed;
          line[4] = data.distributions[i].lodvaderID;
          line[5] = data.distributions[i].lastMsg;
          table[i] = line;
        }
      res.send({ "draw": req.query.draw, "recordsFiltered": data.totalSize, "recordsTotal": data.totalSize, "data": table });
      } catch (E) {
        console.log(E);
      }
    }
    else {
      console.log(error);
      res.send({ error: error });
    }
  });
});

router.get('/distribution/triples/size', function (req, res, next) {
  var query = serverURL + req.url;
  request(query, function (error, response, body) {
    try {
      var data = body.toString();
      res.send(data);
    } catch (E) {
      console.log(E);
    }
  });
});

router.get('/dataset/size', function (req, res, next) {
  var query = serverURL + req.url;
  request(query, function (error, response, body) {
    try {
      var data = body.toString();
      res.send(data);
    } catch (E) {
      console.log(E);
    }
  });
});

router.get('/distribution/size', function (req, res, next) {
  var query = serverURL + req.url;
  request(query, function (error, response, body) {
    try {
      var data = body.toString();
      res.send(data);
    } catch (E) {
      console.log(E);
    }
  });
});


router.get('/distribution/compare/list', function (req, res, next) {
  var query = serverURL + req.url;
  request(query, function (error, response, body) {
    try {
      var data = body.toString();
      res.send(data);
    } catch (E) {
      console.log(E);
    }
  });
});

router.get('/distribution/detail', function (req, res, next) {
  var query = serverURL + req.url;
  request(query, function (error, response, body) {
    try {
      var data = body.toString();
      res.send(data);
    } catch (E) {
      console.log(E);
    }
  });
});

router.get('/distribution/compare/similarity/list', function (req, res, next) {
  var query = serverURL + req.url;
  request(query, function (error, response, body) {
    try {
      var data = body.toString();
      res.send(data);
    } catch (E) {
      console.log(E);
    }
  });
});

router.get('/distribution/compare/topN', function (req, res, next) {
  var query = serverURL + req.url;
  request(query, function (error, response, body) {
    try {
      var data = body.toString();
      res.send(data);
    } catch (E) {
      console.log(E);
    }
  });
});

router.get('/dataset/add', function (req, res, next) {
  var query = serverURL + req.url;
  request(query, function (error, response, body) {
    try {
      var data = body.toString();
      res.send(data);
    } catch (E) {
      console.log(E);
    }
  });
});

router.get('/dataset/status', function (req, res, next) {
  var query = serverURL + req.url;
  request(query, function (error, response, body) {
    try {
      var data = body.toString();
      res.send(data);
    } catch (E) {
      console.log(E);
    }
  });
});

router.post('/linkset/tree', function (req, res, next) {
  var query = serverURL + req.url;
  request(query, function (error, response, body) {
    try {
      var data = body.toString();
      res.send(data);
    } catch (E) {
      console.log(E);
    }
  });
});

router.post('/linkset/graph', function (req, res, next) {
  var query = serverURL + req.url;
  request(query, function (error, response, body) {
    try {
      var data = body.toString();
      res.send(data);
    } catch (E) {
      console.log(E);
    }
  });
});



router.post('/CreateD3JSONFormat2', function (req, res, next) {

  var query = serverURL;
  var resp;

  request(query + req.url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // console.log(body);
      resp = JSON.parse(body);
      res.send(resp);
    }
    else {
      console.log(error);
    }
  });
});

router.get('/GetServerURL', function (req, res, next) {
  res.send({ "serverURL": serverURL });
});


module.exports = router;