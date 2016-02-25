var events=angular.module('MUHCEvents', ['ngAnimate']);
events.run(['$anchorScroll', function($anchorScroll) {
  $anchorScroll.yOffset = 55;   // always scroll by 50 extra pixels
}])
events.controller('SinglePageController',['$anchorScroll', '$location', '$scope',
  function ($anchorScroll, $location, $scope) {
	
	$scope.menuOptions=['Home', 'Past Events','Awards', 'Attend Events', 'Contact'];
	
	$scope.showMenu=false;
	$location.hash('anchor' + 1);
	$scope.closeModal=function(){
		$scope.showMenu=false;
	}
	$scope.openModal=function(){
		$scope.showMenu=true;
	}
	$scope.gotoAnchor = function(x) {
		$scope.showMenu=false;
      var newHash = 'anchor' + x;
      if ($location.hash() !== newHash) {
        // set the $location.hash to `newHash` and
        // $anchorScroll will automatically scroll to it
        $location.hash('anchor' + x);
      } else {
        // call $anchorScroll() explicitly,
        // since $location.hash hasn't changed
        $anchorScroll();
      }
    };
    
    $scope.registerToEvent=function(){
        $location.hash('anchor' + 4);
        $anchorScroll();
    };
	
	
}]);
