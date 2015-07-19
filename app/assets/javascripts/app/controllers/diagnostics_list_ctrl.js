angular.module("IREC").controller("DiagnosticListCtrl",["$scope", "$http", function($scope, $http){

  $scope.pageSize = 25;
  $scope.description = "";
  $scope.id = 0;
  $http.get("diagnostics.json").success(function(data){
    $scope.page = data;
  });


  $scope.setPage = function(nextPage){
    $http.get("diagnostics.json", { params: { page: nextPage.current_page } }).success(function(data){
      $scope.page = data;
    });
  }

  $scope.save = function(){
    if($scope.id == 0){
      saveDiagnostics();
    }else{
      updateDiagnostics();
    }
  }

  $scope.edit = function(description, id){
    $scope.description = description;
    $scope.id = id;
  }

  var saveDiagnostics = function(){
    $http.post("diagnostics.json", { diagnostic: { description: $scope.description }} )
  .success(function(data){
    $scope.page.diagnostics.unshift(data);
    $scope.description = "";
  });
  }

  var updateDiagnostics = function(){
    $http.put("diagnostics/"+$scope.id+".json", { diagnostic: { description: $scope.description }} )
  .success(function(data){
    var diagnostics = $scope.page.diagnostics;
    for(index in $scope.page.diagnostics){
       if(diagnostics[index].id == $scope.id){
          diagnostics[index].description = $scope.description;
          break;
      }
    }  
    $scope.description = "";
    $scope.id = 0;
  });
  }
}]);
