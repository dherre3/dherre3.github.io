var myWeb=angular.module('myWebsite');
myWeb.controller('MainController', ['$anchorScroll', '$location', '$scope','$state',
  function ($anchorScroll, $location, $scope,$state) {
	
	$scope.menuOptions=['Home', 'Projects','Portafolio', 'Documents', 'Contacts'];
	
	$scope.showMenu=false;
	$location.hash('anchor' + 1);
	$scope.closeModal=function(){
		$scope.rotateClass="animated fadeInDown";
		$scope.showMenu=false;
	}
	$scope.openModal=function(){
		$scope.rotateClass="animated fadeOutUp";
		$scope.showMenu=true;
	}
	$scope.gotoSection = function(index) {
		$scope.showMenu=false;
		$state.go($scope.menuOptions[index]);
      	$scope.rotateClass="animated fadeInDown";
    };



}]);