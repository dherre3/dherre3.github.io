/**
 * 
 * @author <davidfherrerar@gmail.com>
 * @copyright 2015 David Herrera. All rights reserved.
 * 
 */

/**	
 * @ngdoc object
 * @name David's Herrera Website
 * @description Contains all my website. Link to main routing Service {@link MyWebsite} and the main controller {@link HomeController}
 * 
 **/
   /*Angular Module Containing My Website*/
/**
 * @namespace MyWebsite
 * @description The angular module that contains all the logic for the website. Link to controllers {@link HomeController}.
 * Link to its services {@link HomeController}
 * 
 * @requires ui.bootstrap
 */
var myWeb = angular.module('myWebsite', ['ui.bootstrap','ui.router','firebase']);
/**
 * @ngdoc controller
 * @name HomeController
 * @scope
 * @requires $scope
 * @requires $timeout
 * @requires $filter
 * @description Controller that handles all the backend for my website
 * 
 */
/**Gathers log information from firebase and displays it in the website*/

myWeb.controller('MainController', function ($scope) {

});

myWeb.filter('formatDate',function(){
  return function(str) {
      if(typeof str==='string'){
        var a = str.split(/[^0-9]/);
        var d=new Date (a[0],a[1]-1,a[2],a[3],a[4],a[5] );
      return d;

      }
    }
});
myWeb.filter('dateToFirebase',function(){
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

myWeb.filter('to_trusted', ['$sce', function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }]);