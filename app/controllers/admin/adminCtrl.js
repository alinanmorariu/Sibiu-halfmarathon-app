var admin = angular.module('admin', []);


admin.controller('adminCtrl', ['$scope', '$http', '$window', 'commonService', function($scope, $http, $window, commonService) {
    var getRunnersList = function() {
        $http.get('../api/v1/index.php/runners/all').success(function(response) {

            
            $scope.runners = response;
            
            $scope.filtered = [];
            
            $scope.getTotal = function() {
                var total = 0;
                    for (var i = 0; i < $scope.filtered.length; i++) {
                        var runner = $scope.filtered[i];
                        total += parseInt(runner.taxa);
                    }
          
                return total;
            }
            
        });
    };

    getAdultRunnersList();

    var getProjectsList = function() {
        $http.get('../api/v1/index.php/projects').success(function(response) {

            $scope.projects = response;

        })
    };
    getProjectsList();

}]);
