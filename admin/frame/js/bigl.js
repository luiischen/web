/**
 * @author By Lyq
 * @date By 2016-01-11
 * @content By 班级管理
 */
$(function() {
	$('#tab').datagrid({
		url: linpoo.herf.classR.classR,
		title: '班级列表',
		queryParams: {
			'class_id': '',
			'cls':'',
			'grade': ''
		},
		fitColumns: true,
		singleSelect: true,
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
		loadFilter: function(data) {
			if (data.header.code == 200) {
				var value = {
					total: data.data.cls.length,
					rows: data.data.cls
				}
				return value;
			} else {
				alert(data.header.msg)
			}
		},
		columns: [
			[{
				field: 'class_id',
				title: '班级编号',
				width: 80,
				align: 'center'
			}, {
				field: 'cls',
				title: '班级',
				width: 80,
				align: 'center'
			}, {
				field: 'grade',
				title: '年级',
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
	linpoo.ele = $(".mb").html();
	$(".mb").remove();
});

function searchData() {
//	$("#tab").datagrid('load', {
//		'banji.banjiName': $("#banjiName").val(),
//		'banji.gradeId': $("#gradeId").val()
//	})
    $("#tab").datagrid("reload");
}
//确定添加
function add() {
	OpenWin('新增班级', linpoo.ele, 380, 200, true);
	for (var i = 0; i < $(".tk").find("input").length; i++) {
		$($(".tk").find("input")[i]).attr("value", "");
	}
	fnmodel()
	linpoo.src = linpoo.herf.classR.addClassR;
	linpoo.boon = [$("#classNo"), $("#classN")];
	linpoo.addD = {
		"class_id": $("#classNo"),
		"cls": $("#classN"),
		"grade": $("#grade")
	};
}
//增加
//function edit() {
//	var rows = $("#tab").datagrid('getSelections');
//	if (rows.length==1) {
//		OpenWin('编辑班级', linpoo.ele, 380, 200, true);
//		$(".tk").find("[name=gradeId]").val(rows[0].grade)
//		$(".tk").find("[name=banjiNo]").attr("value",rows[0].classNo)
//		$(".tk").find("[name=banjiName]").attr("value",rows[0].class)
//	} else {
//		$.messager.alert('系统提示', '请选择一项进行编辑', 'warning');
//	}
//}
//删除
function del() {
	var rows = $("#tab").datagrid('getSelected');
	if (rows) {
		$.messager.confirm('提示', '是否删除选中数据？', function(s) {
			if (s) {
				$.post(linpoo.herf.classR.delClassR, {
					"class_id": rows.class_id
				}, function(data) {
					if (data.header.code == 200) {
						if (data.data.result == "0") {
							$('#tab').datagrid('reload');
							Message('操作成功!');
						} else {
							Message('操作失败!');
						}
					} else {
						alert(data.header.msg)
					}
				}, 'json')
			}
		})
	} else {
		$.messager.alert('系统提示', '请选中删除项', 'warning');
	}
}
//非空判断
function test(boon) {
	for (var i = 0; i < boon.length; i++) {
		if (boon[i].val() == "") {
			return false;
		}
	}
	return true;
}

function addData(addD) {
	var over = {};
	if (addD.class_id) over.class_id = addD.class_id.val();
	if (addD.cls) over.cls = addD.cls.val();
	if (addD.grade) over.grade = addD.grade.find("option:selected").text();
	if (addD.id) over.id = addD.id;
	return over;
}
function fnmodel() {
	$.ajax({
		type:"post",
		url:linpoo.herf.grade.grade,
		async:true,
		success:function(data){
			if (data.header.code == 200) {
				for (var key in data.data.grade) {
					$("#grade").append("<option value='" + key + "'>" + data.data.grade[key].grade + "</option>")
				}
			} else {
				alert(data.header.msg)
			}
		},
		error:function(){
			alert("失败！");
		}
	});
}
//确认更改
function ops() {
	var options = {
		url: linpoo.src,
		type: 'post',
		data: addData(linpoo.addD),
		success: function(result) {
			if(result.header.code == 200){
				if(result.data.result == "0"){
					CloseWin();
				    parent.$('#tab').datagrid('reload');
				    parent.Message('操作成功！');
				}else{
					CloseWin();
				    parent.Message('操作失败！');
				}
			}else{alert(result.header.msg)}
			$('#mask').remove();
			$('#mask-msg').remove();
		},
		error: function() {
			alert("发送失败！")
		}
	};
	return options;
}

function onOk() {
	if (test(linpoo.boon)) {
		var mask = '<div style="display:block" class="datagrid-mask"  id="mask"></div>' +
			'<div  id="mask-msg" style="display: block; left: 50%; margin-left: -85.5px;" class="datagrid-mask-msg">正在处理，请稍待。。。</div>';
		$('#win').append(mask);
		$.ajax(ops());
	}
}