var companyRunnersForm = angular.module('companyRunnersForm', []);


companyRunnersForm.controller('companyRunnersFormCtrl', ['$scope', '$http', '$window', function($scope, $http, $window) {
            $scope.companyRunners = [];
            $scope.companyRunners.telefon = "";        
    
            $scope.addRunners = function() {
                $http.post('../api/v1/index.php/runners/company', $scope.companyRunners).success(function(response) {
                    alert('Inscrierea alergatorilor a fost inregistrata cu succes!');
                    $window.location.reload();
                })
            };

            }]);