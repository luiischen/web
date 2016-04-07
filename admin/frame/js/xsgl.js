/**
 * @author By Lyq
 * @date By 2016-01-12
 * @content By 学生管理
 */
$(function() {
	$('#tab').datagrid({
		url: '##',
		title: '学生信息列表',
		fitColumns: true,
		collapsible: true, //是否可折叠的 
		fit: true, //自动大小
		nowrap: false,
		rownumbers: false,
		frozenColumns: [
			[{
				field: 'id',
				checkbox: true
			}, ]
		],
		showFooter: true,
		pagination: true,
		pageSize: 20,
		pageList: [10, 20, 30, 40, 50],
		columns: [
			[{
				field: 'headpicBig',
				title: '头像',
				width: 80,
				align: 'center',
				formatter: function(v, r) {
					if (v) {
						var img = '<img width="40px" src="/' + v + '" style="cursor:pointer" onclick="window.open(\'/' + v + '\',\'_blank\')"/>';
						return img;
					}
					return '未上传';
				}
			}, {
				field: 'username',
				title: '姓名',
				width: 80,
				align: 'center'
			}, {
				field: 'schoolName',
				title: '所属学校',
				width: 80,
				align: 'center'
			}, {
				field: 'gradeName',
				title: '年级',
				width: 80,
				align: 'center'
			}, {
				field: 'nation',
				title: '民族',
				width: 80,
				align: 'center'
			}, {
				field: 'sex',
				title: '性别',
				width: 80,
				align: 'center',
				formatter: function(v, r) {
					if (v == '1') return '男';
					if (v == '2') return '女';
					return '-';
				}
			}, {
				field: 'sno',
				title: '学籍号',
				width: 80,
				align: 'center'
			}, {
				field: 'statusName',
				title: '状态',
				width: 80,
				align: 'center'
			}, {
				field: 'cdate',
				title: '添加时间',
				width: 80,
				align: 'center'
			}]
		]
	});
	$('#tab').datagrid('getPager').pagination({
		displayMsg: '当前显示{from} - {to}条记录   共{total}条记录',
		onBeforeRefresh: function(pageNumber, pageSize) {
			$(this).pagination('loading');
			$(this).pagination('loaded');
		}
	});
});

function searchData() {
	$("#tab").datagrid('load', {
		'student.provinceId': $("#student_provinceId").val(),
		'student.lkname': $("#username").val(),
		'student.cityId': $("#student_cityId").val(),
		'student.status': $("#student_status").val(),
		'student.schoolId': $("#student_schoolId").val(),
		'student.countyId': $("#student_countyId").val()
	})
}

function add() {
	for (var i = 0; i < $(".tk").find("input").length; i++) {
		$($(".tk").find("input")[i]).attr("value", "");
	}
	var ele = $(".mb").html();
	OpenWin('新增学生账号', ele, 380, 200, true);
}

function edit() {
	var row = $("#tab").datagrid('getSelected');
	if (row) {
		var arr = [];
		for (var key in row) {
			arr.push(row[key]);
		}
		for (var i in arr) {
			$($(".tk").find("input")[i]).attr("value", arr[i]);
		}
		var ele = $(".mb").html();
		OpenWin('编辑学生账号', ele, 380, 200, true);
	} else {
		$.messager.alert('系统提示', '请选中编辑项', 'warning');
	}
}

function del() {
	var rows = $("#tab").datagrid('getSelections');
	if (rows.length) {
		$.messager.confirm('提示', '是否删除选中数据？', function(s) {
			if (s) {
				var parm = [];
				$.each(rows, function(n, row) {
					parm.push(row.id);
				})
				$.post('student!delete.action', "ids=" + parm, function(data) {
					if (data.result) {
						$('#tab').datagrid('reload');
						Message('操作成功!');
					} else {
						Message('操作失败!');
					}
				}, 'json')
			}
		})
	} else {
		$.messager.alert('系统提示', '请选中删除项', 'warning');
	}
}
$(document).ready(function() {
	$("#student_provinceId").change(function() {
		var pid = $(this).val();
		$("#student_cityId option").remove();
		$("#student_cityId").append('<option value="">--请选择--</option>');
		if (!pid) return;
		AreaAjaxService.selectArea(pid, function(data) {
			if (data && data.length > 0) {
				for (i = 0; i < data.length; i++) {
					var ob = data[i];
					var option = '<option value="' + ob.id + '"   >' + ob.name + '</option>';
					$("#student_cityId").append(option);
				}
			}
		});
	});
	$("#student_cityId").change(function() {
		var pid = $(this).val();
		$("#student_countyId option").remove();
		$("#student_countyId").append('<option value="">--请选择--</option>');
		if (!pid) return;
		AreaAjaxService.selectArea(pid, function(data) {
			if (data && data.length > 0) {
				for (i = 0; i < data.length; i++) {
					var ob = data[i];
					var option = '<option value="' + ob.id + '"   >' + ob.name + '</option>';
					$("#student_countyId").append(option);
				}
			}
		});
	});
	$("#student_countyId").change(function() {
		var provinceId = $("#student_provinceId").val();
		var cityId = $("#student_cityId").val();
		var countyId = $("#student_countyId").val();
		$("#student_schoolId option").remove();
		$("#student_schoolId").append('<option value="">--请选择--</option>');
		if (!countyId) return;
		SchoolAjaxService.queryList(provinceId, cityId, countyId, function(data) {
			if (data && data.length > 0) {
				for (i = 0; i < data.length; i++) {
					var ob = data[i];
					var option = '<option value="' + ob.id + '"   >' + ob.schoolName + '</option>';
					$("#student_schoolId").append(option);
				}
			}
		});
	});
});

function resetData() {
	$('#student_provinceId').val('');
	$('#student_cityId').val('');
	$('#student_countyId').val('');
	$('#student_schoolId').val('');
	$('#username').val('');
}
//确认更改
var options = {
	url: '../1.php',
	type: 'get',
	success: function(result) {
		var resultObj = $.parseJSON(result);
		if (resultObj.result) {
			CloseWin();
			parent.$('#tab').datagrid('reload');
			parent.Message('操作成功！');
		} else {
			CloseWin();
			parent.Message('操作失败！');
		}
		sbm = true;
		$('#mask').remove();
		$('#mask-msg').remove();
	},
	error: function() {
		alert("发送失败！")
	}
};
var sbm = false;

function onOk() {
	if (!sbm) {
		var bool = true;
		for (var i = $(".req").length / 2; i < $(".req").length; i++) {
			if ($(".req")[i].value == "") {
				bool = false;
			}
		}
		if (bool) {
			var mask = '<div style="display:block" class="datagrid-mask"  id="mask"></div>' +
				'<div  id="mask-msg" style="display: block; left: 50%; margin-left: -85.5px;" class="datagrid-mask-msg">正在处理，请稍待。。。</div>';
			$('#win').append(mask);
			$("#form").ajaxSubmit(options);
		}
	}
	return false;
}