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
  // return yearName+","+termName;
}
PersonHealth.prototype.getPersonListYear = function() {
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
                    $("#gradeListHtmlId").html("");
                    $("#classListHtmlId").html("");
					$("#choiceYear").html($(_this).context.innerText);
                    var termAndYear = $("#choiceYear").text();
                    var year = termAndYear.substring(0,4);
                    var termName = termAndYear.substring(4,8);
                    var term = dataTerm[termName];
                    $("#gradeListHtmlId").html("")
                    getHistoryContent(term,year);

					$("#yearListId").slideUp(300);
				})
			}(index)

		})

	$(document).click(function(event) {
		$("#yearListId").slideUp(300);
		$("#yearId img").attr("src", "img/moredown_gray.png");
	})
};

PersonHealth.prototype.getPersonListGrade = function() {
   // $("#choiceGrade").html($($("#gradeListId .list div")[0]).context.innerText);

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
            gradeSort(gradeNameModel)
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
var flagIsTrue = false;
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
            if(dataRes.data.user_class.length!=0 ){
                flagIsTrue = true;
                classAndGrade(dataRes.data.user_class);
            }else{
                flagIsTrue = false;
                //classAndGrade(dataRes.data.user_class)
                $("#gradeListHtmlId").html("")
                $("#classListHtmlId").html("")
               $("#choiceGrade").html("暂无年级");
                $("#choiceClass").html("暂无班级");

            }

        }
    })
}

