var commonService = angular.module ('commonService', []);

commonService.factory('commonService', ['$route', '$http', '$window', function($route, $http, $window){
  return {
   
deleteEntity: function(endpoint, id, confirmMessage, confirmationMessage){
        var confirmDeletion = confirm(confirmMessage + id + '?');
        if (confirmDeletion == true) {
            $http.delete(endpoint + id).success(function(response) {
                alert(confirmationMessage);
                $window.location.reload();
            })
            return true;
        } else {
            return false;
        }
  }
}
}]);