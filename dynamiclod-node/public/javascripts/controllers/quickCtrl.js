main.controller('quickCtrl', ['$scope', '$http', 'generalData', function ($scope, $http, $generalData) {
  $scope.serverURL = $generalData.serverURL;
  $scope.formats = [
    { name: "turtle", format: "ttl" },
    { name: "rdf/xml", format: "rdfxml" },
    { name: "nt", format: "nt" },
    { name: "datahub link", format: "rdfxml" }
  ];

  $scope.choosenFormat = $scope.formats[0];
  
  $scope.datasetAddress = "";

  $scope.startAPI = function () {
    $scope.apiResponse = {};
    $scope.distributions = {};
    $scope.showApiStatusResponse = false;
    $scope.showApiResponse = false;
    $scope.showLoading = true;
    $scope.showApiCall = true;

    $http.get("/partial/proxy/dataset/add?descriptionFileURL=" + $scope.datasetAddress + "&format=" + $scope.choosenFormat.format).
    // $http.get(proxyURL + "?addDataset=" + $scope.datasetAddress + "&rdfFormat=" + $scope.choosenFormat.format).
      then(function (response) {
        $scope.apiResponse = response.data;
        $scope.showApiResponseColor = "black";
        $scope.showApiResponse = true;
        $scope.showLoading = false;
    }, function (response) {
        $scope.apiResponse = "Error: " + response.data;
        $scope.showApiResponse = true;

      });

  };

  $scope.checkStatus = function () {
    $scope.showApiStatusCall = true;
    $http.get("/partial/proxy/dataset/status?dataset=" + $scope.datasetAddress).
      then(function (response) {
      $scope.distributions = response.data.distributions;
      $scope.APIStatusCall =  $generalData.serverURL+"/dataset/status?dataset="+$scope.datasetAddress;
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
      if (distribution.indegree[a].distribution.isVocabulary){
        vocab = "glyphicon glyphicon-thumbs-up";
        break;
      }
    }

    for (var a in distribution.outdegree) {
      console.log(distribution.outdegree[a].distribution.isVocabulary);
      if (distribution.outdegree[a].distribution.isVocabulary){
                console.log("as1");

        vocab = "glyphicon glyphicon-thumbs-up";
        break;
      }
    }

    return vocab;
  };
  
  
  $scope.hasLinks = function (distribution) {
    var vocab = "glyphicon glyphicon-thumbs-down";
    for (var a in distribution.indegree) {
      if (!distribution.indegree[a].distribution.isVocabulary){
                console.log("as2");

        vocab = "glyphicon glyphicon-thumbs-up";
                break;
      }
    }

    for (var a in distribution.outdegree) {
      if (!distribution.outdegree[a].distribution.isVocabulary){
                console.log("as3");

        vocab = "glyphicon glyphicon-thumbs-up";
                break;
      }
    }

    return vocab;
  };


}]);