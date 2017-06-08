'use strict';

angular.module('app', ["ui.router"]);
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
'use strict'

angular.module("app").controller("mainCtrl", function($scope) {
	// $scope.list = [{
	// 	id: '1',
	// 	name: "销售",
	// 	imgSrc: "image/company-1.png"
	// 	companyName: "千度"，
	// 	city: "上海",
	// 	industry: "互联网",
	// 	time: "2016-06-01 11:05"
	// }, {
	// 	id: '2',
	// 	name: "销售",
	// 	imgSrc: "image/company-2.png"
	// 	companyName: "千度"，
	// 	city: "北京",
	// 	industry: "互联网",
	// 	time: "2016-06-01 11:05"
	// }, {
	// 	id: '3',
	// 	name: "销售",
	// 	imgSrc: "image/company-3.png"
	// 	companyName: "千度"，
	// 	city: "上海",
	// 	industry: "互联网",
	// 	time: "2016-06-01 11:05"
	// }];
});
'use strict'

angular.module('app').directive("appFoot", [function() {
	return {
		restrict: "A", //该指令作为属性
		replace: true, //是否替换DOM元素
		templateUrl: 'view/template/foot.html' //模板路径
	}
}])
'use strict'
//注意定义指令名要与模板中的指令名相同，-换成大写字母
angular.module("app").directive("appHead", [function() {
	return {
		restrict: "A",
		replace: true,
		templateUrl: 'view/template/head.html'
	};
}]);
'use strict'

angular.module('app').directive("appPositionList", [function() {
	return {
		restrict: "A", //该指令作为属性
		replace: true, //是否替换DOM元素
		templateUrl: 'view/template/positionList.html' //模板路径
	}
}])