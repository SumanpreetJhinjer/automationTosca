var InfraApp=angular.module('InfraWikiLinkModule',[]);

InfraApp.controller('infraWikiLinkController', ['$http', '$rootScope', '$scope','$interval',
    function($http, $rootScope, $scope, $interval) {
	
	infraRouter.getQandA($scope, $http);
	
}]);