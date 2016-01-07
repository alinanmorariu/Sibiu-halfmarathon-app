var crossRunners = angular.module('crossRunners', []);


crossRunners.controller('crossRunnersCtrl', ['$scope', '$http', '$window', 'commonService', function($scope, $http, $window, commonService) {

    //GET the list of registered halfmarathon runners
    var getCrossRunnersList = function() {
        $http.get('../api/v1/index.php/runners/cross').success(function(response) {

            
            $scope.crossRunners = response;
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
                return commonService.exportExcel('"alergatoriCros.xlsx"', $scope.filtered);
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
    var getProjectsList = function() {
        $http.get('../api/v1/index.php/projects').success(function(response) {

            $scope.projects = response;

        })
    };
    getProjectsList();

    $scope.criteria = ["Nume", "Prenume", "Proiect", "Platit", "Tip plata"];
    $scope.statusPlati = ["0", "1"];
    $scope.paymentMethods = ["cash", "online", "transfer", "sponsor", "voucher"];
    $scope.selected = {};
    $scope.selected.criteria = "";
    $scope.selected.name = "";
    $scope.selected.forname = "";
    $scope.selected.project = "";
    $scope.selected.payment = "";
    $scope.selected.paymentMethod = "";
    
    $scope.clearFilters = function() {
        $scope.selected.criteria = "";
        $scope.selected.name = "";
        $scope.selected.forname = "";
        $scope.selected.project = "";
        $scope.selected.payment = "";
        $scope.selected.paymentMethod = "";
    }
}]);