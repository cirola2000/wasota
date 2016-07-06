main.controller('loginCtrl', ['$scope', '$http', 'generalData', function ($scope, $http, $generalData) {

  $scope.serverURL = $generalData.serverURL;

  $scope.getUser = function () {
    $http.post("/proxy/user",
      { user: "ciro", password: "password" }).
      then(function (response) {
        $scope.showApiResponse = true;
        console.log(response.data);
        if (response.data.status == "ok") {
          $scope.coreMsg = "user exist";
          window.location.href = "/#/admin";
        }
        else {
          $scope.coreMsg = "Error user doesn't exist.";
        }
      }, function (response) {
        $scope.showApiResponse = true;
        $scope.apiResponse = "Error: " + response.data;
        $scope.showApiResponse = true;
      });
  };

}]);// JavaScript Document