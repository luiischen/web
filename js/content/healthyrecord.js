/**
 * @author By lizhihu
 * @date By 2016-01-23
 */
function hideList() {
    $(".inputList").slideUp(500);
}
function getYearPrint(){
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var date = date.getDate();
    return year+" 年 "+month+" 月 "+date+" 日";
}
var gradeNameModel = [];
var classNameModel = [];
//默认班级
var defalutClassText = "";
var PersonHealth = function () {
    this.term = "";
    this.year = "";
    this.grade = "";
    this.classRoom = "";
    this.sex = "";
    this.stuName = "";

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
PersonHealth.prototype.getPersonListYear = function () {
   // $("#choiceYear").html($($("#yearListId .list div")[0]).context.innerText);
    //学年
    termAndYear();
    $("#yearId").on("click", function (e) {
        hideList();
        if ($("#yearListId").css("display") != "block") {
            $("#yearListId").slideDown(500);
            $("#yearId img").attr("src", "img/moreup_gray.png");
        } else {
            $("#yearListId").slideUp(500);
            $("#yearId img").attr("src", "img/moredown_gray.png");
        }
        stopBubble(e)
        //event.stopPropagation();
    });
    $("#yearListId .list div").each(function (index, val) {
        return function () {
            $($("#yearListId .list div")[index]).click(function () {
                var _this = this;
                $("#choiceYear").html($(_this).context.innerText);

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

    $(document).click(function (event) {
        $("#yearListId").slideUp(300);
        $("#yearId img").attr("src", "img/moredown_gray.png");
    })
};

PersonHealth.prototype.getPersonListGrade = function () {

    $("#gradeId").on("click", function (e) {

        hideList();
        if ($("#gradeListId").css("display") != "block") {
            $("#gradeListId").slideDown(500);
            $("#gradeId img").attr("src", "img/moreup.png");
        } else {
            $("#gradeListId").slideUp(500);
            $("#gradeId img").attr("src", "img/moredown_gray.png");
        }
        stopBubble(e)
        //event.stopPropagation();
        $("#gradeListId .list div").each(function (index, val) {
            return function () {
                $($("#gradeListId .list div")[index]).click(function () {

                    var _this = this;
                    $("#choiceGrade").html($(_this).context.innerText);

                    $("#gradeListId").slideUp(500);
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

    $(document).click(function (event) {
        $("#gradeListId").slideUp(500);
        $("#gradeId img").attr("src", "img/moredown_gray.png");
    })
}
//班级
PersonHealth.prototype.getPersonListClass = function () {

    //$("#choiceClass").html($($("#classListId .list div")[0]).context.innerText);
    $("#classId").on("click", function (e) {


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
        hideList();
        if ($("#classListId").css("display") != "block") {
            $("#classListId").slideDown(500);
            $("#classId img").attr("src", "img/moreup_gray.png");
        } else {
            $("#classListId").slideUp(500);
            $("#classId img").attr("src", "img/moredown_gray.png");
        }
        stopBubble(e)
        //event.stopPropagation();
        $("#classListId .list div").each(function (index, val) {
            return function () {
                $($("#classListId .list div")[index]).click(function () {
                    var _this = this;
                    $("#choiceClass").html($(_this).context.innerText);
                    $("#classListId").slideUp(500);
                    $("#classId img").attr("src", "img/moredown_gray.png");
                })
            }(index)

        })
        $(document).click(function (event) {
            $("#classListId").slideUp(500);
            $("#classId img").attr("src", "img/moredown_gray.png");
        })
    })
    //选择学期

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
                flagIsTrue=true;
                classAndGrade(dataRes.data.user_class)
            }else{
                flagIsTrue=false;
                //classAndGrade(dataRes.data.user_class)
                $("#gradeListHtmlId").html("")
                $("#classListHtmlId").html("")
                $("#choiceGrade").html("暂无年级");
                $("#choiceClass").html("暂无班级");

            }
        }
    })
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
function getChildHtml(childDataList){
    var stu_name = ""
    var class_name = "";
    var sex_name = "";
    var stu_id = "";
    var year_name = "";
    var stu_age = "";
    var stu_nation = "";
    var term_name = "";
    var student_infoAddr = "";
    var student_infoList = "";
    stu_name = childDataList[0].student_name;
    class_name = dataArr[childDataList[0].class_id];
    class_name = class_name.split(",").join("");
    sex_name = sexChange[childDataList[0].sex];
    stu_id = childDataList[0].student_id;
    year_name = childDataList[0].year;
    stu_age = childDataList[0].birth;
    stu_nation = NationArr[childDataList[0].nationality];
    term_name = dataTermBrr[childDataList[0].term];
    /*if(term_name=="第一学期"){
        term_name = "上学期";
    }else if(term_name=="第二学期"){
        term_name = "下学期";
    }*/
    student_infoAddr += '<tr><td style="font-weight:bold;text-align: center;width:15%">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</td><td style="text-align: center;width:20%">' + stu_name + '</td><td style="font-weight:bold;text-align: center;width:15%">性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别</td><td style="text-align: center;width:10%">' + sex_name + '</td><td style="font-weight:bold;width:20%;text-align: center;">出生年月</td><td style="text-align: center;width:20%">' + stu_age + '</td></tr>';
    student_infoAddr += '<tr><td style="font-weight:bold;text-align: center;">班&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;级</td><td style="text-align: center">' + class_name + '</td><td style="font-weight:bold;text-align: center;">学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年</td><td style="text-align: center">' + year_name + '</td><td style="font-weight:bold;text-align: center;">学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td><td style="text-align: center">' + term_name + '</td></tr>';
    student_infoAddr += '<tr><td style="font-weight:bold;text-align: center;">学&nbsp;籍&nbsp;号</td><td colspan="3" style="text-align: center">' + stu_id + '</td><td style="font-weight:bold;text-align: center;">民&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;族</td><td style="text-align: center">' + stu_nation + '</td></tr>';
    $("#stuInfoAddr").html(student_infoAddr);
    student_infoList += '<tr><th colspan="6" style="border-top:none ;text-align: center;background: #d8d8d8;">健康指标</th></tr>';
    student_infoList += '<tr style="font-weight:bold;text-align: center"><td>健康指标</td><td>单项指标</td><td>&nbsp;&nbsp;&nbsp;成绩&nbsp;&nbsp;&nbsp;</td><td>得分</td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;国家级&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>健康指数(地区)</td></tr>';
    var td = childDataList[0];
    var allItem = [];
    for(var i=0;i<td.form.length; i++){
        if(td.form[i].item=="身高"){
            allItem.push(td.form[i])
        }else{
            continue;
        }
    }
    for(var i=0;i<td.form.length; i++){
        if(td.form[i].item=="体重"){
            allItem.push(td.form[i])
        }else{
            continue;
        }
    }
    for(var i=0;i<td.form.length; i++){
        if(td.form[i].item=="BMI"){
            allItem.push(td.form[i])
        }else{
            continue;
        }
    }
    for (var a = 0; a < td.form.length; a++) {
        var isZero="/"
        var BMIlevalCountry="";
        if(td.form[a].score=="0" || td.form[a].score==""){
            isZero="/"
        }else{
            isZero=td.form[a].score;
        }
        for(var i=0;i<td.form.length; i++){
            if(td.form[i].item=="BMI"){

                BMIlevalCountry = fatAndThin[td.form[i].level];
            }

        }
        if (a == 0 ) {
            student_infoList += '<tr><td rowspan="' + td.form.length + '" colspan="1" style="font-weight:bold;text-align: center">身体形态</td><td colspan="1">' + allItem[a].item + '(' + allItem[a].unit + ')</td><td colspan="1" style="text-align: center">' + allItem[a].record + '</td><td colspan="1" style="text-align: center">/</td><td rowspan="' + td.form.length + '" colspan="1" style="text-align: center">'+BMIlevalCountry+'</td><td rowspan="' + td.form.length + '" colspan="1" style="text-align: center">/</td></tr>';
        }

        else {
            if(allItem[a].item=="BMI"){
                student_infoList += '<tr><td colspan="1">' + allItem[a].item + '(千克/平方米)</td><td colspan="1" style="text-align: center">' + allItem[a].record + '</td><td colspan="1" style="text-align: center">' + allItem[a].score + '分</td></tr>';
            }else{
                student_infoList += '<tr><td colspan="1">' + allItem[a].item + '(' + allItem[a].unit + ')</td><td colspan="1" style="text-align: center">' + allItem[a].record + '</td><td colspan="1" style="text-align: center">' + isZero + '</td></tr>';
            }

        }

    }
    for (var a = 0; a < td.enginery.length; a++) {
        var isZero="/"
        if(td.enginery[a].score=="0"){
            isZero="0"
        }else{
            isZero=td.enginery[a].score;
        }
       /* student_infoList += '<tr><td rowspan="' + 3 + '" colspan="1">身体机能</td></tr>";*/
        if (a == 0 && td.enginery[a].item!="视力") {
            student_infoList += '<tr><td rowspan="' + 3 + '" colspan="1" style="font-weight:bold;text-align: center">身体机能</td><td colspan="1">' + td.enginery[a].item + '(' + td.enginery[a].unit + ')</td><td colspan="1" style="text-align: center">' + td.enginery[a].record + '</td><td colspan="1" style="text-align: center">' + isZero+ '分</td><td rowspan="" colspan="1" style="text-align: center">'+ScoreType[td.enginery[a].level]+'</td><td rowspan="" colspan="1" style="text-align: center">'+td.enginery[a].area+'级</td></tr>';
        } else {
            if(td.enginery[a].item=="视力"){
                var left ="";
                var right ="";
                if(td.enginery[a].record == ""){
                    left = "";
                    right=""
                }else{
                     left = td.enginery[a].record.split(",")[0];
                     right = td.enginery[a].record.split(",")[1];
                }

                var isNormalLeft = "";
                var isNormalRight = "";

               if(Math.floor(left)>=5.0){
                    isNormalLeft ="正常"
                }else if(left==""){
                    isNormalLeft =""
                }else{
                    isNormalLeft ="不正常"
                }
                if(Math.floor(right)>=5.0){
                    isNormalRight ="正常"
                }else if(right==""){
                    isNormalRight =""
                }else{
                    isNormalRight ="不正常"
                }

                student_infoList += '<tr  ><td rowspan="2" style="padding:0 "><div style="float:left;line-height:91px;padding-left:12px"><span>'+td.enginery[a].item+'</span></div><div style="float:right;    float: right; height: 105px;border-left: 1px solid #ababab;"><p style="width:100px;height:50%;border-bottom:1px solid #ababab;text-align: center;line-height:49px;">左眼</p><p style="width:100px;height:50%;border-bottom:1px solid #eeeeee;text-align: center;line-height:49px;">右眼</p></div></td><td style="text-align: center">'+left+'</td><td style="text-align: center">/</td><td style="text-align: center">'+isNormalLeft+'</td><td style="text-align: center">/</td>/</td></tr><tr ><td style="text-align: center">'+right+'</td><td style="text-align: center">/</td><td style="text-align: center">'+isNormalRight+'</td><td style="text-align: center">/</td></tr>'
            }else{

                student_infoList += '<tr><td colspan="1">' + td.enginery[a].item + '(' + td.enginery[a].unit + ')</td><td colspan="1" style="text-align: center">' + td.enginery[a].record + '</td><td colspan="1" style="text-align: center">' + isZero + '</td><td rowspan="" colspan="1" style="text-align: center">'+ScoreType[td.enginery[a].level]+'</td><td rowspan="" colspan="1" style="text-align: center">'+areaType[td.enginery[a].area]+'</td></tr>';
            }

        }

    }
    for (var a = 0; a < td.stamina.length; a++) {
        var scoreFormat = "";
        var isZero="/"
        if(td.stamina[a].score=="0"){
            isZero="0"
        }else{
            isZero=td.stamina[a].score;
        }
        if("50*8往返跑" == td.stamina[a].item){
            scoreFormat = timeFort(td.stamina[a].record)
        }else{
            scoreFormat = td.stamina[a].record;
        }
        if (a == 0) {
            student_infoList += '<tr><td rowspan="' + td.stamina.length + '" colspan="1" style="font-weight:bold;text-align: center">身体体能</td><td colspan="1">' + td.stamina[a].item + '(' + td.stamina[a].unit + ')</td><td colspan="1" style="text-align: center">' + scoreFormat + '</td><td colspan="1" style="text-align: center">' + isZero + '分</td><td rowspan="" colspan="1" style="text-align: center">'+ScoreType[td.stamina[a].level]+'</td><td rowspan="" colspan="1" style="text-align: center">'+td.stamina[a].area+'级</td></tr>';
        } else {
            student_infoList += '<tr><td colspan="1">' + td.stamina[a].item + '(' + td.stamina[a].unit + ')</td><td colspan="1" style="text-align: center">' + scoreFormat + '</td><td colspan="1" style="text-align: center">' + isZero + '分</td><td rowspan="" colspan="1" style="text-align: center">'+ScoreType[td.stamina[a].level]+'</td><td rowspan="" colspan="1" style="text-align: center">'+td.stamina[a].area+'级</td></tr>';

        }
    }
    var suggestHtml="";
    /*for(var b=0;b<td.suggestion.length;b++){

        if(td.suggestion[b].content.indexOf("BMI")>-1){*/
            suggestHtml+='<p style="font-family:仿宋, monospace;">身体形态:</p>';
            suggestHtml+='<p style="font-family:仿宋, monospace;margin-left: 20px;">'+td.suggestion[0].content+'</p>';
/*
        }else{
            continue;
        }
    }*/
    suggestHtml+='<p style="font-family:仿宋, monospace;">身体机能:</p>';
    for(var b=0;b<td.suggestion.length;b++){

        if(td.suggestion[b].content.indexOf("左眼视力")>-1){

            suggestHtml+='<p style="font-family:仿宋, monospace;margin-left: 20px;">视力:'+td.suggestion[b].content+'</p>';

        }else if(td.suggestion[b].content.indexOf("你的肺活量")>-1){
            suggestHtml+='<p style="font-family:仿宋, monospace;margin-left: 20px;">肺活量:'+td.suggestion[b].content+'</p>';
        }
        else{
            continue;
        }
        //suggestHtml+='<p>'+td.suggestion[b].content+'</p>';

    }
    suggestHtml+='<p style="font-family:仿宋, monospace;">身体体能:</p>';
    for(var b=0;b<td.suggestion.length;b++){

        if(td.suggestion[b].content.indexOf("速度")>-1){

            suggestHtml+='<p style="font-family:仿宋, monospace;margin-left: 20px;">'+td.suggestion[b].content+'</p>';

        }
        else if(td.suggestion[b].content.indexOf("耐力")>-1){
            suggestHtml+='<p style="font-family:仿宋, monospace;margin-left: 20px;">'+td.suggestion[b].content+'</p>';
        }
        else if(td.suggestion[b].content.indexOf("柔韧")>-1){
            suggestHtml+='<p style="font-family:仿宋, monospace;margin-left: 20px;">'+td.suggestion[b].content+'</p>';
        }
        else{
            continue;
        }
    }
   if(childDataList[0].total_score==""|| childDataList[0].total_score==null){
       student_infoList += '<tr><td style="font-weight:bold;text-align: center;" colspan="1" >加分指标</td><td>一分钟跳绳(个)</td><td></td><td></td><td style="text-align: center">/</td><td style="text-align: center">/</td ></tr><tr><td style="font-weight:bold;text-align: center;letter-spacing:18px" colspan="4">总评:<span>分</td><td></td><td></td></tr><tr style="background:#d8d8d8"><th colspan="6" style="text-align:center;"><span>运动建议</span></th></tr>';
       student_infoList += '<tr><td colspan="6" ><table border="0" frame=void><tr><td style="border-right:none;width:202px"> <div class="imgCode"> <img src="img/code.png" style="float:left;;margin-top:-6px;width:200px;height:200px;"/><p align="left" style="font-weight: bold;text-indent: 15px;clear:both;margin-left:35px;">运动指导</p></div></td><td style="border-left:none"><div style="margin-left:5px;margin-top:15px">'+suggestHtml+'</div>  <div style="width: 100%;padding: 20px;"><p align="right";color:rgba(50,20,30,.8);">签名：<span style="display:inline-block;width: 120px;border-bottom: 1px solid #ccc;"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p><p></p><p style="float:right;margin-top:12px;margin-right:18px">制表时间：<span>'+getYearPrint()+'</span></p></div></td></tr></table> </td></tr>'

   }else{
       student_infoList += '<tr><td style="font-weight:bold;text-align: center;" colspan="1">加分指标</td><td>一分钟跳绳(个)</td><td style="text-align: center">'+childDataList[0].addition[0].record+'</td><td style="text-align: center">'+childDataList[0].addition[0].score+'分</td><td style="text-align: center">/</td><td style="text-align: center">/</td></tr><tr><td style="font-weight:bold;text-align: center;letter-spacing:18px" colspan="3" >总评</td><td><div style="font-weight:bold;text-align: center">'+childDataList[0].total_score.toFixed(2)+'分</div></td><td style="font-weight:bold;text-align: center">'+ScoreType[childDataList[0].total_level]+'</td><td style="font-weight:bold;text-align: center">'+childDataList[0].total_area+'级</td></tr><tr style="background:#d8d8d8"><th colspan="6" style="text-align:center"><span>运动建议</span></th></tr>';
       student_infoList += '<tr><td colspan="6" ><table border="0" frame=void><tr><td style="border-right:none;width:202px"> <div class="imgCode"> <img src="img/code.png" style="float:left;;margin-top:-6px;width:200px;height:200px;"/><p align="left" style="font-weight: bold;text-indent: 15px;clear:both;margin-left:35px;">运动指导</p></div></td><td style="border-left:none"><div style="margin-left:5px;margin-top:15px">'+suggestHtml+'</div>  <div style="width: 100%;padding: 20px;"><p align="right";color:rgba(50,20,30,.8);">签名：<span style="display:inline-block;width: 120px;border-bottom: 1px solid #ccc;"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p><p></p><p style="float:right;margin-top:12px;margin-right:18px">制表时间：<span>'+getYearPrint()+'</span></p></div></td></tr></table> </td></tr>'

   }
    $("#healthItemList").html(student_infoList);

}

function getChildPrintHtml(childDataList) {
    $("#stuTabePrint").html("");
    var schoolName = localStorage.getItem("schoolName");
    var city = localStorage.getItem("city");
    schoolName = city+schoolName;
        for (var printNum = 0; printNum < childDataList.length; printNum++) {
            var stu_name = ""
            var class_name = "";
            var sex_name = "";
            var stu_id = "";
            var year_name = "";
            var stu_age = "";
            var stu_nation = "";
            var term_name = "";
            var student_infoAddr = "";
            var student_infoList = "";
            var stu_table = "";
            if (printNum != 0) {
                stu_table+='<h2 class="title" style="font-family:仿宋, monospace;margin-top:1700px;margin-bottom: 28px">'+schoolName+'学生健康成长档案</h2>'
                stu_table += '<div class="stuInfo"><table class="healthTab">';
            } else {

                stu_table += '<div class="stuInfo"><table class="healthTab">';
            }

            stu_name = childDataList[printNum][0].student_name;
            class_name = dataArr[childDataList[printNum][0].class_id];
            class_name = class_name.split(",").join("");
            sex_name = sexChange[childDataList[printNum][0].sex];
            stu_id = childDataList[printNum][0].student_id;
            year_name = childDataList[printNum][0].year;
            stu_age = childDataList[printNum][0].birth;
            stu_nation = NationArr[childDataList[printNum][0].nationality];
            term_name = dataTermBrr[childDataList[printNum][0].term];

            student_infoAddr += '<tr><td style="font-weight:bold;text-align: center;width:15%">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</td><td style="text-align: center;width:20%">' + stu_name + '</td><td style="font-weight:bold;text-align: center;width:15%">性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别</td><td style="text-align: center;width:10%">' + sex_name + '</td><td style="font-weight:bold;width:20%;text-align: center;">出生年月</td><td style="text-align: center;width:20%">' + stu_age + '</td></tr>';
            student_infoAddr += '<tr><td style="font-weight:bold;text-align: center;">班&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;级</td><td style="text-align: center">' + class_name + '</td><td style="font-weight:bold;text-align: center;">学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年</td><td style="text-align: center">' + year_name + '</td><td style="font-weight:bold;text-align: center;">学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</td><td style="text-align: center">' + term_name + '</td></tr>';
            student_infoAddr += '<tr><td style="font-weight:bold;text-align: center;">学&nbsp;&nbsp;籍&nbsp;&nbsp;号</td><td colspan="3" style="text-align: center">' + stu_id + '</td><td style="font-weight:bold;text-align: center;">民&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;族</td><td style="text-align: center">' + stu_nation + '</td></tr>';
            stu_table += student_infoAddr;
            stu_table += '</table>';
            student_infoList+='<table class="healthTab">';
            student_infoList += '<tr><th colspan="6" style="border-top:none ;text-align: center;background: #d8d8d8;">健康指标</th></tr>';
            student_infoList += '<tr style="font-weight:bold;text-align: center"><td>健康指标</td><td>单项指标</td><td>&nbsp;&nbsp;&nbsp;成绩&nbsp;&nbsp;&nbsp;</td><td>得分</td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;国家级&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>健康指数(地区)</td></tr>';

            var td = childDataList[printNum][0];
            var allItem = [];
            for(var k=0;k<td.form.length; k++){
                if(td.form[k].item=="身高"){
                    allItem.push(td.form[k])
                }else{
                    continue;
                }
            }
            for(var k=0;k<td.form.length; k++){
                if(td.form[k].item=="体重"){
                    allItem.push(td.form[k])
                }else{
                    continue;
                }
            }
            for(var k=0;k<td.form.length; k++){
                if(td.form[k].item=="BMI"){
                    allItem.push(td.form[k])
                }else{
                    continue;
                }
            }
            for (var a = 0; a < td.form.length; a++) {
                var isZero=""
                var BMIlevalCountry="";
                if(td.form[a].score=="0" || td.form[a].score==""){
                    isZero="0"
                }else{
                    isZero=td.form[a].score;
                }
                for(var i=0;i<td.form.length; i++){
                    if(td.form[i].item=="BMI"){

                        BMIlevalCountry = fatAndThin[td.form[i].level];
                    }

                }
                if (a == 0 ) {
                    student_infoList += '<tr><td rowspan="' + td.form.length + '" colspan="1" style="font-weight:bold;text-align: center">身体形态</td><td colspan="1">' + allItem[a].item + '(' + allItem[a].unit + ')</td><td colspan="1" style="text-align: center">' + allItem[a].record + '</td><td colspan="1" style="text-align: center">/</td><td rowspan="' + td.form.length + '" colspan="1" style="text-align: center">'+BMIlevalCountry+'</td><td rowspan="' + td.form.length + '" colspan="1" style="text-align: center">/</td></tr>';
                }

                else {
                    if(allItem[a].item=="BMI"){
                        student_infoList += '<tr><td colspan="1">' + allItem[a].item + '(千克/平方米)</td><td colspan="1" style="text-align: center">' + allItem[a].record + '</td><td colspan="1" style="text-align: center">' + allItem[a].score + '分</td></tr>';
                    }else{
                        student_infoList += '<tr><td colspan="1">' + allItem[a].item + '(' + allItem[a].unit + ')</td><td colspan="1" style="text-align: center">' + allItem[a].record + '</td><td colspan="1" style="text-align: center">' + isZero + '</td></tr>';
                    }

                }

            }
            for (var a = 0; a < td.enginery.length; a++) {
                var isZero=""
                if(td.enginery[a].score=="0"){
                    isZero="0"
                }else{
                    isZero=td.enginery[a].score;
                }
                /* student_infoList += '<tr><td rowspan="' + 3 + '" colspan="1">身体机能</td></tr>";*/
                if (a == 0 && td.enginery[a].item!="视力") {
                    student_infoList += '<tr><td rowspan="' + 3 + '" colspan="1" style="font-weight:bold;text-align: center">身体机能</td><td colspan="1">' + td.enginery[a].item + '(' + td.enginery[a].unit + ')</td><td colspan="1" style="text-align: center">' + td.enginery[a].record + '</td><td colspan="1" style="text-align: center">' + isZero+ '分</td><td rowspan="" colspan="1" style="text-align: center">'+ScoreType[td.enginery[a].level]+'</td><td rowspan="" colspan="1" style="text-align: center">'+td.enginery[a].area+'级</td></tr>';
                } else {
                    if(td.enginery[a].item=="视力"){
                        var left ="";
                        var right ="";
                        if(td.enginery[a].record == ""){
                            left = "";
                            right=""
                        }else{
                            left = td.enginery[a].record.split(",")[0];
                            right = td.enginery[a].record.split(",")[1];
                        }

                        var isNormalLeft = "";
                        var isNormalRight = "";
                        if(Math.floor(left)>=5.0){
                            isNormalLeft ="正常"
                        }else if(left==""){
                            isNormalLeft =""
                        }else{
                            isNormalLeft ="不正常"
                        }
                        if(Math.floor(right)>=5.0){
                            isNormalRight ="正常"
                        }else if(right==""){
                            isNormalRight =""
                        }else{
                            isNormalRight ="不正常"
                        }
                        student_infoList += '<tr  ><td rowspan="2" style="padding:0 "><div style="float:left;line-height:91px;padding-left:12px"><span>'+td.enginery[a].item+'</span></div><div style="float:right; height: 105px;border-left: 1px solid #ababab;"><p style="width:100px;height:50%;border-bottom:1px solid #ababab;text-align: center;line-height:49px;">左眼</p><p style="width:100px;height:50%;border-bottom:1px solid #eeeeee;text-align: center;line-height:49px;">右眼</p></div></td><td style="text-align: center">'+left+'</td><td style="text-align: center">/</td><td style="text-align: center">'+isNormalLeft+'</td><td style="text-align: center">/</td></tr><tr ><td style="text-align: center">'+right+'</td><td style="text-align: center">/</td><td style="text-align: center">'+isNormalRight+'</td><td style="text-align: center">/</td></tr>'
                    }else{
                        student_infoList += '<tr><td colspan="1">' + td.enginery[a].item + '(' + td.enginery[a].unit + ')</td><td colspan="1" style="text-align: center">' + td.enginery[a].record + '</td><td colspan="1" style="text-align: center">' + isZero + '</td><td rowspan="" colspan="1" style="text-align: center">'+ScoreType[td.enginery[a].level]+'</td><td rowspan="" colspan="1" style="text-align: center">'+areaType[td.enginery[a].area]+'</td></tr>';
                    }

                }

            }
            for (var a = 0; a < td.stamina.length; a++) {
                var scoreFormat = "";
                var isZero="/"
                if(td.stamina[a].score=="0"){
                    isZero="0"
                }else{
                    isZero=td.stamina[a].score;
                }
                if("50*8往返跑" == td.stamina[a].item){
                    scoreFormat = timeFort(td.stamina[a].record)
                }else{
                    scoreFormat = td.stamina[a].record;
                }
                if (a == 0) {
                    student_infoList += '<tr><td rowspan="' + td.stamina.length + '" colspan="1" style="font-weight:bold;text-align: center">身体体能</td><td colspan="1">' + td.stamina[a].item + '(' + td.stamina[a].unit + ')</td><td colspan="1" style="text-align: center">' + scoreFormat + '</td><td colspan="1" style="text-align: center">' + isZero + '分</td><td rowspan="" colspan="1" style="text-align: center">'+ScoreType[td.stamina[a].level]+'</td><td rowspan="" colspan="1" style="text-align: center">'+td.stamina[a].area+'级</td></tr>';
                } else {
                    student_infoList += '<tr><td colspan="1">' + td.stamina[a].item + '(' + td.stamina[a].unit + ')</td><td colspan="1" style="text-align: center">' + scoreFormat + '</td><td colspan="1" style="text-align: center">' + isZero + '分</td><td rowspan="" colspan="1" style="text-align: center">'+ScoreType[td.stamina[a].level]+'</td><td rowspan="" colspan="1" style="text-align: center">'+td.stamina[a].area+'级</td></tr>';

                }
            }
            var suggestHtml="";
/*            for(var b=0;b<td.suggestion.length;b++){

                if(td.suggestion[b].content.indexOf("BMI")>-1){*/
                    suggestHtml+='<p style="font-family:仿宋, monospace;">身体形态:</p>';
                    suggestHtml+='<p style="font-family:仿宋, monospace;margin-left: 20px;">'+td.suggestion[0].content+'</p>';
/*
                }else{
                    continue;
                }
            }*/
            suggestHtml+='<p style="font-family:仿宋, monospace;">身体机能:</p>';
            for(var b=0;b<td.suggestion.length;b++){

                if(td.suggestion[b].content.indexOf("视力")>-1){

                    suggestHtml+='<p style="font-family:仿宋, monospace;margin-left: 20px;">视力:'+td.suggestion[b].content+'</p>';

                }else if(td.suggestion[b].content.indexOf("你的肺活量")>-1){
                    suggestHtml+='<p style="font-family:仿宋, monospace;margin-left: 20px;">肺活量:'+td.suggestion[b].content+'</p>';
                }
                else{
                    continue;
                }
            }
            suggestHtml+='<p style="font-family:仿宋, monospace;">身体体能:</p>';
            for(var b=0;b<td.suggestion.length;b++){

                if(td.suggestion[b].content.indexOf("速度")>-1){

                    suggestHtml+='<p style="font-family:仿宋, monospace;margin-left: 20px;">'+td.suggestion[b].content+'</p>';

                }
                else if(td.suggestion[b].content.indexOf("耐力")>-1){
                    suggestHtml+='<p style="font-family:仿宋, monospace;margin-left: 20px;">'+td.suggestion[b].content+'</p>';
                }
                else if(td.suggestion[b].content.indexOf("柔韧")>-1){
                    suggestHtml+='<p style="font-family:仿宋, monospace;margin-left: 20px;">'+td.suggestion[b].content+'</p>';
                }
                else{
                    continue;
                }
            }
            if(childDataList[printNum][0].total_score==""|| childDataList[printNum][0].total_score==null){
                student_infoList += '<tr><td style="font-weight:bold;text-align: center;" colspan="1" >加分指标</td><td>一分钟跳绳(个)</td><td></td><td></td><td style="text-align: center">/</td><td style="text-align: center">/</td ></tr><tr><td style="font-weight:bold;text-align: center;letter-spacing:18px" colspan="4">总评:<span>分</td><td></td><td></td></tr><tr style="background:#d8d8d8"><th colspan="6" style="text-align:center;"><span>运动建议</span></th></tr>';
                student_infoList += '<tr><td colspan="6" ><table border="0" frame=void><tr><td style="border-right:none;width:202px"> <div class="imgCode"> <img src="img/code.png" style="float:left;;margin-top:-6px;width:200px;height:200px;"/><p align="left" style="font-weight: bold;text-indent: 15px;clear:both;margin-left:35px;">运动指导</p></div></td><td style="border-left:none"><div style="margin-left:5px;margin-top:15px">'+suggestHtml+'</div>  <div style="width: 100%;padding: 20px;"><p align="right";color:rgba(50,20,30,.8);">签名：<span style="display:inline-block;width: 120px;border-bottom: 1px solid #ccc;"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p><p></p><p style="float:right;margin-top:12px;margin-right:18px">制表时间：<span>'+getYearPrint()+'</span></p></div></td></tr></table> </td></tr>'

            }else{
                student_infoList += '<tr><td style="font-weight:bold;text-align: center;" colspan="1">加分指标</td><td>一分钟跳绳(个)</td><td style="text-align: center">'+childDataList[printNum][0].addition[0].record+'</td><td style="text-align: center">'+childDataList[printNum][0].addition[0].score+'分</td><td style="text-align: center">/</td><td style="text-align: center">/</td></tr><tr><td style="font-weight:bold;text-align: center;letter-spacing:18px" colspan="3" >总评</td><td><div style="font-weight:bold;text-align: center">'+childDataList[printNum][0].total_score.toFixed(2)+'分</div></td><td style="font-weight:bold;text-align: center">'+ScoreType[childDataList[printNum][0].total_level]+'</td><td style="font-weight:bold;text-align: center">'+childDataList[printNum][0].total_area+'级</td></tr><tr style="background:#d8d8d8"><th colspan="6" style="text-align:center"><span>运动建议</span></th></tr>';
                student_infoList += '<tr><td colspan="6" ><table border="0" frame=void><tr><td style="border-right:none;width:202px"> <div class="imgCode"> <img src="img/code.png" style="float:left;;margin-top:-6px;width:200px;height:200px;"/><p align="left" style="font-weight: bold;text-indent: 15px;clear:both;margin-left:35px;">运动指导</p></div></td><td style="border-left:none"><div style="margin-left:5px;margin-top:15px">'+suggestHtml+'</div>  <div style="width: 100%;padding: 20px;"><p align="right";color:rgba(50,20,30,.8);">签名：<span style="display:inline-block;width: 120px;border-bottom: 1px solid #ccc;"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p><p></p><p style="float:right;margin-top:12px;margin-right:18px">制表时间：<span>'+getYearPrint()+'</span></p></div></td></tr></table> </td></tr>'

            }
           student_infoList+='</table>'
           stu_table += student_infoList;
            stu_table += '</div>';
           $("#stuTabePrint").append(stu_table);
        }

}
function PrintAll(data){
    $("#aPrintAll").on("click",function(){
        getChildPrintHtml(data);
        $("#printF").hide();
        $("#printChildF").hide();
        $("#stuTabel").hide();
        $("#stuTabePrint").show();
        $("#stuTabePrint").css("width","95%")
        $("#aPrintAll").hide();
        $("#aPrint").hide();
        $("#printS").hide();
       window.print()
       setTimeout(function(){
            $("#printF").show();
            $("#printChildF").show();
            $("#stuTabel").show();
            $("#stuTabePrint").hide();
            $("#aPrintAll").show();
            $("#aPrint").show();
            $("#printS").show();
            $("#stuTabePrint").css("width","100%")
        },10)

    })
}
function getChild(data) {
    var childHtml = "";
    var childDataList = data.data.all_student;
    if (childDataList.length > 0) {
        $("#studentListId").hide();
        for (var i = 0; i < childDataList.length; i++) {
            childHtml += '<li><a href="javascript:void(0)" class="stu-name">' + childDataList[i][0].student_name + '</a></li>';

        }
        $("#childList").html(childHtml);
    } else {
        $("#studentListId").show();
        $("#childList").html("");
        $("#stuInfoAddrNoData").show();
        $("#stuInfoAddr").hide();
        $("#aPrintAll").hide();
        $("#aPrint").hide();
    }
    //默认第一个选中
    $($("#childList li")[0]).attr("class", "active");
    getChildHtml(childDataList[0]);
    $("#childList").find("li").each(function (index) {
        return function (index) {
            $($("#childList").find("li")[index]).click(function(){
                $($("#childList").find("li")[index]).attr("class","active");
                $($("#childList").find("li")[index]).siblings().attr("class","");
                getChildHtml(childDataList[index]);
                if ($(document).scrollTop() > 82) {
                    $(document).scrollTop(82);
                }
            })
        }(index)
    })
    PrintAll(childDataList)
    //getChildPrintHtml(childDataList)

}
PersonHealth.prototype.defalutData = function () {

    var schoolName = localStorage.getItem("schoolName");
    var termAndYear = $("#choiceYear").text();
    this.year = termAndYear.substring(0,4);
    this.term = termAndYear.substring(4,8);
    this.grade = $("#choiceGrade").text();
    this.classRoom = $("#choiceClass").text();
    this.sex = $('#checkSex input[type="radio"]:checked ').val();
    var city = localStorage.getItem("city");
    if(this.grade=="暂无年级"){
        $("#title").html(city+schoolName+ "学生健康成长档案");
        $("#childList").html("");
        $("#studentListId").show();
        $("#stuInfoAddr").hide();
        $("#stuInfoAddrNoData").show();
        $("#healthItemList").hide();
        $("#healthItemListNoData").show();
        return;
    }else{
        $("#title").html(city+schoolName+ "学生健康成长档案")
    }


    var classTmp = this.grade + "," + this.classRoom;
    var yearName = this.year;
    var termName = dataTerm[this.term];
    var className = dataBrr[classTmp];
    var sexName = this.sex;
    if (this.sex == 3) {
        sexName = ""
    } else {
        sexName = this.sex;
    }
    //2016 1 1102 全部有数据
    var school_id = localStorage.getItem("schoolId");
    var data1 = {
        "year": yearName,
        "term": termName,
        "class_id": className,
        "sex": sexName,
        "school_id":school_id
    };
    $.ajax({
        data: data1,
        type: "post",
        url: getURL() + "health_record",
        success: function (dataRes) {
            //getFirstData(dataRes)
            console.log("dataRes",dataRes)
            if (dataRes.header.code == "200") {
                if(dataRes.data.all_student.length!=0){
                    $("#studentListId").hide();
                    $("#stuInfoAddr").show();
                    $("#stuInfoAddrNoData").hide();
                    $("#healthItemList").show();
                    $("#healthItemListNoData").hide();
                    getChild(dataRes);
                    $("#printArea").show();
                }else{
                    $("#childList").html("");
                    $("#studentListId").show();
                    $("#stuInfoAddr").hide();
                    $("#stuInfoAddrNoData").show();
                    $("#healthItemList").hide();
                    $("#healthItemListNoData").show();
                    return;
                }


            } else {
                new ModelCon("数据获取失败,请刷新重试");
                $(".isCancleOk").hide();
                $(".isSure").off().on("click", function () {
                    $(".mod_wapper").hide();
                    $(".markHide").hide();
                    window.location.href = "healthilyrecord.html"
                })
                return;
            }
        }, error: function () {
            new ModelCon("网络异常，请检查您的网络");
            $(".isCancleOk").hide();
            $(".isSure").off().on("click", function () {
                $(".mod_wapper").hide();
                $(".markHide").hide();
                window.location.href = "healthilyrecord.html"
            })
            return;
        }
    })


}

PersonHealth.prototype.getAllData = function () {

    var _this = this;
    _this.defalutData();
    $("#personHealthLook").on("click", function () {
        var year = $("#choiceYear").text().substring(0,4);
        var term = $("#choiceYear").text().substring(4,8);
        localStorage.setItem("year",year);
        localStorage.setItem("term",term);
        localStorage.setItem("grade",$("#choiceGrade").text());
        localStorage.setItem("class",$("#choiceClass").text());
        _this.defalutData();
    })
    $(document).keydown(function (e) {
        if (!e) {
            e = window.event;
        }
        if ((e.keyCode || e.which) == 13) {
            _this.defalutData();
        }

    })

   printArea();

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

}


$(document).ready(function () {
    if(localStorage.getItem("clickNum")%2!=0){
        $("#numDate").hide();
    }else {
        $("#numDate").show();
    }
    //判断是否登陆过
    if (!localStorage.getItem("userName")) {
        window.location.href = "index.html"
    }
    //鼠标滑动动画
    headerMove();
    var school = localStorage.getItem("schoolName");
    contractEnd(school);
    //var name = localStorage.getItem("userName")
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
        success: function (dataRes) {
            console.log(dataRes)
            if (dataRes.header.code == "200") {

                if ($.trim(dataRes.data.user_class[0]) != "") {
                    classAndGrade(dataRes.data.user_class);
                    //alert("获取数据失败")
                } else {
                    // new Notice("获取数据失败");
                    new ModelCon("数据获取失败,请刷新重试");
                    $(".isCancleOk").hide();
                    $(".isSure").off().on("click", function () {
                        $(".mod_wapper").hide();
                        $(".markHide").hide();
                        window.location.href = "healthilyrecord.html"
                    })
                    return;
                }
                $(".userName").html(localStorage.getItem("userName"));
                console.log(localStorage.getItem("userName"))
                $(".schoolName").html(localStorage.getItem("schoolName"))
                var personList = new PersonHealth();

                //学年
                personList.getPersonListYear();
                //学期
               // personList.getPersonListTerm();
                //年级
                personList.getPersonListGrade();
                //班级
                personList.getPersonListClass();
                //获取数据
                //personList.defalutData();
                //向服务器传输数据
                personList.getAllData();

            } else {
                new ModelCon("数据获取获取失败,请刷新重试");
                $(".isCancleOk").hide();
                $(".isSure").off().on("click", function () {
                    $(".mod_wapper").hide();
                    $(".markHide").hide();
                    window.location.href = "healthilyrecord.html"
                })
                return;
            }

        }, error: function () {
            new ModelCon("网络异常，请检查您的网络");
            $(".isCancleOk").hide();
            $(".isSure").off().on("click", function () {
                $(".mod_wapper").hide();
                $(".markHide").hide();
                window.location.href = "healthilyrecord.html"
            })
            return;
        }
    })

    //跳转


})
$(document).scroll(function () {
    if ($(this).scrollTop() > 82) {
        $(".s_nv").css({
            "position": "fixed",
            width: "100%",
            zIndex: 100
        });
        $(".scoll").css("position", "fixed").css("width", "125px").css("top", "106px");
        $(".s_top").css("margin-top", "60px");
    } else {
        $(".s_nv").css({
            "position": "relative",
            width: "",
            zIndex: ""
        });
        $(".scoll").css("position", "relative").css("width", "").css("top", "");
        $(".s_top").css("margin-top", "0");
    }
})