main.controller('statsCtrl', ['$scope', '$http', 'generalData', function ($scope, $http, $generalData) {

  $scope.appName = $generalData.appName;
  $scope.serverURL = $generalData.serverURL;
  $scope.modalDataset = "";
  $scope.top = 10;
  $scope.datasetTitle;
  $scope.similarityTableDataset1;
  $scope.similarityTableDataset2;
  $scope.similarityTableDataset2Title;  
  $scope.similarityTableData = [];


  $scope.modalOptions = [
    { "label": "Number of links", "value": "links" },
    { "label": "Number of links (nirmalized)", "value": "strength" },
    { "label": "Similarity by predicates", "value": "predicates" },
    { "label": "Similarity by rdf:type", "value": "type" },
    { "label": "Similarity by owl:Class", "value": "class" },
    { "label": "Similarity by rdfs:Subclass", "value": "subclass" },
  ];

  $scope.option = $scope.modalOptions[0];

  $scope.modalTopLinks = {};


  var proxyURL = $generalData.proxyUrl;
  $http.get("/partial/proxy?statistics").then(function (response) {
    if (typeof response.data.error == 'undefined') {
      console.log(response.data);
      $scope.stats = response.data.statistics;
    }
    else {
      console.log("Error! " + response.data.error);
    }
  }, function (response) {
      $scope.apiResponse = "Error: " + response.data;
      $scope.showApiResponse = true;
    });



  $scope.getDatasetSimilarityStatistics = function () {
    var query = "/partial/proxy?datasetStatistics&datasetDistribution=" + $scope.modalDataset + "&datasetTop=" + $scope.top + "&datasetType=" + $scope.option.value;
    console.log(proxyURL);
    $http.get(query).then(function (response) {
      console.log(response.data);
      if (typeof response.data.error == 'undefined') {
        $scope.modalTopLinks = response.data.distributionList.distributions;
        $scope.datasetTitle = response.data.distributionList.datasetTitle;
        $scope.distributionTitle = response.data.distributionList.distributionTitle;
        $scope.similarityTableDataset1 = response.data.distributionList.distributionID;
      }
      else {
        console.log("Error! " + response.data.error);
      }
    }, function (response) {
        $scope.apiResponse = "Error: " + response.data;
        $scope.showApiResponse = true;
      });
  };



  $scope.createSimilarityTable = function (datasetSimilarity2ID, datasetSimilarity2Title) {
    
    $scope.similarityTableDataset2=datasetSimilarity2ID;
    $scope.similarityTableDataset2Title=datasetSimilarity2Title;
    $scope.similarityTableData = [];
    
    var query = "/partial/proxy?compareDatasets&dataset1=" + $scope.similarityTableDataset1 + "&dataset2=" + $scope.similarityTableDataset2 + 
        "&datasetType=" + $scope.option.value +  "&top=10" ;
        
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
        
        // $scope.similarityTableData = response.data.distributionList.similarityTableData;
      }
      else {
        console.log("Error! " + response.data.error);
      }
    }, function (response) {
        $scope.apiResponse = "Error: " + response.data;
        $scope.showApiResponse = true;
      });
      
  }





}]);