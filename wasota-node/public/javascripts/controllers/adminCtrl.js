main.controller('adminCtrl', ['$scope', '$http', 'generalData', function ($scope, $http, $generalData) {

document.getElementById("MyEdit").innerHTML = $scope.userName;

  $scope.serverURL = $generalData.serverURL;
  $scope.formats = [
    { name: "turtle", format: "ttl" },
    { name: "rdf/xml", format: "rdfxml" },
    { name: "nt", format: "nt" }
  ];

  $scope.choosenFormat = $scope.formats[0];
  
  $scope.sendUserGraph = function () {
    $http.put("/proxy/user/graph/add/",
    { user: 'diego', password: 'diego', user: $scope.userName, graphName: $scope.graphUserIdentifier, format: $scope.choosenFormat.format, graph: $scope.userGraph}).
      then(function (response) {
        $scope.showApiResponse = true;
        console.log(response.data);
		window.alert(response.data.status);
        if(response.data.status == "ok")
          $scope.coreMsg = "Graph added!";
        else
          $scope.coreMsg = "Error adding graph.";
          
      }, function (response) {
        $scope.showApiResponse = true;
        $scope.apiResponse = "Error: " + response.data;
        $scope.showApiResponse = true;
      });
  };

}]);