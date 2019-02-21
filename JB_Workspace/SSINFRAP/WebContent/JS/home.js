var InfraApp=angular.module('InfraHomeModule',[]);

InfraApp.controller('infraHomeController', ['$http', '$rootScope', '$scope','$interval',
    function($http, $rootScope, $scope, $interval) {
	
	$scope.setClass=function(){
		alert("inside activ bas")
	}
	
}]);