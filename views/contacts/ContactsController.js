var myApp=angular.module('myWebsite');

myApp.controller('ContactsController',function($scope,$filter){
	$scope.disableSendButton=true;
	$scope.title='';
	$scope.content='';
	$scope.alertOn=false;
	$scope.newMessageEnable=false;
	$scope.checked=false;
	var regEmail= "^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$";
	regEmail=new RegExp(regEmail);
	$scope.$watchGroup(['title','content'], function(){
		if($scope.title==''||$scope.content=='')
		{
			$scope.alertInvalid=false;
			$scope.disableSendButton=true;
		}else{

			if(!regEmail.test($scope.title))
			{
				$scope.alertInvalid=true;
			}else{
				$scope.disableSendButton=false;
				$scope.alertInvalid=false;
			}

		}
	});


	$scope.sendMessage=function(){
		var ref=new Firebase('https://blazing-inferno-1723.firebaseio.com//Website/Messages');
		ref.push({
			'email':$scope.title,
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
