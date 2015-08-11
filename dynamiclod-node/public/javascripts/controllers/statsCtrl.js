main.controller('statsCtrl', ['$scope', '$http', 'generalData', function ($scope, $http, $generalData) {

$scope.appName = $generalData.appName;
$scope.serverURL = $generalData.serverURL;
var proxyURL = $generalData.proxyUrl;



   $http.get(proxyURL + "?statistics").
      then(function (response) {
      if (typeof response.data.error == 'undefined') {
        console.log(response.data);
        $scope.stats = response.data.statistics;
      }
      else {
       console.log("Error! "+response.data.error);
      }
    }, function (response) {
        $scope.apiResponse = "Error: " + response.data;
        $scope.showApiResponse = true;

      });
	  

}]);