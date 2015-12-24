var crossRunners = angular.module('crossRunners', []);


crossRunners.controller('crossRunnersCtrl', ['$scope', '$http', '$window', 'commonService', function($scope, $http, $window, commonService) {

    //GET the list of registered halfmarathon runners
    var getCrossRunnersList = function() {
        $http.get('../api/v1/index.php/runners/cross').success(function(response) {

            
            $scope.crossRunners = response;
            
            $scope.getTotal = function() {
                var total = 0;
             
                    for (var i = 0; i < $scope.crossRunners.length; i++) {
                        var runner = $scope.crossRunners[i];
                        total += parseInt(runner.taxa);
                    }
          
                return total;
            }
    
        });
    };

    getCrossRunnersList();
    
    $scope.sortType = "alergatorID";
    $scope.sortReverse = false;

    //delete runners
        $scope.delete = function(id){    
        return commonService.deleteEntity('../api/v1/index.php/runner/', id, 'Sigur doresti sa stergi alergatorul cu ID ', 'Alergatorul a fost sters!');
                                }
    $scope.isCollapsed = true;
}]);

projects.controller('ModalDemoCtrl', ['$scope', '$uibModal', '$http',
    function($scope, $uibModal, $http) {

        $scope.open = function(id, size) {
            $http.get('../api/v1/index.php/project/' + id).success(function(response) {
                $scope.project = response;
                console.log('proiectul' + $scope.project.proiectID);
                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: '../app/views/projects/updateProjectModal.html',
                    controller: 'ModalInstanceCtrl',
                    id: id,
                    size: size,
                    resolve: {
                        item: function() {
                            return $scope.project;
                        }
                    }
                });
            });
        }
    }
]);

projects.controller('ModalInstanceCtrl', ['$scope', '$uibModalInstance', 'item', '$http', '$window',
    function($scope, $uibModalInstance, item, $http, $window) {

        $scope.project = item;

        $scope.save = function() {
            var confirmUpdate = confirm('Sigur doresti sa modifici proiectul ' + $scope.project.proiect + '?');
            if (confirmUpdate == true) {
                $http.put('../api/v1/index.php/project/' + $scope.project.proiectID, $scope.project).success(function(response) {
                    alert('Modificarile au fost salvate!');
                    $window.location.reload();
                })
                return true;
            } else {
                return false;
            }
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
]);