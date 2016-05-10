main.controller('searchCtrl', ['$scope', '$http',"NgTableParams", 'generalData', function ($scope, $http, NgTableParams, $generalData) {

  $scope.serverURL = $generalData.serverURL;
  $scope.formats = [
    { name: "turtle", format: "ttl" },
    { name: "rdf/xml", format: "rdfxml" },
    { name: "nt", format: "nt" }
  ];

  // $scope.choosenFormat = $scope.context;

  $scope.contextList = ["loading..."];
  
 $scope.updatePerformance = function(){
    $http.post("/proxy/performance/getAll", JSON.stringify({context: $scope.context})).
    then(function (response) {
      $scope.precisionList=response.data.precisionListFinal;
    }, function (response) {
      $scope.apiResponse = "Error: " + response.data;
      $scope.showApiResponse = true;
      }
 );
  }
  
   $scope.updateTable = function(){
    $http.post("/proxy/performance/get", JSON.stringify({context: $scope.context, precision: $scope.precision})).
    then(function (response) {
      // $scope.precisionList=response.data.precisionListFinal;
      console.log(response.data.precisionListFinal)

function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? 1 : ((x > y) ? -1 : 0));
    });
}

$scope.results = sortByKey(response.data.precisionListFinal, 'value');

// $scope.results =response.data.precisionListFinal;


    }, function (response) {
      $scope.apiResponse = "Error: " + response.data;
      $scope.showApiResponse = true;
      }
 );
  }


  $http.get("/proxy/context/getAll").
    then(function (response) {
      $scope.contextList=response.data.context;
    }, function (response) {
      $scope.apiResponse = "Error: " + response.data;
      $scope.showApiResponse = true;
      }
 );
    
    
// var self = this;
var data = $scope.results;
this.tableParams = new NgTableParams({        sorting: {
            value: 'asc'     
        }}, { dataset: data});
    
}]);
    

// ultimo exec_c0_mex_exec_d12_conf_1_1523833047
// penultimo this:exec_c0_mex_exec_d12_conf_1_1523833047
// experimet is:experiment_1523833047