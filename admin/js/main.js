/**
 * @author By Lyq
 * @date By 2016-01-04
 * @content By 页面主体左侧工具栏生成
 */
window.onload = function() {
	$('#loading-mask').fadeOut();
}

var onlyOpenTitle = "管理控制台"; //不允许关闭的标签的标题

$(function() {
	//	InitLeftMenu();
	//	tabClose();
	//	tabCloseEven();

	/* 选择TAB时刷新内容
	//	$('#tabs').tabs({
	//        onSelect: function (title) {
	//            var currTab = $('#tabs').tabs('getTab', title);
	//            var iframe = $(currTab.panel('options').content);
	//
	//			var src = iframe.attr('src');
	//			if(src)
	//				$('#tabs').tabs('update', { tab: currTab, options: { content: createFrame(src)} });
	//
	//        }
	//    });
	*/
})

//初始化左侧
function InitLeftMenu() {
	$(".nav_menu_list").each(function(index_no) {
		initnavMenuList(index_no);

	});

}




function initnavMenuList(index_no) {

	var cid = "#nav_" + index_no;

	$(cid).accordion({
		animate: true,
		fit: true,
		border: false
	});

	var selectedPanelname = '';

	$.each(_menus[index_no].menus, function(i, n) {

		var menulist = '';
		menulist += '<ul class="navlist">';
		$.each(n.menus, function(j, o) {

			menulist += '<li><div><a ref="' + o.menuid + '" href="#" rel="' + o.url + '" ><span class="icon ' + o.icon + '" >&nbsp;</span><span class="nav">' + o.menuname + '</span></a></div> ';

			if (o.menus && o.menus.length > 0) { //有下一级

				//li.find('div').addClass('icon-arrow');

				menulist += '<ul class="third_ul">';
				$.each(o.menus, function(k, p) {
					menulist += '<li><div>' +
						'<a ref="' + p.menuid + '" href="#" rel="' + p.url + '" ><span class="icon ' + p.icon + '" >&nbsp;</span><span class="nav">' + p.menuname + '</span></a>' +
						'</div>';

					menulist += '</li>';
				});
				menulist += '</ul>';
			} else {

			}

			menulist += '</li>';
		})
		menulist += '</ul>';

		$(cid).accordion('add', {
			title: n.menuname,
			content: menulist,
			border: true,
			iconCls: 'icon ' + n.icon
		});

		//        console.log( n.menuname);
		//    	console.log($(cid +' ul.navlist  a').length);

		if (i == 0) {
			selectedPanelname = n.menuname;
		} else {

		}



	});

	//$(cid).accordion('select',selectedPanelname);
	window.setTimeout(function() {
		$(cid).accordion('select', selectedPanelname);
		addlink(index_no);
	}, 1000);


	//选中第一个
	//var panels = $(cid).accordion('panels');
	//var t = panels[0].panel('options').title;
	//$(cid).accordion('select', t);
}

function addlink(index_no) {

	var cid = "#nav_" + index_no;

	//console.log(cid +' ul.navlist li a');

	$(cid + ' ul.navlist li a').click(function() {
		var tabTitle = $(this).children('.nav').text();

		var url = $(this).attr("rel");
		var menuid = $(this).attr("ref");
		var icon = $(this).find('.icon').attr('class');

		var third = find(menuid, index_no);
		if (third && third.child && third.child.length > 0) {
			$(cid + ' .third_ul').slideUp();

			var ul = $(this).parent().next();
			if (ul.is(":hidden")) {
				ul.slideDown();
			} else {
				ul.slideUp();
			}
		} else {
			addTab(tabTitle, url, icon);
			$(cid + ' ul.navlist li div').removeClass("selected");
			$(this).parent().addClass("selected");
		}
	}).hover(function() {
		$(this).parent().addClass("hover");
	}, function() {
		$(this).parent().removeClass("hover");
	});



	//	console.log($(cid +' ul.navlist').length);
	//	
	//	console.log($(cid +' ul.navlist  a').length);



}
//获取左侧导航的图标
function getIcon(menuid, index_no) {
	var icon = 'icon ';
	$.each(_menus[index_no].menus, function(i, n) {
		$.each(n.menus, function(j, o) {
			if (o.menuid == menuid) {
				icon += o.icon;
			}
		})
	})
	return icon;
}

