var adultRunners = angular.module('adultRunners', []);


adultRunners.controller('adultRunnersCtrl', ['$scope', '$http', '$window', 'commonService', function($scope, $http, $window, commonService) {

    //GET the list of registered halfmarathon runners
    var getAdultRunnersList = function() {
        $http.get('../api/v1/index.php/runners/adults').success(function(response) {

            
            $scope.adultRunners = response;
            
            
   //Pagination         
            
                /*$scope.paginatedRunners = []
  ,$scope.currentPage = 1
  ,$scope.numPerPage = 10
  ,$scope.maxSize = 5;
  
  $scope.$watch('currentPage + numPerPage', function() {
    var begin = (($scope.currentPage - 1) * $scope.numPerPage)
    , end = begin + $scope.numPerPage;
    
    $scope.paginatedRunners = $scope.adultRunners.slice(begin, end);
  });*/
            
            $scope.sortType     = 'alergatorID'; 
            $scope.sortReverse  = false;
            
            
            $scope.getTotal = function() {
                var total = 0;
             
                    for (var i = 0; i < $scope.adultRunners.length; i++) {
                        var runner = $scope.adultRunners[i];
                        total += parseInt(runner.taxa);
                    }
          
                return total;
            }
    
        });
    };

    getAdultRunnersList();

    //delete runners
    $scope.delete = function(id){
        
        return commonService.deleteEntity('../api/v1/index.php/runner/', id, 'Sigur doresti sa stergi alergatorul cu ID ', 'Alergatorul a fost sters!');
                                }

    $scope.isCollapsed = true;
}]);

adultRunners.controller('modalAdultRunnerCtrl', ['$scope', '$uibModal', '$http',
    function($scope, $uibModal, $http) {

        $scope.open = function(id, size) {
            $http.get('../api/v1/index.php/runner/' + id).success(function(response) {
                $scope.runner = response;
                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: '../app/views/runners/updateAdultRunnerModal.html',
                    controller: 'ModalInstanceCtrl',
                    id: id,
                    size: size,
                    resolve: {
                        item: function() {
                            return $scope.runner;
                        }
                    }
                });
            });
        }
    }
]);

adultRunners.controller('ModalInstanceCtrl', ['$scope', '$uibModalInstance', 'item', '$http', '$window',
    function($scope, $uibModalInstance, item, $http, $window) {

        $scope.runner = item;

        $scope.save = function() {
            var confirmUpdate = confirm('Sigur doresti sa modifici alergatorul ' + $scope.runner.prenume + ' ' + $scope.runner.nume + '?');
            if (confirmUpdate == true) {
                $http.put('../api/v1/index.php/runner/' + $scope.runner.alergatorID, $scope.runner).success(function(response) {
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