var relay4Runners = angular.module('relay4Runners', []);


relay4Runners.controller('relay4RunnersCtrl', ['$scope', '$http', '$window', function($scope, $http, $window) {

    //GET the list of registered halfmarathon runners
    var getRelay4RunnersList = function() {
        $http.get('../api/v1/index.php/runners/relay4').success(function(response) {

            
            $scope.relay4Runners = response;
            
            $scope.getTotal = function() {
                var total = 0;
             
                    for (var i = 0; i < $scope.relay4Runners.length; i++) {
                        var runner = $scope.relay4Runners[i];
                        total += parseInt(runner.taxa);
                    }
          
                return total;
            }
    
        });
    };

    getRelay4RunnersList();
    
    $scope.sortType = "alergatorID";
    $scope.sortReverse = false;

    //delete runners
    $scope.delete = function(id) {
        var confirmDeletion = confirm('Sigur doresti sa stergi proiectul ' + id + '?');
        if (confirmDeletion == true) {
            $http.delete('../api/v1/index.php/project/' + id).success(function(response) {
                alert('Proiectul a fost sters!');
                $window.location.reload();
            })
            return true;
        } else {
            return false;
        }
    };

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