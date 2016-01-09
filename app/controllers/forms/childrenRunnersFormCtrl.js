var childrenRunnersForm = angular.module('childrenRunnersForm', []);


smRunnersForm.controller('childrenRunnersFormCtrl', ['$scope', '$http', '$window', function($scope, $http, $window) {
            $scope.newRunner = {};
            $scope.newRunner.taxa = "15";
            $scope.newRunner.localitate = "";
            $scope.newRunner.telefon = "";
            $scope.newRunner.record = "";
            $scope.newRunner.tipPlata = "";
            $scope.newRunner.confirmat = 0;
            $scope.newRunner.platit = 0;
            $scope.newRunner.ordine_stafeta = 0;
            $scope.newRunner.cursa = "";
            $scope.addRunner = function() {
                $http.post('../api/v1/index.php/runners/children', $scope.newRunner).success(function(response) {
                    alert('Inscrierea ta a fost inregistrata cu succes! In perioada care urmeaza vei primi pe email detalii legate de participarea ta la Semimaraton Sibiu 2016.');
                    $window.location.reload();
                })
            };

            $scope.categories = ["Feminin", "Masculin"];
            $scope.races = [{"raceID":"5", "raceName":"Cursa Copiilor - 4-6 ani"}, {"raceID":"6", "raceName":"Cursa Copiilor - 7-9 ani"}, {"raceID":"7", "raceName":"Cursa Copiilor - 10-12 ani"}];
            $scope.sizes = ["S", "M", "L", "XL", "XXL"];
            $scope.paymentMethods = ["cash", "online", "transfer"];
            var getProjectsList = function() {                      
                $http.get('../api/v1/index.php/projects').success(function(response) {

                    $scope.projects = response;

                })};
                getProjectsList();
            }]);