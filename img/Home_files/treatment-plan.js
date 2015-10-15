var myApp=angular.module('MUHCApp');
myApp.controller('TreatmentPlanController',function($scope){
	
});
myApp.controller('flow',function($scope,UserPlanWorkflow){
	

	UserPlanWorkflow.setUserPlanWorkflow({
				'1':{'Name':'Consult Appointment','Date':'2015-08-20T09:15:00Z','Description':'stage1'},
                '2':{'Name':'Ct-Sim','Date':'2015-08-26T09:15:00Z','Description':'stage2'},
                '3':{'Name':'Ready For Contour','Date':'2015-09-23T09:15:00Z','Description':'stage3'},
                '4':{'Name':'Ready For Dose Calculation','Date':'2015-09-20T09:15:00Z','Description':'stage4'},
                '5':{'Name':'Ready for MD Contour','Date':'2015-09-20T09:15:00Z','Description':'stage5'},
                '6':{'Name':'Ready For Physics QA','Date':'2015-09-21T09:15:00Z','Description':'stage6'},
                '7':{'Name':'Ready For Treatment','Date':'2015-09-31T09:15:00Z','Description':'stage7'}
            });

	$scope.stages=UserPlanWorkflow.getPlanWorkflow();
	console.log($scope.stages);
	if($scope.stages.length>0){
		$scope.noStagePlan=true;
	}else{
		$scope.noStagePlan=false;
	}
	var lengthStage=$scope.stages.length;
	if(lengthStage>8||lengthStage<=6){
		$scope.treatmentPlanLessThanEight=false;
	}else{
		$scope.treatmentPlanLessThanEight=true;
	}

	if($scope.stages.length>=7){

		$scope.classStageClass="col-xs-1 col-md-1 col-sm-1 col-lg-1";
	}else if($scope.stages.length>4){

		$scope.classStageClass="col-xs-2 col-md-2 col-sm-2 col-lg-2";
	}else if($scope.stages.length<=4){
		$scope.classStageClass="col-xs-3 col-md-3 col-sm-3 col-lg-3";
	}
	$scope.dynamicPopover = {
	    content: 'Hello, World!',
	    templateUrl: 'myPopoverTemplate.html',
	    title: 'Title'
  	};
  	$scope.setPopOver=function(index){
  		var showDuration=false;
  		if(index==0||index>=UserPlanWorkflow.getCurrentStageIndex()){
  			showDuration=true;
  		}
  		$scope.dynamicPopover = {
		    date: $scope.stages[index].Date,
		    duration:$scope.stages[index].Duration,
		    templateUrl: 'myPopoverTemplate.html',
		    title: $scope.stages[index].Name,
		    showDuration: showDuration
  		};

  	}
	$scope.numberClass="numberClassCompleted";
	$scope.classCircle=function(index)
	{
		var currentIndex=UserPlanWorkflow.getCurrentStageIndex();
		if(currentIndex===index){
			return 'numberCircle blueCircle';
		}
		var date=$scope.stages[index].Date;
		if(date<new Date()){
			return 'numberCircle greenCircle';
		}else{
			return 'numberCircle';
		}

	};
	/*$scope.progressBarClass=function(index)
	{
		var currentIndex=UserPlanWorkflow.getCurrentStageIndex();
		var date=$scope.stages[index].Date;
		if(index!==currentIndex-1){
			return 'progress-bar progress-bar-success progress-bar-striped';
		}else{
			return 'progress-bar progress-bar-info progress-bar-striped';
		}

	}*/
	$scope.iconClass=function(index){
		var currentIndex=UserPlanWorkflow.getCurrentStageIndex();
		if(currentIndex===index){
			return 'ion-ios-circle-filled';
		}
		var date=$scope.stages[index].Date;
		if(date<new Date()){
			return 'fa fa-check';
		}else{
			return 'ion-ios-circle-outline';
		}
	}
	$scope.setPercentageBar=function(index)
	{
		var currentIndex=UserPlanWorkflow.getCurrentStageIndex();
		if(currentIndex===index){
			return {width: "0%"};
		}
		var date=$scope.stages[index].Date;
		if(date<new Date()){
			return {width: "100%"};
		}else{
			return {width: "0%"};
		}

	} 
});



