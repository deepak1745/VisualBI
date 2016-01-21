var hotChocolate = angular.module('hotChocolate');
hotChocolate.controller('queryController', function($scope, $http, $rootScope,GraphService,$uibModal,$compile) {
  $scope.items = [{
                    label: 'Measures',
                    list: []
                  },
                  {
                    label: 'Columns',
                    list: []
                  }, {
                    label: 'Rows',
                    list: []
                  }, {
                    label: 'Filters',
                    list: []
                  }];
  $scope.deleteItem = function(childIndex, parentIndex) {
    $scope.items[parentIndex].list.splice(childIndex, 1);
  };
  $scope.sortList = function(event, ui, listIdx) {
    var itemArr = $scope.items[listIdx].list,
        currItem = itemArr[itemArr.length-1];
    delete currItem.children;
    itemArr.splice(itemArr.length-1, 1);
    var isValidationError = false;
    for(var h=1; h < 4; h++) {
      if(h !== listIdx) {
        for(var g=0; g < $scope.items[h].list.length; g++) {
          if($scope.items[h].list[g].hierName === currItem.hierName) {
            isValidationError = true;
            break;
          }
        }
      }
    }
    if(!isValidationError && itemArr.indexOf(currItem) == -1) {
      itemArr.push(currItem);
      for(var i=0; i < itemArr.length-1; i++) {
        if(itemArr[i].hierName == currItem.hierName) {
          if(itemArr[i].levelIdx > currItem.levelIdx) {
            itemArr.splice(i, 0, currItem);
          }
          else {
            for(var j=i; itemArr[j].hierName == currItem.hierName; j++) {
              if(itemArr[j].levelIdx >= currItem.levelIdx) {
                break;
              }
            }
            itemArr.splice(j, 0, currItem);
          }
          itemArr.splice(itemArr.length-1, 1);
          break;
        }
      }
    }
  };
  $scope.queryList = [];

  $rootScope.$watch('queryList', function(newValue, oldValue){
    $scope.queryList = newValue;
  });

  $scope.querySaveMessage = "";
  $scope.showModalAlert = false;
  $scope.hideMe = function(list) {
    return list.length > 0;
  };

  $scope.mdxQuery = "";
  $scope.executeQueryData = {};
  $scope.graphArray = [];
  $scope.newQueryName = "";
  $scope.isMdxInputError = false;
  $scope.mdxInputErrorMessage = "MDX input error.";
  $rootScope.graphArray = [];

  $scope.retrieveQuery = function(idx) {
    var query = $scope.queryList[idx];
    console.log(query);
      $rootScope.selectedRetrieveQuery = true;
      $scope.items[0].list = query.onColumns;
      $scope.items[1].list = query.onRows;
      $scope.items[2].list = query.onFilters;
      if(query.connectionData.dataSource === $rootScope.DataSourceName ||
          query.connectionData.catalog === $rootScope.CatalogName ||
            query.connectionData.cube === $rootScope.CubeName){
        $rootScope.selectedRetrieveQuery = false;
      }
      $rootScope.$broadcast('retrieveQueryEvent', query.connectionData);
  };
  $scope.$on('resetQueryData', function(event) {
    $scope.items[0].list = [];
    $scope.items[1].list = [];
    $scope.items[2].list = [];
    // $( "#dataTableBody tr" ).replaceWith( "" );
  });
  $scope.open = function(){
      var modalInstance = $uibModal.open({
         animation: $scope.animationsEnabled,
         templateUrl: 'saveQuery.html',
         controller: 'SaveQryModalCtrl',
         resolve: {
           items: function(){
             return $scope.items;
           },
           queryList: function(){
             return $scope.queryList;
           },
           mdxQuery: function(){
             return $scope.mdxQuery;
           }
         }
       });
    modalInstance.result.then(function(queryList){
      console.log(queryList);
      $scope.queryList = queryList;
    });
     };
 $scope.toggleAnimation = function () {
  $scope.animationsEnabled = !$scope.animationsEnabled;
 };
  //Show Graph Column function
  $scope.showGraphColumn = function() {
    console.log("entered showGraphColumn");
    if(($("."+"miniGraph"+"").length) === 0){
        $("#row0").prev().append("<td class="+"miniGraph"+"><span class='graphIcon'>"+"miniGraph"+"</span></td>");

        //$scope.graphArray = graphArray;
        for(var index in $scope.graphArray) {
          console.log($scope.graphArray);
          var dataset = $scope.graphArray;
          console.log(dataset);
          $rootScope.graphArray = $scope.graphArray;
          $("#row"+index).append($compile("<td class="+"miniGraph"+"><mini-graphs index-passed="+index+" "+"my-set="+'graphArray'+"></mini-graphs></td>")($scope));
            //GraphService.renderMiniGraph(graphArray[index],'#row'+index+ ' '+'td.'+"miniGraph"+ ' ' +'span.graphIcon',index);

        }
      }
      else {
        $("."+"miniGraph"+"").toggle();
      }
  };

  //Show Modal Graph in Modal Window
  $scope.openModalGraph = function(indexPassed) {
    var modalInstance = $uibModal.open({
      templateUrl : 'modalGraph.html',
      controller : 'ModalGraphController',
      indexPassed : indexPassed,
      //data : $scope.graphArray,
      resolve : {
        graphData : function() {
          return $rootScope.graphArray;
        },

        index : function() {
          return indexPassed;
        }
      }
    });
  };

});
