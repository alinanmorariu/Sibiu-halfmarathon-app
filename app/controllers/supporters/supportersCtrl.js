var supporters = angular.module('supporters', []);


supporters.controller('supportersCtrl', ['$scope', '$http', '$window', 'commonService', function($scope, $http, $window, commonService) {

    //GET the list of registered supporters
    var getSupportersList = function() {
        $http.get('../api/v1/index.php/supporters').success(function(response) {

            
            $scope.supporters = response;
            
            $scope.sortType     = 'sustinatorID'; 
            $scope.sortReverse  = false;
            
            $scope.filtered = [];
            
            $scope.getTotal = function() {
                var total = 0;
                    for (var i = 0; i < $scope.filtered.length; i++) {
                        var supporter = $scope.filtered[i];
                        total += parseInt(supporter.promisi);
                    }
          
                return total;
            }
            
            $scope.getTotalPayed = function() {
                var total = 0;
                    for (var i = 0; i < $scope.filtered.length; i++) {
                        var supporter = $scope.filtered[i];
                        total += parseInt(supporter.suma_platita);
                    }
          
                return total;
            }
            
            $scope.getTotalNotPayed = function() {
                var total = 0;
                    for (var i = 0; i < $scope.filtered.length; i++) {
                        var supporter = $scope.filtered[i];
                        total += parseInt(supporter.promisi) - parseInt(supporter.suma_platita);
                    }
          
                return total;
            }
            
            
            $scope.export = function() {
                return commonService.exportExcel('"suporteri.xlsx"', $scope.filtered);
            }
    
        });
    };

    getSupportersList();

    //delete supporters
    $scope.delete = function(id){
        
        return commonService.deleteEntity('../api/v1/index.php/supporter/', id, 'Sigur doresti sa stergi sustinatorul cu ID ', 'Sustinatorul a fost sters!');
                                }

    $scope.criteria = ["Nume", "Prenume", "Sustin", "Fixa", "Promisi", "Platiti", "Tip plata", "Anonim", "Contact organzatie"];
    $scope.fixedSums = [0, 1];
    $scope.anonims = [0, 1];
    $scope.contactOrgs = [0, 1];
    $scope.paymentMethods = ["cash", "online", "transfer"];
    $scope.payments = [0, 1];
    $scope.selected = {};
    $scope.selected.criteria = "";
    $scope.selected.name = "";
    $scope.selected.forname = "";
    $scope.selected.support = "";
    $scope.selected.fixedSum = "";
    $scope.selected.promised = "";
    $scope.selected.paymentMethod = "";
    $scope.selected.payment = "";
    $scope.selected.anonim = "";
    $scope.selected.contactOrg = "";
    
    
    $scope.clearFilters = function() {
        $scope.selected.criteria = "";
        $scope.selected.name = "";
        $scope.selected.forname = "";
        $scope.selected.fixedSum = "";
        $scope.selected.promised = "";
        $scope.selected.paymentMethod = "";
        $scope.selected.payment = "";
        $scope.selected.anonim = "";
        $scope.selected.contactOrg = "";
        $scope.selected.support = "";
    }
}]);

supporters.controller('modalSupporterCtrl', ['$scope', '$uibModal', '$http',
    function($scope, $uibModal, $http) {

        $scope.open = function(id, size) {
            $http.get('../api/v1/index.php/supporter/' + id).success(function(response) {
                $scope.supporter = response;
                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: '../app/views/supporters/updateSupporterModal.html',
                    controller: 'ModalInstanceCtrl',
                    id: id,
                    size: size,
                    resolve: {
                        item: function() {
                            return $scope.supporter;
                        }
                    }
                });
            });
        }
    }
]);

supporters.controller('ModalInstanceCtrl', ['$scope', '$uibModalInstance', 'item', '$http', '$window',
    function($scope, $uibModalInstance, item, $http, $window) {
        
        $scope.fixedSums = [0, 1];
        $scope.payments = [0, 1];
        $scope.anonims = [0, 1];
        $scope.contactOrgs = [0, 1];
        $scope.paymentMethods = ["cash", "online", "transfer"];
        
        $scope.supporter = item;

        $scope.save = function() {
            var confirmUpdate = confirm('Sigur doresti sa modifici sustinatorul ' + $scope.supporter.prenume + ' ' + $scope.supporter.nume + '?');
            if (confirmUpdate == true) {
                $http.put('../api/v1/index.php/supporter/' + $scope.supporter.sustinatorID, $scope.supporter).success(function(response) {
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