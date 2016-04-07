/**
 * @author By Lyq
 * @date By 2016-01-11
 * @content By 评分标准
 */
$(function() {
	$('#tab').datagrid({
		url: linpoo.herf.level.level,
		method: "post",
		queryParams: {
			'item_id': localStorage.level
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
					total: data.data.score_level.length,
					rows: data.data.score_level
				}
				return value;
			} else {
				alert(data.header.msg)
			}
		},
		columns: [
			[{
				field: 'grade',
				title: '适合年级',
				width: 80,
				align: 'center',
				formatter: function(v, r) {
					switch (v){
						case "1":
						    return "一年级";
							break;
						case "2":
						    return "二年级";
							break;
						case "3":
						    return "三年级";
							break;
						case "4":
						    return "四年级";
							break;
						case "5":
						    return "五年级";
							break;
						case "6":
						    return "六年级";
							break;
						default:
						    return "所有年级";
							break;
					}
				}
			}, {
				field: 'is_dev',
				title: '最佳发展项目',
				width: 80,
				align: 'center',
				formatter: function(v, r) {
					if (v == '1') {
						return '是';
					} else {
						return '否';
					}
				}
			}, {
				field: 'sex',
				title: '性别',
				width: 80,
				align: 'center',
				formatter: function(v, r) {
					if (v == '1') {
						return '男';
					} else
					if (v == "2") {
						return '女';
					} else {
						return '未设置';
					}
				}
			}, {
				field: 'record',
				title: '成绩',
				width: 80,
				align: 'center'
			}, {
				field: 'score',
				title: '得分',
				width: 80,
				align: 'center'
			}, {
				field: 'level',
				title: '等级',
				width: 80,
				align: 'center',
				formatter: function(v, r) {
					if (v == '4') {
						return '满分';
					}
					if (v == '3') {
						return '优秀';
					}
					if (v == '2') {
						return '良好';
					}
					if (v == '1') {
						return '及格';
					}
					if (v == '0') {
						return '不及格';
					}
				}
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
	$("#tab").datagrid('load', {
		'item_id': localStorage.level
	})
}

function add() {
	OpenWin('新增标准', linpoo.ele, 380, 200, true);
	linpoo.src = linpoo.herf.level.addLevel;
	linpoo.boon = [$("#gradeId"),$("#record"), $("#score")];
	linpoo.addD = {
		'item_id': localStorage.level,
		"grade": $("#gradeId"),
		"is_dev": $(".tk").find("[name=good]"),
		"sex": $(".tk").find("[name=sex]"),
		"level": $(".tk").find("[name=model]"),
		"record": $('#record'),
		"score": $("#score")
	};
}

function edit() {
	var rows = $("#tab").datagrid('getSelected');
	if (rows) {
		OpenWin('编辑标准', linpoo.ele, 380, 200, true);
		$("#gradeId").val(rows.grade);
		$(".sex").eq(rows.sex-1).prop("checked","true");
		$(".model").eq(rows.level).prop("checked","true");
		$('#record').val(rows.record);
		$('#score').val(rows.score);
		if(rows.is_dev=="0"){
			$(".dd").eq(1).prop("checked","true");
		}else{
			$(".dd").eq(0).prop("checked","true");
		}
		linpoo.src = linpoo.herf.level.editLevel;
		linpoo.boon = [$("#gradeId"),$("#record"), $("#score")];
		linpoo.addD = {
			'id': rows.id,
			'item_id': localStorage.level,
			"grade": $("#gradeId"),
			"is_dev": $(".tk").find("[name=good]:checked"),
			"sex": $(".tk").find("[name=sex]"),
			"level": $(".tk").find("[name=model]"),
			"record": $('#record'),
			"score": $("#score")
		};
	} else {
		$.messager.alert('系统提示', '请选择一项进行编辑', 'warning');
	}
}

function del() {
	var rows = $("#tab").datagrid('getSelected');
	if (rows) {
		$.messager.confirm('提示', '是否删除选中数据？', function(s) {
			if (s) {
				$.post(linpoo.herf.level.delLevel, {"id": rows.id}, function(data) {
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
	if (addD.id) over.id = addD.id;
	if (addD.item_id) over.item_id = addD.item_id;
	if (addD.is_dev) over.is_dev = $(".tk").find("[name=good]:checked").val();
	if (addD.suitable_grade) over.suitable_grade = addD.suitable_grade.val();
	if (addD.grade) over.grade = addD.grade.val();
	if (addD.sex) over.sex = $(".tk").find("[name=sex]:checked").val();
	if (addD.level) over.level = $(".tk").find("[name=model]:checked").val();
	if (addD.record) over.record = addD.record.val();
	if (addD.score) over.score = addD.score.val();
	return over;
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
	console.log(addData(linpoo.addD));
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