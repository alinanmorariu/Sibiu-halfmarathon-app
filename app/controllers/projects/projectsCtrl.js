var projects = angular.module('projects', []);


projects.controller('projectsCtrl', ['$scope', '$http', '$window', function($scope, $http, $window) {

    //GET the list of registered projects
    var getProjectsList = function() {
        $http.get('../api/v1/index.php/projects').success(function(response) {

            $scope.projects = response;
                        $scope.getTotal = function() {
                var total = 0;
                if ($scope.filtered) {
                    for (var i = 0; i < $scope.filtered.length; i++) {
                        var project = $scope.filtered[i];
                        total += parseInt(project.suma_propusa);
                    }
                } else {
                    for (var i = 0; i < $scope.projects.length; i++) {
                        var project = $scope.projects[i];
                        total += parseInt(project.suma_propusa);
                    }
                }
                return total;
            }
        });
    };

    getProjectsList();
    
    $scope.sortType     = 'organizatie'; // set the default sort type
    $scope.sortReverse  = false;  // set the default sort order
  
            /*$scope.search = {};
            $scope.userInput = {};

            $scope.comparisonSignsList = [{
                name: "egala cu"
            }, {
                name: "mai mare decat"
            }, {
                name: "mai mare sau egala cu"
            }, {
                name: "mai mica decat"
            }, {
                name: "mai mica sau egala cu"
            }];

            $scope.comparisonSign = $scope.comparisonSignsList[0];
           
            $scope.applyFilter = function() {

                //filtru pentru toate criteriile, cu exceptia sumei           
            
                    for (prop in $scope.userInput) {
                        $scope.search[prop] = $scope.userInput[prop];
                    }
                
   
                //filtru pentru suma
                /*$scope.sumFilter = function(sum) {
                        return function(item) {
                                    console.log(sum);   
                            if ( ($scope.comparisonSign.name == "mai mare decat" && parseInt(item['suma_propusa']) > parseInt(sum)) || ($scope.comparisonSign.name == "mai mare sau egala cu" && parseInt(item['suma_propusa']) >= parseInt(sum)) || ($scope.comparisonSign.name == "mai mica decat" && parseInt(item['suma_propusa']) < parseInt(sum)) || ($scope.comparisonSign.name == "mai mica sau egala cu" && parseInt(item['suma_propusa']) <= parseInt(sum)) || ($scope.comparisonSign.name == "egala cu" && parseInt(item['suma_propusa']) == parseInt(sum))) {          
                                return true;
                            } else {                
                                return false;
                            }
                        }
                }
                    

                $scope.isCollapsed = true;
                $scope.userInput = {};
            }

            $scope.resetAllFilters = function() {
                $scope.userInput = {};
                
                $scope.sum = {};

                $scope.comparisonSign = $scope.comparisonSignsList[0];
            }*/

    /*$scope.refresh = function() {
        $window.location.reload();
    }*/

    //delete project
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