var main = angular.module('main', ["ngRoute"]);

main.config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider.

      when('/home', {
        templateUrl: '/partial/home',
        controller: 'homeCtrl'
      }).
      when('/add', {
        templateUrl: '/partial/add',
        controller: 'addCtrl'
      }).
      when('/wiki', {
        templateUrl: '/partial/wiki',
        controller: 'wikiCtrl'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]
  );


main.factory('generalData', function () {
  var serverURL = 'http://localhost:8080/';

  return {
    appName: 'WASOTA',
    serverURL: serverURL,
    proxyUrl: "/partial/proxy" + "?serverURL=" + serverURL,

  };
});
