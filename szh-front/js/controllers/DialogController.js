angular.module("mainApp")
	.controller("showDialogCtrl", function($scope, ngDialog) {
		$scope.clickToDialog = function() {
			ngDialog.openConfirm({
				template: 'views/common/login_dialog.html',
				className: 'ngdialog-theme-default', //对话框类名
				width: 300,
				height: 300
			});
		};
	});