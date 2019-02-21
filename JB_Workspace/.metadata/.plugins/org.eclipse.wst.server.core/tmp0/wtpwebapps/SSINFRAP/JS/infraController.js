var InfraApp=angular.module('InfraModule',['720kb.datepicker']);

InfraApp.controller('infraRequestController', ['$http', '$rootScope', '$scope','$interval',
	        function($http, $rootScope, $scope, $interval) {
		
		$scope.loading=true;
		$scope.showRequest=true;
		
		Date.prototype.addDays = function(days) {
		    this.setDate(this.getDate() + parseInt(days));
		    return this;
		};
		
		$scope.preventDefault=function(e){
			e.preventDefault();
		}
		
		let date=new Date();
		
		$scope.minDate = date.toDateString();
		$scope.maxStartDate=date.addDays(4).toDateString();
		$scope.maxDateSelectDisabled=true;
		$scope.setEndDate=function(Startdate){
			$scope.maxDateSelectDisabled=false;
			var parseDate = Startdate.split('-');
			console.log("parseDate ",parseDate);
			let endDate=new Date(parseDate[2],parseDate[1]-1,parseDate[0])
			
			$scope.minEndDate = endDate.toDateString();
			$scope.maxEndDate=endDate.addDays(185).toDateString();
		}
		
		
		infraRouter.getTeamName($scope, $http);
		infraRouter.getprojectName($scope, $http);
		infraRouter.getEnvName($scope, $http);
		//infraRouter.getTypeName($scope, $http);
		//infraRouter.getEnvType($scope, $http,$scope.environment);
		var environment=document.getElementById("environment");
		var appname=document.getElementById("appname");
		var hostname=document.getElementById("hostname");
		var type=document.getElementById("type");
		var installDriveSelected=document.getElementById("installDriveSelected");
		var otherDriveSelected=document.getElementById("otherDriveSelected");
		var emailID=document.getElementById("emailID");
		var osSelected=document.getElementById("osSelected");
		var version=document.getElementById("version");
		var userID=document.getElementById("userID");
		var appmgremailID=document.getElementById("appmgremailID");
		$scope.getEnvType=function(){
			const parameters={
					envselected:environment.value,
					appnameselected:appname.value,
					hostnameselected:hostname.value,
					typeselected:type.value,
					installDriveselected:installDriveSelected.value,
					otherDriveSelected:otherDriveSelected.value,
					emailIDselected:emailID.value,
					osSelectedselected:osSelected.value,
					
			}
			$scope.selectedFilter=false;
			infraRouter.getEnvType($scope, $http,parameters);
		}
		
		
		$scope.init=function()
		{
			$scope.showResultConfirmation=false;
			$scope.showInstallationStatus=false;
			$scope.showRequest=true;
			$scope.showStep1=true;
			$scope.showStep2=false;
			$scope.showStep3=false;
			$scope.isDisabled2=true;
			$scope.isDisabled3=true;
			
		};
		
		$scope.initSoftware=function()
		{
			$scope.showResultConfirmation=false;
			$scope.showInstallationStatus=false;
			$scope.showRequest=true;
			$scope.showStep1=true;
			$scope.showStep2=false;
			$scope.showStep3=false;
			$scope.isDisabled2=true;
			$scope.isDisabled3=true;
			infraRouter.getsoftwareName($scope, $http);
			
		}
		
		$scope.nextStep=function()
		{
			
			//alert($scope.softwareSelected);
			
			let dateReg=/^([0-2][0-9]|(3)[0-1])(-)(((0)[0-9])|((1)[0-2]))(-)\d{4}$/;
			let minDate=document.getElementById("minDate").value;
			let maxDate=document.getElementById("maxDate").value;
			
			if(dateReg.test(minDate)){
				$scope.minDateError=false;
			}else $scope.minDateError=true;
			
			if(dateReg.test(maxDate)){
				$scope.maxDateError=false;
			}else $scope.maxDateError=true;
			if(!$scope.minDateError && !$scope.maxDateError ){
				
				
				$scope.minDateSelected=minDate;
				$scope.maxDateSelected=maxDate;
				$scope.showStep1=false;
				$scope.showStep2=true;
				$scope.showStep3=false;
				$scope.isDisabled3=false;
				
				let machine=document.getElementById("machineSelected")
				$scope.machineCountSelected =machine.value;
				
				infraRouter.getAvailableMachineCount($scope, $http,$scope.machineCountSelected);
			}
			
		};
		
		
		$scope.nextSoftwareStep=function(){
			let machine=document.getElementById("machineSelected")
			$scope.machineCountSelected =machine.value;
			
			
			if(document.querySelector('.softwareSelected:checked')!=null){
				
				$scope.softwareSelectError=false;
			}else $scope.softwareSelectError=true;
			
			
			//alert($scope.softwareSelected);
			
			let dateReg=/^([0-2][0-9]|(3)[0-1])(-)(((0)[0-9])|((1)[0-2]))(-)\d{4}$/;
			let minDate=document.getElementById("minDate").value;
			let maxDate=document.getElementById("maxDate").value;
			
			if(dateReg.test(minDate)){
				$scope.minDateError=false;
			}else $scope.minDateError=true;
			
			if(dateReg.test(maxDate)){
				$scope.maxDateError=false;
			}else $scope.maxDateError=true;
			if(!$scope.minDateError && !$scope.maxDateError && !$scope.softwareSelectError){
				
				$scope.softwareSelected = document.querySelector('.softwareSelected:checked').value;
				$scope.minDateSelected=minDate;
				$scope.maxDateSelected=maxDate;
				$scope.showStep1=false;
				$scope.showStep2=true;
				$scope.showStep3=false;
				$scope.isDisabled3=false;
				
				infraRouter.getAvailableMachineCount($scope, $http,$scope.machineCountSelected);
			}
		}
		
		$scope.nextStep2=function()
		{
			
			let userID=document.getElementById("userID").value;
			let EmailProvided=document.getElementById("emailID").value;
			let userIDPattern=new RegExp("D[0-9]{6}","i");
			let emailPattern=new RegExp("@team.telstra.com$")
			if(userIDPattern.test(userID)){
				$scope.userIDError=false;
				$scope.UserID=userID;
				
				
			}else $scope.userIDError=true;
			
			if(emailPattern.test(EmailProvided)){
				$scope.emailIDError=false;
				$scope.EmailProvided=EmailProvided;
			}else $scope.emailIDError=true;
			
			let team=document.getElementById("teamName");
			if(team.value!=null && team.value!=""){
				$scope.teamError=false;
				$scope.TeamName=team.value;
			}else $scope.teamError=true;
			
			let project=document.getElementById("projectName");
			if(project.value!=null && project.value!=""){
				$scope.projectError=false;
				$scope.Project=project.value;
			}else $scope.projectError=true;
			
			
			console.log("$scope.TeamName",$scope.TeamName," ","$scope.Project",$scope.Project);
			
			if(!$scope.userIDError && !$scope.emailIDError && !$scope.projectError && !$scope.teamError){
				$scope.showStep1=false;
				$scope.showStep2=false;
				$scope.showStep3=true;
				$scope.isDisabled2=false;
			}
			
			
		};
		$scope.previousStep1=function(){
			$scope.showStep1=true;
			$scope.showStep2=false;
			$scope.showStep3=false;
		};
		$scope.previousStep2=function(){
			$scope.showStep1=false;
			$scope.showStep2=true;
			$scope.showStep3=false;
		};
		$scope.SubmitResquest=function(){
			
			const parameters={
					userID:$scope.UserID,
					emailID:$scope.EmailProvided,
					teamName:$scope.TeamName,
					project:$scope.Project,
					purpose:document.getElementById("Purpose").value,
					machineCount:$scope.machineCountSelected,
					softwareList:$scope.softwareSelected,
					minDateSelected:$scope.minDateSelected,
					maxDateSelected:$scope.maxDateSelected,
			}
			infraRouter.updateMachineRequestDetails($scope, $http,parameters);
		};
		$scope.SubmitInstalationResquest=function(){
			
			const parameters={
					/*appname:$scope.appname,
					hostname:$scope.hostname,
					environment:$scope.environment,
					type:$scope.type,
					installDrive:$scope.installDriveSelected,
					emailID:$scope.emailID,
					osSelect:$scope.osSelected,
					otherDrive:$scope.otherDriveSelected,*/
					environment:environment.value,
					appname:appname.value,
					hostname:hostname.value,
					type:type.value,
					installDrive:installDriveSelected.value,
					otherDrive:otherDriveSelected.value,
					emailID:emailID.value,
					osSelect:osSelected.value,
					version:version.value,
					userID:userID.value,
					appmgremailID:appmgremailID.value,
					
			}
			infraRouter.updateCleanMachineRequestDetails($scope, $http,parameters);
		};
		
		$scope.notRequired=true;
		$scope.selectedSoftware=false;
		
		$scope.switches=function(software,index){
			$scope.selectedSoftware=true;
			$scope.notRequired=false;
			
		};
		$scope.reverseSwitches=function(software,index){
			$scope.notRequired=true;
			$scope.selectedSoftware=false;
			
		};
		
		
		
	}]);