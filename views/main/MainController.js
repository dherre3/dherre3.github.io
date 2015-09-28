var myWeb=angular.module('myWebsite');
myWeb.controller('MainController', ['$anchorScroll', '$location', '$scope','$state',
  function ($anchorScroll, $location, $scope,$state) {
	
	$scope.menuOptions=['Home', 'Projects','Portafolio', 'Documents', 'Contacts'];
	
	$scope.showMenu=false;
	$scope.closeModal=function(){
		$scope.animationMenu=='animated zoomOutUp';
		$scope.rotateClass="animated fadeInDown";
		$scope.footerAnimation="animated fadeInUp"
		$scope.showMenu=false;
	}
	$scope.openModal=function(){
		$scope.rotateClass="animated fadeOutUp";
		$scope.footerAnimation="animated fadeOutDown"
		$scope.animationMenu=='animated bounce';
		$scope.showMenu=true;
	}
	$scope.gotoSection = function(index) {
		$scope.animationMenu=='animated zoomInDown';
		$scope.showMenu=false;
		$state.go($scope.menuOptions[index]);
      	$scope.rotateClass="animated fadeInDown";
      	$scope.footerAnimation="animated fadeInUp"
    };



}]);