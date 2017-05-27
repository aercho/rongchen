//定义作用于全局的控制器
angular.module("mainApp")
	.controller("globalCtrl", function($scope, $location) {
		//页面跳转函数
		$scope.jumptoUrl = function(path) {
			$location.path(path);
		}
	});