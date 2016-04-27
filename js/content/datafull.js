/**
 * @author By lizhihu
 * @date By 2016-01-25
 */
function hideList() {
	$(".inputList").slideUp(300);
}
var gradeNameModel = [];
var classNameModel = [];
//默认班级
var defalutClassText = "";
var PersonHealth = function() {
	this.term = "";
	this.year = "";
	this.grade = "";
	this.classRoom = "";
	//$.easing.def = "easeInBack";

}
function termAndYear(){
	var newYear = new Date();
	var year = newYear.getFullYear();
	var month = newYear.getMonth();
	var yearName = $("#choiceYear").text().substring(0,4);
	var termName = $("#choiceYear").text().substring(4,8);
	//alert(termName)
	if((month>7 || month<2 )&& yearName==year){
		$($("#yearListId .list div")[0]).remove();
		$("#choiceYear").html($($("#yearListId .list div")[0]).context.innerText);

	}else{
		$("#choiceYear").html($($("#yearListId .list div")[0]).context.innerText);
	}
	// return yearName+","+termName;
}
PersonHealth.prototype.getPersonListYear = function() {
	//默认第一个
	$("#choiceYear").html($($("#yearListId .list div")[0]).context.innerText);
	termAndYear();
		//学年
	$("#yearId").on("click", function(e) {
		hideList();
		if ($("#yearListId").css("display") != "block") {
			$("#yearListId").slideDown(300);
			$("#yearId img").attr("src", "img/moreup_gray.png");
		} else {
			$("#yearListId").slideUp(300);
			$("#yearId img").attr("src", "img/moredown_gray.png");
		}
        stopBubble(e)
		//event.stopPropagation();
	});
	$("#yearListId .list div").each(function(index, val) {
			return function() {
				$($("#yearListId .list div")[index]).click(function() {
					var _this = this;
					$("#choiceYear").html($(_this).context.innerText);
					setInterval(function(){
						if($("#secondTerm").css("display")=="none"){
							$("#choiceTerm").html("第一学期");
						}
					},10)

					var termAndYear = $("#choiceYear").text();
					var year = termAndYear.substring(0,4);
					var termName = termAndYear.substring(4,8);
					var term = dataTerm[termName];
					getHistoryContent(term,year);
					$("#yearListId").slideUp(300);
					$("#yearId img").attr("src", "img/moredown_gray.png");
				})
			}(index)

		})
		//点击现在
	/*$("#nowYear").click(function() {
		$("#choiceYear").html($($("#yearListId .list div")[0]).context.innerText);
		var year = $("#choiceYear").text();
		var term = dataTerm[$("#choiceTerm").text()];
		//获取历史数据
		getHistoryContent(term,year);
		$("#yearListId").slideUp(300);
		$("#yearId img").attr("src", "img/moredown_gray.png");
	})*/
	$(document).click(function(event) {
		$("#yearListId").slideUp(300);
	})
};

