var myAppWebsite=angular.module('myWebsiteUpdates',['ui.router','firebase','ngAnimate']);

myAppWebsite.config(['$urlRouterProvider','$stateProvider', function ($urlRouterProvider, $stateProvider) {
	$urlRouterProvider.otherwise('/');
	$stateProvider.state('login',{
		url:'/',
		templateUrl:'views/signin.html',
		controller:'LoginUpdatesController'
	})
	.state('updates',{
		url:'/updates',
		templateUrl:'views/updates.html',
		controller:'UpdatesController'
	})



}]);
myAppWebsite.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    var ref = new Firebase("https://docs-sandbox.firebaseio.com");
    return $firebaseAuth(ref);
  }
]);
myAppWebsite.run(["$rootScope", "$state", function($rootScope, $state) {
$rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
  // We can catch the error thrown when the $requireAuth promise is rejected
  // and redirect the user back to the home page
  if (error === "AUTH_REQUIRED") {
    $state.go("login");
  }
});
}]);
myAppWebsite.controller('LoginUpdatesController',function($scope,$state, Auth){
	var ref = new Firebase("https://blazing-inferno-1723.firebaseio.com/");
	console.log(Auth);
	$scope.submitPass=function(){
		ref.authWithPassword(
			{
			email:$scope.email,
			password:$scope.password
		},function(error, authData){
			if(error){
				console.log(error);
			}else{
				console.log(authData);
				$state.go('updates');
			}

		});
		Auth.$authWithPassword({
			email:$scope.email,
			password:$scope.password
		}).then(function(authData) {
        console.log(authData);
        	$state.go('updates');
      }).catch(function(error) {
        	$scope.error = error;
      });
	
	};

});

myAppWebsite.filter('dateToFirebase',function(){
    return function(date){
      var month=date.getMonth()+1;
      var year=date.getFullYear();
      var day=date.getDate();
      var minutes=date.getMinutes();
      var seconds=date.getSeconds();
      var hours=date.getHours();
      var string= year+'-'+month+'-'+day+'T'+hours+':'+ minutes +':'+seconds+'.000'+'Z';      return string;
    }

  });
myAppWebsite.controller('UpdatesController',function($filter, $scope){
	$scope.today=new Date();
	$scope.alertShow=false;
	$scope.title='';
	$scope.description='';
	$scope.newAlert=false;
	$scope.$watch('description', function(){
		if($scope.title==''||$scope.description==''){
			$scope.disable=true;
		}else{
			$scope.disable=false;
		}
	});

	$scope.updateSubmit=function(){
		var des=$scope.description;
		var tit=$scope.title;
			objectUpdate={};
			objectUpdate.Content=$scope.description;
			objectUpdate.Title=$scope.title;
			objectUpdate.Date=$filter('dateToFirebase')(new Date());
			var ref = new Firebase("https://blazing-inferno-1723.firebaseio.com/");
			ref.child('Updates').push(objectUpdate);
			$scope.alertMessage="Update Sent!";
			$scope.alertShow=true;
			$scope.description='';
			$scope.title='';
			$scope.disable=true;
			$scope.newAlert=true;
	};
	$scope.newUpdate=function(){
		$scope.alertShow=false;
		$scope.newAlert=false;

	};



});