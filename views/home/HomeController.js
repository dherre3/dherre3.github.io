var myWeb=angular.module('myWebsite');

myWeb.controller('HomeController', ['$scope', '$timeout','$filter','$uibModal', function ($scope, $timeout,$filter,$uibModal) {
	//Prevents more info link to display more information from my website
    $scope.moreInfo = false;
    $scope.shownUpdates=2;
    //$scope.IntroParagraph="Hello, welcome to my site, my name is David Herrera, I am a recently graduated McGillian. I have a deep passion for mathematical models that have underlying consequences in the world around us. For now I am a software developer currently working in web and app development at the Glen hospital. I am currently enjoying learning about machine learning and cryptography. I have developed the Patient Oncology Patient Application for the cancer center at the MUHC Glen site in Montreal, this project was a huge collaborative effort between the departments of computer science, medical physics and radiation oncology. I have been the main developer for this project developing successfully a web, mobile, tablet friendly application, and creating the architecture for the project including security, backend API, and a responsive site for the admins to control the flow of the application. Do not hesitate to send me a message if you would like to pick my brain.";
    /**
     * @methodof HomeController
     * @Description Grabs updates from firebase for the log and puts them in the $scope.update object
     * @param {void} void none
	 * @return {void} Sets the $scope.update function object.
     *
     */
  $scope.open = function () {
    console.log($scope.updates);
  var modalInstance = $uibModal.open({
    animation: true,
    templateUrl: 'myModalContent.html',
    controller: 'ModalInstanceCtrl',
    size: 'lg',
    resolve: {
      items: function () {
        return $scope.updates;
      }
    }
  });
};

     var firebaseLink=new Firebase('https://blazing-inferno-1723.firebaseio.com/Website');
     $scope.updates=[];
     firebaseLink.on('value',function(profileValues)
     {
       var fields=profileValues.val();
       $timeout(function(){
         $scope.profilePicture=fields['ProfilePicture'];
         $scope.IntroParagraph=fields['Intro'];
         $scope.position=fields['Position'];
         setUpdates(fields['Updates']);
       });
     });
     /*firebaseLink.child('Intro').on('value',function(intro){
       $timeout(function(){
         $scope.IntroParagraph=intro.val();
       });
     });
     firebaseLink.child('Position').on('value',function(intro){
       $timeout(function(){
         $scope.position=intro.val();
       });
     });
    firebaseLink.child('Updates').on('value', function (snapshot) {
        $timeout(function () {

        });
    }, function (error) {
        console.log(error);
    });*/
	  function setUpdates(updates)
    {
      var firebaseObject=updates;
      console.log(firebaseObject);
      var updatesObject=firebaseObject;
      var firebaseArray=Object.keys(updatesObject);
      for (var i = 0; i < firebaseArray.length; i++) {
         var message = '';
         if(updatesObject[firebaseArray[i]]!=null){
             updatesObject[firebaseArray[i]].Date=$filter('formatDate')(updatesObject[firebaseArray[i]].Date);
             console.log(updatesObject[firebaseArray[i]].Date);
             var dateUpdate=updatesObject[firebaseArray[i]].Date;
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
                     if(temp>30){
                         message=dateUpdate.getDate()+'/'+dateUpdate.getMonth()+'/'+dateUpdate.getFullYear();
                     }
                 }
             }
         }

         updatesObject[firebaseArray[i]].Timestamp = message;
         $scope.updates.push(updatesObject[firebaseArray[i]]);
         console.log(updatesObject[firebaseArray[i]].Content);
         }
      };
      $scope.updates=$filter('orderBy')($scope.updates,'Date',true);
    }


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
    $scope.openContact=function(field)
    {
      if(field=='facebook')
      {
        window.open('https://www.facebook.com/david.f.herrera','_blank');

      }else if(field=='linkedin')
      {
        window.open('https://ca.linkedin.com/pub/david-herrera/91/74b/489','_blank');

      }else if(field=='github')
      {
        window.open('https://github.com/dherre3','_blank');
      }
    }

}]);

myWeb.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items) {

  $scope.updates = items;


  $scope.ok = function () {
    $uibModalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
