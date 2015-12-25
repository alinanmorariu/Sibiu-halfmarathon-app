var relay2RunnersForm = angular.module('relay2RunnersForm', []);


relay2RunnersForm.controller('relay2RunnersFormCtrl', ['$scope', '$http', '$window', function($scope, $http, $window) {
    
    
    $scope.categories = ["feminin", "masculin"];
    $scope.sizes = ["S", "M", "L", "XL", "XXL"];
    $scope.paymentMethods = ["cash", "online", "transfer"];

    var getProjectsList = function() {
        $http.get('../api/v1/index.php/projects').success(function(response) {

            $scope.projects = response;

        })
    };
    getProjectsList();

    $scope.relay = [];

    $scope.newRunner = {};
    $scope.firstRunner = {};
    $scope.secondRunner = {};

    $scope.firstRunner.cursa = $scope.secondRunner.cursa = 4;
    $scope.firstRunner.taxa = $scope.secondRunner.taxa = 60;
    $scope.firstRunner.localitate = $scope.secondRunner.localitate = "";
    $scope.firstRunner.telefon = $scope.secondRunner.telefon = "";
    $scope.firstRunner.record = $scope.secondRunner.record = "";
    $scope.firstRunner.tipPlata = $scope.secondRunner.tipPlata = "";
    $scope.firstRunner.companie = $scope.secondRunner.companie = "";
    $scope.firstRunner.ordine_stafeta = 1;
    $scope.secondRunner.ordine_stafeta = 2;
    
    $scope.addRunner = function() {

    $scope.firstRunner.echipa = $scope.secondRunner.echipa = $scope.newRunner.echipa;
    $scope.firstRunner.proiectAles = $scope.secondRunner.proiectAles = $scope.newRunner.proiectAles;
    console.log($scope.newRunner.proiectAles);

        $scope.relay.push($scope.firstRunner, $scope.secondRunner);
        $http.post('../api/v1/index.php/runners/relay2', $scope.relay).success(function(response) {
            alert('Inscrierea echipei ' + $scope.newRunner.echipa + ' a fost inregistrata cu succes! In perioada care urmeaza veti primi pe email detalii legate de participarea voastra la Semimaraton Sibiu 2016.');
            $window.location.reload();
        })
    };


}]);