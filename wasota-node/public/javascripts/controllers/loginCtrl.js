main.controller('loginCtrl', ['$scope', '$http', 'generalData', function ($scope, $http, $generalData) {

  $scope.serverURL = $generalData.serverURL;

  $scope.getUser = function () {
    $http.post("/proxy/user",
      { user: $scope.userName, password: $scope.userPassword}).
      then(function (response) {
        $scope.showApiResponse = true;
        console.log(response.data);
        if (response.data.status == "405") {
          $scope.coreMsg = "user exist";
          window.location.href = "/#/admin";
		  
        }
        else {
          $scope.coreMsg = "Error user doesn't exist.";
        }
      }, 
	  
	  function writeCookie(name,value,days) {
          var date, expires;
          if (days) {
          date = new Date();
          date.setTime(date.getTime()+(days*24*60*60*1000));
          expires = "; expires=" + date.toGMTString();
            }else{
          expires = "";
    }
    document.cookie = name + "=" + $scope.userName + value + expires + "; path=/#/admin";
	  },
	  window.alert(name),
	  function (response) {
        $scope.showApiResponse = true;
        $scope.apiResponse = "Error: " + response.data;
        $scope.showApiResponse = true;
      });
  };

}]);// JavaScript Document