//数据统计
PersonHealth.prototype.bindEvent = function() {
	var claerTime, claerTime1;
	$(".biaoNow").hover(function() {
		clearTimeout(claerTime1);
		clearTimeout(claerTime);
		if ($(".biaoList").css("display") != "block") {
			$(".biaoList").slideDown('500');
			$($(".biaoNow").find("img")[0]).attr("src", "img/moreup_gray.png");
		}
	}, function(event) {
		claerTime = setTimeout(function() {
			$(".biaoList").slideUp('500');
			$($(".biaoNow").find("img")[0]).attr("src", "img/moredown_gray.png");
		}, 300)

	});
	$(".biaoList").hover(function() {
		clearTimeout(claerTime);
		clearTimeout(claerTime1);
		$(".biaoList").css("display", "block");
	}, function() {
		claerTime1 = setTimeout(function() {
			$(".biaoList").slideUp('500');
			$($(".biaoNow").find("img")[0]).attr("src", "img/moredown_gray.png");
		}, 300)
	})

}
/*PersonHealth.prototype.getPersonListTerm = function() {
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
				var year = $("#choiceYear").text();
				var term = dataTerm[$("#choiceTerm").text()];
				getHistoryContent(term,year)
				$("#termListId").slideUp(300);
				$("#termId img").attr("src", "img/moredown_gray.png");
			})
		}(index)

	})
	$(document).click(function(event) {
		$("#termListId").slideUp(300);
		$("#termId img").attr("src", "img/moredown_gray.png");
	})
}*/
PersonHealth.prototype.getPersonListGrade = function() {

		$("#choiceGrade").html($($("#gradeListId .list div")[0]).context.innerText);
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
			$("#gradeListId .list div").each(function(index, val) {
				return function() {
					$($("#gradeListId .list div")[index]).click(function() {
						var _this = this;
						$("#choiceGrade").html($(_this).context.innerText);
						$("#gradeListId").slideUp(300);
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
						classHtml += '<div><span>' + "全部班级" + '</span></div>';
						for (var j = 0; j < classNameModel[classIdNum].length; j++) {
							classHtml += '<div><span>' + classNameModel[classIdNum][j] + '</span></div>';
						}
						$("#classListHtmlId").html(classHtml);
						$("#choiceClass").html($($("#classListHtmlId div")[0]).text());

					})
				}(index)

			})
				//event.stopPropagation();
			})
			//选择学期

		$(document).click(function(event) {
			$("#gradeListId").slideUp(300);
			$("#gradeId img").attr("src", "img/moredown_gray.png");
		})
	}
	//班级
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
function getHealthTable(data){
	console.log("shili",data)
	var shiliHtml = ""
	var dataDetail1 = data.data.sport_item_rate;
	for(var i=0;i<dataDetail1.length;i++){
		if(dataDetail1[i].item=="视力"){
            var navigate = false;
			var allCountPerson = dataDetail1[i].total;
			var noShili = dataDetail1[i].negative;
			if(noShili == allCountPerson){
				navigate = true;
				$("#shili").html();
				$("#shili").hide();
				$("#shiliInfo").html("(暂无测试人数)")
			}else{
				var hasShili = +dataDetail1[i].three+dataDetail1[i].zero;
				$("#shiliInfo").html("已测试:"+hasShili+"人","为测试"+navigate+"人");
				shiliHtml+='<tr><th rowspan="2" style="width:15%">视力</th><th colspan="2">正常</th><th colspan="2">正常率</th><th colspan="2">不良</th><th colspan="2">不良率</th><th>体测人数</th></tr>'
				shiliHtml+='<tr><td colspan="2">'+dataDetail1[i].three+'</td><td colspan="2">'+dataDetail1[i].three_rate.toFixed(2)+"%"+'</td><td colspan="2">'+dataDetail1[i].zero+'</td><td colspan="2">'+dataDetail1[i].zero_rate.toFixed(2)+"%"+'</td><td colspan="2">'+allCountPerson+'</td></tr>';

			}

		}else{
			continue;
		}
	}
   if(!navigate){
	   $("#shili").html(shiliHtml);

   }


    var tableHtml = "";
    var dataDetail = data.data.sport_item_rate;

    /*for(var i=0;i<dataDetail.length;i++){
		if(dataDetail[i].item=="身高"||dataDetail[i].item=="体重" || dataDetail[i].item=="BMI" || dataDetail[i].item=="视力"|| dataDetail[i].item=="总分"){
			continue;
		}else{
			var allCountPerson = dataDetail[i].one+dataDetail[i].two+dataDetail[i].three+dataDetail[i].zero;
			tableHtml+='<tr><td>'+dataDetail[i].item+'</td><td>'+dataDetail[i].one+'</td><td>'+dataDetail[i].one_rate.toFixed(2)+"%"+'</td><td>'+dataDetail[i].two+'</td><td>'+dataDetail[i].two_rate.toFixed(2)+"%"+'</td><td>'+dataDetail[i].three+'</td><td>'+dataDetail[i].three_rate.toFixed(2)+"%"+'</td><td>'+dataDetail[i].zero+'</td><td>'+dataDetail[i].zero_rate.toFixed(2)+"%"+'</td><td>'+allCountPerson+'</td></tr>';
		}

    }*/
	for(var i=0;i<dataDetail.length;i++){
		if(dataDetail[i].item=="肺活量"){

			var allCountPerson = dataDetail[i].one+dataDetail[i].two+dataDetail[i].three+dataDetail[i].zero;
			tableHtml+='<tr><td>'+unitTeam[dataDetail[i].item]+'</td><td>'+dataDetail[i].one+'</td><td>'+dataDetail[i].one_rate.toFixed(2)+"%"+'</td><td>'+dataDetail[i].two+'</td><td>'+dataDetail[i].two_rate.toFixed(2)+"%"+'</td><td>'+dataDetail[i].three+'</td><td>'+dataDetail[i].three_rate.toFixed(2)+"%"+'</td><td>'+dataDetail[i].zero+'</td><td>'+dataDetail[i].zero_rate.toFixed(2)+"%"+'</td><td>'+allCountPerson+'</td></tr>';
		}

	}
	for(var i=0;i<dataDetail.length;i++){
		if(dataDetail[i].item=="50米跑"){

			var allCountPerson = dataDetail[i].one+dataDetail[i].two+dataDetail[i].three+dataDetail[i].zero;
			tableHtml+='<tr><td>'+unitTeam[dataDetail[i].item]+'</td><td>'+dataDetail[i].one+'</td><td>'+dataDetail[i].one_rate.toFixed(2)+"%"+'</td><td>'+dataDetail[i].two+'</td><td>'+dataDetail[i].two_rate.toFixed(2)+"%"+'</td><td>'+dataDetail[i].three+'</td><td>'+dataDetail[i].three_rate.toFixed(2)+"%"+'</td><td>'+dataDetail[i].zero+'</td><td>'+dataDetail[i].zero_rate.toFixed(2)+"%"+'</td><td>'+allCountPerson+'</td></tr>';
		}

	}
	for(var i=0;i<dataDetail.length;i++){
		if(dataDetail[i].item=="坐位体前屈"){

			var allCountPerson = dataDetail[i].one+dataDetail[i].two+dataDetail[i].three+dataDetail[i].zero;
			tableHtml+='<tr><td>'+unitTeam[dataDetail[i].item]+'</td><td>'+dataDetail[i].one+'</td><td>'+dataDetail[i].one_rate.toFixed(2)+"%"+'</td><td>'+dataDetail[i].two+'</td><td>'+dataDetail[i].two_rate.toFixed(2)+"%"+'</td><td>'+dataDetail[i].three+'</td><td>'+dataDetail[i].three_rate.toFixed(2)+"%"+'</td><td>'+dataDetail[i].zero+'</td><td>'+dataDetail[i].zero_rate.toFixed(2)+"%"+'</td><td>'+allCountPerson+'</td></tr>';
		}

	}
	for(var i=0;i<dataDetail.length;i++){
		if(dataDetail[i].item=="一分钟跳绳"){

			var allCountPerson = dataDetail[i].one+dataDetail[i].two+dataDetail[i].three+dataDetail[i].zero;
			tableHtml+='<tr><td>'+unitTeam[dataDetail[i].item]+'</td><td>'+dataDetail[i].one+'</td><td>'+dataDetail[i].one_rate.toFixed(2)+"%"+'</td><td>'+dataDetail[i].two+'</td><td>'+dataDetail[i].two_rate.toFixed(2)+"%"+'</td><td>'+dataDetail[i].three+'</td><td>'+dataDetail[i].three_rate.toFixed(2)+"%"+'</td><td>'+dataDetail[i].zero+'</td><td>'+dataDetail[i].zero_rate.toFixed(2)+"%"+'</td><td>'+allCountPerson+'</td></tr>';
		}

	}
	for(var i=0;i<dataDetail.length;i++){
		if(dataDetail[i].item=="一分钟仰卧起坐"){

			var allCountPerson = dataDetail[i].one+dataDetail[i].two+dataDetail[i].three+dataDetail[i].zero;
			tableHtml+='<tr><td>'+unitTeam[dataDetail[i].item]+'</td><td>'+dataDetail[i].one+'</td><td>'+dataDetail[i].one_rate.toFixed(2)+"%"+'</td><td>'+dataDetail[i].two+'</td><td>'+dataDetail[i].two_rate.toFixed(2)+"%"+'</td><td>'+dataDetail[i].three+'</td><td>'+dataDetail[i].three_rate.toFixed(2)+"%"+'</td><td>'+dataDetail[i].zero+'</td><td>'+dataDetail[i].zero_rate.toFixed(2)+"%"+'</td><td>'+allCountPerson+'</td></tr>';
		}

	}
	for(var i=0;i<dataDetail.length;i++){
		if(dataDetail[i].item=="50*8往返跑"){

			var allCountPerson = dataDetail[i].one+dataDetail[i].two+dataDetail[i].three+dataDetail[i].zero;
			tableHtml+='<tr><td>'+unitTeam[dataDetail[i].item]+'</td><td>'+dataDetail[i].one+'</td><td>'+dataDetail[i].one_rate.toFixed(2)+"%"+'</td><td>'+dataDetail[i].two+'</td><td>'+dataDetail[i].two_rate.toFixed(2)+"%"+'</td><td>'+dataDetail[i].three+'</td><td>'+dataDetail[i].three_rate.toFixed(2)+"%"+'</td><td>'+dataDetail[i].zero+'</td><td>'+dataDetail[i].zero_rate.toFixed(2)+"%"+'</td><td>'+allCountPerson+'</td></tr>';
		}

	}
	for(var i=0;i<dataDetail.length;i++){
		if(dataDetail[i].item=="跳绳加分项"){

			var allCountPerson = dataDetail[i].one+dataDetail[i].two+dataDetail[i].three+dataDetail[i].zero;
			tableHtml+='<tr><td>'+unitTeam[dataDetail[i].item]+'</td><td>'+dataDetail[i].one+'</td><td>'+dataDetail[i].one_rate.toFixed(2)+"%"+'</td><td>'+dataDetail[i].two+'</td><td>'+dataDetail[i].two_rate.toFixed(2)+"%"+'</td><td>'+dataDetail[i].three+'</td><td>'+dataDetail[i].three_rate.toFixed(2)+"%"+'</td><td>'+dataDetail[i].zero+'</td><td>'+dataDetail[i].zero_rate.toFixed(2)+"%"+'</td><td>'+allCountPerson+'</td></tr>';
		}

	}
	for(var i=0;i<dataDetail.length;i++){
		if(dataDetail[i].item=="总分"){

			var allCountPerson = dataDetail[i].one+dataDetail[i].two+dataDetail[i].three+dataDetail[i].zero;
			tableHtml+='<tr><td>总评</td><td>'+dataDetail[i].one+'</td><td>'+dataDetail[i].one_rate.toFixed(2)+"%"+'</td><td>'+dataDetail[i].two+'</td><td>'+dataDetail[i].two_rate.toFixed(2)+"%"+'</td><td>'+dataDetail[i].three+'</td><td>'+dataDetail[i].three_rate.toFixed(2)+"%"+'</td><td>'+dataDetail[i].zero+'</td><td>'+dataDetail[i].zero_rate.toFixed(2)+"%"+'</td><td>'+allCountPerson+'</td></tr>';
		}

	}
    $("#hasData").append(tableHtml);
}
PersonHealth.prototype.defalutData = function() {
	var termAndYear = $("#choiceYear").text();
	this.year = termAndYear.substring(0,4);
	this.term = termAndYear.substring(4,8);
	this.grade = $("#choiceGrade").text();
	this.classRoom = $("#choiceClass").text();
	if($.trim(this.grade)=="暂无年级"){
		$("#gradeTitle").html("");
	}else{
		$("#gradeTitle").html(this.grade+this.classRoom);
	}
    var classRoomId="";
    var classId=""
	if(this.grade!="暂无年级"){
		$("#title").html(localStorage.getItem("schoolName") + this.year + "学年" + this.grade + this.classRoom + "健康指标数据统计")
	}else{
		$("#title").html(localStorage.getItem("schoolName") + this.year + "学年健康指标数据统计暂无数据")
	}

   /* var url = getURL() + "get_user_class";*/
    //班级是1年级2班 2016有数据
   if($.trim(this.classRoom)=="全部班级" && $.trim(this.grade)!="全部年级"){
        classId = gradeBrrClass[this.grade];
    }else if($.trim(this.grade)=="全部年级"){
	   classId = ""
        //
    }else{
	   classId = dataBrr[this.grade + "," + this.classRoom];
   }

	var school_id = localStorage.getItem("schoolId");
	var classTerm = dataTerm[this.term];
    var data1 = {
        "year": this.year,
		"term":classTerm,
        "class_id":classId,
		"school_id":school_id
    };
    $.ajax({
        data: data1,
        type: "post",
        url: getURL()+"sport_item_report_rate",
        success: function(dataRes) {
			console.log("dataFullLLL",dataRes)
            if(dataRes.data.sport_item_rate.length==0){
                $("#noData").show();
                $("#hasNoData").show();
                $("#hasData").hide();
				$("#shili").hide();
				$("#noDataShili").hide();
				//视力在这里显示
                setWidth(".thin-pro",0,".thin-per");
                setWidth(".normal-pro",0,".normal-per");
                setWidth(".overweight-pro",0,".overweight-per");
                setWidth(".fat-pro",0,".fat-per");
                $(".test-num").text(0);
                $(".thin-text-num").text(0);
                $(".normal-test-num").text(0);
                $(".overweight-test-num").text(0);
                $(".fat-test-num").text(0);
            }else{
                $("#noData").hide();
                $("#hasNoData").hide();
                $("#hasData").show();
				$("#shili").show();
				$("#noDataShili").hide();
                getHealthTable(dataRes);
                getFirstData(dataRes)


            }


        },error:function(){
        	 new  ModelCon("网络异常，请检查您的网络");
                $(".isCancleOk").hide();
                $(".isSure").off().on("click",function(){
                    $(".mod_wapper").hide();
                    $(".markHide").hide();
                    window.location.href="datafull.html"
                })
                return;
        }
    });



}
PersonHealth.prototype.getAllData = function() {

		var _this = this;
    this.year = $("#choiceYear").text();
    this.grade = $("#choiceGrade").text();
    this.classRoom = $("#choiceClass").text();
	if($.trim(this.grade)=="暂无年级"){
		$("#gradeTitle").html("");
	}else{
		$("#gradeTitle").html(this.grade+this.classRoom);
	}

		$("#checkDataFull").on("click", function() {
            $("#hasData  tr:not(:first)").empty("");
			_this.defalutData();
		})
		$(document).keydown(function(e){
	if (!e) {
    	     e = window.event; 
    	    }
    if ((e.keyCode || e.which) == 13) {
    	 $("#hasData  tr:not(:first)").empty("");
    	 _this.defalutData();
    }
   
})

	printArea();
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
	//进行数据拆分和数据渲染
function classAndGrade(data) {
	var arrGradeAndClass = new Array();
	var commonData = dataArr;
	var temp = ""
	var gradeHtml = "";
	var classHtml = "";
	var classIdNum;
	gradeNameModel.push("全部年级");
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
        classSort(classNameModel[k]);
	}

	for (var i = 0; i < gradeNameModel.length; i++) {
		if ($("#choiceGrade").text() == gradeNameModel[i]) {
			classIdNum = i;
		}
	}
	var classHtml = "";
	classHtml += '<div><span>' + "全部班级" + '</span></div>';
	for (var j = 0; j < classNameModel[classIdNum].length; j++) {
		classHtml += '<div><span>' + classNameModel[classIdNum][j] + '</span></div>';
	}
	$("#classListHtmlId").html(classHtml);
	$("#choiceClass").html($($("#classListHtmlId div")[0]).text());
	defalutClassText = $($("#classListHtmlId div")[0]).text();
}
//初始化值肥胖的值
function getFirstData(data){
	console.log("firstdata",data)
	            var charBox=$(".m-chart");
				var boxWidth=charBox.width();
				var marginR=(boxWidth-554)/3;
				//var charList=charBox.find(".chart");
				//charList.css("margin-right",marginR+"px");
				//$(charList[3]).css("margin-right","0px");
				var fatNum,normalNum,overweightNum,thinNum,contNum,thinPro,normalPro,fatPro,overweightPro;
                var isHasFat = false;
				for(var i=0;i<data.data.sport_item_rate.length;i++){
					if(data.data.sport_item_rate[i].item_id=="-1"){
                        isHasFat=true;
						thinNum=data.data.sport_item_rate[i].zero;;//偏瘦人数
						normalNum=data.data.sport_item_rate[i].one;;//正常人数
						overweightNum=data.data.sport_item_rate[i].two;//超重人数
						fatNum=data.data.sport_item_rate[i].three;//肥胖人数
						contNum=data.data.sport_item_rate[i].total;

						thinPro=data.data.sport_item_rate[i].zero_rate;
						normalPro=data.data.sport_item_rate[i].one_rate;
						console.log(normalPro)
						overweightPro=data.data.sport_item_rate[i].two_rate;
						fatPro=data.data.sport_item_rate[i].three_rate;


                       /* thinPro=per(thinNum,contNum);
                        normalPro=per(normalNum,contNum);
                        overweightPro=per(overweightNum,contNum);
                        fatPro=per(fatNum,contNum);*/
                        setWidth(".thin-pro",thinPro,".thin-per");
                        setWidth(".normal-pro",normalPro,".normal-per");
                        setWidth(".overweight-pro",overweightPro,".overweight-per");
                        setWidth(".fat-pro",fatPro,".fat-per");
                        $("#contNum").text(contNum);
                        $(".thin-text-num").text(thinNum);
                        $(".normal-test-num").text(normalNum);
                        $(".overweight-test-num").text(overweightNum);
                        $(".fat-test-num").text(fatNum);
					}else{
						continue;
					}
				}
				if(!isHasFat){
                    setWidth(".thin-pro",0,".thin-per");
                    setWidth(".normal-pro",0,".normal-per");
                    setWidth(".overweight-pro",0,".overweight-per");
                    setWidth(".fat-pro",0,".fat-per");
                    $(".test-num").text(0);
                    $(".thin-text-num").text(0);
                    $(".normal-test-num").text(0);
                    $(".overweight-test-num").text(0);
                    $(".fat-test-num").text(0);
                }
				/*function per(num,contNum){
//					return (Math.round((num / contNum * 10000) / 100) + "%");
					return (Math.round((num / contNum * 10000) / 100) );
				}*/


}
function setWidth(sel,pro,sel1){
	$(sel1).text(pro.toFixed(2)+"%");


	$(sel).css("width",pro+"%");
}
$(document).ready(function() {
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
	var name = localStorage.getItem("account")
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
		success: function(dataRes) {
            console.log("dataFull",dataRes);
            if(dataRes.header.code=="200"){

               if($.trim(dataRes.data.user_class[0])!=""){
                   classAndGrade(dataRes.data.user_class);
                   //alert("获取数据失败")
               }else{
                  // new Notice("获取数据失败");
                   new  ModelCon("获取数据失败，请刷新重试");
                   $(".isCancleOk").hide();
                   $(".isSure").off().on("click",function(){
                       window.location.href="datafull.html";
                   })
                   return;
               }
                //初始化数据
                var dataHeal = new PersonHealth();
                dataHeal.bindEvent();
                //学年
                dataHeal.getPersonListYear();
				//dataHeal.getPersonListTerm();
                //学期
                dataHeal.getPersonListGrade();
                //班级
                dataHeal.getPersonListClass();
                //获取默认值
                dataHeal.defalutData();
                //点击后数据展示
                dataHeal.getAllData();
            }else{
                new  ModelCon("数据获取失败,请刷新重试");
                $(".isCancleOk").hide();
                $(".isSure").off().on("click",function(){
                    $(".mod_wapper").hide();
                    $(".markHide").hide();
                    window.location.href="datafull.html"
                })
                return;
            }

			//点击个人健康评分表
              

		},error:function(){
			 new  ModelCon("网络异常，请检查您的网络");
                $(".isCancleOk").hide();
                $(".isSure").off().on("click",function(){
                    $(".mod_wapper").hide();
                    $(".markHide").hide();
                    window.location.href="datafull.html"
                })
                return;
		}

	})
});