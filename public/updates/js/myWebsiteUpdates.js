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
		controller:'UpdatesController',
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
		controller:'ManageUpdatesController',
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
		controller:'AddUpdatesController',
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
		controller:'ManageProjectsController',
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
		controller:'ManageProfileController',
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
	ref.child('Updates').on('value',function(snapshot){
		var child=snapshot.val();
		console.log(child);
		$timeout(function(){
			$scope.updates=snapshot.val();
		});

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

myAppWebsite.controller('ManageProfileController',['$scope','$timeout',function($scope,$timeout){

	$scope.position="Software Developer for the MUHC Medical Physics department";
	//$scope.IntroParagraph="Hello, welcome to my site, my name is David Herrera, I am a recently graduated McGillian. I have a deep passion for mathematical models that have underlying consequences in the world around us. For now I am a software developer currently working in web and app development at the Glen hospital. I am currently enjoying learning about machine learning and cryptography. I have developed the Patient Oncology Patient Application for the cancer center at the MUHC Glen site in Montreal, this project was a huge collaborative effort between the departments of computer science, medical physics and radiation oncology. I have been the main developer for this project developing successfully a web, mobile, tablet friendly application, and creating the architecture for the project including security, backend API, and a responsive site for the admins to control the flow of the application. Do not hesitate to send me a message if you would like to pick my brain."
	var ref=new Firebase('https://blazing-inferno-1723.firebaseio.com/Website');
	ref.child('Intro').on('value',function(snapshot){
		$timeout(function(){
			$scope.IntroParagraph=snapshot.val();
		});
	});
	$scope.updateImage=function()
	{
		console.log($scope.picUpload);
		$scope.profileImage=$scope.picUpload;
		ref.child('ProfilePicture').set($scope.profileImage);
		$scope.editImage=false;
	}
	$scope.updateField=function(field, value)
	{
		ref.child(field).set(value);
		$scope.editPosition=false;
		$scope.editIntro=false;
		console.log('Boom');
	}
	/*convertFileToDataURLviaFileReader('../../img/profile-pic.jpeg',function(url){
		console.log(url);
		$scope.profileImage=url;
		//ref.child('ProfilePicture').set($scope.profileImage);
	});*/
	function convertFileToDataURLviaFileReader(url, callback)
	{
			var xhr = new XMLHttpRequest();
			xhr.responseType = 'blob';
			xhr.onload = function() {
					var reader  = new FileReader();
					reader.onloadend = function () {
							callback(reader.result);
					}
					reader.readAsDataURL(xhr.response);
			};
			xhr.open('GET', url);
			xhr.send();
	}
}]);
myAppWebsite.directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                    });
                }
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    }
}]);
myAppWebsite.controller('ManageProjectsController',['$scope',function($scope){
	$scope.isCollapsed = false;
	console.log('boom');
}]);
