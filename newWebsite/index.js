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
var myWeb = angular.module('myWebsite', ['ui.bootstrap','ui.router']);
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