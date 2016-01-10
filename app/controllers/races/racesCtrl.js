var races = angular.module('races', []);


races.controller('racesCtrl', ['$scope', '$http', '$window', 'commonService', function($scope, $http, $window, commonService) {

    //GET the list of registered races
    var getRacesList = function() {
        $http.get('../api/v1/index.php/races').success(function(response) {

            $scope.races = response;
        });
    };

    getRacesList();
    
    $scope.sortType     = 'cursaID'; // set the default sort type
    $scope.sortReverse  = false;  // set the default sort order
}]);
