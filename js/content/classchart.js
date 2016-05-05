/*@author By lizhihu
 * @date By 2016-01-23
 */
function hideList(){
	 $(".inputList").slideUp(500);
}
var PersonHealth = function(){
  this.term = "";
  this.year = "";
  this.grade = "";
  this.classRoom = "";
  this.sex= "";
    this.productName="";

}
var gradeNameModel = [];
var classNameModel = [];
function termAndYear(){
    var newYear = new Date();
    var year = newYear.getFullYear();
    var month = newYear.getMonth();
    var yearName = $("#choiceYear").text().substring(0,4);
    var termName = $("#choiceYear").text().substring(4,8);
    //alert(termName)
    var newYear = localStorage.getItem("year");
    var oldYear = localStorage.getItem("term");
    if((month>7 || month<2 )&& yearName==year){
        $($("#yearListId .list div")[0]).remove();
        if(newYear==null || newYear =="" || newYear==undefined){
            $("#choiceYear").html($($("#yearListId .list div")[0]).context.innerText);
        }else{
            $("#choiceYear").html(newYear+oldYear)
        }


    }else{
        if(newYear==null || newYear =="" || newYear==undefined){
            $("#choiceYear").html($($("#yearListId .list div")[0]).context.innerText);
        }else{
            $("#choiceYear").html(newYear+oldYear)
        }
        //$("#choiceYear").html($($("#yearListId .list div")[0]).context.innerText);
    }
}
PersonHealth.prototype.getPersonListYear = function(){
    termAndYear();
	$("#yearId").on("click",function(e){
		 hideList();
		if($("#yearListId").css("display")!="block"){
			$("#yearListId").slideDown(300);
            $("#yearId img").attr("src", "img/moreup_gray.png");
		}else{
			$("#yearListId").slideUp(300);
            $("#yearId img").attr("src", "img/moredown_gray.png");
		}
        stopBubble(e)
		//event.stopPropagation();
	});
	$("#yearListId .list div").each(function(index,val){
		return function(){
			$($("#yearListId .list div")[index]).click(function(){
				var _this = this;
				$("#choiceYear").html($(_this).context.innerText);
                var termAndYear = $("#choiceYear").text();
                var year = termAndYear.substring(0,4);
                var termName = termAndYear.substring(4,8);
                var term = dataTerm[termName];
                getHistoryContent(term,year);
                $("#yearId img").attr("src", "img/moredown_gray.png");
                $("#yearListId").slideUp(300);

            })
		}(index)

	})

	$(document).click(function(event){
		$("#yearListId").slideUp(300);
        $("#yearId img").attr("src", "img/moredown_gray.png");
	})
};


