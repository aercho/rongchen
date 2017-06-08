'use strict';


angular.module('app').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	//定义id为main的路由
	$stateProvider.state('main', {
		url: '/main', //url#后的hash值
		templateUrl: 'view/main.html', //模板
		controller: 'mainCtrl'
	});

	$urlRouterProvider.otherwise('main');
}]);