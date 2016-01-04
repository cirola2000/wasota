main.controller('statsCtrl', ['$scope', '$http', 'generalData', function ($scope, $http, $generalData) {

  $scope.appName = $generalData.appName;
  $scope.serverURL = $generalData.serverURL;
  $scope.distributionID = "";
  $scope.dumpFileURL = "";
  $scope.top = 10;
  $scope.detailsTop = 10;
  $scope.similarityTableData;
  $scope.topNLinksTableData = [];
  $scope.searchVocabularies = "false"; 
  $scope.distributionList; 
  $scope.searchStatus = "DONE";
  $scope.distributionDetails;
  $scope.showVocab = false;
  
  
  $scope.numberOfDatasets;
  $scope.numberOfVocabularies;
  $scope.numberOfTriples;

  $scope.modalSimilaritiesOptions = [
    { "label": "Number of links", "value": "links" },
   { "label": "Number of bad links", "value": "badLinks" },
    // { "label": "Number of links (normalized)", "value": "strength" },
    { "label": "Similarity by predicates", "value": "predicates" },
    { "label": "Similarity by rdf:type", "value": "type" },
    { "label": "Similarity by owl:Class", "value": "class" },
    { "label": "Similarity by rdfs:Subclass", "value": "subclass" },
  ];
  

  $scope.modalDetailsOptions = [
    { "label": "predicates", "value": "predicates" },
    { "label": "rdf:type", "value": "type" },
    { "label": "owl:Class", "value": "class" },
    { "label": "rdfs:Subclass", "value": "subclass" },
  ];

  $scope.option = $scope.modalSimilaritiesOptions[0];
  $scope.optionDetails = $scope.modalDetailsOptions[0];

  $scope.modalTopLinks = {};


  var proxyURL = $generalData.proxyUrl;
  $http.get("/partial/proxy/distribution/size?searchVocabularies=true").then(function (response) {
    if (typeof response.data.error == 'undefined') {
      $scope.numberOfVocabularies = response.data;
    }
  });
  
  $http.get("/partial/proxy/dataset/size").then(function (response) {
    if (typeof response.data.error == 'undefined') {
      $scope.numberOfDatasets = response.data;
    }
  });
  
  $http.get("/partial/proxy/distribution/triples/size").then(function (response) {
    if (typeof response.data.error == 'undefined') {
      $scope.numberOfTriples = response.data;
    }
  });



  $scope.getCompareList = function () {
    var query = "/partial/proxy/distribution/compare/list?distribution=" + $scope.distributionID + "&topN=" + $scope.top + "&type=" + $scope.option.value;
    $http.get(query).then(function (response) {
      if (typeof response.data.error == 'undefined') {
        $scope.modalTopLinks = response.data;
        console.log(response.data);
      }
    });
  };



  $scope.getCompareSimilarityList = function (distributionID2) {
    $scope.similarityTableData = [];
    var query = "/partial/proxy/distribution/compare/similarity/list?distribution1=" + $scope.distributionID + "&distribution2=" + distributionID2 + "&type=" + $scope.option.value +  "&topN=10" ;
    $http.get(query).then(function (response) {
        $scope.similarityTableData = response.data;
        console.log(response.data);
    });   
  }
  
  $scope.getCompareTopN = function (distributionID2) {
    $scope.similarityTableData = [];
    var query = "/partial/proxy/distribution/compare/topN?distribution1=" + $scope.distributionID + "&distribution2=" + distributionID2 + "&type=" + $scope.option.value ;
    $http.get(query).then(function (response) {
        $scope.topNLinksTableData = response.data;
        console.log(response.data);
    });   
  } 
  
  
  $scope.getDatasetDetailsStatistics = function (distributionID2) { 
    $scope.similarityTableData = [];
    var query = "/partial/proxy/distribution/detail?distribution=" + $scope.distributionID + "&type=" + $scope.optionDetails.value + "&topN=" + $scope.detailsTop;
    $http.get(query).then(function (response) {
        $scope.distributionDetails = response.data;
        console.log(response.data);
    });   
  } 
  

  
  // $scope.getDatasetDetailsStatistics = function () {
  //   var query = "/partial/proxy?datasetDetailsStatistics&dumpFile=" + 
  //   $scope.distributionID + "&topN=" + $scope.detailsTop + "&type=" + $scope.optionDetails.value;
  //   $http.get(query).then(function (response) {
  //     if (typeof response.data.error == 'undefined') {
  //       $scope.modalTopLinks = response.data.distributionList.distributions;
  //       $scope.distributionList = response.data.distributionList;
  //     }
  //   });
  // };








}]);
