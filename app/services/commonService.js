var commonService = angular.module('commonService', []);

commonService.factory('commonService', ['$route', '$http', '$window', 'SweetAlert', function($route, $http, $window, SweetAlert) {
    return {

        deleteEntity: function(endpoint, id, confirmMessage, confirmationMessage, cancelationMessage) {
            
            SweetAlert.swal({
                    title: confirmMessage + id + '?',
                    text: "",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Da, sterge-l!",
                    cancelButtonText: "Nu, nu doresc stergerea!",
                    closeOnConfirm: false,
                    closeOnCancel: false,
                    allowEscapeKey: true
                },
                function(isConfirm) {
                    if (isConfirm) {
                        $http.delete(endpoint + id).success(function() {
                            SweetAlert.swal(confirmationMessage, "", "success");      
                        });
                    } else {
                        SweetAlert.swal(cancelationMessage, "", "error");
                    }            
                });
        }
    }
}]);