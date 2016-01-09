var companiesRunners = angular.module('companiesRunners', []);


companiesRunners.controller('companiesRunnersCtrl', ['$scope', '$http', '$window', 'commonService', function($scope, $http, $window, commonService) {

    //GET the list of registered halfmarathon runners
    var getAdultRunnersList = function() {
        $http.get('../api/v1/index.php/runners/companies').success(function(response) {

            
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

    $scope.criteria = ["Companie", "Nume", "Prenume", "Proiect", "Cursa", "Platit"];
    $scope.statusPlati = ["0", "1"];
    $scope.curse = [1, 2, 3, 4];
    $scope.selected = {};
    $scope.selected.criteria = "";
    $scope.selected.name = "";
    $scope.selected.forname = "";
    $scope.selected.project = "";
    $scope.selected.payment = "";
    $scope.selected.companie = "";
    $scope.selected.cursa = "";
    $scope.newRunner.confirmat = 0;
    $scope.newRunner.platit = 0;
    $scope.newRunner.ordine_stafeta = 0;
    
    $scope.clearFilters = function() {
        $scope.selected.criteria = "";
        $scope.selected.name = "";
        $scope.selected.forname = "";
        $scope.selected.project = "";
        $scope.selected.payment = "";
        $scope.selected.companie = "";
        $scope.selected.cursa = "";
    }
}]);