function getDefalutDataRes(dataRes){
    $("#noDataList").hide();
    $("#hasNoData").hide();
    $("#hasData").show();
    $("#fixedThree").show()
    $("#hasData  tr:not(:first)").empty();
    $("#isPrint").html("");
    $("#fixedThree  tr:not(:first)").empty();
    var htmlPrintArea = '<tr id="printTitle"></tr>';
    var htmlPrintContent = '<tr id="printContent"></tr>'
    $("#isPrint").append(htmlPrintArea)
    $("#isPrint").append(htmlPrintContent)
    var newCrease = dataRes.data.report_list[0].item_list.length;
    var itemAll = dataRes.data.report_list[0].item_list;
    itemAll = itemAll.sort(
        function(a, b)
        {
            return a.sort - b.sort;
        }
    )
    console.log("left:",itemAll)
    var creaseHtml = "";
    var scoreHtml = "";
    var infoHtml = "";

    //左边固定
    var fixed = '<th >序号</th><th >姓名</th><th >性别</th>';
    //打印的东西;
    var print = '';
    var printHtml='<th rowspan="2">学籍名单</th><th rowspan="2">性别</th>';
    var printContent="";
    //var isHasHandW = 0;
    for(var i=0;i<newCrease;i++){
        switch(itemAll[i].item){
            case "身高":
            {
                creaseHtml+='<th rowspan="2">身高(厘米)</th>';
                break;
            }
            case "体重":
            {
                creaseHtml+='<th rowspan="2" >体重(千克)</th>';
                break;
            }
            case "BMI":
            {
                creaseHtml += ' <th colspan = "3" >体重指数</th>';
                printHtml+= ' <th colspan = "3" >体重指数</th>';
                break;
            }
            case "视力":
            {
                creaseHtml += ' <th colspan = "2" >' + unitTeam[itemAll[i].item] + '</th>';
                printHtml += ' <th colspan = "2" >' + unitTeam[itemAll[i].item] + '</th>';
                break;
            }
            case "肺活量":
            {
                creaseHtml += ' <th colspan = "3" >' + unitTeam[itemAll[i].item] + '</th>';
                printHtml += ' <th colspan = "3" >' + unitTeam[itemAll[i].item] + '</th>';
                break;
            }
            case "50米跑":
            {
                creaseHtml += ' <th colspan = "3" >' + unitTeam[itemAll[i].item] + '</th>';
                printHtml += ' <th colspan = "3" >' + unitTeam[itemAll[i].item] + '</th>';
                break;
            }
            case "坐位体前屈":
            {
                creaseHtml += ' <th colspan = "3" >' + unitTeam[itemAll[i].item] + '</th>';
                printHtml += ' <th colspan = "3" >' + unitTeam[itemAll[i].item] + '</th>';
                break;
            }
            case "一分钟跳绳":
            {
                creaseHtml += ' <th colspan = "3" >' + unitTeam[itemAll[i].item] + '</th>';
                printHtml += ' <th colspan = "3" >' + unitTeam[itemAll[i].item] + '</th>';
                break;
            }
            case "一分钟仰卧起坐":
            {
                creaseHtml += ' <th colspan = "3" >' + unitTeam[itemAll[i].item] + '</th>';
                printHtml += ' <th colspan = "3" >' + unitTeam[itemAll[i].item] + '</th>';
                break;
            }
            case "50*8往返跑":
            {
                creaseHtml += ' <th colspan = "3" >' + unitTeam[itemAll[i].item] + '</th>';
                printHtml += ' <th colspan = "3" >' + unitTeam[itemAll[i].item] + '</th>';
                break;
            }

            case "跳绳加分项":
            {
                creaseHtml += ' <th colspan = "2" style="width:90px">' + unitTeam[itemAll[i].item] + '</th>';
                printHtml += ' <th colspan = "2" style="width:90px">' + unitTeam[itemAll[i].item] + '</th>';
                break;
            }
            case "总分":
            {
                creaseHtml += ' <th colspan = "2" >' + unitTeam[itemAll[i].item] + '</th>';
                printHtml += ' <th colspan = "2" >' + unitTeam[itemAll[i].item] + '</th>';
                break;
            }

            default:
                break;
        }
    }

    $("#personHealthTable").html(creaseHtml);
    $("#printTitle").html(printHtml);
    $("#leftThree").html(fixed);

    for(var j=0;j<newCrease;j++){
        switch(itemAll[j].item){

            case "BMI":
            {
                scoreHtml+='<td>BMI</td><td>得分</td><td>等级</td>';
                printContent+='<td>BMI</td><td>得分</td><td>等级</td>';
                break;
            }
            case "视力":
            {
                scoreHtml+='<td>左</td><td>右</td>';
                printContent+='<td>左</td><td>右</td>';
                break;
            }
            case "肺活量":
            {
                scoreHtml+='<td>成绩</td><td>得分</td><td>等级</td>';
                printContent+='<td>成绩</td><td>得分</td><td>等级</td>';
                break;
            }
            case "50米跑":
            {
                scoreHtml+='<td>成绩</td><td>得分</td><td>等级</td>';
                printContent+='<td>成绩</td><td>得分</td><td>等级</td>';
                break;
            }
            case "坐位体前屈":
            {
                scoreHtml+='<td>成绩</td><td>得分</td><td>等级</td>';
                printContent+='<td>成绩</td><td>得分</td><td>等级</td>';
                break;
            }
            case "一分钟跳绳":
            {
                scoreHtml+='<td>成绩</td><td>得分</td><td>等级</td>';
                printContent+='<td>成绩</td><td>得分</td><td>等级</td>';
                break;
            }
            case "一分钟仰卧起坐":
            {
                scoreHtml+='<td>成绩</td><td>得分</td><td>等级</td>';
                printContent+='<td>成绩</td><td>得分</td><td>等级</td>';
                break;
            }
            case "50*8往返跑":
            {
                scoreHtml+='<td>成绩</td><td>得分</td><td>等级</td>';
                printContent+='<td>成绩</td><td>得分</td><td>等级</td>';
                break;
            }

            case "跳绳加分项":
            {
                scoreHtml+='<td>成绩</td><td>得分</td>';
                printContent+='<td>成绩</td><td>得分</td>';
                break;
            }
            case "总分":
            {
                scoreHtml+='<td>总分</td><td>等级</td>';
                printContent+='<td>总分</td><td>等级</td>';
                break;
            }

            default:
                break;
        }

    }

    $("#personHealthScore").html(scoreHtml);
    $("#printContent").html(printContent);
    var heightLeft = ($("#personHealthScore").height())*2;
    $("#leftThree").height(heightLeft)

    //得到学生的信息
    var  tableHtml="";
    //计算BMI指数
    var leftHtml = "";
    var printAll = "";
    for(var j=0;j<dataRes.data.report_list.length;j++){
        printAll+='<tr>'
        var allData = dataRes.data.report_list[j].item_list;
        var stuInfo = dataRes.data.report_list[j];
        allData = allData.sort(
            function(a, b)
            {
                return a.sort - b.sort;
            }
        )
        console.log("allData:",allData)
        var heigh="FUCK";
        var wait="FUCK";
        var allCount = ""
        var jumpCount = ""
        var stu_num = stuInfo.student_number;
        if(stu_num==0 || stu_num=="0"){
            stu_num="";
        }
        for(var i=0;i<allData.length;i++){
            if(allData[i].item=="身高" ){
                heigh=i;
            }
            else if(allData[i].item=="体重" ){
                wait=i;
            }
        }

        if(wait=="FUCK" && heigh=="FUCK"){
            tableHtml+='<tr>';
        }else if(wait=="FUCK" && heigh!="FUCK" ){
            tableHtml+='<tr>'+'<td>'+allData[heigh].record+'</td>';
        }else if(wait!="FUCK" && heigh=="FUCK"){
            tableHtml+='<tr>'+'<td>'+allData[wait].record+'</td>';
        }
        else if(wait!="FUCK" && heigh!="FUCK"){
            tableHtml+='<tr>'+'<td>'+allData[heigh].record+'</td><td>'+allData[wait].record+'</td>';
        }
        printAll+='<td>'+stuInfo.student_name+'</td><td>'+sexChange[stuInfo.sex]+'</td>'
        //BMI
        for(var k=0;k<allData.length;k++){
            switch(allData[k].item){

                case "BMI":
                {
                    tableHtml+='<td>'+allData[k].record+'</td><td>'+allData[k].score+'</td><td>'+fatAndThin[allData[k].level]+'</td>'
                    printAll+='<td>'+allData[k].record+'</td><td>'+allData[k].score+'</td><td>'+fatAndThin[allData[k].level]+'</td>'

                    break;
                }
                case "视力":
                {
                    var left ="";
                    var right ="";
                    if(allData[k].record == ""){
                        left = "";
                        right=""
                    }else{
                        left = allData[k].record.split(",")[0];
                        right = allData[k].record.split(",")[1];
                    }

                    tableHtml+='<td><span>'+left+'</span></td><td>'+right+'</td>';
                    printAll+='<td><span>'+left+'</span></td><td>'+right+'</td>';
                    break;
                }
                case "肺活量":
                {
                    tableHtml+='<td><span>'+allData[k].record+'</span></td><td>'+allData[k].score+'</td><td><span>'+ScoreType[allData[k].level]+'</span></td>';
                    printAll+='<td><span>'+allData[k].record+'</span></td><td>'+allData[k].score+'</td><td><span>'+ScoreType[allData[k].level]+'</span></td>'
                    break;
                }
                case "50米跑":
                {

                    tableHtml+='<td><span>'+allData[k].record+'</span></td><td>'+allData[k].score+'</td><td><span>'+ScoreType[allData[k].level]+'</span></td>';
                    printAll+='<td><span>'+allData[k].record+'</span></td><td>'+allData[k].score+'</td><td><span>'+ScoreType[allData[k].level]+'</span></td>';
                    break;
                }
                case "坐位体前屈":
                {
                    tableHtml+='<td><span>'+allData[k].record+'</span></td><td>'+allData[k].score+'</td><td><span>'+ScoreType[allData[k].level]+'</span></td>'
                    printAll+='<td><span>'+allData[k].record+'</span></td><td>'+allData[k].score+'</td><td><span>'+ScoreType[allData[k].level]+'</span></td>'

                    break;
                }
                case "一分钟跳绳":
                {   tableHtml+='<td><span>'+allData[k].record+'</span></td><td>'+allData[k].score+'</td><td><span>'+ScoreType[allData[k].level]+'</span></td>';
                    printAll+='<td><span>'+allData[k].record+'</span></td><td>'+allData[k].score+'</td><td><span>'+ScoreType[allData[k].level]+'</span></td>';
                    break;
                }
                case "一分钟仰卧起坐":
                {
                    tableHtml+='<td><span>'+allData[k].record+'</span></td><td>'+allData[k].score+'</td><td><span>'+ScoreType[allData[k].level]+'</span></td>';
                    printAll+='<td><span>'+allData[k].record+'</span></td><td>'+allData[k].score+'</td><td><span>'+ScoreType[allData[k].level]+'</span></td>';
                    break;
                }
                case "50*8往返跑":
                {
                    tableHtml+='<td><span>'+timeFort(allData[k].record)+'</span></td><td>'+allData[k].score+'</td><td><span>'+ScoreType[allData[k].level]+'</span></td>';
                    printAll+='<td><span>'+timeFort(allData[k].record)+'</span></td><td>'+allData[k].score+'</td><td><span>'+ScoreType[allData[k].level]+'</span></td>';
                    break;
                }

                case "跳绳加分项":
                {
                    tableHtml+='<td><span>'+allData[k].record+'</span></td><td>'+allData[k].score+'</td>';
                    printAll+='<td><span>'+allData[k].record+'</span></td><td>'+allData[k].score+'</td>';
                    break;
                }
                case "总分":
                {
                    tableHtml+='<td><span>'+allData[k].record+'</span></td><td><span>'+ScoreType[allData[k].level]+'</span></td>';
                    printAll+='<td><span>'+allData[k].record+'</span></td><td><span>'+ScoreType[allData[k].level]+'</span></td>';
                    break;
                }

                default:
                    break;
            }
        }


        leftHtml+='<tr><td>'+stu_num+'</td><td>'+stuInfo.student_name+'</td><td>'+sexChange[stuInfo.sex]+'</td></tr>'

        tableHtml+='</tr>'
        printAll+='</tr>'

    }

    // $("#hasData  tr:not(:first)").empty();

    $("#hasData").append(tableHtml);
    $("#fixedThree").append(leftHtml);
    $("#isPrint").append(printAll)
}
PersonHealth.prototype.getDefault = function(){

    //$("#hasData").html("");
   $("#hasData  tr:not(:first)").html("");
    $("#isPrint").html("");
    var termAndYear = $("#choiceYear").text();
    this.year = termAndYear.substring(0,4);
    this.term = termAndYear.substring(4,8);
    localStorage.setItem("iterm",this.term);
    this.grade = $("#choiceGrade").text();
    this.classRoom = $("#choiceClass").text();
    this.sex = $('#checkSex input[type="radio"]:checked ').val();
    var sexId = ""
    var classId = this.grade + "," + this.classRoom;
    if($.trim(this.grade)!="暂无年级"){
        $("#title").html(this.year + "学年" + this.term + this.grade + this.classRoom + "体质健康评分表");
        $("#noDataList").hide();
        $("#hasNoData").hide();
    }else{
        $("#title").html(this.year + "学年" + this.term + "体质健康评分表");

        $("#noDataList").show();
        $("#hasNoData").show();

        //$("#title").html(this.year + this.term +  "体质健康评分表暂无数据");
        $("#personHealthTable").html("");
        $("#fixedThree").hide()
       // return;
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
                 console.log(dataRes)

                if (dataRes.header.code = "200") {
                    if(dataRes.data.report_list.length==0){
                        $("#hasNoData").show();
                        $("#hasData").hide();
                        $("#noDataList").show();
                        $("#fixedThree").hide()

                     }else{
                        getDefalutDataRes(dataRes)
                        //$("#contentTable").html(tableHtml)
                    }

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
      _this.getDefault();
	$("#personHealthLook").on("click", function() {
        $("#leftThree").html("");
        $("#fixedThree  tr:not(:first)").empty();
        $("#personHealthTable").html("");
        var year = $("#choiceYear").text().substring(0,4);
        var term = $("#choiceYear").text().substring(4,8);
        localStorage.setItem("year",year);
        localStorage.setItem("term",term);
        localStorage.setItem("grade",$("#choiceGrade").text());
        localStorage.setItem("class",$("#choiceClass").text());
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
//printArea();
}
function PrintContent(){
    $("#aPrint").on("click",function(){
        $("#aPrint").hide();
        $("#printChildF").hide();
        $("#printF").hide();
        $("#printS").hide();
        $("#allDiv").hide();
        $("#isPrintRight").show ();
        window.print();
        setTimeout(function(){
            $("#aPrint").show();
            $("#printChildF").show();
            $("#printF").show();
            $("#printS").show();
            $("#allDiv").show();
            $("#isPrintRight").hide ();
        })

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
    gradeNameModel = unique1(gradeNameModel);
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
    }else if(newGrade=="全部年级"){
        $("#choiceGrade").html($($("#gradeListHtmlId div")[0]).text());
    }
    else{
        $("#choiceGrade").html(newGrade);
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
function reSize(){
    var width = $('#printArea').width();
    $("#allDiv").css('width',width-15);
    //$("#allDiv").css("max-width",width-15)
    $("#rightDiv").css({'width':width-179});

    //$("#rightDiv").find('#hasData').css('display','block');
    //$("#rightDiv").css("max-width",width-179)
}

$(document).ready(function() {

    reSize();
    $(window).resize(function() {
        reSize();
    });
    if(localStorage.getItem("clickNum")%2!=0){
        $("#numDate").hide();
    }else {
        $("#numDate").show();
    }

    //鼠标滑动动画
    if(!localStorage.getItem("userName")){
        window.location.href="index.html"
    }
    headerMove();
	var url = getURL() + "get_user_class";
    var school=localStorage.getItem("schoolName");
    contractEnd(school);
    //var name = localStorage.getItem("userName");
    var name = localStorage.getItem("account")
    var is_root = localStorage.getItem("is_root")
    var school_id = localStorage.getItem("schoolId");
    var nick = localStorage.getItem("nick")
    var dataSchoolInfo ={"name":nick,"schoolName":school,"is_root":is_root};
    getStuInfo(dataSchoolInfo)
    contractEnd(school)
    var data = {
        "account":name
    };
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
               // personList.getPersonListTerm();
                //年级
                personList.getPersonListGrade();
                //班级
                personList.getPersonListClass();
                //获取默认的数据
                //var width = $("#printArea").width();


               // personList.getDefault();
                //获取数据
                personList.getAllData();
                //向服务器传输数据
                PrintContent();
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