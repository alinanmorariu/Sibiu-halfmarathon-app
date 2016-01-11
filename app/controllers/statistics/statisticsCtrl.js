var statistics = angular.module('statistics', []);


statistics.controller('statisticsCtrl', ['$scope', '$http', '$window', 'commonService', function($scope, $http, $window, commonService) {

    $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales", "4", "5", "6", "7"];
    $scope.data = [300, 500, 100, 400, 600, 700, 800];
    $scope.options = {
        animationEasing: "easeInCirc",
        scaleLabel: "<%=value%>"
    };


    //GET the list of registered halfmarathon runners
    var getRunnersList = function() {
        $http.get('../api/v1/index.php/runners/all').success(function(response) {


            $scope.runners = response;

            var getProjectsList = function() {
                $http.get('../api/v1/index.php/projects').success(function(response) {

                    $scope.projects = response;

                })
            };
            getProjectsList();

            var getRacesList = function() {
                $http.get('../api/v1/index.php/races').success(function(response) {

                    $scope.races = response;
                });
            };

            getRacesList();
            
            var getSupportersList = function() {
        $http.get('../api/v1/index.php/supporters').success(function(response) {


            $scope.supporters = response;


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
        });
    };

    getSupportersList();

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

    getRunnersList();


}]);