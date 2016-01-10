var allRunners = angular.module('allRunners', []);


allRunners.controller('allRunnersCtrl', ['$scope', '$http', '$window', 'commonService', function($scope, $http, $window, commonService) {

    //GET the list of registered halfmarathon runners
    var getAllRunnersList = function() {
        $http.get('../api/v1/index.php/runners/all').success(function(response) {

            
            $scope.runners = response;
            
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
                return commonService.exportExcel('"alergatori.xlsx"', $scope.filtered);
            }
    
        });
    };

    getAllRunnersList();
    
    $scope.isCollapsed = true;
    var getProjectsList = function() {
        $http.get('../api/v1/index.php/projects').success(function(response) {

            $scope.projects = response;

        })
    };
    getProjectsList();

    $scope.criteria = ["Nume", "Prenume", "Proiect", "Cursa", "Platit", "Tip plata"];
    $scope.statusPlati = ["0", "1"];
    $scope.races = ["1", "2", "3", "4", "5", "6", "7"];
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