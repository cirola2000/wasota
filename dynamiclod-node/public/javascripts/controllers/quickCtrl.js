main.controller('quickCtrl', ['$scope', '$http', function ($scope, $http) {
  $scope.serverURL = serverURL;
  $scope.formats = [
    { name: "turtle", format: "ttl" },
    { name: "rdf/xml", format: "rdfxml" },
    { name: "n3", format: "n3" }
  ];
  
  var proxyURL = "/partial/proxy" + "?serverURL=" + serverURL;

  $scope.datasetAddress = "http://datahub.io/dataset/news-100-nif-ner-corpus";

  $scope.startAPI = function () {
    $scope.apiAddress = serverURL + "?addDataset=" + $scope.datasetAddress + "&rdfFormat=" + $scope.choosenFormat.format;
    $scope.showApiCall = true;
    
    console.log(proxyURL + "?addDataset=" + $scope.datasetAddress + "&rdfFormat=" + $scope.choosenFormat.format);

    $http.get(proxyURL + "?addDataset=" + $scope.datasetAddress + "&rdfFormat=" + $scope.choosenFormat.format).
      then(function (response) {
      if (typeof response.data.error == 'undefined') {
        $scope.apiResponse = response.data.resp.coreMsg;
        $scope.showApiResponseColor = "black";
        $scope.showApiResponse = true;
      }
      else {
        $scope.apiResponse = response.data.error.code;
        $scope.showApiResponseColor = "red";
        $scope.showApiResponse = true;

      }
    }, function (response) {
        $scope.apiResponse = "Error: " + response.data;
        $scope.showApiResponse = true;

      });

  };

  $scope.checkStatus = function () {
    $scope.showApiStatusCall = true;
    $scope.apiStatusCall = $scope.serverURL + "?datasetStatus=" + $scope.datasetAddress;

    $http.get(proxyURL+ "?datasetStatus=" + $scope.datasetAddress).
      then(function (response) {
      // console.log(response.data.distributions);
      $scope.apiParserMessage = response.data.resp.parserMsg;
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
  
  }]);