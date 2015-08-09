main.controller('diagramCtrl', ['$scope', '$http', 'generalData', function ($scope, $http, $generalData) {

	$scope.appName = $generalData.appName;
	$scope.serverURL = $generalData.serverURL;
	
}]);