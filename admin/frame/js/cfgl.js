/**
 * @author By Lyq
 * @date By 2016-01-11
 * @content By 处方管理
 */
$(function() {
	$('#tab').datagrid({
		url: '../test4.json',
		method: 'get',
		title: '处方列表',
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
				field: 'question',
				title: '问题',
				width: 80,
				align: 'center'
			}, {
				field: 'solve',
				title: '运动建议',
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
	$("#tab").datagrid('reload')
}

function add() {
	OpenWin('新增建议', ele, 380, 200, true);
	$(".tk").find("[name=solve]").text("最佳发展项目指数均为4以上，身体形态标准，其他指数均在4以上。");
	$(".tk").find("[name=question]").attr("value", "");
	chengeSelect();
	//	var ele = $(".mb").html();
	//	OpenWin('新增处方', ele, 380, 200, true);
}

function edit() {
	var rows = $("#tab").datagrid('getSelections');
	if (rows.length == 1) {
		OpenWin('编辑建议', ele, 380, 200, true);
		$(".tk").find("[name=solve]").text(rows[0].solve);
		$(".tk").find("[name=question]").attr("value", rows[0].question);
		chengeSelect();
		//		var ele = $(".mb").html();
		//		OpenWin('编辑处方', ele, 380, 200, true);
	} else {
		$.messager.alert('系统提示', '请选择一项进行编辑', 'warning');
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
				$.post('question!delete.action', "ids=" + parm, function(data) {
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
function ops(url) {
	var options = {
		url: url,
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
	return options;
}
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
			$("#form").ajaxSubmit(ops("1.php"));
		}
	}
	return false;
}
//生成处方
function chengeSelect() {
	var arr = ["最佳发展项目指数均为4以上", "身体形态标准", "其他指数均在4以上"];
	$(".sel").each(function(i, r) {
		$(this).change(function() {
			var t = $(this).val();
			var op = $(this).find("[value=" + t + "]").text();
			switch (i) {
				case 0:
					arr[i] = "最佳发展项目" + op;
					break;
				case 1:
					arr[i] = "身体形态" + op;
					break;
				case 2:
					arr[i] = "其他体能项目" + op;
					break;
				default:
					alert("出错了！");
					break;
			}
			$("[name=solve]").text(arr);
		})
	})
}