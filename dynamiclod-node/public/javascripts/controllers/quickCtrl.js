main.controller('quickCtrl', ['$scope', '$http', 'generalData', function ($scope, $http, $generalData) {
  $scope.serverURL = $generalData.serverURL;
  $scope.formats = [
    { name: "turtle", format: "ttl" },
    { name: "rdf/xml", format: "rdfxml" },
    { name: "n3", format: "n3" },
    { name: "datahub link", format: "rdfxml" }
  ];

  $scope.choosenFormat = $scope.formats[1];

  var proxyURL = "/partial/proxy" + "?serverURL=" + $scope.serverURL;

  $scope.datasetAddress = "http://datahub.io/dataset/news-100-nif-ner-corpus";

  $scope.startAPI = function () {
    $scope.apiResponse = {};
    $scope.apiParserMessage = {};
    $scope.distributions = {};
    $scope.showApiStatusResponse = false;
    $scope.showApiResponse = false;
    $scope.showLoading = true;

    $scope.apiAddress = $scope.serverURL + "?addDataset=" + $scope.datasetAddress + "&rdfFormat=" + $scope.choosenFormat.format;
    $scope.showApiCall = true;

    $http.get(proxyURL + "?addDataset=" + $scope.datasetAddress + "&rdfFormat=" + $scope.choosenFormat.format).
      then(function (response) {
      if (typeof response.data.error == 'undefined') {
        $scope.apiResponse = response.data.resp.coreMsg;
        $scope.apiParserMessage = response.data.resp.parserMsg;
        $scope.showApiResponseColor = "black";
        $scope.showApiResponse = true;
        $scope.showLoading = false;
      }
      else {
        $scope.apiResponse = response.data.error.code;
        $scope.showApiResponseColor = "red";
        $scope.showApiResponse = true;
        $scope.showLoading = false;

      }
    }, function (response) {
        $scope.apiResponse = "Error: " + response.data;
        $scope.showApiResponse = true;

      });

  };

  $scope.checkStatus = function () {
    $scope.showApiStatusCall = true;
    $scope.apiStatusCall = $scope.serverURL + "?datasetStatus=" + $scope.datasetAddress;

    $http.get(proxyURL + "?datasetStatus=" + $scope.datasetAddress).
      then(function (response) {
      // console.log(response.data.distributions);
      // $scope.apiParserMessage = response.data.resp.parserMsg;
      $scope.distributions = response.data.resp.distributions;
      $scope.showApiStatusResponse = true;
    }, function (response) {
        $scope.apiResponse = "Error: " + response;
        $scope.showApiStatusResponse = true;
      });
  };

  $scope.retrieveRDF = function () {
    $scope.showRDF = true;

  };


  $scope.hasVocabularyLinks = function (distribution) {
     var vocab = "glyphicon glyphicon-thumbs-down";
    for (var a in distribution.indegree) {
      if (distribution.indegree[a].isVocabulary){
        vocab = "glyphicon glyphicon-thumbs-up";
        break;
      }
    }

    for (var a in distribution.outdegree) {
      if (distribution.outdegree[a].isVocabulary){
        vocab = "glyphicon glyphicon-thumbs-up";
        break;
      }
    }

    return vocab;
  };
  
  
  $scope.hasLinks = function (distribution) {
    var vocab = "glyphicon glyphicon-thumbs-down";
    for (var a in distribution.indegree) {
      if (!distribution.indegree[a].isVocabulary){
        vocab = "glyphicon glyphicon-thumbs-up";
                break;
      }
    }

    for (var a in distribution.outdegree) {
      if (!distribution.outdegree[a].isVocabulary){
        vocab = "glyphicon glyphicon-thumbs-up";
                break;
      }
    }

    return vocab;
  };


}]);