myApp.run(['$anchorScroll', function($anchorScroll) {
  $anchorScroll.yOffset = 5;   // always scroll by 50 extra pixels
}])
var myApp=angular.module('myWebsite');
myApp.controller('ProjectsController',function($scope,$timeout,$location){
	var ref=new Firebase('https://blazing-inferno-1723.firebaseio.com/Website/Projects');
	$scope.projects=[];
	ref.on('child_added',function(snapshot){
		var projects=snapshot.val();
		
		console.log(projects);
		$timeout(function(){
			$scope.projects.push(projects);
		});
	});
	$scope.goToProject=function(index){
		var newHash = 'anchor' + index;
      	if ($location.hash() !== newHash) {
        	// set the $location.hash to `newHash` and
        	// $anchorScroll will automatically scroll to it
        	$location.hash('anchor' + index);
      	} else {
        	// call $anchorScroll() explicitly,
        	// since $location.hash hasn't changed
        	$anchorScroll();
      	}

	}

});
