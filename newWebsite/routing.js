var myApp=angular.module('myWebsite');

    myApp.config(['$urlRouterProvider','$stateProvider', function ($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('Home', {
        url: '/',
        templateUrl: 'home/home.html',
        controller: 'HomeController'
    })
    .state('Contants',{
        url:'/Contacts',
        templateUrl:'contacts/contacts.html',
        controller:'ContactController'
    })
    .state('Projects',{
        url:'/Projects',
        templateUrl:'projects/projects.html',
        controller:'ProjectsController'
    })
}]);