var main = angular.module('main', ["ngRoute"]);

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
      when('/stats', {
      templateUrl: '/partial/stats',
      controller: 'statsCtrl'
    }).
      otherwise({
      redirectTo: '/home'
    });
  }]
);


main.factory('generalData', function() {
  return {
      appName : 'Dynamic-LOD',
      serverURL : 'http://localhost:9090/dynlod/api',
      // serverURL : 'http://vmdbpedia.informatik.uni-leipzig.de:9090/dynlod/api',
      
  };
});