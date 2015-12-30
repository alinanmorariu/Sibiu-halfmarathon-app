var relay2Runners = angular.module('relay2Runners', []);


relay2Runners.controller('relay2RunnersCtrl', ['$scope', '$http', '$window', 'commonService', function($scope, $http, $window, commonService) {

    //GET the list of registered halfmarathon runners
    var getRelay2RunnersList = function() {
        $http.get('../api/v1/index.php/runners/relay2').success(function(response) {

            
            $scope.relay2Runners = response;
            
            $scope.getTotal = function() {
                var total = 0;
             
                    for (var i = 0; i < $scope.relay2Runners.length; i++) {
                        var runner = $scope.relay2Runners[i];
                        total += parseInt(runner.taxa);
                    }
          
                return total;
            }
    
        });
    };

    getRelay2RunnersList();
    
    $scope.sortType = 'alergatorID';
    $scope.sortReverse = false;

    //delete runners
        $scope.delete = function(id){    
        return commonService.deleteEntity('../api/v1/index.php/runner/', id, 'Sigur doresti sa stergi alergatorul cu ID ', 'Alergatorul a fost sters!');
                                }

    $scope.isCollapsed = true;
}]);
