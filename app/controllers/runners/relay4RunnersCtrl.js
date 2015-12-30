var relay4Runners = angular.module('relay4Runners', []);


relay4Runners.controller('relay4RunnersCtrl', ['$scope', '$http', '$window', 'commonService', function($scope, $http, $window, commonService) {

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
        $scope.delete = function(id){    
        return commonService.deleteEntity('../api/v1/index.php/runner/', id, 'Sigur doresti sa stergi alergatorul cu ID ', 'Alergatorul a fost sters!');
                                }

    $scope.isCollapsed = true;
}]);