myApp.directive('treatmentPlanVisualization',function(UserPlanWorkflow){
	function controller($scope, $element, $attrs){
		UserPlanWorkflow.setUserPlanWorkflow({
				'1':{'Name':'Consult Appointment','Date':'2015-08-20T09:15:00Z','Description':'stage1'},
                '2':{'Name':'Ct-Sim','Date':'2015-08-26T09:15:00Z','Description':'stage2'},
                '3':{'Name':'Ready For Contour','Date':'2015-09-23T09:15:00Z','Description':'stage3'},
                '4':{'Name':'Ready For Dose Calculation','Date':'2015-09-20T09:15:00Z','Description':'stage4'},
                '5':{'Name':'Ready for MD Contour','Date':'2015-09-20T09:15:00Z','Description':'stage5'},
                '6':{'Name':'Ready For Physics QA','Date':'2015-09-21T09:15:00Z','Description':'stage6'},
                '7':{'Name':'Ready For Treatment','Date':'2015-09-31T09:15:00Z','Description':'stage7'}
            });

	$scope.stages=UserPlanWorkflow.getPlanWorkflow();
	console.log($scope.stages);
	if($scope.stages.length>0){
		$scope.noStagePlan=true;
	}else{
		$scope.noStagePlan=false;
	}
	var lengthStage=$scope.stages.length;
	if(lengthStage>8||lengthStage<=6){
		$scope.treatmentPlanLessThanEight=false;
	}else{
		$scope.treatmentPlanLessThanEight=true;
	}
	var offset='col-xs-'+ Math.ceil((12-lengthStage)/2)+' col-sm-'+ Math.ceil((12-lengthStage)/2)+' col-md-'+ Math.ceil((12-lengthStage)/2)+' col-lg-'+ Math.ceil((12-lengthStage)/2)
;
	(lengthStage>=7)?$scope.offsetClass=offset:$scope.offsetClass=0;

	if($scope.stages.length>=7){

		$scope.classStageClass="col-xs-1 col-md-1 col-sm-1 col-lg-1";
	}else if($scope.stages.length>4){

		$scope.classStageClass="col-xs-2 col-md-2 col-sm-2 col-lg-2";
	}else if($scope.stages.length<=4){
		$scope.classStageClass="col-xs-3 col-md-3 col-sm-3 col-lg-3";
	}
	$scope.dynamicPopover = {
	    content: 'Hello, World!',
	    templateUrl: 'myPopoverTemplate.html',
	    title: 'Title'
  	};
  	$scope.setPopOver=function(index){
  		var showDuration=false;
  		if(index==0||index>=UserPlanWorkflow.getCurrentStageIndex()){
  			showDuration=true;
  		}
  		$scope.dynamicPopover = {
		    date: $scope.stages[index].Date,
		    duration:$scope.stages[index].Duration,
		    templateUrl: 'myPopoverTemplate.html',
		    title: $scope.stages[index].Name,
		    showDuration: showDuration
  		};

  	}
	$scope.numberClass="numberClassCompleted";
	$scope.classCircle=function(index)
	{
		var currentIndex=UserPlanWorkflow.getCurrentStageIndex();
		if(currentIndex===index){
			return 'numberCircle blueCircle';
		}
		var date=$scope.stages[index].Date;
		if(date<new Date()){
			return 'numberCircle greenCircle';
		}else{
			return 'numberCircle';
		}

	};
	/*$scope.progressBarClass=function(index)
	{
		var currentIndex=UserPlanWorkflow.getCurrentStageIndex();
		var date=$scope.stages[index].Date;
		if(index!==currentIndex-1){
			return 'progress-bar progress-bar-success progress-bar-striped';
		}else{
			return 'progress-bar progress-bar-info progress-bar-striped';
		}

	}*/
	$scope.iconClass=function(index){
		var currentIndex=UserPlanWorkflow.getCurrentStageIndex();
		if(currentIndex===index){
			return 'ion-ios-circle-filled';
		}
		var date=$scope.stages[index].Date;
		if(date<new Date()){
			return 'fa fa-check';
		}else{
			return 'ion-ios-circle-outline';
		}
	}
	$scope.setPercentageBar=function(index)
	{
		var currentIndex=UserPlanWorkflow.getCurrentStageIndex();
		if(currentIndex===index){
			return {width: "0%"};
		}
		var date=$scope.stages[index].Date;
		if(date<new Date()){
			return {width: "100%"};
		}else{
			return {width: "0%"};
		}

	}


	}


	 return {
        restrict: 'E', //E = element, A = attribute, C = class, M = comment         
        scope:true,
        controller: controller,
        templateUrl: './views/treatment-plan/treatmentPlanVisualization.html'
        
    }
});