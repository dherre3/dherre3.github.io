var myWeb=angular.module('MUHCApp');

myWeb.controller('HomeController', ['$scope', '$timeout','$filter', 'UserAuthorizationInfo','EncryptionService','Notifications', function ($scope, $timeout,$filter, UserAuthorizationInfo,EncryptionService,Notifications) {
	$scope.FirstName='Fred';
	$scope.LastName='Flinstone';
	$scope.today=new Date();

    
}]);