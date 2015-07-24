angular.module("IREC").controller("CourseShowCtrl",["$scope", "$http", function($scope, $http){

  var course_id = 0;

  $scope.init = function(course){
    course_id = course;
    $http.get(course_id+"/students.json").success(function(data){
      $scope.students = data;
    });
  }

  $scope.save = function(){
    $http.post(course_id+"/addstudent/"+$scope.identifier+".json").success(function(data){
      $scope.students.push(data);
    });
  }

  $scope.remove = function(id){
    for(index in $scope.students){
      if($scope.students[index].id === id){
        $http.delete(course_id+"/removestudent/"+id).success(function(){
          delete $scope.student[index];
        });
        break;
      }
    }
  }
}]);
