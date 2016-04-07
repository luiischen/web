/**
 * @author By Lyq
 * @date By 2016-01-11
 * @content By 学校管理
 */
$(function() {
	$('#tab').datagrid({
		url: linpoo.herf.school.school,
		method: "post",
		title: '学校列表',
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
				var value = {
					total: data.data.school.length,
					rows: data.data.school
				}
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
			}, {
				field: 'is_cooperate',
				title: '合作学校',
				width: 80,
				align: 'center',
				formatter: function(v, r) {
					if (v == '1') {
						return '是';
					}
					if (v == '0') {
						return '否';
					}
				}
			}, {
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
	var district = $("#school_countyId").find("option:selected").text();
	var city = $("#school_cityId").find("option:selected").text();
	var province = $("#school_provinceId").find("option:selected").text();
	district = district == "--请选择--" ? "" : district;
	city = city == "--请选择--" ? "" : city;
	province = province == "--请选择--" ? "" : province;
	$("#tab").datagrid('load', {
		'district': district,
		'school': $("#schoolName").val(),
		'city': city,
		'province': province
	})
}

function add() {
	OpenWin('新增学校', linpoo.ele, 380, 200, true);
	for (var i = 0; i < $(".tk").find("input").length; i++) {
		$($(".tk").find("input")[i]).attr("value", "");
	}
	fnmodel();
	linpoo.src = linpoo.herf.school.addSchool;
	linpoo.boon = [$("#schoolP"), $("#schoolM"), $("#schoolA"), $("#schoolC")];
	linpoo.addD = {
		"school": $("#schoolM"),
		"province": $("#schoolP"),
		"city": $("#schoolC"),
		"district": $("#schoolA"),
		"is_cooperate": $('#schoolW')
	};
}

function edit() {
	var rows = $("#tab").datagrid('getSelected');
	if (rows) {
		OpenWin('编辑学校', linpoo.ele, 380, 200, true);
		$(".tk").find("#row1").remove();
		$(".tk").find("#row2").remove();
		$(".tk").find("#row3").remove();
		$(".tk").find("input").attr("value", rows.school);
		$(".tk").find("[name=is_cooperate]").find("option").eq(rows.is_cooperate).siblings("option").prop("selected",true);
		linpoo.src = linpoo.herf.school.editSchool;
		linpoo.boon = [$("#schoolM")];
		linpoo.addD = {
			"school": $("#schoolM"),
			"is_cooperate": $('#schoolW'),
			"id": rows.id
		}
	} else {
		$.messager.alert('系统提示', '请选择一项进行编辑', 'warning');
	}
}

function del() {
	var rows = $("#tab").datagrid('getSelected');
	if (rows) {
		$.messager.confirm('提示', '是否删除选中数据？', function(s) {
			if (s) {
				$.post(linpoo.herf.school.delSchool, {"id": rows.id}, function(data) {
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
					$("#school_provinceId").append("<option value='" + key + "'>" + data.data.province[key].province + "</option>")
				}
			} else {
				alert(data.header.msg)
			}
		}
	});
	$("#school_provinceId").change(function() {
		var pid = $(this).val();
		var pro = $(this).find("option:selected").text();
		$("#school_cityId option").remove();
		$("#school_cityId").append('<option value="">--请选择--</option>');
		if (pid != "") {
			$.post(linpoo.herf.area.city, {
				"province": pro
			}, function(data) {
				if (data.header.code == 200) {
					for (var key in data.data.city) {
						$("#school_cityId").append("<option value='" + key + "'>" + data.data.city[key].city + "</option>")
					}
				} else {
					alert(data.header.msg)
				}
			})
		}else{$("#schoolCountyId").val("")};
	});
	$("#school_cityId").change(function() {
		var pid = $(this).val();
		var pcy = $("#school_provinceId").find("option:selected").text();
		var pro = $(this).find("option:selected").text();
		$("#school_countyId option").remove();
		$("#school_countyId").append('<option value="">--请选择--</option>');
		if (pid != "") {
			$.post(linpoo.herf.area.district, {
				"province": pcy,
				"city": pro
			}, function(data) {
				if (data.header.code == 200) {
					for (var key in data.data.district) {
						$("#school_countyId").append("<option value='" + key + "'>" + data.data.district[key].district + "</option>")
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
	if (addD.school) over.school = addD.school.val();
	if (addD.province) over.province = addD.province.find("option:selected").text();
	if (addD.city) over.city = addD.city.find("option:selected").text();
	if (addD.district) over.district = addD.district.find("option:selected").text();
	if (addD.is_cooperate) over.is_cooperate = Number(addD.is_cooperate.val());
	if (addD.id) over.id = addD.id;
	return over;
}
//if (!window.herf) {
//	window.herf = null;
//	window.boon = null;
//	window.addD = {};
//}
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


function fnmodel() {
	$.ajax({
		type: "post",
		url: linpoo.herf.area.province,
		async: true,
		success: function(data) {
			if (data.header.code == 200) {
				for (var key in data.data.province) {
					$("#schoolP").append("<option value='" + key + "'>" + data.data.province[key].province + "</option>")
				}
			} else {
				alert(data.header.msg)
			}
		}
	});
	$("#schoolP").change(function() {
		var pid = $(this).val();
		var pro = $(this).find("option:selected").text();
		$("#schoolC option").remove();
		$("#schoolC").append('<option value="">--请选择--</option>');
		if (pid != "") {
			$.post(linpoo.herf.area.city, {
				"province": pro
			}, function(data) {
				if (data.header.code == 200) {
					for (var key in data.data.city) {
						$("#schoolC").append("<option value='" + key + "'>" + data.data.city[key].city + "</option>")
					}
				} else {
					alert(data.header.msg)
				}
			})
		}
	});
	$("#schoolC").change(function() {
		var pid = $(this).val();
		var pcy = $("#schoolP").find("option:selected").text();
		var pro = $(this).find("option:selected").text();
		$("#schoolA option").remove();
		$("#schoolA").append('<option value="">--请选择--</option>');
		if (pid != "") {
			$.post(linpoo.herf.area.district, {
				"province": pcy,
				"city": pro
			}, function(data) {
				if (data.header.code == 200) {
					for (var key in data.data.district) {
						$("#schoolA").append("<option value='" + key + "'>" + data.data.district[key].district + "</option>")
					}
				} else {
					alert(data.header.msg)
				}
			})
		}
	})
}