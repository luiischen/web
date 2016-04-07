/**
 * @author By Lyq
 * @date By 2016-01-11
 * @content By 省市区
 */
$(function() {
	$('#tab').treegrid({
		method: 'get',
		title: '区域树列表',
		onBeforeLoad: function(row, param) {
			if (row) {
				if (param)
					$(this).treegrid('options').url = '../test9.json';
			} else {
				$(this).treegrid('options').url = '../test0.json';
			}
		},
		iconCls: 'icon-ok',
		rownumbers: false,
		fit: true,
		animate: true,
		collapsible: true,
		fitColumns: true,
		idField: 'id',
		treeField: 'name',
		columns: [
			[{
				field: 'id2',
				title: 'ID',
				width: 80,
				align: 'left',
				formatter: function(v, r) {
					return r.id;
				},
			}, {
				field: 'name',
				title: '名字',
				width: 80,
				align: 'left'
			}, {
				field: 'description',
				title: '描述',
				width: 80,
				align: 'center'
			}]
		]
	});

});

function searchData() {
	$("#tab").datagrid('load', {
		areaCode: $("#areaCode").val(),
		description: $("#description").val(),
		name: $("#name").val(),
		pid: $("#pid").val(),
	})
}

function add() {
	for (var i = 0; i < $(".tk").find("input").length; i++) {
		$($(".tk").find("input")[i]).attr("value", "");
	}
	var ele = $(".mb").html();
	OpenWin('新增区域', ele, 380, 280, true);
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
		OpenWin('编辑', ele, 380, 280, true);
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
				$.post('area!delete.action', "ids=" + parm, function(data) {
					if (data.result) {
						$('#tab').treegrid('reload');
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