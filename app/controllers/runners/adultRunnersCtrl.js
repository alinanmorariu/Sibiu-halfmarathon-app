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
            
            $scope.filtered = [];
            
            $scope.getTotal = function() {
                var total = 0;
                    for (var i = 0; i < $scope.filtered.length; i++) {
                        var runner = $scope.filtered[i];
                        total += parseInt(runner.taxa);
                    }
          
                return total;
            }
            
            $scope.export = function() {
                return commonService.exportExcel('"alergatoriAdulti.xlsx"', $scope.filtered);
            }
    
        });
    };

    getAdultRunnersList();

    //delete runners
    $scope.delete = function(id){
        
        return commonService.deleteEntity('../api/v1/index.php/runner/', id, 'Sigur doresti sa stergi alergatorul cu ID ', 'Alergatorul a fost sters!');
                                }

    $scope.isCollapsed = true;
    var getProjectsList = function() {
        $http.get('../api/v1/index.php/projects').success(function(response) {

            $scope.projects = response;

        })
    };
    getProjectsList();

    $scope.criteria = ["Nume", "Prenume", "Proiect", "Cursa", "Platit", "Tip plata"];
    $scope.statusPlati = ["0", "1"];
    $scope.races = ["1", "2", "3", "4"];
    $scope.paymentMethods = ["cash", "online", "transfer", "sponsor", "voucher"];
    $scope.selected = {};
    $scope.selected.criteria = "";
    $scope.selected.name = "";
    $scope.selected.forname = "";
    $scope.selected.project = "";
    $scope.selected.payment = "";
    $scope.selected.paymentMethod = "";
    $scope.selected.cursa = "";
    
    $scope.clearFilters = function() {
        $scope.selected.criteria = "";
        $scope.selected.name = "";
        $scope.selected.forname = "";
        $scope.selected.project = "";
        $scope.selected.payment = "";
        $scope.selected.paymentMethod = "";
        $scope.selected.cursa = "";
    }
}]);

adultRunners.controller('modalAdultRunnerCtrl', ['$scope', '$uibModal', '$http',
    function($scope, $uibModal, $http) {

        $scope.open = function(id, size) {
            $http.get('../api/v1/index.php/runner/' + id).success(function(response) {
                $scope.runner = response;
                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: '../app/views/runners/updateAdultRunnerModal.html',
                    controller: 'ModalInstanceRunnerCtrl',
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

adultRunners.controller('ModalInstanceRunnerCtrl', ['$scope', '$uibModalInstance', 'item', '$http', '$window',
    function($scope, $uibModalInstance, item, $http, $window) {
        
        $scope.categories = ["Feminin", "Masculin"];
        $scope.sizes = ["S", "M", "L", "XL", "XXL"];
        $scope.paymentMethods = ["cash", "online", "transfer", "sponsor", "voucher"];
        $scope.confirmation = [0, 1];
        $scope.races = ["1", "2", "3", "4"];
        var getProjectsList = function() {                      
            $http.get('../api/v1/index.php/projects').success(function(response) {
                    $scope.projects = response;
            })};
        getProjectsList();
        
        $scope.changeConfirmation = function() {
            $scope.runner.confirmat = $scope.runner.platit;
        }

        $scope.changeTax = function() {
            if($scope.runner.tipPlata != "voucher"){
                if($scope.runner.cursa === "1") {
                    $scope.runner.taxa = 90;
                    console.log($scope.runner.cursa + $scope.runner.taxa);
                }
                else if($scope.runner.cursa === "2") {
                    $scope.runner.taxa = 45;
                    console.log($scope.runner.cursa + $scope.runner.taxa);
                }
                else if($scope.runner.cursa === "3") {
                    $scope.runner.taxa = 45;
                    console.log($scope.runner.cursa + $scope.runner.taxa);
                }
                else if($scope.runner.cursa === "4") {
                    $scope.runner.taxa = 60;
                    console.log($scope.runner.cursa + $scope.runner.taxa);
                }
            }
            else {
                $scope.runner.taxa = 0;
            }
        }

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