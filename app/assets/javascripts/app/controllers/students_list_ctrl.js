angular.module("IREC").controller("StudentsListCtrl",["$scope", "$http", function($scope, $http){

	$scope.pageSize = 25;
	$http.get("students.json").success(function(data){
		$scope.page = data;
	});

	$scope.search = function(){
		$http.get("students.json", { params: { q: $scope.query } }).success(function(data){
			$scope.page = data;
		});
	}

	$scope.setPage = function(nextPage){
		$http.get("students.json", { params: { q: $scope.query, page: nextPage.current_page } }).success(function(data){
			$scope.page = data;
		});
	}
}]);