function find(menuid, index_no) {
	var obj = null;
	$.each(_menus[index_no].menus, function(i, n) {
		$.each(n.menus, function(j, o) {
			if (o.menuid == menuid) {
				obj = o;
			}
		});
	});
	return obj;
}

function addTab(subtitle, url, icon) {
	if (!$('#tabs').tabs('exists', subtitle)) {
		$('#tabs').tabs('add', {
			title: subtitle,
			content: createFrame(url),
			closable: true,
			icon: icon
		});
	} else {
		$('#tabs').tabs('select', subtitle);
		$('#mm-tabupdate').click();
	}
	tabClose();
}
function createFrame(url) {
	var s = '<iframe scrolling="auto" frameborder="0"  src="' + url + '" style="width:100%;height:100%;"></iframe>';
	return s;
}
function tabClose() {
	/*双击关闭TAB选项卡*/
	$(".tabs-inner").dblclick(function() {
			var subtitle = $(this).children(".tabs-closable").text();
			$('#tabs').tabs('close', subtitle);
		})
		/*为选项卡绑定右键*/
	$(".tabs-inner").bind('contextmenu', function(e) {
		$('#mm').menu('show', {
			left: e.pageX,
			top: e.pageY
		});

		var subtitle = $(this).children(".tabs-closable").text();

		$('#mm').data("currtab", subtitle);
		$('#tabs').tabs('select', subtitle);
		return false;
	});
}
//绑定右键菜单事件
function tabCloseEven() {

	$('#mm').menu({
		onClick: function(item) {
			closeTab(item.id);
		}
	});

	return false;
}

function closeTab(action) {
	var alltabs = $('#tabs').tabs('tabs');
	var currentTab = $('#tabs').tabs('getSelected');
	var allTabtitle = [];
	$.each(alltabs, function(i, n) {
		allTabtitle.push($(n).panel('options').title);
	})


	switch (action) {
		case "refresh":
			var iframe = $(currentTab.panel('options').content);
			var src = iframe.attr('src');
			$('#tabs').tabs('update', {
				tab: currentTab,
				options: {
					content: createFrame(src)
				}
			})
			break;
		case "close":
			var currtab_title = currentTab.panel('options').title;
			$('#tabs').tabs('close', currtab_title);
			break;
		case "closeall":
			$.each(allTabtitle, function(i, n) {
				if (n != onlyOpenTitle) {
					$('#tabs').tabs('close', n);
				}
			});
			break;
		case "closeother":
			var currtab_title = currentTab.panel('options').title;
			$.each(allTabtitle, function(i, n) {
				if (n != currtab_title && n != onlyOpenTitle) {
					$('#tabs').tabs('close', n);
				}
			});
			break;
		case "closeright":
			var tabIndex = $('#tabs').tabs('getTabIndex', currentTab);
			if (tabIndex == alltabs.length - 1) {
				msgShow('系统提示', '后边没有啦!', 'warning');
				return false;
			}
			$.each(allTabtitle, function(i, n) {
				if (i > tabIndex) {
					if (n != onlyOpenTitle) {
						$('#tabs').tabs('close', n);
					}
				}
			});

			break;
		case "closeleft":
			var tabIndex = $('#tabs').tabs('getTabIndex', currentTab);
			if (tabIndex == 1) {
				msgShow('系统提示', '前边没有啦!', 'warning');
				return false;
			}
			$.each(allTabtitle, function(i, n) {
				if (i < tabIndex) {
					if (n != onlyOpenTitle) {
						$('#tabs').tabs('close', n);
					}
				}
			});

			break;
		case "exit":
			$('#closeMenu').menu('hide');
			break;
	}
}


//弹出信息窗口 title:标题 msgString:提示信息 msgType:信息类型 [error,info,question,warning]
function msgShow(title, msgString, msgType) {
	$.messager.alert(title, msgString, msgType);
}