PersonHealth.prototype.getPersonListGrade = function() {
    if(localStorage.getItem("grade")=="暂无年级"){
        $("#choiceProduct").html("暂无项目");
        $("#productListIdHtml").html("");
    }else{
        getProjectItem(gradeBrr[localStorage.getItem("grade")]);
    }

    $("#gradeId").on("click", function(e) {
        hideList();
        if ($("#gradeListId").css("display") != "block") {
            $("#gradeListId").slideDown(300);
            $("#gradeId img").attr("src", "img/moreup_gray.png");
        } else {
            $("#gradeListId").slideUp(300);
            $("#gradeId img").attr("src", "img/moredown_gray.png");
        }
        stopBubble(e)
        //event.stopPropagation();
        $("#gradeListId .list div").each(function(index, val) {
            return function() {
                $($("#gradeListId .list div")[index]).click(function() {
                    var _this = this;
                    $("#choiceGrade").html($(_this).context.innerText);
                    $("#gradeListId").slideUp(300);
                   getProjectItem(gradeBrr[$(_this).context.innerText])
                   // getProjectItem(gradeBrr[localStorage.getItem("grade")]);
                    $("#gradeId img").attr("src", "img/moredown_gray.png");
                    var _this = this;
                    $("#choiceGrade").html($(_this).context.innerText);

                    $("#gradeListId").slideUp(300);
                    $("#gradeId img").attr("src", "img/moredown_gray.png");

                    //初始化另一个
                    for (var i = 0; i < gradeNameModel.length; i++) {
                        if ($("#choiceGrade").text() == gradeNameModel[i]) {
                            classIdNum = i;
                        }
                    }
                    var classHtml = "";
                    for (var j = 0; j < classNameModel[classIdNum].length; j++) {
                        classHtml += '<div><span>' + classNameModel[classIdNum][j] + '</span></div>';
                    }
                    $("#classListHtmlId").html(classHtml);
                    $("#choiceClass").html($($("#classListHtmlId div")[0]).text());

                })
            }(index)

        })
    })
    //选择学期

    $(document).click(function(event) {
        $("#gradeListId").slideUp(300);
        $("#gradeId img").attr("src", "img/moredown_gray.png");
    })
}
PersonHealth.prototype.getPersonListClass = function() {
    //$("#choiceClass").html($($("#classListId .list div")[0]).context.innerText);
    $("#classId").on("click", function(e) {
        hideList();
        if ($("#classListId").css("display") != "block") {
            $("#classListId").slideDown(300);
            $("#classId img").attr("src", "img/moreup_gray.png");
        } else {
            $("#classListId").slideUp(300);
            $("#classId img").attr("src", "img/moredown_gray.png");
        }
        stopBubble(e)
        //event.stopPropagation();
        $("#classListId .list div").each(function(index, val) {
            return function() {
                $($("#classListId .list div")[index]).click(function() {
                    var _this = this;
                    $("#choiceClass").html($(_this).context.innerText);
                    $("#classListId").slideUp(300);
                    $("#classId img").attr("src", "img/moredown_gray.png");
                })
            }(index)

        })
    })
    //选择学期

    $(document).click(function(event) {
        $("#classListId").slideUp(300);
        $("#classId img").attr("src", "img/moredown_gray.png");
    })
}
//项目
PersonHealth.prototype.getPersonListProduct = function(){
	$("#productId").on("click",function(e){
		 hideList();
		if($("#productListId").css("display")!="block"){
			$("#productListId").slideDown(300);
			 $("#productId img").attr("src","img/moreup_gray.png");
            $("#productListId .list div").each(function(index,val){
                return function(){
                    $($("#productListId .list div")[index]).click(function(){
                        var _this = this;
                        $("#choiceProduct").html($(_this).context.innerText);
                        $("#productListId").slideUp(300);
                        $("#productId img").attr("src","img/moredown_gray.png");
                    })
                }(index)

            })
		}else{
			$("#productListId").slideUp(300);
			$("#productId img").attr("src","img/moredown_gray.png");
		}
        stopBubble(e)
		//event.stopPropagation();
	})
	//选择项目

	$(document).click(function(event){
		$("#productListId").slideUp(300);
		$("#productId img").attr("src","img/moredown_gray.png");
	})
}
PersonHealth.prototype.bindEvent = function(){
	var claerTime,claerTime1;
	$(".biaoNow").hover(function(){
		clearTimeout(claerTime1);
		clearTimeout(claerTime);
		if($(".biaoList").css("display")!="block"){
			$(".biaoList").slideDown('300');
			$($(".biaoNow").find("img")[0]).attr("src","img/moreup_gray.png");
		}
	},function(event){
		claerTime =  setTimeout(function(){
			$(".biaoList").slideUp('300');
			$($(".biaoNow").find("img")[0]).attr("src","img/moredown_gray.png");
		},500)
		
	});
	$(".biaoList").hover(function(){
		clearTimeout(claerTime);
		clearTimeout(claerTime1);
		$(".biaoList").css("display","block");
		},function(){
			claerTime1 =  setTimeout(function(){
				$(".biaoList").slideUp('300');
				$($(".biaoNow").find("img")[0]).attr("src","img/moredown_gray.png");
			},500)
		})

}
var flagIsTrue=false;
function getHistoryContent(term,year){
    var url = getURL() + "get_default_class";
    var name = localStorage.getItem("account")
    var is_root = localStorage.getItem("is_root");
    var schoolId = localStorage.getItem("schoolId");
    var dataDefault = {
        "account":name,
        "is_root":is_root,
        "term":term,
        "year":year,
        "school_id":schoolId
    }
    $.ajax({
        data: dataDefault,
        type: "post",
        url: url,
        success: function(dataRes) {
            if(dataRes.data.user_class.length!=0){
                flagIsTrue = true;
                classAndGrade(dataRes.data.user_class);
                $("#choiceProduct").html("50米跑");
            }else{
                //classAndGrade(dataRes.data.user_class)
                flagIsTrue = false;
                $("#gradeListHtmlId").html("");
                $("#classListHtmlId").html("");
                $("#choiceGrade").html("暂无年级");
                $("#choiceClass").html("暂无班级");
                if($.trim($("#choiceGrade").text()) == "暂无年级"){
                    $("#choiceProduct").html("暂无项目");
                    $("#productListIdHtml").html("");
                    //$("#productListId").html("");
                }
            }
        }
    })
}
function getTableData(data){
   var tableLevalHtml = "";
    var allNum = 0;
    var dataArrAll = data.data.class_level_chart;
    var grateBoy = dataArrAll.boy_great;
    var grateGirl = dataArrAll.girl_great;
    var goodBoy = dataArrAll.boy_good;
    var goodGirl = dataArrAll.girl_good;
    var normalBoy = dataArrAll.boy_normal;
    var normalGirl = dataArrAll.girl_normal;
    var failedBoy = dataArrAll.boy_failed;
    var failedGirl = dataArrAll.girl_failed;
    if(grateBoy.length>0){
        for(var i=0;i<grateBoy.length;i++){
            tableLevalHtml+=grateBoy[i]+"  ";
            $("#grateBoyNum").html(i+1+"个人");
        }
        $("#grateBoy").html(tableLevalHtml);
    }else{
        $("#grateBoy").html("");
        $("#grateBoyNum").html(0+"个人");
    }
    tableLevalHtml = "";
    if(grateGirl.length>0){
        for(var i=0;i<grateGirl.length;i++){
            tableLevalHtml+=grateGirl[i]+"  ";
            $("#grateGirlNum").html(i+1+"个人");
        }
        $("#grateGirl").html(tableLevalHtml);

    }else{
        $("#grateGirl").html("");
        $("#grateGirlNum").html(0+"个人");
    }
    tableLevalHtml = "";
    if(goodBoy.length>0){
        for(var i=0;i<goodBoy.length;i++){
            tableLevalHtml+=goodBoy[i]+"  ";
            $("#goodBoyNum").html(i+1+"个人");
        }
        $("#goodBoy").html(tableLevalHtml);
    }else{
        $("#goodBoy").html("");
        $("#goodBoyNum").html(0+"个人");
    }
    tableLevalHtml = "";
    if(goodGirl.length>0){
        for(var i=0;i<goodGirl.length;i++){
            tableLevalHtml+=goodGirl[i]+"  ";
            $("#goodGirlNum").html(i+1+"个人");
        }
        $("#goodGirl").html(tableLevalHtml);
    }else{
        $("#goodGirl").html("");
        $("#goodGirlNum").html(0+"个人");
    }
    tableLevalHtml = "";
    if(normalBoy.length>0){
        for(var i=0;i<normalBoy.length;i++){
            tableLevalHtml+=normalBoy[i]+"  ";
            $("#normalBoyNum").html(i+1+"个人");
        }
        $("#normalBoy").html(tableLevalHtml);
    }else{
        $("#normalBoy").html("");
        $("#normalBoyNum").html(0+"个人");
    }
    tableLevalHtml = "";
    if(normalGirl.length>0){
        for(var i=0;i<normalGirl.length;i++){
            tableLevalHtml+=normalGirl[i]+"  ";
            $("#normalGirlNum").html(i+1+"个人");
        }
        $("#normalGirl").html(tableLevalHtml);
    }else{
        $("#normalGirl").html("");
        $("#normalGirlNum").html(0+"个人");
    }
    tableLevalHtml = "";
    if(failedBoy.length>0){
        console.log("faild:",failedBoy)
        for(var i=0;i<failedBoy.length;i++){
            tableLevalHtml+=failedBoy[i]+"  ";
            $("#failedBoyNum").html(i+1+"个人");
        }
        $("#failedBoy").text(tableLevalHtml);
    }else{
        $("#failedBoy").html("");
        $("#failedBoyNum").html(0+"个人");
    }
    tableLevalHtml = "";
    if(failedGirl.length>0){
        for(var i=0;i<failedGirl.length;i++){
            tableLevalHtml+=failedGirl[i]+"  ";
            $("#failedGirlNum").html(i+1+"个人");
        }
        $("#failedGirl").html(tableLevalHtml);
    }else{
        $("#failedGirl").html("");
        $("#failedGirlNum").html(0+"个人");
    }

}
PersonHealth.prototype.defalutData = function(){
	     // this.year = $.trim($("#choiceYear").text());
		  this.grade = $.trim($("#choiceGrade").text());
           if(this.grade == "暂无年级"){
               $("#classChart").hide();
               $("#classChartNo").show();
               return;
           }else{
               $("#classChart").show();
               $("#classChartNo").hide();
           }
		  this.classRoom =$.trim($("#choiceClass").text()) ;
          this.productName =$.trim($("#choiceProduct").text()) ;
         var termAndYear = $("#choiceYear").text();
         this.year = termAndYear.substring(0,4);
          //this.term = termAndYear.substring(4,8);
        var classTerm = dataTerm[termAndYear.substring(4,8)];
        // var classTerm = dataTerm[$("#choiceTerm").text()];
          var product = productArr[this.productName];
          var year = this.year;
          var className = this.grade+","+this.classRoom;
          className = dataBrr[className];
           //2016 项目1 1102有数据
		  	$("#title").html(localStorage.getItem("schoolName")+this.year+"学年"+this.grade+this.classRoom+this.productName+"项目健康指标数据统计");
    var school_id = localStorage.getItem("schoolId");

    if(product=="undefined" || product == undefined){
        product = "0";
    }
    var data1 = {
            "year": year,
            "item_id":product,
            "class_id":className,
            "school_id":school_id,
             "term":classTerm,
           };

            $.ajax({
                data: data1,
                type: "post",
                url: getURL()+"class_level_chart",
                success: function(dataRes) {
                    if(dataRes.header.code=="200"){
                        $("#classChart").show();
                        getTableData(dataRes)
                    }else{
                        $("#classChart").show();
                        new  ModelCon("数据获取失败,请刷新");
                        $(".isCancleOk").hide();
                        $(".isSure").off().on("click",function(){
                            $(".mod_wapper").hide();
                            $(".markHide").hide();
                            window.location.href="clascschart.html"
                        })
                        return;
                    }

                },error:function(){
                    $("#classChart").show();
                    new  ModelCon("网络异常，请检查您的网络");
                    $(".isCancleOk").hide();
                    $(".isSure").off().on("click",function(){
                        $(".mod_wapper").hide();
                        $(".markHide").hide();
                        window.location.href="clascschart.html"
                    })
                    return;
                }
            })

}

