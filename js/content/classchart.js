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
PersonHealth.prototype.getPersonListYear = function(){
	$("#choiceYear").html($($("#yearListId .list div")[0]).context.innerText);
	//学年
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
                setInterval(function(){
                    if($("#secondTerm").css("display")=="none"){
                        $("#choiceTerm").html("第一学期");
                    }
                },10)
				$("#yearListId").slideUp(300);

                var year = $("#choiceYear").text();
                var term = dataTerm[$("#choiceTerm").text()];
                //获取历史数据
                getHistoryContent(term,year);
                $("#yearId img").attr("src", "img/moredown_gray.png");
			})
		}(index)

	})
	//点击现在
	$("#nowYear").click(function(){
		$("#choiceYear").html($($("#yearListId .list div")[0]).context.innerText);
        var year = $("#choiceYear").text();
        var term = dataTerm[$("#choiceTerm").text()];
        //获取历史数据
        getHistoryContent(term,year);
		$("#yearListId").slideUp(300);
	})
	$(document).click(function(event){
		$("#yearListId").slideUp(300);
        $("#yearId img").attr("src", "img/moredown_gray.png");
	})
};

PersonHealth.prototype.getPersonListTerm = function() {
    $("#termId").on("click", function(e) {
        hideList();
        if ($("#termListId").css("display") != "block") {
            $("#termListId").slideDown(300);

            $("#termId img").attr("src", "img/moreup_gray.png");
        } else {
            $("#termListId").slideUp(300);
            $("#termId img").attr("src", "img/moredown_gray.png");
        }
        stopBubble(e)
        //getFomatTermAndYear(parseInt($("#choiceYear").text()))
        //console.log("choice",$($("#termListId .list div")[0]).context.innerText)
        //event.stopPropagation();
    })
    //选择学期
    $("#termListId .list div").each(function(index, val) {
        $("#choiceTerm").html($($("#termListId .list div")[0]).context.innerText);
        return function() {
            $($("#termListId .list div")[index]).click(function() {
                // alert(123)
                var _this = this;
                $("#choiceTerm").html($(_this).context.innerText);

                $("#termListId").slideUp(300);
                var year = $("#choiceYear").text();
                var term = dataTerm[$("#choiceTerm").text()];
                //获取历史数据
                getHistoryContent(term,year);
                $("#termId img").attr("src", "img/moredown_gray.png");
            })
        }(index)

    })
    $(document).click(function(event) {
        $("#termListId").slideUp(300);
        $("#termId img").attr("src", "img/moredown_gray.png");
    })
}
PersonHealth.prototype.getPersonListGrade = function() {

    $("#choiceGrade").html($($("#gradeListId .list div")[0]).context.innerText);
    getProjectItem(gradeBrr[$($("#gradeListId .list div")[0]).context.innerText])
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
    $("#choiceClass").html($($("#classListId .list div")[0]).context.innerText);
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
                classAndGrade(dataRes.data.user_class)
            }else{
                classAndGrade(dataRes.data.user_class)
                $("#gradeListHtmlId").html("")
                $("#classListHtmlId").html("")
                $("#choiceGrade").html("暂无年级");
                $("#choiceClass").html("暂无班级")
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
	      this.year = $.trim($("#choiceYear").text());
		  this.grade = $.trim($("#choiceGrade").text());
		  this.classRoom =$.trim($("#choiceClass").text()) ;
          this.productName =$.trim($("#choiceProduct").text()) ;
    console.log( this.productName)
          var product = productArr[this.productName];
          var year = this.year;
          var className = this.grade+","+this.classRoom;
          className = dataBrr[className];
           //2016 项目1 1102有数据
		  	$("#title").html(localStorage.getItem("schoolName")+this.year+"学年"+this.grade+this.classRoom+this.productName+"项目健康指标数据统计");
    var school_id = localStorage.getItem("schoolId");
    var classTerm = dataTerm[$("#choiceTerm").text()];
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
                        getTableData(dataRes)
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
//班级分割
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
    gradeSort(gradeNameModel)
    for (var j = 0; j < gradeNameModel.length; j++) {
        gradeHtml += '<div><span>' + gradeNameModel[j] + '</span></div>'
        $("#gradeListHtmlId").html(gradeHtml);
        $("#choiceGrade").html($($("#gradeListHtmlId div")[0]).text());
    }
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
    $("#choiceClass").html($($("#classListHtmlId div")[0]).text());
    defalutClassText = $($("#classListHtmlId div")[0]).text();
}


PersonHealth.prototype.getAllData = function(){
	
	var _this = this;
	_this.defalutData();
	$("#charCheck").on("click",function(){

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
              $("#productListId .list").html(htmlItem)
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
$(document).ready(function(){
    //判断是否登陆过
    if(!localStorage.getItem("userName")){
        window.location.href="index.html"
    }
    //鼠标滑动动画
    headerMove();
    var school=localStorage.getItem("schoolName");
    //var name = localStorage.getItem("userName");
    var name = localStorage.getItem("account");
    var is_root = localStorage.getItem("is_root")
    var dataSchoolInfo ={"name":name,"schoolName":school,"is_root":is_root};
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
                dataHeal.getPersonListTerm();
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
