main.controller('statsCtrl', ['$scope', '$http', 'generalData', function ($scope, $http, $generalData) {

  $scope.appName = $generalData.appName;
  $scope.serverURL = $generalData.serverURL;
  $scope.dumpFile = "";
  $scope.top = 10;
  $scope.detailsTop = 10;
  $scope.datasetTitle;
  $scope.similarityTableDataset1;
  $scope.similarityTableDataset2;
  $scope.similarityTableDataset2Title;  
  $scope.similarityTableData = [];


  $scope.modalSimilaritiesOptions = [
    { "label": "Number of links", "value": "links" },
    { "label": "Number of links (normalized)", "value": "strength" },
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
  $http.get("/partial/proxy?statistics").then(function (response) {
    if (typeof response.data.error == 'undefined') {
      $scope.stats = response.data.statistics;
    }
  });



  $scope.getDatasetSimilarityStatistics = function () {
    var query = "/partial/proxy?datasetStatistics&dumpFile=" + $scope.dumpFile + "&topN=" + $scope.top + "&type=" + $scope.option.value;
    $http.get(query).then(function (response) {
      if (typeof response.data.error == 'undefined') {
        $scope.modalTopLinks = response.data.distributionList.distributions;
        $scope.datasetTitle = response.data.distributionList.datasetTitle;
        $scope.distributionTitle = response.data.distributionList.distributionTitle;
        $scope.similarityTableDataset1 = response.data.distributionList.distributionID;
      }
    });
  };



  $scope.createSimilarityTable = function (datasetSimilarity2ID, datasetSimilarity2Title) {
    $scope.similarityTableDataset2=datasetSimilarity2ID;
    $scope.similarityTableDataset2Title=datasetSimilarity2Title;
    $scope.similarityTableData = [];
    var query = "/partial/proxy?compareDatasets&compareDataset1=" + $scope.similarityTableDataset1 + "&compareDataset2=" + $scope.similarityTableDataset2 + "&type=" + $scope.option.value +  "&topN=10" ;
    $http.get(query).then(function (response) {
      if (typeof response.data.error == 'undefined') {
        var data = response.data.distributionList.similarityTableData;
        for(var i in data){
          var val = data[i][0];
          var dataset1;
          var dataset2;
          for(var e in data[i][1]){
            dataset1=e;
            dataset2=data[i][1][e];
          }
           $scope.similarityTableData.push({
            "val": val,
            "dataset1": dataset1,
            "dataset2": dataset2,
          }); 
        }
      }
    });   
  }
  
  
  $scope.getDatasetDetailsStatistics = function () {
    var query = "/partial/proxy?datasetDetailsStatistics&dumpFile=" + 
    $scope.dumpFile + "&topN=" + $scope.detailsTop + "&type=" + $scope.optionDetails.value;
    $http.get(query).then(function (response) {
      if (typeof response.data.error == 'undefined') {
        $scope.modalTopLinks = response.data.distributionList.distributions;
        $scope.datasetTitle = response.data.distributionList.datasetTitle;
        $scope.distributionTitle = response.data.distributionList.distributionTitle;
      }
    });
  };








}]);