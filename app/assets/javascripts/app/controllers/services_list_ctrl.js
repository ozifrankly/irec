angular.module("IREC").controller("ServiceListCtrl",["$scope", "$http", function($scope, $http){

  $scope.pageSize = 25;
  $scope.name = "";
  $scope.id = 0;
  $http.get("services.json").success(function(data){
    $scope.page = data;
  });


  $scope.setPage = function(nextPage){
    $http.get("services.json", { params: { page: nextPage.current_page } }).success(function(data){
      $scope.page = data;
    });
  }

  $scope.save = function(){
    if($scope.id == 0){
      saveservices();
    }else{
      updateservices();
    }
  }

  $scope.edit = function(name, id){
    $scope.name = name;
    $scope.id = id;
  }

  var saveservices = function(){
    $http.post("services.json", { service: { name: $scope.name }} )
  .success(function(data){
    $scope.page.services.unshift(data);
    $scope.name = "";
  });
  }

  var updateservices = function(){
    $http.put("services/"+$scope.id+".json", { service: { name: $scope.name }} )
  .success(function(data){
    var services = $scope.page.services;
    for(index in $scope.page.services){
       if(services[index].id == $scope.id){
          services[index].name = $scope.name;
          break;
      }
    }  
    $scope.name = "";
    $scope.id = 0;
  });
  }
}]);
