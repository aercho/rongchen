jQuery(document).ready(function($) {
	$(".login_a").click(function(event) {
		$("#login").dialog({
			width: 240,
			height: 380,
			modal: true,
			title: '登陆送纸盒',
		});
		$(".reg").dialog('close');
		$(".find_pass").dialog('close');
	});
	$(".reg_a").click(function(event) {
		$("#reg").dialog({
			width: 240,
			height: 380,
			modal: true,
			title: '注册送纸盒',
		});
		$("#login").dialog('close');
		$("#find_pass").dialog('close');
	});
	$(".find_pass").click(function(event) {
		$("#find_pass").dialog({
			width: 240,
			height: 360,
			modal: true,
			title: '找回密码',
		});
		$("#login").dialog('close');
		$("#reg").dialog('close');
	});

	$('.uEditorCustom').uEditor({
		width: 520,
		heitht: 500,
	});
});