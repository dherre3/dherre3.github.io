'use strict';

/**
 * @ngdoc function
 * @name 2048App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the 2048App it has the login of all the games
 * IMPROVEMENTS: There must be a solution where the add and slide funtions are done in the same 
 *loop rather than in two separate ones. 
 *Solve it so that I can have a unique gradient of colors.
 */
angular.module('2048App')
  .controller('MainCtrl', function ($scope,$timeout) {
  	//initializes game array
  	var array=[];
  	//initializes empty spots in the 2d array, initially all but one
  	var empty={};
  	//Initializes direction
  	var direction=null;
  	var noChange=true;
  	$scope.prev=[];

  	$scope.goBackToStep=function(step)
  	{
  		$timeout(function(){
  			$scope.gameArray=step.array;
  			$scope.score=step.score;
  			$scope.prev=[];
  			var objectToHistory={};
  			objectToHistory.score=step.score;
  			objectToHistory.array=copy();
  			$scope.prev.push(objectToHistory);
  		});
  	}
  	$scope.restart=function()
  	{
  		$scope.gameArray=init();
  	}
  	this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  	$scope.gameArray=init();
  	//Initializes the game variables;
  	function init(){
	  	for (var i = 0; i < 4; i++) {
	  		for (var j = 0; j < 4; j++) {
	  			empty[i+','+j]=true;
	  		};
	  		var column=[0,0,0,0];
	  		
	  		array[i]=column;
	  	};	
	  	$scope.score=0;
	  	var firstRandom=Math.floor(4*Math.random());
		var secondRandom=Math.floor(4*Math.random());
		array[firstRandom][secondRandom]=pickTwoOrFour();
		removeEmpty(firstRandom,secondRandom);
		$scope.prev=[];
		return array;
  	}

  	//Removes non-zero position from the empty object
  	function removeEmpty(row, column)
  	{
  		delete empty[row+','+column];
  	}

  	//Enters new empty position into the empty object
  	function enterEmpty(row, column)
  	{
  		empty[row+','+column]=true;
  	}

  	//Slides all the numbers in the right way, repeats it three times as
  	//the max number of slide cases is 3, can probably be improved by
  	//exploring those cases a bit more
  	function slide(index, direction,repetition)
  	{
  		if(repetition>2){
  			return;
  		}
  		var track=-1;
  		for (var i = 0; i < 4; i++) {
  			if(direction=='up')
  			{
  				if(array[3-i][index]==0&&track!=-1)
  				{
  					var tmp=array[track][index];
  					array[track][index]=0;
  					array[3-i][index]=tmp;
  					
  					removeEmpty(3-i,index);
  					enterEmpty(track,index);
  					track=3-i;
  					noChange=false;
  				}else if(array[3-i][index]!=0&&track!=-1){
  					track=3-i;
  				}

  				if(array[3-i][index]!=0&&track==-1)
	  			{
	  				track=3-i;
	  			}
  			}
  			else if(direction=='down')
  			{
  				if(array[i][index]==0&&track!=-1)
  				{
  					var tmp=array[track][index];
  					array[track][index]=0;
  					array[i][index]=tmp;
  					removeEmpty(i,index);
  					enterEmpty(track,index);
  					track=i;
  					noChange=false;
  				}else if(array[i][index]!=0&&track!=-1){
  					track=i;
  				}
  				if(array[i][index]!=0&&track==-1)
	  			{
	  				track=i;
	  			}
  			}
  			else if(direction=='left')
  			{
  				if(array[index][3-i]==0&&track!=-1)
  				{
  					var tmp=array[index][track];
  					array[index][track]=0;
  					array[index][3-i]=tmp;
  					removeEmpty(index,3-i);
  					enterEmpty(index,track);
  					track=3-i;
  					noChange=false;
  				}else if(array[index][3-i]!=0&&track!=-1)
  				{
  					track=3-i;
  				}
  				if(array[index][3-i]!=0&&track==-1)
	  			{
	  				track=3-i;
	  			}
  			}
  			else if(direction=='right')
  			{
  				if(array[index][i]==0&&track!=-1)
  				{
  					var tmp=array[index][track];
  					array[index][track]=0;
  					array[index][i]=tmp;
  					removeEmpty(index,i);
  					enterEmpty(index,track);
  					track=i;
  					noChange=false;
  				}else if(array[index][i]!=0&&track!=-1)
  				{
  					track=i;
  				}
  				if(array[index][i]!=0&&track==-1)
	  			{
	  				track=i;
	  			}
  			}
  		}

  		slide(index, direction,repetition+1);

  	}

  	//Add the appropiate values for each row/column, Takes an index row or 
  	//column depending on direction and a direction
  	function add(index, direction)
  	{
  		var track=-1;
  		var added=false;
  		for (var i = 0; i < 4; i++) {
  			if(direction=='up'){
  				//if the i position of the row/column is not empty
  				//check if it already added that tracker, if it did, 
  				//simply switch to that position else, check if its the
  				//same number and add if it is keeping track of appropiate
  				//empty and non-empty values 
  				if(array[i][index]!=0&&track!=-1)
  				{
	  				if(added)
	  				{
	  					track=i;
	  					added=false;
	  				}else{
	  					if(array[i][index]!=array[track][index]){
	  						track=i;
	  					}else{
	  						array[track][index]=2*array[i][index];
	  						$scope.score=$scope.score+array[track][index];
	  						if(array[track][index]==2048)
	  						{
	  							alert('You have won the game!!!');
	  						}
	  						array[i][index]=0;
	  						added=true;
	  						enterEmpty(i,index);
	  						noChange=false;
	  					}
	  				}
  				}
  				//Initializes the first index tracker
	  			if(array[i][index]!=0&&track==-1)
	  			{
	  				track=i;
	  			}


	  		//Down Procedure!!!
  			}else if(direction=='down')
  			{
  				//array[i][index]
  				if(array[3-i][index]!=0&&track!=-1)
  				{
	  				if(added)
	  				{
	  					track=3-i;
	  					added=false;
	  				}else{
	  					if(array[3-i][index]!=array[track][index]){
	  						track=3-i;
	  					}else{
	  						array[track][index]=2*array[3-i][index];
	  						$scope.score=$scope.score+array[track][index];
	  						if(array[track][index]==2048)
	  						{
	  							alert('You have wont the game!!!');
	  						}
	  						array[3-i][index]=0;
	  						added=true;
	  						enterEmpty(3-i,index);
	  						noChange=false;
	  					}
	  				}
  				}

	  			if(array[3-i][index]!=0&&track==-1)
	  			{
	  				track=3-i;
	  			}


  		//Left Procedure!!!!
  			}else if(direction=='left')
  			{
  				//array[index][i]
  				if(array[index][i]!=0&&track!=-1)
  				{
	  				if(added)
	  				{
	  					track=i;
	  					added=false;
	  				}else{
	  					if(array[index][i]!=array[index][track]){
	  						track=i;
	  					}else{
	  						array[index][track]=2*array[index][i];
	  						$scope.score=$scope.score+array[index][track];
	  						if(array[index][track]==2048)
	  						{
	  							alert('You have wont the game!!!');
	  						}
	  						array[index][i]=0;
	  						added=true;
	  						enterEmpty(index,i);
	  						noChange=false;
	  					}
	  				}
  				}

	  			if(array[index][i]!=0&&track==-1)
	  			{
	  				track=i;
	  			}

  		//Right Procedure
  			}else if(direction=='right')
  			{
  				//array[index][i]
  				if(array[index][3-i]!=0&&track!=-1)
  				{
	  				if(added)
	  				{
	  					track=3-i;
	  					added=false;
	  				}else{
	  					if(array[index][3-i]!=array[index][track]){
	  						track=3-i;
	  					}else{
	  						array[index][track]=2*array[index][3-i];
	  						$scope.score=$scope.score+array[index][track];
	  						if(array[index][track]==2048)
	  						{
	  							alert('You have wont the game!!!');
	  						}
	  						array[index][3-i]=0;
	  						added=true;
	  						enterEmpty(index,3-i);
	  						noChange=false;
	  					}
	  				}
  				}

	  			if(array[index][3-i]!=0&&track==-1)
	  			{
	  				track=3-i;
	  			}
  			}
  			

  		};
  	}

  	//Another game mode that adds and slides together, non important
  	/*function slide(index,direction,routineNumber){
  		var track=-1;
  		var added=false;
  		if(routineNumber==3) return;
  		for (var i = 0; i < 4; i++) {
  			//Up procedure!!!
  			if(direction=='up')
  			{
  				if(array[3-i][index]==0&&track!=-1)
  				{
  					var tmp=array[track][index];
  					array[track][index]=0;
  					array[3-i][index]=tmp;
  					
  					removeEmpty(3-i,index);
  					enterEmpty(track,index);
  					track=3-i;
  					noChange=false;
  				}
  				else if(array[3-i][index]!=0&&track!=-1)
  				{
  					if(added){
  						track=3-i;
  						added=false;
  					}else{
  						if(array[3-i][index]!=array[track][index]){
  						track=3-i;
	  					}else{
	  						array[3-i][index]=2*array[3-i][index];
	  						array[track][index]=0;
	  						added=true;
	  						enterEmpty(track,index);
	  						noChange=false;

	  					}
  					}
  					
  				}

  				if(array[3-i][index]!=0&&track==-1)
  				{
  					track=3-i;
  				}
  				if(i==3){
  					slide(index,direction,routineNumber+1);
  				}

  			//Down Procedure!!!!
  			}else if(direction=='down')
  			{
  				array[i][index]
  			if(array[i][index]==0&&track!=-1)
  				{
  					var tmp=array[track][index];
  					array[track][index]=0;
  					array[i][index]=tmp;
  					removeEmpty(i,index);
  					enterEmpty(track,index);
  					track=i;
  					noChange=false;
  				}
  				else if(array[i][index]!=0&&track!=-1)
  				{
  					if(array[i][index]!=array[track][index]){
  						track=i;
  					}else{
  						array[i][index]=2*array[i][index];
  						array[track][index]=0;
  						enterEmpty(track,index);
  						noChange=false;

  					}
  				}

  				if(array[i][index]!=0)
  				{
  					track=i;
  				}
  				if(i==3){
  					slide(index,direction,routineNumber+1);
  				}




  		//Left Procedure!!!!
  			}else if(direction=='left')
  			{
  				//array[index][3-i]
  				 if(array[index][3-i]==0&&track!=-1)
  				{
  					var tmp=array[index][track];
  					array[index][track]=0;
  					array[index][3-i]=tmp;
  					removeEmpty(index,3-i);
  					enterEmpty(index,track);
  					track=3-i;
  					noChange=false;
  				}
  				else if(array[index][3-i]!=0&&track!=-1)
  				{
  					if(array[index][3-i]!=array[index][track]){
  						track=3-i;
  					}else{
  						array[index][3-i]=2*array[index][3-i];
  						array[index][track]=0;
  						enterEmpty(index,track);
  						noChange=false;

  					}
  				}

  				if(array[index][3-i]!=0)
  				{
  					track=3-i;
  				}
  				if(i==3){
  					slide(index,direction,routineNumber+1);
  				}

  		//Right Procedure
  			}else if(direction=='right')
  			{
  				//array[index][i]
  				if(array[index][i]==0&&track!=-1)
  				{
  					var tmp=array[index][track];
  					array[index][track]=0;
  					array[index][i]=tmp;
  					removeEmpty(index,i);
  					enterEmpty(index,track);
  					track=i;
  					noChange=false;
  				}
  				else if(array[index][i]!=0&&track!=-1)
  				{
  					if(array[index][i]!=array[index][track]){
  						track=i;
  					}else{
  						array[index][i]=2*array[index][i];
  						array[index][track]=0;
  						enterEmpty(index,track);
  						noChange=false;

  					}
  				}

  				if(array[index][i]!=0)
  				{
  					track=i;
  				}
  				if(i==3){
  					slide(index,direction,routineNumber+1);
  				}
  			}
  			
  		};
  	}*/

  	//Finds a new random position to insert an element and inserts it there.
  	// By using at pickRandomEmptySpot
  	function addNew()
  	{
  		var emptyString=pickRandomEmptySpot();
  		array[emptyString[0]][emptyString[2]]=pickTwoOrFour();
  		removeEmpty(emptyString[0],emptyString[2]);
  	}

  	//Nothing to test, just make sure that the random covers all values,
  	//which it does since Math.random gives values 0,0.99 inclusive and
  	// its taking the floor
  	function pickRandomEmptySpot()
  	{	
  		var keyArray=Object.keys(empty);
  		var randomIndex=Math.floor((keyArray.length)*Math.random());
  		return keyArray[randomIndex];
  	}

  	//just pick 2 with 90% probability or 4 with 10%
  	function pickTwoOrFour()
  	{
  		if(Math.random()<0.90)
  		{
  			return 2;
  		}else{
  			return 4;
  		}
  	}


  	//Performs a move in the game takes a direction as a parameter
  	function gameMove(direction)
  	{
  		//var r=$q.defer();
  		for (var j = 0; j < 4; j++) {
  			add(j,direction);
  			slide(j,direction,0);
  		};
  		if(!noChange)
  		{
  			addNew();
  		}
  		$timeout(function(){
  			var objectToHistory={};
  			objectToHistory.score=$scope.score;
  			objectToHistory.array=copy();

  			$scope.prev.push(objectToHistory);
  			$scope.gameArray=array;
  			
  		});

  		
  		if(noChange&&Object.keys(empty).length==0)
  		{
  			alert('GameOver');
  		}


  		noChange=true;
  	}

    //Main function that receives the boards event listener
    var main = function(e){
    if(e.keyCode==37){
    		e.preventDefault();
    		gameMove('left');
    		console.log('left');
    	}
    	else if(e.keyCode==39){
			e.preventDefault();
			gameMove('right');
			console.log('right');
    	}
    	else if(e.keyCode==38)
    	{
    		e.preventDefault();
    		gameMove('up');
    		console.log('up');
    	}else if(e.keyCode==40)
    	{
    		e.preventDefault();
    		gameMove('down');
    		console.log('down');
    	}
	};

//creating and destroying the listener when controller is uninstantiated for 
//efficiency.
var $doc = angular.element(document);

$doc.on('keydown', main);
$scope.$on('$destroy',function(){
  $doc.off('keydown', main);
})
function copy(){
	var moveArray=[];
	for (var i = 0; i < 4; i++) {
		moveArray[i]=[];
		for (var j = 0; j < 4; j++) {
			moveArray[i][j]=$scope.gameArray[i][j];
		};
			
	};
	return moveArray;
}
//According with history
$scope.status = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
//Styling of colors

$scope.style=function(number)
{	
	var string='#00BFF6';
	var sqrt=Math.sqrt(number);
	string='rgb('+(85+number%256)+', '+number%256+', '+number%256+')';
	if((85+number)/256==1){
		string='rgb('+number%256+', '+(105+number%256)+', '+number%256+')';
	}else if((85+number)/256==2){
		string='rgb('+number%256+', '+number%256+', '+(105+number%256)+')';
	}
	return string;
	/*if(number<10){
		string='#00BFF'+number;
	}else if(number<100)
	{
		string='#00BF'+number;
	}else if(number<1000)
	{	
		string='#00B'+number;
	}else if(number<10000){
		string='#00'+number;
	}else if(number<100000){
		string='#0'+number;
	}else if(number<1000000){
		string='#'+number;
	}else if(number<100000){
		//Golden color
		string='#FFD700';
	}*/

}
  });

