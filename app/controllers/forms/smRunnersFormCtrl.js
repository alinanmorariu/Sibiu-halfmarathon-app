var smRunnersForm = angular.module('smRunnersForm', []);


smRunnersForm.controller('smRunnersFormCtrl', ['$scope', '$http', '$window', function($scope, $http, $window) {
            $scope.newRunner = {};
            $scope.newRunner.cursa = "1";
            $scope.newRunner.taxa = "90";
            $scope.newRunner.localitate = "";
            $scope.newRunner.telefon = "";
            $scope.newRunner.record = "";
            $scope.newRunner.tipPlata = "";
            $scope.newRunner.companie = "";
            $scope.newRunner.confirmat = 0;
            $scope.newRunner.platit = 0;
            $scope.newRunner.ordine_stafeta = 0;
            $scope.addRunner = function() {
                $http.post('../api/v1/index.php/runners/adults', $scope.newRunner).success(function(response) {
                    alert('Inscrierea ta a fost inregistrata cu succes! In perioada care urmeaza vei primi pe email detalii legate de participarea ta la Semimaraton Sibiu 2016.');
                    $window.location.reload();
                })
            };

            $scope.categories = ["Feminin", "Masculin"];
            $scope.sizes = ["S", "M", "L", "XL", "XXL"];
            $scope.paymentMethods = ["cash", "online", "transfer"];
            var getProjectsList = function() {                      $http.get('../api/v1/index.php/projects').success(function(response) {

                    $scope.projects = response;

                })};
                getProjectsList();
            }]);