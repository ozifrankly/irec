angular.module("IREC").controller("ServiceTypeListCtrl",["$scope", "$http", function($scope, $http){

  $scope.pageSize = 25;
  $scope.name = "";
  $scope.id = 0;
  $http.get("service_types.json").success(function(data){
    $scope.page = data;
  });


  $scope.setPage = function(nextPage){
    $http.get("service_types.json", { params: { page: nextPage.current_page } }).success(function(data){
      $scope.page = data;
    });
  }

  $scope.save = function(){
    if($scope.id == 0){
      saveservice_types();
    }else{
      updateservice_types();
    }
  }

  $scope.edit = function(name, id){
    $scope.name = name;
    $scope.id = id;
  }

  var saveservice_types = function(){
    $http.post("service_types.json", { service_type: { name: $scope.name }} )
  .success(function(data){
    $scope.page.service_types.unshift(data);
    $scope.name = "";
  });
  }

  var updateservice_types = function(){
    $http.put("service_types/"+$scope.id+".json", { service_type: { name: $scope.name }} )
  .success(function(data){
    var service_types = $scope.page.service_types;
    for(index in $scope.page.service_types){
       if(service_types[index].id == $scope.id){
          service_types[index].name = $scope.name;
          break;
      }
    }  
    $scope.name = "";
    $scope.id = 0;
  });
  }
}]);
