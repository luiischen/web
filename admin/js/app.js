/**
 * @author By Lyq
 * @date By 2016-01-04
 * @content 页面交互功能及ajax接口
 */
var OpenWin = function(title, ele, width, height,fit) {
	if ($('#win').length == 0)
		$('body').append('<div id="win"><div id="win_frame" style="width:100%;height:98%;"><div/></div>');
	$('#win_frame').html(ele);
	$('#win_frame').append('<div id="qR"></div>');
	$('#qR').append('<button class="aBtn" id="ok" onclick="onOk()" form="form"><img src="../css/icons/ok.png" width="14" style="padding-right:3px;"/>确定</button>');
	$('#qR').append('<button class="aBtn" id="cl"><img src="../css/icons/cancel.png" width="14" style="padding-right:3px;"/>取消</button>');
	$('#win').window({
				title : title,
				modal : true,
				minimizable : false,
				maximizable : true,
				collapsible : false,
				resizable:true,
				fit : fit?fit:false,
				width : width ? width : $('#win_frame').width,
				height : height ? height : $('#win_frame').height
			});
	$('#win').window('open');
	$("#cl").on("click",function(){
		$("#win").window("close");
	})
}
/**
 * 关闭窗口
 */
var CloseWin = function() {
	parent.$('#win').window('close');
}
/**
 * 消息对象
 */
var Message = function(msg){
	$.messager.show({
		title : '温馨提示',
		msg : msg,
		timeout : 2000,
		showType : 'slide'
	});
}

var App = {
	/**
	 * ajax提交表单
	 * 
	 * @param {}
	 *            url
	 * @param {}
	 *            callback
	 */
	formSubmit : function(url, callback) {
		$('form').form('submit', {
					url : url,
					success : function(result) {
						var jsonData = $.parseJSON(result);
						if (jsonData.ajaxResult.code == 1) {
							if (callback)
								callback(jsonData);
						}
					}
				});
	},
	/**
	 * 窗体对象
	 * 
	 * @param {}
	 *            config
	 */
	Win : function(config) {
		this.id = config.id ? config.id : 'win';
		this.frame_id = this.id + '_frame';
		this.title = config.title;
		this.url = config.url;
		this.width = config.width ? config.width : 400;
		this.height = config.height ? config.height : 300;

		this.open = function() {
			if ($('#' + this.id).length == 0)
				$('body').append('<div id="'
								+ this.id
								+ '"><iframe id="'
								+ this.frame_id
								+ '" style="width:100%;height:100%;" scrolling="no" frameborder="0" src=""/></div>');
			$('#' + this.frame_id)[0].src = this.url;
			$('#' + this.id).window({
						title : this.title,
						modal : true,
						minimizable : false,
						maximizable : false,
						collapsible : false,
						resizable : false,
						width : this.width,
						height : this.height
					});
			$('#' + this.id).window('open');
		};

		this.close = function() {
			$('#' + this.id).window('close');
		};
	},

	closeWin : function(winObj) {
		if (winObj) {
			winObj.window('close');
		} else if (parent) {
			parent.$('#win').window('close');
		} else {
			$('#win').window('close');
		}
	},
	
	doCmd : function(cmd) {
		var type = cmd.type;
		var title = cmd.title;
		var url = cmd.url;
		if(type==0) {
			OpenWin(title,url);
		} else if(type==1 || type==2) {
			var checked = cmd.checked.call();
			if(checked.length>0) {
				if(type == 1) {
					url += "&ID="+checked[0].id;
					OpenWin(title,url);
				} else {
					$.messager.defaults = {ok: "确定",cancel: "取消"};
					$.messager.confirm('提示', '确认对选中记录进行操作？', function(r){
						if (r){
							for(var i=0;i<checked.length;i++) {
								url += '&ck='+checked[i].id;
							}
							OpenWin(title,url);
						} else 
							return;
					});
				}
			} else {
				var msg;
				if(type==1)
					msg = '请选择一条记录!';
				else
					msg = '请选择至少一条记录!';
				$.messager.defaults = {ok: "确定"};
				$.messager.alert('提示',msg,'info');
				return;
			}
		}
	}
}

