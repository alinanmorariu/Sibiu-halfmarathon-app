var SMAdmin = angular.module('SMAdmin', ['ngRoute', 'ui.bootstrap', 'oitozero.ngSweetAlert', 'projects', 'projectsForm', 'smRunnersForm', 'crossRunnersForm', 'relay2RunnersForm', 'relay4RunnersForm', 'companyRunnersForm', 'childrenRunnersForm', 'smRunners', 'crossRunners', 'relay4Runners', 'relay2Runners', 'adultRunners', 'companiesRunners', 'childrenRunners', 'allRunners', 'fundraisers', 'commonService']);

// routes
SMAdmin.config(function($routeProvider) {

    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl : 'views/admin/admin.html',
            controller  : 'adminCtrl'
        })
        
        .when('/admin', {
            templateUrl : 'views/admin/admin.html',
            controller  : 'adminCtrl'
        })
    
       // routes for the Forms views
            .when('/projects-form', {
                templateUrl : 'views/forms/projectsForm.html',
                controller  : 'projectsFormCtrl'
         })
    
            .when('/sm-runners-form', {
                templateUrl : 'views/forms/smRunnersForm.html',
                controller  : 'smRunnersFormCtrl'
         })
    
            .when('/cross-runners-form', {
                templateUrl : 'views/forms/crossRunnersForm.html',
                controller  : 'crossRunnersFormCtrl'
         })
    
        .when('/relay2-runners-form', {
                templateUrl : 'views/forms/relay2Form.html',
                controller  : 'relay2RunnersFormCtrl'
        })
        
        .when('/relay4-runners-form', {
                templateUrl : 'views/forms/relay4Form.html',
                controller  : 'relay4RunnersFormCtrl'
         })
    
        .when('/company-runners-form', {
                templateUrl : 'views/forms/companyRunnersForm.html',
                controller  : 'companyRunnersFormCtrl'
         })
    
        .when('/children-runners-form', {
                templateUrl : 'views/forms/childrenRunnersForm.html',
                controller  : 'childrenRunnersFormCtrl'
         })
               
                
        // route for the Projects view
        .when('/projects', {
            templateUrl : 'views/projects/projects.html',
            controller  : 'projectsCtrl'
        })
    
        // route for the Runners view
        .when('/runners/adults', {
            templateUrl : 'views/runners/adults.html',
            controller  : 'adultRunnersCtrl'
        })
    
        .when('/runners/halfmarathon', {
            templateUrl : 'views/runners/halfmarathon.html',
            controller  : 'smRunnersCtrl'
        })
    
        .when('/runners/cross', {
            templateUrl : 'views/runners/cross.html',
            controller  : 'crossRunnersCtrl'
        })
    
        .when('/runners/relay4', {
            templateUrl : 'views/runners/relay4.html',
            controller  : 'relay4RunnersCtrl'
        })
    
        .when('/runners/relay2', {
            templateUrl : 'views/runners/relay2.html',
            controller  : 'relay2RunnersCtrl'
        })
    
        .when('/runners/companies', {
            templateUrl : 'views/runners/companies.html',
            controller  : 'companiesRunnersCtrl'
        })
    
        .when('/runners/children', {
            templateUrl : 'views/runners/children.html',
            controller  : 'childrenRunnersCtrl'
        })
        
        .when('/runners/all', {
            templateUrl : 'views/runners/allRunners.html',
            controller  : 'allRunnersCtrl'
        })
    
        // route for the Fundraisers view
        .when('/fundraisers', {
            templateUrl : 'views/fundraisers/fundraisers.html',
            controller  : 'fundraisersCtrl'
        })
    

  /*      // route for the Projects view
        .when('/projects', {
            templateUrl : 'views/projects/projects.html',
            controller  : 'projectsController'
        })

        // routes for the Forms views
            .when('/runners-form', {
                templateUrl : 'views/forms/runners_registration_form.html',
                controller  : 'runnersFormController'
         })
                
        .when('/supporters-form', {
            templateUrl : 'views/forms/supporters_registration_form.html',
            controller  : 'supportersFormController'
        })
        
        // routes for the Data views
        .when('/runners', {
            templateUrl : 'views/data/runners.html',
            controller  : 'runnersController'
         })
                
        .when('/supporters', {
            templateUrl : 'views/data/supporters.html',
            controller  : 'supportersController'
        })
        
        // route for the Reports view
        .when('/reports', {
            templateUrl : 'views/reports/reports.html',
            controller  : 'reportsController'
        })*/

        .otherwise({
                redirectTo: '/'
        });
});

//Modal factory for updating projects

SMAdmin.factory('updateProjectModal', function (btfModal) {
  return btfModal({
    controller: 'updateProjectModalCtrl',
    controllerAs: 'modal',
    templateUrl: 'views/projects/updateProjectModal.html'
  });
});

SMAdmin.filter('runnersByRace', function() {
  return function(items) {
    return items["cursa"] == "1";
  };
});

