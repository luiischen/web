/**
 * @author By Lyq
 * @date By 2016-01-11
 * @content By 试用学校管理
 */
$(function() {
	$('#tab').datagrid({
		url: '../test6.json',
		method: 'get',
		title: '合作学校列表',
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
				field: 'schoolName',
				title: '学校名称',
				width: 80,
				align: 'center'
			},{
				field: 'account',
				title: '账号',
				width: 80,
				align: 'center'
			}, {
				field: 'dateS',
				title: '协议生效日期',
				width: 80,
				align: 'center'
			}, {
				field: 'days',
				title: '试用天数',
				width: 80,
				align: 'center'
			}, {
				field: 'sub',
				title: '剩余天数',
				width: 80,
				align: 'center'
			}, {
				field: 'dateE',
				title: '协议失效日期',
				width: 80,
				align: 'center'
			}, {
				field: 'skip',
				title: '是否启用',
				width: 80,
				align: 'center',
				formatter: function(v,r){
					if(v==1){
						return "是";
					}else{
						return "否";
					}
				}
			}, {
				field: 'due',
				title: '到期提醒',
				width: 80,
				align: 'center'
			},{
				field: 'provinceName',
				title: '省',
				width: 80,
				align: 'center'
			}, {
				field: 'cityName',
				title: '市',
				width: 80,
				align: 'center'
			}, {
				field: 'countyName',
				title: '区',
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
	window.ele = $(".mb").html();
	$(".mb").remove();
});

function searchData() {
	$("#tab").datagrid('load', {
		'schoolName': $("#schoolName").val(),
		'schoolProvinceId': $("#schoolProvinceId").val(),
		'schoolCityId': $("#schoolCityId").val(),
		'schoolCountyId': $("#schoolCountyId").val()
	})
}
//确定添加
function add() {
	OpenWin('新增学校', ele, 380, 200, true);
	for (var i = 0; i < $(".tk").find("input").length; i++) {
		$($(".tk").find("input")[i]).attr("value", "");
	}	
}
//增加
function edit() {
	var rows = $("#tab").datagrid('getSelections');
	if (rows.length==1) {
		OpenWin('编辑数据', ele, 380, 200, true);
		$(".tk").find("[name=schoolName]").attr("value", rows[0].schoolName);
		$(".tk").find("[name=account]").attr("value", rows[0].account);
		$(".tk").find("[name=dateS]").attr("value", rows[0].dateS);
		$(".tk").find("[name=days]").attr("value", rows[0].days);
		$(".tk").find("[name=due]").attr("value", rows[0].due);
	} else {
		$.messager.alert('系统提示', '请选择一项进行编辑', 'warning');
	}
}
//删除
function del() {
	var rows = $("#tab").datagrid('getSelections');
	if (rows.length) {
		$.messager.confirm('提示', '是否删除选中数据？', function(s) {
			if (s) {
				var parm = [];
				$.each(rows, function(n, row) {
					parm.push(row.id);
				})
				$.post('XX', {
					"ids": parm
				}, function(data) {
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