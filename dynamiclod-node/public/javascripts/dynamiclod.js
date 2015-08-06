var main = angular.module('main', ["ngRoute"]);

var serverURL = "http://localhost:9090/dynlod/";


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
    {name:"turtle", format:"ttl"}, 
    {name:"rdf/xml", format:"rdfxml"}, 
    {name:"n3", format:"n3"}
    ];
     
  $scope.datasetAddress = "http://datahub.io/dataset/news-100-nif-ner-corpus";
  
  $scope.startAPI = function(){
    $scope.apiAddress = serverURL+"api?addDataset="+$scope.datasetAddress+"&rdfFormat="+$scope.choosenFormat.format;
    $scope.showApiCall = true;
    
    $http.get($scope.apiAddress).
      then(function(response) {
        $scope.apiResponse = response.data.coreMsg;
        $scope.showApiResponse = true; 
     }, function(response) {
       console.log(response);
       $scope.apiResponse = "Error: "+response.data;
       $scope.showApiResponse = true; 

     });
  };
  
  $scope.checkStatus = function(){
     $scope.showApiStatusCall = true;
     $scope.apiStatusCall = $scope.serverURL+"api?datasetStatus="+$scope.datasetAddress;
     
     $http.get($scope.apiStatusCall).
      then(function(response) {
        console.log(response.data.distributions);
        $scope.apiParserMessage = response.data.parserMsg;
        $scope.distributions = response.data.distributions;
        $scope.showApiStatusResponse = true; 
     }, function(response) {
       $scope.apiResponse = "Error: "+response;
               $scope.showApiStatusResponse = true; 
     });
  };
  
  $scope.retrieveRDF = function(){
    $scope.showRDF = true;
    
  };
  
  
  
  
}]);

main.controller('homeCtrl', ['$scope', '$http', function ($scope, $http) {
 
}]);


main.controller('wikiCtrl', ['$scope', '$http', function ($scope, $http) {
  
}]);
