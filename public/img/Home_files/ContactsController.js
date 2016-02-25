var myApp=angular.module('MUHCApp');

myApp.controller('ContactsController',function($scope,$filter){
	$scope.disableSendButton=true;
	$scope.title='';
	$scope.content='';
	$scope.alertOn=false;
	$scope.newMessageEnable=false;
	$scope.checked=false;
	$scope.$watchGroup(['title','content'], function(){
		if($scope.title==''||$scope.content=='')
		{
			$scope.disableSendButton=true;
		}else{
			$scope.disableSendButton=false;
		}
	});


	$scope.sendMessage=function(){
		var ref=new Firebase('https://blazing-inferno-1723.firebaseio.com/Messages');
		ref.push({
			'title':$scope.title,
			'content':$scope.content,
			'date':$filter('dateToFirebase')(new Date)
		});
		$scope.disableSendButton=true;
		$scope.alertOn=true;
		$scope.newMessageEnable=true;
		$scope.title='';
		$scope.content='';
		$scope.checked=true;




	};
	$scope.newMessage=function(){
		$scope.alertOn=false;
		$scope.newMessageEnable=false;
		$scope.checked=false;
	}
});