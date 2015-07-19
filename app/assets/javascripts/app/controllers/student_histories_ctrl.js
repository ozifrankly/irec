angular.module("IREC").controller("StudentHistoriesListCtrl",["$scope", "$http", function($scope, $http){

  $scope.pageSize = 25;
  $scope.newHistory = {};
  $http.get("student_histories.json").success(function(data){
    $scope.page = data;
  });


  $scope.setPage = function(nextPage){
    $http.get("student_histories.json", { params: { page: nextPage.current_page } }).success(function(data){
      $scope.page = data;
    });
  }

  $scope.saveNewHistory = function(){
    $http.post("student_histories.json", { student_history: { title: $scope.newHistory.title, description: $scope.newHistory.description }} )
  .success(function(data){
    $scope.page.student_histories.unshift(data);
    $scope.newHistory = {};
  });
  }
}]);
