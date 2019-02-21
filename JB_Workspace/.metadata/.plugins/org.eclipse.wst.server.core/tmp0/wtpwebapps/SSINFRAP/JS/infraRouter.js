"use strict";


var infraRouter = null;


(function(){
	
	infraRouter = {
			getTeamName: getTeamName,
			getprojectName:getprojectName,
			getsoftwareName:getsoftwareName,
			updateMachineRequestDetails:updateMachineRequestDetails,
			updateCleanMachineRequestDetails:updateCleanMachineRequestDetails,
			getAvailableMachineCount:getAvailableMachineCount,
			getAddedTeamNames:getAddedTeamNames,
			getAddedProjectNames:getAddedProjectNames,
			getCloudVDIDetails:getCloudVDIDetails,
			getAssignedOwnerDetails:getAssignedOwnerDetails,
			
			getEnvName:getEnvName,
			getEnvType:getEnvType,
			
			/* FAQ's */			
			getQandA:getQandA,
			
	};
	
	function getTeamName($scope, $http){
		$http.get('rest/api/getTeams').then(function (response) {
			$scope.teamNames=response.data;
			console.log("team",response);
		});
	}
	function getprojectName($scope, $http){
		$http.get('rest/api/getProjects').then(function (response) {
			$scope.projectNames=response.data;
			console.log("project",response);
		});
	}
	function getsoftwareName($scope, $http){
		$http.get('rest/api/getSoftwares').then(function (response) {
			$scope.softwares=response.data;
			console.log("software",response);
		});
	}
	function getAvailableMachineCount($scope, $http,machineCountSelected){
		$http.get('rest/api/availableMachineCount').then(function (response) {
			var availableMachineCount=response.data;
			
			MachineController.validateMachineRequest($scope, $http,machineCountSelected,availableMachineCount);
			
			console.log("machines",response);
		});
	}
	function updateMachineRequestDetails($scope, $http,parameters){
		$http.post('rest/api/updateMachineDetails',parameters).then(function (response) {
			if(response.status=200){
				$scope.showRequest=false;
				$scope.showResultConfirmation=true;
				$scope.showInstallationStatus=false;
				$scope.resultConfirmation=response.data;
			}
			console.log("resultConfirmation",response);
		});
	}
	function updateCleanMachineRequestDetails($scope, $http,parameters){
		$http.post('rest/api/updateCleanMachineDetails',parameters).then(function (response) {
			if(response.status=200){
				$scope.showRequest=false
				$scope.showResultConfirmation=false;
				$scope.showInstallationStatus=true;
				$scope.resultConfirmation=response.data;
			}
			console.log("resultConfirmation",response);
		});
	}
	
	
	function getAddedTeamNames($scope, $http, parameters){
		$http.post('rest/api/getAddedTeamNames',parameters).then(function (response) {
			$scope.addedTeamNames=response.data;
			console.log("added team names",response);
		});
	}
	function getAddedProjectNames($scope, $http, parameters){
		$http.post('rest/api/getAddedProjectNames', parameters).then(function (response) {
			$scope.addedProjectNames=response.data;
			console.log("added project names",response);
		});
	}
	
	function getCloudVDIDetails($scope, $http,parameters){
		$http.post('rest/api/getCloudVDIDetails',parameters).then(function (response) {
			console.log("Vdi Data",response.data);
			$scope.showAllocatedList=true;
			$scope.assignedCloudVDIS=response.data;
		});
	}
	
	function getAssignedOwnerDetails($scope, $http,parameters){
		$http.post('rest/api/getAssignedOwnerDetails',parameters).then(function (response) {
			$scope.AssignedOwnerDetails=response.data;
			console.log("added owner names",response);
		});
	}
	function getQandA($scope, $http){
		$http.get('rest/api/questionAndAnswers').then(function (response) {
			
			$scope.questionAndAnswers=response.data;
			
			console.log("faqs",response);
		});
	}
	
	function getEnvName($scope, $http){
		$http.get('rest/api/getEnvs').then(function (response) {
			$scope.envNames=response.data;
			console.log("envNames",response);
		});
	}
	
	/*function getTypeName($scope, $http){
		$http.get('rest/api/getTypes').then(function (response) {
			$scope.envTypes=response.data;
			console.log("envTypes",response);
		});
	}*/
	function getEnvType($scope, $http,parameters){
		$http.post('rest/api/getEnvTypes',parameters).then(function (response) {
			$scope.envTypes=response.data;
			console.log("envTypes",response);
		});
	}
})();