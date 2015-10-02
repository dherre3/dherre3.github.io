var myAppWebsite=angular.module('myWebsiteUpdates',['ui.router','firebase','ngAnimate']);

myAppWebsite.config(['$urlRouterProvider','$stateProvider', function ($urlRouterProvider, $stateProvider) {
	$urlRouterProvider.otherwise('/');
	$stateProvider.state('login',{
		url:'/',
		templateUrl:'views/signin.html',
		controller:'LoginUpdatesController',
		resolve: {
      // controller will not be loaded until $waitForAuth resolves
      // Auth refers to our $firebaseAuth wrapper in the example above
      "currentAuth": ["Auth", function(Auth) {
        // $waitForAuth returns a promise so the resolve waits for it to complete
        return Auth.$waitForAuth();
      }]
  }
	})
	.state('updates',{
		url:'/updates',
		templateUrl:'views/updates.html',
		controller:'UpdatesController'
		resolve: {
	      // controller will not be loaded until $waitForAuth resolves
	      // Auth refers to our $firebaseAuth wrapper in the example above
	      "currentAuth": ["Auth", function(Auth) {
	        // $waitForAuth returns a promise so the resolve waits for it to complete
	        return Auth.$requireAuth();
    	  }]
  	}
	}).state('updates.manage',{
		url:'/manage',
		templateUrl:'views/manage-updates.html',
		controller:'ManageUpdatesController'
		resolve: {
	      // controller will not be loaded until $waitForAuth resolves
	      // Auth refers to our $firebaseAuth wrapper in the example above
	      "currentAuth": ["Auth", function(Auth) {
	        // $waitForAuth returns a promise so the resolve waits for it to complete
	        return Auth.$requireAuth();
    	  }]
  	}
	}).state('updates.add',{
		url:'/add',
		templateUrl:'views/add-updates.html',
		controller:'AddUpdatesController'
		resolve: {
	      // controller will not be loaded until $waitForAuth resolves
	      // Auth refers to our $firebaseAuth wrapper in the example above
	      "currentAuth": ["Auth", function(Auth) {
	        // $waitForAuth returns a promise so the resolve waits for it to complete
	        return Auth.$requireAuth();
    	  }]
  	}
	}).state('updates.projects',{
		url:'/projects',
		templateUrl:'views/manage-projects.html',
		controller:'ManageProjectsController'
		resolve: {
	      // controller will not be loaded until $waitForAuth resolves
	      // Auth refers to our $firebaseAuth wrapper in the example above
	      "currentAuth": ["Auth", function(Auth) {
	        // $waitForAuth returns a promise so the resolve waits for it to complete
	        return Auth.$requireAuth();
    	  }]
  	}
	}).state('updates.profile',{
		url:'/profile',
		templateUrl:'views/manage-profile.html',
		controller:'ManageProfileController'
		resolve: {
	      // controller will not be loaded until $waitForAuth resolves
	      // Auth refers to our $firebaseAuth wrapper in the example above
	      "currentAuth": ["Auth", function(Auth) {
	        // $waitForAuth returns a promise so the resolve waits for it to complete
	        return Auth.$requireAuth();
    	  }]
  	}
	})



}]);
myAppWebsite.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    var ref = new Firebase("https://blazing-inferno-1723.firebaseio.com");
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
				$state.go('updates.add');
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

myAppWebsite.controller('ManageUpdatesController',['$scope','$filter','$timeout',function($scope,$filter,$timeout){
	var ref=new Firebase('https://blazing-inferno-1723.firebaseio.com/Website');
	$scope.updates={};
	ref.child('Updates').on('child_added',function(snapshot){
		var child=snapshot.val();
		$timeout(function(){
			$scope.updates[snapshot.key()]=child;
		})
	});
	


}]);
myAppWebsite.filter('formatDate',function(){
	return function(str) {
    if(typeof str==='string'){
      var a = str.split(/[^0-9]/);
      //for (i=0;i<a.length;i++) { alert(a[i]); }
      var d=new Date (a[0],a[1]-1,a[2],a[3],a[4],a[5] );
    return d;
    }
  }
});
myAppWebsite.controller('AddUpdatesController',function($filter, $scope){
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
			var ref = new Firebase("https://blazing-inferno-1723.firebaseio.com/Website");
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


myAppWebsite.controller('UpdatesController',['$scope',function($scope){}]);

myAppWebsite.controller('ManageProfileController',['$scope',function($scope){}]);
myAppWebsite.controller('ManageProjectsController',['$scope',function($scope){}]);
 
