
var myWeb = angular.module('MUHCApp', ['ui.bootstrap','ui.router','firebase']);
myWeb.controller('MainController', function ($scope) {

});

myWeb.filter('formatDate',function(){
	return function(str) {
    if(typeof str==='string'){
        str=str.replace('T',' ');
        str=str.replace('Z','');
        return new Date(str);
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