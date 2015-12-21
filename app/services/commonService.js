var commonService = angular.module ('commonService', []);

commonService.factory('commonService', ['$route', '$http', function($route, $http){
  return {

          /*resource: function(endpoint){
              return $resource(api_path + endpoint, {id: '@id', action: '@action'},
              { 'update' : { method: 'PUT'}
              });
          },*/

  getList: function(endpoint, entities){
      $http.get(endpoint).success(function(response) {         
            entities = response;
   })
                                  }

  /*deleteEntity: function(endpoint,id, message){
        this.resource(endpoint).remove({id: id}, null,
                function(){
                        alert ('The ' + message + 'has been deleted!');
                        $window.history.back();
                },
               PrintError);
  },

  createEntity: function(endpoint, data, name, message){
      this.resource(endpoint).save(data,
      function(){
          alert (message + data[name] + ' has been created!');
          $window.history.back();
      },
     PrintError);
  },

  updateEntity: function(endpoint, data, message){
       return this.resource(endpoint).update({id: data['id']}, data,
          function(){
           alert (message + data[name] + ' has been updated!');
              $window.history.back();
          }, PrintError);
  }*/
}
}]);