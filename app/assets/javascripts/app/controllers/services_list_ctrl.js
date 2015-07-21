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

  $scope.edit = function(name, service_type, id){
    $scope.name = name;
    $scope.service_type_id = ""+service_type+"";
    $scope.id = id;
  }

  var saveservices = function(){
    $http.post("services.json", { service: { name: $scope.name, service_type_id: $scope.service_type_id }} )
  .success(function(data){
    $scope.page.services.unshift(data);
    $scope.name = "";
  });
  }

  var updateservices = function(){
    $http.put("services/"+$scope.id+".json", { service: { name: $scope.name, service_type_id: $scope.service_type_id }} )
  .success(function(data){
    var services = $scope.page.services;
    for(index in $scope.page.services){
       if(services[index].id == $scope.id){
          services[index].name = $scope.name;
          services[index].service_type.id = data.service_type.id;
          services[index].service_type.name = data.service_type.name;
          break;
      }
    }  
    $scope.name = "";
    $scope.service_type_id = '0';
    $scope.id = 0;
  });
  }
}]);
