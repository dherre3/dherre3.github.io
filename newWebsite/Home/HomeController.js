myWeb.controller('HomeController', ['$scope', '$timeout','$filter', function ($scope, $timeout,$filter) {
	//Prevents more info link to display more information from my website
    $scope.moreInfo = false;
    $scope.shownUpdates=2;
    var firebaseLink = new Firebase('https://blazing-inferno-1723.firebaseio.com'); //Creates link to firebase database and grabs all events
    
    /**
     * @methodof HomeController
     * @Description Grabs updates from firebase for the log and puts them in the $scope.update object
     * @param {void} void none 
	 * @return {void} Sets the $scope.update function object.
     * 
     */
     $scope.updates=[];
    firebaseLink.child('Updates').once('value', function (snapshot) {
        $timeout(function () {
        	/**
        	 * @memberof firebaseUpdates
        	 * @member {{$scope.updates}}
        	 * @property Date date of the log update
        	 */
             var firebaseArray=snapshot.val();
             for (var i = 0; i < firebaseArray.length; i++) {
                var message = '';
                if(firebaseArray[i]!=null){
                    firebaseArray[i].Date=new Date(firebaseArray[i].Date);
                    console.log(firebaseArray[i].Date);
                    var dateUpdate=firebaseArray[i].Date;
                    var temp = Math.floor((new Date() - dateUpdate) / (1000));
                    message = temp + ' sec';
                if(temp>59){
                    temp=Math.floor(temp/60);
                    message = temp + ' min';
                    if (temp > 60) {
                        temp = Math.floor(temp / 60);
                        message = temp + ' hours';
                        if (temp > 24) {
                            temp = Math.floor(temp / 24);
                            message = temp + ' days';
                        }
                    }
                }

                firebaseArray[i].Timestamp = message;
                $scope.updates.push(firebaseArray[i]); 
                }
             };
             $scope.updates=$filter('orderBy')($scope.updates,'Date',true);
        });
    }, function (error) {
        console.log(error);
    });
	/**
	 * 
	 * @function changeDates 
	 * @memberof HomeController
	 * @description Function Converts dates from the firebase date string of the backend to data javascript format
	 * @param {void} void none 
	 * @return {date} Returns a date object converted from the string received from firebase
	 * 
	 */
	//ChangeDates just formats the firebase strings into javascript format
    $scope.getStyle = function () {
        if (!$scope.moreInfo) {
            return '13px';
        } else {
            return '14px';
        }

    };
    $scope.moreUpdates=function(){
        $scope.shownUpdates+=3;

    };

}]);