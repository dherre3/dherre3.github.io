/**
 * @author David Herrera
 */

var myWeb = angular.module('myWebsite', ['ui.bootstrap']);

myWeb.controller('HomeController', ['$scope', '$timeout', function ($scope, $timeout) {
    $scope.boom = 'yeye';
    $scope.moreInfo = false;
    var firebaseLink = new Firebase('https://blazing-inferno-1723.firebaseio.com');
    firebaseLink.child('Updates').once('value', function (snapshot) {
        $timeout(function () {
            $scope.updates = snapshot.val();
            $scope.arrayUpdates = Object.keys($scope.updates);
            changeDates();
        });
    }, function (error) {
        console.log(error);
    });

    function changeDates() {
        var message = '';
        for (var i = 1; i <= $scope.arrayUpdates.length; i++) {
        	var dateUpdate=new Date($scope.updates[i].Date);
		
            var temp = Math.floor((new Date() - dateUpdate) / (1000 * 60));
            message = temp + ' min';
            if (temp > 100) {
                temp = Math.floor(temp / 60);
                message = temp + ' hours';
                if (temp > 24) {
                    temp = Math.floor(temp / 24);
                    message = temp + ' days';
                }

            }

            $scope.updates[i].Date = message;
        }
        $timeout(function () {
            console.log($scope.updates);
        });
    }
    $scope.getStyle = function () {
        if (!$scope.moreInfo) {
            return '13px';
        } else {
            return '14px';
        }

    };

}]);
myWeb.controller('MainController', function ($scope) {

});