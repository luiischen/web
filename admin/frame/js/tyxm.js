/**
 * @author By Lyq
 * @date By 2016-01-11
 * @content By 体育项目管理
 */
$(function() {
	$('#tab').datagrid({
		url: linpoo.herf.sport.sport,
		method: "post",
		title: '体育项目列表',
		queryParams: {
			'item_name': ''
		},
		fitColumns: true,
		collapsible: true, //是否可折叠的
		fit: true, //自动大小
		nowrap: false,
		rownumbers: false,
		singleSelect: true,
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
					total: data.data.sport_item.length,
					rows: data.data.sport_item
				}
				return value;
			} else {
				alert(data.header.msg)
			}
		},
		columns: [
			[{
				field: 'type',
				title: '类别',
				width: 80,
				align: 'center',
				formatter: function(v, r) {
					if (v == '0') {
						return '国家项目';
					} else if (v == '1') {
						return '个性化项目';
					}
				}
			}, {
				field: 'icon',
				title: 'APP图标',
				width: 80,
				align: 'center',
				formatter: function(v, r) {
					return '<img src="'+v+'" width="40"/>';
				}
			}, {
				field: 'health_item',
				title: '所属健康指标',
				width: 80,
				align: 'center'
			}, {
				field: 'name',
				title: '体育项目',
				width: 80,
				align: 'center'
			}, {
				field: 'unit',
				title: '单位',
				width: 80,
				align: 'center'
			}, {
				field: 'training_direction',
				title: '训练方向',
				width: 80,
				align: 'center'
			}, {
				field: 'item_id',
				title: '操作',
				width: 80,
				align: 'center',
				formatter: function(v, r) {
					var id="'"+r.item_id+"'";
					var a = '<a href="###" onclick="pfList('+id+')">评分标准管理</a>';
					return a;
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
		'item_name': $("#indexName").val()
	})
}

function add() {
	OpenWin('新增项目', linpoo.ele, 380, 200, true);
	fnmodel("");
	linpoo.src = linpoo.herf.sport.addSport;
	linpoo.boon = [ $("#healthN"), $("#tryNo"), $("#tryCon"), $("#units")];
	linpoo.addD = {
		"type": $(".tk").find("[name=type]"),
		"health_item": $("#healthN"),
		"item_id": $('#tryNo'),
		"name": $("#tryCon"),
		"unit": $("#units"),
		"training_direction": $("#direction"),
		"icon": $("#app"),
		"nb_icon": $("#app2"),
		"training_guide": $("#zd")
	};
}

function edit() {
	var rows = $("#tab").datagrid('getSelected');
	if (rows) {
		OpenWin('编辑项目', linpoo.ele, 380, 200, true);
		fnmodel(rows.health_item);
		$('#tryNo').val(rows.item_id);
		$("#tryCon").val(rows.name);
		$("#units").val(rows.unit);
		$("#direction").val(rows.training_direction);
		$("#app").val(rows.icon);
		$("#app2").val(rows.nb_icon);
		$("#zd").val(rows.training_guide);
		$(".cc").eq(rows.type).prop("checked","true");
		
		linpoo.src = linpoo.herf.sport.editSport;
	    linpoo.boon = [$("#healthN"), $("#tryNo"), $("#tryCon"), $("#units")];
		linpoo.addD = {
			"type": $(".tk").find("[name=type]:checked"),
			"health_item": $("#healthN"),
			"item_id": $('#tryNo'),
			"name": $("#tryCon"),
			"unit": $("#units"),
			"training_direction": $("#direction"),
			"icon": $("#app"),
			"nb_icon": $("#app2"),
			"training_guide": $("#zd"),
			"id": rows.id
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
				$.post(linpoo.herf.sport.delSport, {"id":rows.id}, function(data) {
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
	if (addD.type) over.type = $(".tk").find("[name=type]:checked").val();
	if (addD.is_dev) over.is_dev = $(".tk").find("[name=good]:checked").val();
	if (addD.suitable_grade) over.suitable_grade = addD.suitable_grade.val();
	if (addD.health_item) over.health_item = addD.health_item.find("option:selected").text();
	if (addD.item_id) over.item_id = addD.item_id.val();
	if (addD.name) over.name = addD.name.val();
	if (addD.unit) over.unit = addD.unit.val();
	if (addD.training_direction) over.training_direction = addD.training_direction.val();
	if (addD.icon) over.icon = addD.icon.val();
	if (addD.nb_icon) over.nb_icon = addD.nb_icon.val();
	if (addD.training_guide) over.training_guide = addD.training_guide.val();
	if (addD.id) over.id = addD.id;
	return over;
}

function pfList(id) {
	localStorage.level = id;
	if ($('#wd').length == 0)
		$('body').append('<div id="wd"><iframe id="wd_frame" scrolling="no" frameborder="0" src="" style="width:100%;height:98%;"/></div>');
	$('#wd_frame')[0].src = "pfbz.html";
	$('#wd').window({
		title: "评分标准列表",
		modal: true,
		minimizable: false,
		maximizable: true,
		collapsible: false,
		resizable: true,
		fit: true,
		width: 380,
		height: 200
	});
	$('#wd').window('open');
	$("#qR").css("display", "none");
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

function fnmodel(row) {
	$.ajax({
		type:"post",
		url:linpoo.herf.health.health,
		async:true,
		success:function(data){
			if (data.header.code == 200) {
					for (var key in data.data.health_item) {
						$("#healthN").append("<option value='" + data.data.health_item[key].health_item + "'>" + data.data.health_item[key].health_item + "</option>")
					}
					if(row!="")  $("#healthN").find("option[value="+row+"]").prop("selected",true);
				} else {
					alert(data.header.msg)
				}
		}
	});
}