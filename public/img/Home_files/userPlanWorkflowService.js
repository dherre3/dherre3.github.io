var myApp=angular.module('MUHCApp');
/**
*@ngdoc service
*@name MUHCApp.services:UserPlanWorkflow
*@requires $filter
*@description Organizes task and appointments for the plan workflow and sets properties ready for usage in the
*Treatment Plan view.
**/
myApp.service('UserPlanWorkflow',['$filter',function($filter){
    /**
    *@ngdoc property
    *@name TasksAndAppointmentsArray
    *@propertyOf MUHCApp.services:UserPlanWorkflow
    *@description Contains stages of the plan workflow organized choronologically
    */
    /**
    *@ngdoc property
    *@name CurrentTaskOrAppointmentIndex
    *@propertyOf MUHCApp.services:UserPlanWorkflow
    *@description Contains index of current stage in the TasksAndAppointmentsArray 
    */
    

    return{
        /**
        *@ngdoc method
        *@name setUserPlanWorkflow
        *@methodOf MUHCApp.services:UserPlanWorkflow
        *@param {Object} tasksAndAppointments Object contains user's plan workflow. 
        *@description Obtains plan workflow object from Firebase through the {@link MUHCApp.services:UpdateUI UpdateUI} service. Defines the TasksAndAppointmentsArray
        *by organizing the stages chronologically. Sets the current stage by finding the min time between today and the available stages, and setting CurrentTaskOrAppointmentIndex.
        **/
        setUserPlanWorkflow:function(tasksAndAppointments){
            this.timeDiff=[];
            this.TasksAndAppointmentsArray=[];
            this.FuturePlanWorkflowArray=[];
            this.PastPlanWorkflowArray=[];
            this.CurrentTaskOrAppointment={};
            this.CurrentTaskOrAppointmentIndex=-1;
            var keysArray=Object.keys(tasksAndAppointments);
          
            for (var i=0;i<keysArray.length;i++) {

               //console.log(tasksAndAppointments[keysArray[i]]);

               var date=$filter('formatDate')(tasksAndAppointments[keysArray[i]].Date);
               tasksAndAppointments[keysArray[i]].Date=date;      
                if((new Date())<date){
                    var sta='Future';
                    tasksAndAppointments[keysArray[i]].Status=sta;
                    this.FuturePlanWorkflowArray.push(tasksAndAppointments[keysArray[i]]);
               }else{
                    var sta='Past';
                    tasksAndAppointments[keysArray[i]].Status=sta;
                    this.PastPlanWorkflowArray.push(tasksAndAppointments[keysArray[i]]);
               }       
               (this.TasksAndAppointmentsArray).push(tasksAndAppointments[keysArray[i]]);
            };
           
            this.TasksAndAppointmentsArray=$filter('orderBy')(this.TasksAndAppointmentsArray,'Date',false);
            this.PastPlanWorkflowArray=$filter('orderBy')(this.PastPlanWorkflowArray,'Date',true);
            this.FuturePlanWorkflowArray=$filter('orderBy')(this.FuturePlanWorkflowArray,'Date',false);
            var min=Infinity;
            var index=-1;
            this.timeDiff[0]=0;
            if(typeof this.TasksAndAppointmentsArray[0] ==='object') this.TasksAndAppointmentsArray[0].Duration=0; 
            
            for (var i = 0; i < this.TasksAndAppointmentsArray.length; i++) {
                var date=this.TasksAndAppointmentsArray[i].Date;
                var dateDiff=date-(new Date());
                if(dateDiff>0&&dateDiff<min){
                    min=dateDiff;
                    index=i;
                }
                if(i>0){
                    var duration=(this.TasksAndAppointmentsArray[i].Date - this.TasksAndAppointmentsArray[i-1].Date)/(1000*60*60*24);
                    console.log(dateDiff);
                    this.timeDiff[i]={Stages: this.TasksAndAppointmentsArray[i].Name +'-'+ this.TasksAndAppointmentsArray[i-1].Name, TimeDiffInDays:duration};                
                    this.TasksAndAppointmentsArray[i].Duration=duration;   
                } 
            };
            if(index!==-1){
                this.TasksAndAppointmentsArray[index].Status='Next';
                this.CurrentTaskOrAppointment=this.TasksAndAppointmentsArray[index];
                this.CurrentTaskOrAppointmentIndex=index;
            }else{
               this.CurrentTaskOrAppointmentIndex=keysArray.length-1; 
            }
            
        },
        /**
        *@ngdoc method
        *@name setUserPlanWorkflow
        *@methodOf MUHCApp.services:UserPlanWorkflow
        *@returns {Array} Returns the TasksAndAppointmentsArray property.
        **/
        getPlanWorkflow:function(){
            return this.TasksAndAppointmentsArray;
        },
        /**
        *@ngdoc property
        *@name timeDiff
        *@propertyOf MUHCApp.services:UserPlanWorkflow
        *@description An array that contains the time difference between two events, structure dateDiff[i]={Stages: nameStage[i+1]-nameStage[i], timeDiffInDays:date}
        */
        /**
        *@ngdoc method
        *@name getTimeBetweenEvents
        *@methodOf MUHCApp.services:UserPlanWorkflow
        *@returns {Object} Returns the timeDiff object property properly initialized.
        **/
        getTimeBetweenEvents:function(timeFrame){
            //if(this.TasksAndAppointmentsArray[1].Date instanceof Date) console.log(this.TasksAndAppointmentsArray);
            this.timeDiff=[];
            this.timeDiff[0]=0;
            if(typeof this.TasksAndAppointmentsArray[0] ==='object') this.TasksAndAppointmentsArray[0].Duration=0;
            for (var i = 0;i<this.TasksAndAppointmentsArray.length-1;i++) {

                if(timeFrame==='Day'){
                    var dateDiff=(this.TasksAndAppointmentsArray[i+1].Date - this.TasksAndAppointmentsArray[i].Date)/(1000*60*60*24);
                    console.log(dateDiff);
                    this.timeDiff[i+1]={Stages: this.TasksAndAppointmentsArray[i].Name +'-'+ this.TasksAndAppointmentsArray[i+1].Name, TimeDiffInDays:dateDiff};                
                }else if(timeFrame==='Hour'){
                     var dateDiff=(this.TasksAndAppointmentsArray[i+1].Date - this.TasksAndAppointmentsArray[i].Date)/(1000*60*60);
                    this.timeDiff[i+1]={Stages: this.TasksAndAppointmentsArray[i].Name +'-'+ this.TasksAndAppointmentsArray[i+1].Name, TimeDiffInDays:dateDiff};
                }
            };

            return this.timeDiff;

            
       },
       /**
        *@ngdoc method
        *@name getCurrentTaskOrAppointment
        *@methodOf MUHCApp.services:UserPlanWorkflow
        *@returns {Array} Returns array with the tasks and appointments for the plan workflow organized chronologically
        **/
       getCurrentTaskOrAppointment:function(){
            if(this.TasksAndAppointmentsArray){
                return this.TasksAndAppointmentsArray[this.CurrentTaskOrAppointmentIndex];
            }else{
                return {Name:"boom", Date:new Date()};
            }
        },
        getCurrentStageIndex:function(){
            return this.CurrentTaskOrAppointmentIndex;
        }
    };



}]);