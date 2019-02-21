"use strict";


var MachineController = null;


(function(){
	
	MachineController = {
			validateMachineRequest:validateMachineRequest,
			
			
	}
	
	function validateMachineRequest($scope, $http,machineCountSelected,availableMachineCount){
		if(availableMachineCount>=machineCountSelected){
			$scope.ConfirmRequest=true;
			$scope.ConfirmBuildRequest=false;
			$scope.AllocatingCount=machineCountSelected;
		
		}
		else{
			$http.get('rest/api/availableCleanMachineCount').then(function (response) {
				var availableCleanMachineCount=response.data;
				if(availableCleanMachineCount>0){
					$scope.ConfirmRequest=false;
					$scope.ConfirmBuildRequest=true;
					$scope.AllocatingCount=response.data;
					//availableCleanMachineRequest($scope, $http,machineCountSelected,$scope.AllocatingCount);
				}
				
				
				console.log("Script Initiation",response);
			});
		}
	}
	
	
})();