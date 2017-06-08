'use strict'
//注意定义指令名要与模板中的指令名相同，-换成大写字母
angular.module("app").directive("appHead", [function() {
	return {
		restrict: "A",
		replace: true,
		templateUrl: 'view/template/head.html'
	};
}]);