var _menus = [];
var t_menus_0 = {
	"menus": [{
			"menuid": "10000",
			"menuname": "学校管理",



			"icon": "icon-sys",
			"menus": [{
				"menuid": "10020",
				"icon": "icon-nav",
				"menuname": "学校管理",
				"url": "frame/xxgl.html",
				"menus": []

			}, {
				"menuid": "10210",
				"icon": "icon-nav",
				"menuname": "合作学校",
				"url": "frame/hzxx.html",
				"menus": []
			}]
		}, {
			"menuid": "10100",
			"menuname": "体育项目管理",



			"icon": "icon-sys",
			"menus": [{
				"menuid": "10110",
				"icon": "icon-nav",
				"menuname": "健康指标管理",
				"url": "frame/jkzb.html",
				"menus": []

			}, {
				"menuid": "10120",
				"icon": "icon-nav",
				"menuname": "体育项目管理",
				"url": "frame/tyxm.html",
				"menus": []

			}, {
				"menuid": "10140",
				"icon": "icon-nav",
				"menuname": "建议指导管理",
				"url": "frame/cfgl.html",
				"menus": []

			}]
		}, {
			"menuid": "900",
			"menuname": "信息推送",



			"icon": "icon-sys",
			"menus": [{
				"menuid": "902",
				"icon": "icon-nav",
				"menuname": "消息推送",
				"url": "frame/xxts.html",
				"menus": []

			}]
		}
	]
};
_menus.push(t_menus_0);


$(document).ready(function() {
	InitLeftMenu();
	tabClose();
	tabCloseEven();


	var option = '';
	option += '<option value="0"  val="1"  >系统菜单</option>';
	var select = '<select id="nav_select">' + option + '</select>';

	$('#nav_list').html(select);

	$('#nav_select').change(function() {
		$('.nav_menu_list').hide();
		$('#nav_' + $(this).val()).show();

	});
	$('.nav_menu_list').first().show();

});

//设置登录窗口
function openPwd() {
	$('#w').window({
		title: '修改密码',
		width: 320,
		modal: true,
		shadow: true,
		closed: true,
		height: 200,

		top: ($(window).height() - 350) * 0.5,
		left: ($(window).width() - 200) * 0.5,


		resizable: false
	});
}
//关闭登录窗口
function closePwd() {
	$('#w').window('close');
}


//修改密码
function serverLogin() {
	var $new1 = $('#new1');
	var $new2 = $('#new2');
	var $old = $('#old');
	if ($new1.val() == '') {
		msgShow('系统提示', '请输入密码！', 'warning');
		return false;
	}
	if ($new2.val() == '') {
		msgShow('系统提示', '请在一次输入密码！', 'warning');
		return false;
	}
	if ($new1.val() != $new2.val()) {
		msgShow('系统提示', '两次密码不一至！请重新输入', 'warning');
		return false;
	}
	if ($old.val()=="poo111111"&&$old.val()!=$new1.val()){
		closePwd();
		msgShow("系统提示","恭喜您，密码修改成功！")
	}else if($old.val()!="poo111111"){
		msgShow('系统提示', '原密码错误！', 'warning');
		return false;
	}else if($old.val()==$new1.val()){
		closePwd();
		msgShow("系统提示","修改后的密码和原密码一致，密码不需要修改！")
	}
//	$.post("", function(msg) {
//		closePwd();
//		msgShow('系统提示', '恭喜，密码修改成功！');
//		$new1.val('');
//		$new2.val('');
//		$old.val('');
//
//	})

}

$(function() {
	openPwd();
	$('#editpass').click(function() {
		$('#w').window('open');
	});
	$('#btnEp').click(function() {
		serverLogin();
	})
	$('#btnCancel').click(function() {
		closePwd();
	})
	$('#loginOut').click(function() {
		$.messager.confirm('系统提示', '您确定要退出本次登录吗?', function(r) {
			if (r) {
				window.location.href = "index.html";
			}
		});
	})
});