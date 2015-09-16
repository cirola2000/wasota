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
      when('/diagram', {
      templateUrl: '/partial/diagram',
      controller: 'diagramCtrl'
    }).    
      otherwise({
      redirectTo: '/home'
    });
  }]
);


main.factory('generalData', function() {
  var serverURL = 'http://localhost:9090/dynlod/api';
  var serverURL =  'http://vmdbpedia.informatik.uni-leipzig.de:9090/dynlod/api';
      // serverURL : 'http://vmdbpedia.informatik.uni-leipzig.de:9090/dynlod/api',
  
  return {
      appName : 'Dynamic-LOD',
      serverURL : serverURL,
      proxyUrl : "/partial/proxy" + "?serverURL=" + serverURL, 
      
  };
});