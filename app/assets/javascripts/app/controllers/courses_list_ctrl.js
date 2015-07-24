angular.module("IREC").controller("CourseListCtrl",["$scope", "$http", function($scope, $http){

  $scope.pageSize = 25;
  $scope.name = "";
  $scope.id = 0;
  $http.get("courses.json").success(function(data){
    $scope.page = data;
  });


  $scope.setPage = function(nextPage){
    $http.get("courses.json", { params: { page: nextPage.current_page } }).success(function(data){
      $scope.page = data;
    });
  }

  $scope.save = function(){
    if($scope.id == 0){
      savecourses();
    }else{
      updatecourses();
    }
  }

  $scope.edit = function(name, service, id){
    $scope.name = name;
    $scope.service_id = ''+service+'';
    $scope.id = id;
  }

  var savecourses = function(){
    $http.post("courses.json", { course: { name: $scope.name, service_id: $scope.service_id }} )
  .success(function(data){
    $scope.page.courses.unshift(data);
    $scope.name = "";
    $scope.service_id = '';
  });
  }

  var updatecourses = function(){
    $http.put("courses/"+$scope.id+".json", { course: { name: $scope.name, service_id: $scope.service_id }} )
  .success(function(data){
    var courses = $scope.page.courses;
    for(index in $scope.page.courses){
       if(courses[index].id == $scope.id){
          courses[index].name = $scope.name;
          courses[index].service= data.service;
          break;
      }
    }  
    $scope.name = "";
    $scope.service_id = '';
    $scope.id = 0;
  });
  }
}]);
