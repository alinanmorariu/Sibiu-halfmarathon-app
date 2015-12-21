var projectsForm = angular.module ('projectsForm', []);


projectsForm.controller('projectsFormCtrl', ['$scope', '$http', '$window', function($scope, $http, $window) {

	$scope.addProject = function() {
		$http.post('../api/v1/index.php/projects', $scope.newProject).success(function(response){
			alert('Proiectul a fost adaugat!');
		    $window.location.reload();	
		}
    )};	
}]);