/**
 * @author By lizhihu
 * @date By 2016-01-23
 */
function hideList() {
	$(".inputList").slideUp(300);
}

function imgChange() {
	$($(".biaoNow").find("img")[1])
}
function timeFort(second){
    var m = parseInt(second/60);
    var s = second%60;
    if(s<10){
        if(s==0 || s=="0"){
            s = "00";
        }else{
            s = "0"+s;
        }

    }
    return m+"\' "+s+"\" ";

}
var gradeNameModel = [];
var classNameModel = [];
var tableHtml = ""
var PersonHealth = function() {
	this.term = "";
	this.year = "";
	this.grade = "";
	this.classRoom = "";
	this.sex = "";

}
PersonHealth.prototype.getPersonListYear = function() {

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
        $("#choiceYear").html($($("#yearListId .list div")[0]).context.innerText);
			return function() {
				$($("#yearListId .list div")[index]).click(function() {
					var _this = this;
                    $("#gradeListHtmlId").html("");
                    $("#classListHtmlId").html("");
					$("#choiceYear").html($(_this).context.innerText);

                    //学期学年
                    setInterval(function(){
                        if($("#secondTerm").css("display")=="none"){
                            $("#choiceTerm").html("第一学期");
                        }
                    },10)
                    var year = $("#choiceYear").text();
                    var term = dataTerm[$("#choiceTerm").text()];
                    getHistoryContent(term,year);
					$("#yearListId").slideUp(300);
				})
			}(index)

		})
		//点击现在
	$("#nowYear").click(function() {
		$("#choiceYear").html($($("#yearListId .list div")[0]).context.innerText);
        var year = $("#choiceYear").text();
        var term = dataTerm[$("#choiceTerm").text()];
        getHistoryContent(term,year);
		$("#yearListId").slideUp(300);
		$("#yearId img").attr("src", "img/moredown_gray.png");
	})
	$(document).click(function(event) {
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
                getHistoryContent(term,year);
				$("#termListId").slideUp(300);
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
		$("#gradeId").on("click", function(e) {
				hideList();
				if ($("#gradeListId").css("display") != "block") {
					$("#gradeListId").slideDown(300);
					$("#gradeId img").attr("src", "img/moreup.png");
				} else {
					$("#gradeListId").slideUp(300);
					$("#gradeId img").attr("src", "img/moredown.png");
				}
            stopBubble(e)
            $("#gradeListId .list div").each(function(index, val) {
                return function() {
                    $($("#gradeListId .list div")[index]).click(function() {
                        var _this = this;
                        $("#choiceGrade").html($(_this).context.innerText);
                        $("#gradeListId").slideUp(300);
                        $("#gradeId img").attr("src", "img/moredown.png");

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
				//event.stopPropagation();
			})
			//选择学期

		$(document).click(function(event) {
			$("#gradeListId").slideUp(300);
			$("#gradeId img").attr("src", "img/moredown.png");
		})
	}
	//班级
PersonHealth.prototype.getPersonListClass = function() {
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

				$(document).click(function(event) {
					$("#classListId").slideUp(300);
					$("#classId img").attr("src", "img/moredown_gray.png");
				})

			//选择学期

	}
	//健康评分表
PersonHealth.prototype.bindEvent = function() {
	var claerTime, claerTime1;
	$(".biaoNow").hover(function() {
		clearTimeout(claerTime1);
		clearTimeout(claerTime);
		if ($(".biaoList").css("display") != "block") {
			$(".biaoList").slideDown('300');
			//小三角的替换
			$($(".biaoNow").find("img")[0]).attr("src", "img/moreup_gray.png");
		}
	}, function(event) {
		claerTime = setTimeout(function() {
			$(".biaoList").slideUp('300');
			$($(".biaoNow").find("img")[0]).attr("src", "img/moredown_gray.png");
		}, 500)

	});
	$(".biaoList").hover(function() {
		clearTimeout(claerTime);
		clearTimeout(claerTime1);
		$(".biaoList").css("display", "block");
	}, function() {
		claerTime1 = setTimeout(function() {
			$(".biaoList").slideUp('300');
			$($(".biaoNow").find("img")[0]).attr("src", "img/moredown_gray.png");
		}, 500)
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
PersonHealth.prototype.getDefault = function(){

    //$("#hasData").html("");
   $("#hasData  tr:not(:first)").html("");
    //$("table tr").empty();
    this.year = $("#choiceYear").text();
    this.term = $("#choiceTerm").text();
    this.grade = $("#choiceGrade").text();
    this.classRoom = $("#choiceClass").text();
    this.sex = $('#checkSex input[type="radio"]:checked ').val();
    var sexId = ""
    var classId = this.grade + "," + this.classRoom;
    if(this.grade!="暂无年级"){
        $("#title").html(this.year + "学年" + this.term + this.grade + this.classRoom + "体质健康评分表")
    }else{
        $("#title").html(this.year + this.term +  "体质健康评分表暂无数据");
        //return;
    }
    classId = dataArr[classId];
    if (this.sex == 3) {
        sexId = ""
    } else {
        sexId = this.sex;

    }


        var url = getURL();
        var classAndGrade = this.grade+","+this.classRoom;
        classAndGrade = dataBrr[classAndGrade];
        var classTerm = this.term;
        classTerm = dataTerm[classTerm];
        var school_id = localStorage.getItem("schoolId") ;
        //2016 1 2班有数据 全部
        var data = {
            "sex": sexId,
            "class_id": classAndGrade,
            "year": this.year,
            "term": classTerm,
            "school_id":school_id
        }

        $.ajax({
            data: data,
            type: "post",
            url: url + "student_sport_report",
            success: function(dataRes) {

                if (dataRes.header.code = "200") {
                    //f(dataRes.data.report_list)
                    console.log("dataRes",dataRes)
                    if(dataRes.data.report_list.length==0){
                        $("#hasNoData").show();
                        $("#hasData").hide();
                        $("#noDataList").show();

                    }else{
                        $("#noDataList").hide();
                        $("#hasNoData").hide();
                        $("#hasData").show();
                        $("#hasData  tr:not(:first)").empty();
                        var newCrease = dataRes.data.report_list[0].item_list.length;
                        var creaseHtml = "";
                        var scoreHtml = "";
                        var infoHtml = "";
                         creaseHtml += '<th rowspan="2">学号</th><th rowspan="2">姓名</th><th rowspan="2">性别</th>';
                       var isHasHandW = 0;
                        for (var i = 0; i < newCrease; i++) {
                        	if(dataRes.data.report_list[0].item_list[i].item=="身高" ){
                                creaseHtml+='<th rowspan="2">身高(厘米)</th>';
                                isHasHandW++;
                        		continue;
                        	}else if(dataRes.data.report_list[0].item_list[i].item=="体重"){
                                creaseHtml+='<th rowspan="2">体重(千克)</th>';
                                isHasHandW++;
                                continue;
                            }
                        }
                         for (var i = 0; i < newCrease; i++) {
                         if(dataRes.data.report_list[0].item_list[i].item!="身高" && dataRes.data.report_list[0].item_list[i].item!="体重"){

                           creaseHtml += ' <th colspan = "3" >' + unitTeam[dataRes.data.report_list[0].item_list[i].item] + '</th>';
                         }else{
                             continue;
                         }
                         }
                        //creaseHtml+='<th colspan = "3" >BMI</th>'
                        $($("#personHealthTable")).html(creaseHtml);
                        for(var j=0;j<newCrease-isHasHandW;j++){
                            scoreHtml+='<td>成绩</td><td>得分</td><td>等级</td>';
                        }
                        $($("#personHealthScore")).html(scoreHtml);
                        //得到学生的信息
                        var  tableHtml="";
                           //计算BMI指数
                        for(var j=0;j<dataRes.data.report_list.length;j++){
                            var heigh="";
                            var wait="";
                            var stu_num = dataRes.data.report_list[j].student_number;
                            if(stu_num==0 || stu_num=="0"){
                                stu_num="";
                            }
                            for(var i=0;i<dataRes.data.report_list[j].item_list.length;i++){
                                if(dataRes.data.report_list[j].item_list[i].item=="身高" ){
                                    heigh=i;
                                }
                                else if(dataRes.data.report_list[j].item_list[i].item=="体重" ){
                                    wait=i;
                                }
                            }

                            if(wait=="" && heigh==""){
                                tableHtml+='<tr><td>'+stu_num+'</td><td>'+dataRes.data.report_list[j].student_name+'</td><td>'+sexChange[dataRes.data.report_list[j].sex]+'</td>';
                            }else if(wait=="" && heigh!="" ){
                                tableHtml+='<tr><td>'+stu_num+'</td><td>'+dataRes.data.report_list[j].student_name+'</td><td>'+sexChange[dataRes.data.report_list[j].sex]+'</td>'+'<td>'+dataRes.data.report_list[j].item_list[heigh].record+'</td>';
                            }else if(wait!="" && heigh==""){
                                tableHtml+='<tr><td>'+stu_num+'</td><td>'+dataRes.data.report_list[j].student_name+'</td><td>'+sexChange[dataRes.data.report_list[j].sex]+'</td>'+'<td>'+dataRes.data.report_list[j].item_list[wait].record+'</td>';
                            }
                            else if(wait!="" && heigh!=""){
                                tableHtml+='<tr><td>'+stu_num+'</td><td>'+dataRes.data.report_list[j].student_name+'</td><td>'+sexChange[dataRes.data.report_list[j].sex]+'</td>'+'<td>'+dataRes.data.report_list[j].item_list[heigh].record+'</td><td>'+dataRes.data.report_list[j].item_list[wait].record+'</td>';
                            }
                            for(var k=0;k<dataRes.data.report_list[j].item_list.length;k++){
                                if(dataRes.data.report_list[j].item_list[k].item=="身高" || dataRes.data.report_list[j].item_list[k].item=="体重" ){
                                    continue;
                                }else{
                                    if(dataRes.data.report_list[j].item_list[k].item=="BMI"){
                                        tableHtml+='<td>'+dataRes.data.report_list[j].item_list[k].record+'</td><td>'+dataRes.data.report_list[j].item_list[k].score+'</td><td>'+fatAndThin[dataRes.data.report_list[j].item_list[k].level]+'</td>'
                                    }else if($.trim(dataRes.data.report_list[j].item_list[k].item)=="50*8往返跑"){
                                        tableHtml+='<td><span>'+timeFort(dataRes.data.report_list[j].item_list[k].record)+'</span></td><td>'+dataRes.data.report_list[j].item_list[k].score+'</td><td><span>'+ScoreType[dataRes.data.report_list[j].item_list[k].level]+'</span></td>'
                                    }
                                    else{
                                        tableHtml+='<td><span>'+dataRes.data.report_list[j].item_list[k].record+'</span></td><td>'+dataRes.data.report_list[j].item_list[k].score+'</td><td><span>'+ScoreType[dataRes.data.report_list[j].item_list[k].level]+'</span></td>'
                                    }

                                }


                            }
                            tableHtml+='</tr>'
                        }

                       // $("#hasData  tr:not(:first)").empty();
                        $("#hasData").append(tableHtml);
                        //$("#contentTable").html(tableHtml)
                    }

                    //console.log(dataRes.data.report_list[0].item_list[0].item)
                } else {
                    new  ModelCon("数据获取失败,请刷新重试");
                $(".isCancleOk").hide();
                $(".isSure").off().on("click",function(){
                    $(".mod_wapper").hide();
                    $(".markHide").hide();
                    window.location.href="personhealthyscore.html"
                })
                return;
                    //alert(dataRes.head.msg)
                }
            },error:function(){
            	new  ModelCon("网络异常，请检查您的网络");
                $(".isCancleOk").hide();
                $(".isSure").off().on("click",function(){
                    $(".mod_wapper").hide();
                    $(".markHide").hide();
                    window.location.href="personhealthyscore.html"
                })
                return;
            }
        });




}
PersonHealth.prototype.getAllData = function() {
      var _this = this;
      // _this.getDefault();
	$("#personHealthLook").on("click", function() {
        _this.getDefault();
	})
	$(document).keydown(function(e){
	if (!e) {
    	     e = window.event; 
    	    }
    if ((e.keyCode || e.which) == 13) {
    	 _this.getDefault();
    }
   
})
	//打印
printArea();
}


function classAndGrade(data) {/*
    var gradeNameModel = [];
    var classNameModel = [];*/
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
    gradeSort(gradeNameModel)
    for (var j = 0; j < gradeNameModel.length; j++) {
        gradeHtml += '<div><span>' + gradeNameModel[j] + '</span></div>'

    }
    $("#gradeListHtmlId").html(gradeHtml);
    $("#choiceGrade").html($($("#gradeListHtmlId div")[0]).text());
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

$(document).ready(function() {
    /*var url = "http://121.41.47.79:3000/get_sport_item_resource";
    $.ajax({
        type: "post",
        url: url,
        success:function(data){
            console.log("金泰资源",data)
        }
    })*/
    //鼠标滑动动画
    if(!localStorage.getItem("userName")){
        window.location.href="index.html"
    }
    headerMove();
	var url = getURL() + "get_user_class";
    var school=localStorage.getItem("schoolName");
    //var name = localStorage.getItem("userName");
    var name = localStorage.getItem("account")
    var is_root = localStorage.getItem("is_root")
    var school_id = localStorage.getItem("schoolId");
    console.log("school_id",school_id)
    var dataSchoolInfo ={"name":name,"schoolName":school,"is_root":is_root};
	var data = {
		"account":name
	};
    getStuInfo(dataSchoolInfo)
	$.ajax({
		data: data,
		type: "post",
		url: url,
		success: function(dataRes) {
            if(dataRes.header.code=="200"){
                if($.trim(dataRes.data.user_class[0])!=""){
                    localStorage.setItem("isNoData",false);
                    classAndGrade(dataRes.data.user_class);
                }else{
                   localStorage.setItem("isNoData",true);
                    new  ModelCon("请到系统管理中的成绩导入中上传学生信息");
                    $(".isCancleOk").hide();
                    $(".isSure").off().on("click",function(){
                       window.location.href="systemmanage.html";
                    })
                    return;

                }
                var user = localStorage.getItem("user");

                $(".userName").html(localStorage.getItem("userName"));
                $(".schoolName").html(localStorage.getItem("schoolName"))
                var personList = new PersonHealth();
                personList.bindEvent();
                //学年
                personList.getPersonListYear();
                //学期
                personList.getPersonListTerm();
                //年级
                personList.getPersonListGrade();
                //班级
                personList.getPersonListClass();
                //获取默认的数据
                personList.getDefault();
                //获取数据
                personList.getAllData();
                //向服务器传输数据

            }else{
                new  ModelCon("数据获取失败,请刷新重试");
                $(".isCancleOk").hide();
                $(".isSure").off().on("click",function(){
                    $(".mod_wapper").hide();
                    $(".markHide").hide();
                    window.location.href="personhealthyscore.html"
                })
                return;
            }


		},error:function(XMLHttpRequest, textStatus, errorThrown){
       new  ModelCon("网络异常，请检查您的网络");
                $(".isCancleOk").hide();
                $(".isSure").off().on("click",function(){
                    $(".mod_wapper").hide();
                    $(".markHide").hide();
                    window.location.href="personhealthyscore.html"
                })
                return;
    }
	});


})