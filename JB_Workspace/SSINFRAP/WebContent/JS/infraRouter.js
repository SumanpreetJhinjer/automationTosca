"use strict";


var infraRouter = null;


(function(){
	
	infraRouter = {
			
			
			updateCleanMachineRequestDetails:updateCleanMachineRequestDetails,
			
			getEnvName:getEnvName,
			getEnvType:getEnvType,
			getOStype:getOStype,
			getAppName:getAppName,
			getotherAppName:getotherAppName,
			/* FAQ's */			
			getQandA:getQandA,
			
	};
	


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
	function getAppName($scope, $http){
		$http.get('rest/api/getApps').then(function (response) {
			$scope.appNames=response.data;
			console.log("appNames",response);
			 if ($('#appname').val() == 'OtherApp') {
			    	console.log("in app Drop down");
			    	$('#newAppNames').css({'visibility':'visible'});
			        console.log($('#environment').val());
			    }else{$('#newAppNames').css({'visibility':'hidden'});}
		});
	}
	
	function getotherAppName($scope, $http,parameters){
		
			console.log($('#appname').val());
			 if ($('#appname').val() == 'OtherApp') {
			    	console.log("in app Drop down");
			    	$('#newAppText').css({'visibility':'visible'});
			        console.log($('#environment').val());
			    }else{$('#newAppText').css({'visibility':'hidden'});}
		
	}
	
	function getEnvType($scope, $http,parameters){
		$http.post('rest/api/getEnvTypes',parameters).then(function (response) {
			$scope.envTypes=response.data;
			console.log("envTypes",response);
			 
			    if ($('#environment').val() == 'OtherEnv') {
			    	console.log("in check Drop down");
			    	$('#newEnvNameText').css({'visibility':'visible'});
			        console.log($('#environment').val());
			    }else{$('#newEnvNameText').css({'visibility':'hidden'});}
			    if ($('#type').val() == 'OtherType') {
			    	console.log("in check Drop down");
			    	$('#newEnvTypeText').css({'visibility':'visible'});
			        console.log($('#type').val());
			    }else{$('#newEnvTypeText').css({'visibility':'hidden'});}
		});
	}
	
	function getOStype($scope, $http,parameters){
		console.log($('#osSelected').val());
			    if ($('#osSelected').val() == 'Cloud') {
			    	console.log("in check Drop down");
			    	$('#oracleSIDText').css({'visibility':'hidden'});
				    $('#owningIDText').css({'visibility':'hidden'});
				    $('#groupIdText').css({'visibility':'hidden'});
				    $('#secondaryIDText').css({'visibility':'hidden'});
				    $('#secondaryEmailIDText').css({'visibility':'hidden'});
				    $('#givenNameText').css({'visibility':'hidden'});
				    $('#surNameText').css({'visibility':'hidden'});
				    $('#mobileNumberText').css({'visibility':'hidden'});
			        
			    }else{$('#oracleSIDText').css({'visibility':'visible'});
			    $('#owningIDText').css({'visibility':'visible'});
			    $('#groupIdText').css({'visibility':'visible'});
			    $('#secondaryIDText').css({'visibility':'visible'});
			    $('#secondaryEmailIDText').css({'visibility':'visible'});
			    $('#givenNameText').css({'visibility':'visible'});
			    $('#surNameText').css({'visibility':'visible'});
			    $('#mobileNumberText').css({'visibility':'visible'});
			    }
	}
})();