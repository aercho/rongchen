'use strict'

angular.module('app').directive("appFoot", [function() {
	return {
		restrict: "A", //该指令作为属性
		replace: true, //是否替换DOM元素
		templateUrl: 'view/template/foot.html' //模板路径
	}
}])