function classAndGrade(data) {
    var arrGradeAndClass = new Array();
    var commonData = dataArr;
    var temp = ""
    var gradeHtml = "";
    var classHtml = "";
    var classIdNum;
    for (var i = 0; i < data.length; i++) {
        var gradeName = commonData[data[i]].split(",")[0];
        var className = commonData[data[i]].split(",")[1];
        if (temp != gradeName) {
            gradeNameModel.push(gradeName);
            temp = gradeName;
        }
    }
    //年级排序
    gradeSort(gradeNameModel);
    gradeNameModel = unique1(gradeNameModel)
    for (var j = 0; j < gradeNameModel.length; j++) {
        gradeHtml += '<div><span>' + gradeNameModel[j] + '</span></div>'

    }
    $("#gradeListHtmlId").html(gradeHtml);
    var newGrade = localStorage.getItem("grade");
    var newClass = localStorage.getItem("class");
    if(newGrade==null || newGrade=="" || newGrade==undefined ){
        $("#choiceGrade").html($($("#gradeListHtmlId div")[0]).text());
    }else if(newGrade=="暂无年级"){
        if(flagIsTrue){
            $("#choiceGrade").html($($("#gradeListHtmlId div")[0]).text());
        }else{
            $("#choiceGrade").html(newGrade);
            $("#choiceClass").html("暂无班级");
            $("#gradeListHtmlId").html("")
            $("#classListHtmlId").html("")
            return;
        }
        $("#choiceProduct").html("暂无项目");
        $("#productListIdHtml").html("");
        return;
    }else if(newGrade=="全部年级"){
        $("#choiceGrade").html($($("#gradeListHtmlId div")[0]).text());
    }
    else{
        $("#choiceGrade").html(newGrade);
    }

    getProjectItem(gradeBrr[$("#choiceGrade").text()]);
    for (var k = 0; k < gradeNameModel.length; k++) {
        classNameModel[k] = new Array();
        for (var j = 0; j < data.length; j++) {
            if (gradeNameModel[k] == commonData[data[j]].split(",")[0]) {

                classNameModel[k].push(commonData[data[j]].split(",")[1])
            }
        }
        classSort(classNameModel[k])
    }

    for (var i = 0; i < gradeNameModel.length; i++) {

        if ($("#choiceGrade").text() == gradeNameModel[i]) {
            classIdNum = i;
        }
    }
    var classHtml = "";
    for (var j = 0; j < classNameModel[classIdNum].length; j++) {
        classHtml += '<div><span>' + classNameModel[classIdNum][j] + '</span></div>';
    }
    $("#classListHtmlId").html(classHtml);
    if(newClass==null || newClass=="" || newClass==undefined ){
        $("#choiceClass").html($($("#classListHtmlId div")[0]).text());
    }else if(newClass=="暂无班级"){
        if(flagIsTrue){
            $("#choiceClass").html($($("#classListHtmlId div")[0]).text());
        }else{
            $("#choiceClass").html(newClass);
        }
    }else if(newClass=="全部班级"){
        localStorage.setItem("class",$($("#classListHtmlId div")[0]).text());
        $("#choiceClass").html($($("#classListHtmlId div")[0]).text());
    }
    else{
        $("#choiceClass").html(newClass);
    }

    //$("#choiceClass").html($($("#classListHtmlId div")[0]).text());
    //defalutClassText = $($("#classListHtmlId div")[0]).text();
}
PersonHealth.prototype.getAllData = function(){
	
	var _this = this;
	_this.defalutData();
	$("#charCheck").on("click",function(){
        var year = $("#choiceYear").text().substring(0,4);
        var term = $("#choiceYear").text().substring(4,8);
        localStorage.setItem("year",year);
        localStorage.setItem("term",term);
        localStorage.setItem("grade",$("#choiceGrade").text());
        localStorage.setItem("class",$("#choiceClass").text());
		_this.defalutData();
	})
	$(document).keydown(function(e){
	if (!e) {
    	     e = window.event; 
    	    }
    if ((e.keyCode || e.which) == 13) {
    	 _this.defalutData();
    }
   
})
	/*$("#aPrint").on("click",function(){
                	setTimeout(function(){
                		$("#printArea").printArea();
                	},400)
	})*/
	printArea();
}
function getProjectItem(grade){
    if($.trim(grade) == "暂无年级" || grade == undefined || grade == "undefined"){
        $("#choiceProduct").html("暂无项目");
        $("#productListIdHtml").html("");
         return;
        //$("#productListId").html("");
    }else{
        var url = getURL() + "get_grade_sport_item";
        $.ajax({
            data:{"grade":grade},
            type:"post",
            url:url,
            success:function(data){
                if(data.header.code=="200"){
                    var htmlItem = "";
                    for(var i=0;i<data.data.sport_item.length;i++){
                        if(product[data.data.sport_item[i]]=="身高" || product[data.data.sport_item[i]]=="体重" ){
                            continue;

                        }else{
                            htmlItem+='<div><span>'+product[data.data.sport_item[i]]+'</span></div>';
                        }

                    }
                    $("#productListIdHtml").html(htmlItem)
                    $("#choiceProduct").html($($("#productListId .list div")[0]).context.innerText)
                }else{
                    new  ModelCon("数据获取失败,请刷新");
                    $(".isCancleOk").hide();
                    $(".isSure").off().on("click",function(){
                        $(".mod_wapper").hide();
                        $(".markHide").hide();
                        window.location.href="clascschart.html"
                    })
                    return;
                }
            },error:function(){
                new  ModelCon("网络异常，请检查您的网络");
                $(".isCancleOk").hide();
                $(".isSure").off().on("click",function(){
                    $(".mod_wapper").hide();
                    $(".markHide").hide();
                    window.location.href="clascschart.html"
                })
                return;
            }

        })
    }

}
$(document).ready(function(){
    if(localStorage.getItem("clickNum")%2!=0){
        $("#numDate").hide();
    }else {
        $("#numDate").show();
    }
    //判断是否登陆过
    if(!localStorage.getItem("userName")){
        window.location.href="index.html"
    }
    //鼠标滑动动画
    headerMove();
    var school=localStorage.getItem("schoolName");
    contractEnd(school);
    //var name = localStorage.getItem("userName");
    var name = localStorage.getItem("account");
    var is_root = localStorage.getItem("is_root")
    var nick = localStorage.getItem("nick")
    var dataSchoolInfo ={"name":nick,"schoolName":school,"is_root":is_root};
    getStuInfo(dataSchoolInfo)
    var url = getURL() + "get_user_class";
    var data = {
        "account": name
    };
    $.ajax({
        data: data,
        type: "post",
        url: url,
        success: function (dataRes) {
            console.log("classChart:",dataRes)
            if(dataRes.header.code=="200"){

                if($.trim(dataRes.data.user_class[0])!=""){
                    classAndGrade(dataRes.data.user_class);

                }else{
                    // new Notice("获取数据失败");
                    new  ModelCon("获取数据失败，请刷新");
                    $(".isCancleOk").hide();
                    $(".isSure").off().on("click",function(){
                        window.location.href="clascschart.html";
                    })
                    return;
                }
                //初始化数据
                var dataHeal = new PersonHealth();
                dataHeal.bindEvent();
                //学年
                dataHeal.getPersonListYear();
                //学期
                //dataHeal.getPersonListTerm();
                dataHeal.getPersonListGrade();
                //班级
                dataHeal.getPersonListClass();
                //项目
                dataHeal.getPersonListProduct();
                //获取默认值
                //dataHeal.defalutData();
                //点击后数据展示
                setTimeout(function(){
                    dataHeal.getAllData();
                },300)

            }else{
                new  ModelCon("数据获取数据失败,请刷新");
                $(".isCancleOk").hide();
                $(".isSure").off().on("click",function(){
                    $(".mod_wapper").hide();
                    $(".markHide").hide();
                    window.location.href="clascschart.html"
                })
                return;
            }



        },error:function(){
        	 new  ModelCon("网络异常，请检查您的网络");
                $(".isCancleOk").hide();
                $(".isSure").off().on("click",function(){
                    $(".mod_wapper").hide();
                    $(".markHide").hide();
                    window.location.href="clascschart.html"
                })
                return;
        }
    });
})
