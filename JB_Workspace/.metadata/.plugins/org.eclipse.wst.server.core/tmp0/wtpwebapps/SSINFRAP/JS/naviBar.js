var InfraApp=angular.module('InfraNaviModule',[]);

InfraApp.controller('infraNaviController', ['$http', '$rootScope', '$scope','$interval',
    function($http, $rootScope, $scope, $interval) {
	
	$scope.setClass=function(){
		alert("inside activ bas")
	}
	
}]);