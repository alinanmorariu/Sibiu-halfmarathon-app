var relay4RunnersForm = angular.module('relay4RunnersForm', []);


relay4RunnersForm.controller('relay4RunnersFormCtrl', ['$scope', '$http', '$window', function($scope, $http, $window) {
    
    $scope.categories = ["Feminin", "Masculin"];
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
    $scope.thirdRunner = {};
    $scope.fourthRunner = {};

    $scope.firstRunner.cursa = $scope.secondRunner.cursa = $scope.thirdRunner.cursa = $scope.fourthRunner.cursa = 3;
    $scope.firstRunner.taxa = $scope.secondRunner.taxa = $scope.thirdRunner.taxa = $scope.fourthRunner.taxa = 45;
    $scope.firstRunner.localitate = $scope.secondRunner.localitate = $scope.thirdRunner.localitate = $scope.fourthRunner.localitate = "";
    $scope.firstRunner.telefon = $scope.secondRunner.telefon = $scope.thirdRunner.telefon = $scope.fourthRunner.telefon = "";
    $scope.firstRunner.record = $scope.secondRunner.record = $scope.thirdRunner.record = $scope.fourthRunner.record = "";
    $scope.firstRunner.tipPlata = $scope.secondRunner.tipPlata = $scope.thirdRunner.tipPlata = $scope.fourthRunner.tipPlata = "";
    $scope.firstRunner.companie = $scope.secondRunner.companie = $scope.thirdRunner.companie = $scope.fourthRunner.companie = "";
    $scope.firstRunner.confirmat = $scope.secondRunner.confirmat = $scope.thirdRunner.confirmat = $scope.fourthRunner.confirmat = 0;
    $scope.firstRunner.platit = $scope.secondRunner.platit = $scope.thirdRunner.platit = $scope.fourthRunner.platit = 0;
    $scope.firstRunner.ordine_stafeta = 1;
    $scope.secondRunner.ordine_stafeta = 2;
    $scope.thirdRunner.ordine_stafeta = 3;
    $scope.fourthRunner.ordine_stafeta = 4;
    
    $scope.addRunner = function() {

    $scope.firstRunner.echipa = $scope.secondRunner.echipa = $scope.thirdRunner.echipa = $scope.fourthRunner.echipa = $scope.newRunner.echipa;
    $scope.firstRunner.proiectAles = $scope.secondRunner.proiectAles = $scope.thirdRunner.proiectAles = $scope.fourthRunner.proiectAles = $scope.newRunner.proiectAles;
    console.log($scope.newRunner.proiectAles);

        $scope.relay.push($scope.firstRunner, $scope.secondRunner, $scope.thirdRunner, $scope.fourthRunner);
        
        $http.post('../api/v1/index.php/runners/relay4', $scope.relay).success(function(response) {
            alert('Inscrierea echipei ' + $scope.newRunner.echipa + ' a fost inregistrata cu succes! In perioada care urmeaza veti primi pe email detalii legate de participarea voastra la Semimaraton Sibiu 2016.');
            $window.location.reload();
        })
    }; 
            }]);