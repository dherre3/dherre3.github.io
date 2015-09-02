var myApp=angular.module('myWebsite');

    myApp.config(['$urlRouterProvider','$stateProvider', function ($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('Home', {
        url: '/',
        templateUrl: './views/home/home.html',
        controller: 'HomeController'
    })
    .state('Contants',{
        url:'/Contacts',
        templateUrl:'./views/contacts/contacts.html',
        controller:'ContactController'
    })
    .state('Projects',{
        url:'/Projects',
        templateUrl:'./views/projects/projects.html',
        controller:'ProjectsController'
    })
}]);