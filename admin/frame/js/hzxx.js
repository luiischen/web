/**
 * @author By Lyq
 * @date By 2016-01-11
 * @content By 合作学校管理
 */
$(function() {
	$('#tab').datagrid({
		url: linpoo.herf.contract.contract,
		method: 'post',
		title: '合作学校列表',
		queryParams: {
			'district': '',
			'school': '',
			'city': '',
			'province': ''
		},
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
		singleSelect: true,
		showFooter: true,
		pagination: true,
		pageSize: 20,
		pageList: [10, 20, 30, 40, 50],
		loadFilter: function(data) {
			if (data.header.code == 200) {
				for(var key in data.data.cooperate_school){
					if(data.data.cooperate_school[key].protocol_end==""){
					data.data.cooperate_school[key].dateE="0";
				}else{
					var now=new Date().getTime();
					var end=new Date(data.data.cooperate_school[key].protocol_end).getTime();
					var days=Math.ceil((end-now)/(1000*60*60*24));
					if(days<0){
						data.data.cooperate_school[key].dateE="0";
					}else{
						data.data.cooperate_school[key].dateE=days;
					}
				}
				}
				var value = {
					total: data.data.cooperate_school.length,
					rows: data.data.cooperate_school
				}
				console.log(data.data.cooperate_school)
				return value;
			} else {
				alert(data.header.msg)
			}
		},
		columns: [
			[{
				field: 'school',
				title: '学校名称',
				width: 80,
				align: 'center'
			},{
				field: 'account',
				title: '账号',
				width: 80,
				align: 'center'
			}, {
				field: 'protocol_start',
				title: '协议生效日期',
				width: 80,
				align: 'center'
			}, {
				field: 'protocol_end',
				title: '协议失效日期',
				width: 80,
				align: 'center'
			}, {
				field: 'dateE',
				title: '剩余天数',
				width: 80,
				align: 'center'
			}, {
				field: 'is_tryout',
				title: '是否试用',
				width: 80,
				align: 'center',
				formatter: function(v,r){
					if(v==1){
						return "是";
					}else{
						return "否";
					}
				}
			},  {
				/*field: 'status',
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
			}, {*/
				field: 'remind_day',
				title: '到期提醒',
				width: 80,
				align: 'center'
			},{
				field: 'province',
				title: '省',
				width: 80,
				align: 'center'
			}, {
				field: 'city',
				title: '市',
				width: 80,
				align: 'center'
			}, {
				field: 'district',
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
	linpoo.ele = $(".mb").html();
	$(".mb").remove();
});

function searchData() {
	var district = $("#schoolCountyId").find("option:selected").text();
	var city = $("#schoolCityId").find("option:selected").text();
	var province = $("#schoolProvinceId").find("option:selected").text();
	district = district == "--全部--" ? "" : district;
	city = city == "--全部--" ? "" : city;
	province = province == "--全部--" ? "" : province;
	$("#tab").datagrid('load', {
		'district': district,
		'school': $("#schoolName").val(),
		'city': city,
		'province': province
	})
}
//密码重置
function setR(){
	var rows = $("#tab").datagrid('getSelected');
	if (rows) {
		$.messager.confirm('提示', '是否重置账号：'+rows.account+'的密码？', function(s) {
			if (s) {
				$.post(linpoo.herf.contract.resetC, {"id": rows.id}, function(data) {
					if (data.header.code == 200) {
						if (data.data.result == "0") {
							$('#tab').datagrid('reload');
							Message('重置成功!');
						} else {
							Message('重置失败!');
						}
					} else {
						alert(data.header.msg)
					}
				}, 'json')
			}
		})
	} else {
		$.messager.alert('系统提示', '请选中需要重置密码的账号', 'warning');
	}
}
//确定添加
function add() {
	OpenWin('新增学校', linpoo.ele, 380, 200, true);
	fnmodel();
	linpoo.src = linpoo.herf.contract.addContract;
	linpoo.boon = [$("#schoolN"), $("#account"),$("#passW"), $("#dateS"), $("#dateE"), $("#due"), $("#province"), $("#city"), $("#county")];
	linpoo.addD = {
		"school": $("#schoolN"),
		"id": $("#schoolN"),
		"account": $('#account'),
		"password": $("#passW"),
		"protocol_start": $("#dateS"),
		"protocol_end": $("#dateE"),
		"status": $("#is_do"),
		"is_tryout": $("#is_test"),
		"remind_day": $("#due")
	};
}
//增加
function edit() {
	var rows = $("#tab").datagrid('getSelected');
	if (rows) {
		OpenWin('编辑数据', linpoo.ele, 380, 200, true);
		$(".tk").find("#row1").find("td").text(rows.school);
		$(".tk").find("#dateS").attr("value", rows.protocol_start);
		$(".tk").find("#dateE").attr("value", rows.protocol_end);
		$(".tk").find("#is_do").attr("value", rows.status);
		$(".tk").find("#is_test").attr("value", rows.is_tryout);
		$(".tk").find("#due").attr("value",rows.remind_day);
		linpoo.src = linpoo.herf.contract.editContract;
		linpoo.boon = [$("#dateS"), $("#dateE"), $("#due")];
		linpoo.addD = {
			"id": rows.id,
			"protocol_start": $("#dateS"),
			"protocol_end": $("#dateE"),
			"status": $("#is_do"),
			"is_tryout": $("#is_test"),
			"remind_day": $("#due")
		};
	} else {
		$.messager.alert('系统提示', '请选择一项进行编辑', 'warning');
	}
}
//删除
function del() {
	var rows = $("#tab").datagrid('getSelected');
	if (rows) {
		$.messager.confirm('提示', '是否删除选中数据？', function(s) {
			if (s) {
				$.post(linpoo.herf.contract.delContract, {"id": rows.id}, function(data) {
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
$(document).ready(function() {
	$.ajax({
		type: "post",
		url: linpoo.herf.area.province,
		async: true,
		success: function(data) {
			if (data.header.code == 200) {
				for (var key in data.data.province) {
					$("#schoolProvinceId").append("<option value='" + key + "'>" + data.data.province[key].province + "</option>")
				}
			} else {
				alert(data.header.msg)
			}
		}
	});
	$("#schoolProvinceId").change(function() {
		var pid = $(this).val();
		var pro = $(this).find("option:selected").text();
		$("#schoolCityId option").remove();
		$("#schoolCityId").append('<option value="">--全部--</option>');
		if (pid != "") {
			$.post(linpoo.herf.area.city, {
				"province": pro
			}, function(data) {
				if (data.header.code == 200) {
					for (var key in data.data.city) {
						$("#schoolCityId").append("<option value='" + key + "'>" + data.data.city[key].city + "</option>")
					}
				} else {
					alert(data.header.msg)
				}
			})
		}else{$("#schoolCountyId").val("")};
	});
	$("#schoolCityId").change(function() {
		var pid = $(this).val();
		var pcy = $("#schoolProvinceId").find("option:selected").text();
		var pro = $(this).find("option:selected").text();
		$("#schoolCountyId option").remove();
		$("#schoolCountyId").append('<option value="">--全部--</option>');
		if (pid != "") {
			$.post(linpoo.herf.area.district, {
				"province": pcy,
				"city": pro
			}, function(data) {
				if (data.header.code == 200) {
					for (var key in data.data.district) {
						$("#schoolCountyId").append("<option value='" + key + "'>" + data.data.district[key].district + "</option>")
					}
				} else {
					alert(data.header.msg)
				}
			})
		}
	})
})

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
	if (addD.school) over.school = addD.school.find("option:selected").text();
	if (addD.province) over.province = addD.province.find("option:selected").text();
	if (addD.city) over.city = addD.city.find("option:selected").text();
	if (addD.district) over.district = addD.district.find("option:selected").text();
	if (addD.account) over.account = addD.account.val();
	if (addD.remind_day) over.remind_day = addD.remind_day.val();
	if (addD.protocol_start) over.protocol_start = addD.protocol_start.val();
	if (addD.protocol_end) over.protocol_end = addD.protocol_end.val();
	if (addD.status) over.status = addD.status.val();
	if (addD.is_tryout) over.is_tryout = addD.is_tryout.val();
	if (addD.id) over.id = addD.id;
	return over;
}

//确认更改
function ops() {
	var options = {
		url: linpoo.src,
		type: 'post',
		data: addData(linpoo.addD),
		success: function(result) {
			console.log(result)
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

function fnmodel() {
	$.ajax({
		type: "post",
		url: linpoo.herf.area.province,
		async: true,
		success: function(data) {
			if (data.header.code == 200) {
				for (var key in data.data.province) {
					$("#province").append("<option value='" + key + "'>" + data.data.province[key].province + "</option>")
				}
			} else {
				alert(data.header.msg)
			}
		}
	});
	$("#province").change(function() {
		var pid = $(this).val();
		var pro = $(this).find("option:selected").text();
		$("#city option").remove();
		$("#city").append('<option value="">--请选择--</option>');
		if (pid != "") {
			$.post(linpoo.herf.area.city, {
				"province": pro
			}, function(data) {
				if (data.header.code == 200) {
					for (var key in data.data.city) {
						$("#city").append("<option value='" + key + "'>" + data.data.city[key].city + "</option>")
					}
				} else {
					alert(data.header.msg)
				}
			})
		}
	});
	$("#city").change(function() {
		var pid = $(this).val();
		var pcy = $("#province").find("option:selected").text();
		var pro = $(this).find("option:selected").text();
		$("#county option").remove();
		$("#county").append('<option value="">--请选择--</option>');
		if (pid != "") {
			$.post(linpoo.herf.area.district, {
				"province": pcy,
				"city": pro
			}, function(data) {
				if (data.header.code == 200) {
					for (var key in data.data.district) {
						$("#county").append("<option value='" + key + "'>" + data.data.district[key].district + "</option>")
					}
				} else {
					alert(data.header.msg)
				}
			})
		}
	})
	$("#county").change(function(){
		$.ajax({
				type: "post",
				url: linpoo.herf.school.school,
				data:{
					'district': $("#county").find("option:selected").text(),
					'school': '',
					'city': $("#city").find("option:selected").text(),
					'province': $("#province").find("option:selected").text()
				},
				async: true,
				success: function(data) {
					console.log(data)
					if (data.header.code == 200) {
						for (var key in data.data.school) {
							$("#schoolN").append("<option value='" + data.data.school[key].id + "'>" + data.data.school[key].school + "</option>")
						}
					} else {
						alert(data.header.msg)
					}
				}
			});
	})
//	$("#schoolN").on("click",function(){
//		var swich="off";
//		if($("#county").val()!=""&&swich=="off"){
//			$.ajax({
//				type: "post",
//				url: linpoo.herf.school.school,
//				data:{
//					'district': $("#county").find("option:selected").text(),
//					'school': '',
//					'city': $("#city").find("option:selected").text(),
//					'province': $("#province").find("option:selected").text()
//				},
//				async: true,
//				success: function(data) {
//					console.log(data)
//					if (data.header.code == 200) {
//						for (var key in data.data.school) {
//							$("#schoolN").append("<option value='" + data.data.school[key].id + "'>" + data.data.school[key].school + "</option>")
//						}
//					} else {
//						alert(data.header.msg)
//					}
//				}
//			});
//		}else{$.messager.alert('系统提示', '请先选中地区', 'warning');}
//	})
}