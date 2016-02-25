var myApp=angular.module('MUHCApp');

    myApp.config(['$urlRouterProvider','$stateProvider', function ($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('Home', {
        url: '/',
        templateUrl: './views/home/home.html',
        controller: 'HomeController'
    })
    .state('Contacts',{
        url:'/Contacts',
        templateUrl:'./views/contacts/contacts.html',
        controller:'ContactsController'
    })
    .state('Projects',{
        url:'/Projects',
        templateUrl:'./views/projects/projects.html',
        controller:'ProjectsController'
    })
    .state('Appointments',{
        url:'/Appointments',
        templateUrl:'./views/appointments/appointments.html',
        controller:'AppointmentsController'
    })
    .state('Documents',{
        url:'/Documents',
        templateUrl:'./views/documents/documents.html',
        controller:'DocumentsController'
    })
    .state('Checkin',{
        url:'/Checkin',
        templateUrl:'./views/check-in/check-in.html',
        controller:'CheckinController'
    })
    .state('TreatmentPlan',{
        url:'/TreatmentPlan',
        templateUrl:'./views/treatment-plan/treatment-plan.html',
        controller:'TreatmentPlanController'
    })
    .state('Messages',{
        url:'/Messages',
        templateUrl:'./views/messages/messages.html',
        controller:'MessagesController'
    })
    .state('Feedback',{
        url:'/Feedback',
        templateUrl:'./views/messages/feedback.html',
        controller:'MessagesController'
    })
}]);