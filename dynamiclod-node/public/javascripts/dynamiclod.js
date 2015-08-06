var main = angular.module('main', ["ngRoute"]);

var serverURL = "http://localhost:9090/dynlod/api";


main.config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider.
      when('/quick', {
      templateUrl: '/partial/quick',
      controller: 'quickCtrl'
    }).
      when('/home', {
      templateUrl: '/partial/home',
      controller: 'homeCtrl'
    }).
      when('/wiki', {
      templateUrl: '/partial/wiki',
      controller: 'wikiCtrl'
    }).
      otherwise({
      redirectTo: '/home'
    });
  }]);

main.controller('quickCtrl', ['$scope', '$http', function ($scope, $http) {
  $scope.serverURL = serverURL;
  $scope.formats = [
    { name: "turtle", format: "ttl" },
    { name: "rdf/xml", format: "rdfxml" },
    { name: "n3", format: "n3" }
  ];

  $scope.datasetAddress = "http://datahub.io/dataset/news-100-nif-ner-corpus";

  $scope.startAPI = function () {
    $scope.apiAddress = serverURL + "?addDataset=" + $scope.datasetAddress + "&rdfFormat=" + $scope.choosenFormat.format;
    $scope.showApiCall = true;


    $http.get("/partial/quick/proxy" + "?serverURL=" + serverURL + "?addDataset=" + $scope.datasetAddress + "&rdfFormat=" + $scope.choosenFormat.format).
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

    $http.get("/partial/quick/proxy" + "?serverURL=" + serverURL + "?datasetStatus=" + $scope.datasetAddress).
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

main.controller('homeCtrl', ['$scope', '$http', function ($scope, $http) {

}]);


main.controller('wikiCtrl', ['$scope', '$http', function ($scope, $http) {

}]);
