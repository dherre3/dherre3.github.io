/**
 * @author David Herrera
 */

var myWeb=angular.module('myWebsite',['ui.bootstrap']);

myWeb.controller('HomeController', function($scope,$timeout){
	$scope.boom='yeye';
	$scope.moreInfo=false;
	var firebaseLink=new Firebase('https://blazing-inferno-1723.firebaseio.com');
	firebaseLink.child('Updates').once('value', function(snapshot){
		$timeout(function(){
			$scope.updates=snapshot.val();
			$scope.arrayUpdates=Object.keys($scope.updates);
			console.log($scope.updates);
		});
		
		
	},function(error){
		console.log(error);
	});

	$scope.getStyle=function(){
		if(!$scope.moreInfo){
			return '13px';
		}else{
			return '14px';
		}
		
	}
	
});
myWeb.controller('MainController', function($scope){
	
});