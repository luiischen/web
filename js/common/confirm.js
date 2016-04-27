/**
 * @date 2016-02-24
 * @author By Lyq
 * @content for Modle_cofirm
 */
function ModelCon( msg) {
	this.msg = msg || "操作";
	this.even();
}

ModelCon.prototype = {
	constructor : ModelCon,
	
	even : function() {
		var _this = this;
        _this.ment();

	},
	ment : function() {
		this.mask = $("<div class='markHide' style='z-index:2'></div>");
		this.mask.css({
			"position" : "fixed",
			"top" : 0,
			"left" : 0,
			"width" : $(document).width(),
			"height" : $(document).height(),
			"background-color" : "rgba(30,30,30,.3)"
		});
		this.wapper = $("<div class='mod_wapper' style='z-index:10'></div>");
		this.modcon = $("<div></div>");
		this.modcon.css({"color" : "#767676","font-size":"14px"});
		this.modcon.text(this.msg);
		this.modoperate = $("<div class='mod_operate'></div>");
		this.ok = $("<div class='isSure'>确定</div>");
		this.cancel = $("<div class='isCancleOk'>取消</div>");
		this.modquit = $("<div class='mod_quit' title='关闭'></div>");

		this.modoperate.append(this.cancel).append(this.ok);
		this.wapper.append(this.modcon).append(this.modoperate).appendTo(this.mask);
		$("body").append(this.mask);

		this.wapper.animate({"height" : 140},100);
	}
}
function testPhone(name){
	var isMobile=/^(?:13\d|15\d|18\d)\d{5}(\d{3}|\*{3})$/;
if(!isMobile.test(name) )
{ 
   return 0; 
}else{
	return 1;
}
}
 

//通知提醒
function Notice(msg) {
	this.msg = msg || "操作";
	
	this.init();
}

Notice.prototype.init = function() {
	this.warpper = $("<div></div>");
	this.warpper.css({
		"position" : "absolute",
		"top" : -30,
		"left" : "48%",
		"z-index" : 999,
		"padding" : "0 15px",
		"height" : "24px",
		"line-height" : "24px",
		"font-size" : "12px",
		"border-radius" : "5px",
		"-moz-box-shadow" : "0px 0px 5px rgba(50,80,30,.5)",
		"-webkit-box-shadow" : "0px 0px 5px rgba(50,80,30,.5)",
		"box-shadow" : "0px 0px 5px rgba(50,80,30,.5)"
	})
	this.warpper.text(this.msg);
	$("body").append(this.warpper);
	this.anmit();
}
Notice.prototype.hide = function() {
    this.warpper = "";
}
Notice.prototype.anmit = function() {
	var _this = this;
	this.warpper.animate({
		"top" : 20
	},100,function(){
		setTimeout(function(){
			_this.warpper.animate({"top" : -30},300)
		},100)
	})
}
