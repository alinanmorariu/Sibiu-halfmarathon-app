var projectsForm = angular.module ('projectsForm', []);


projectsForm.controller('projectsFormCtrl', ['$scope', '$http', '$window', 'SweetAlert', function($scope, $http, $window, SweetAlert) {

    var refresh = function(){		
			$scope.newProject = {};		
	};
	
    
	$scope.addProject = function() {
		$http.post('../api/v1/index.php/projects', $scope.newProject).success(function(response){
            SweetAlert.swal('Proiectul a fost adaugat!', '', 'success');
            refresh();

		}
    )};	
}]);