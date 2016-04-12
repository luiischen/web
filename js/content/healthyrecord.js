/**
 * @author By lizhihu
 * @date By 2016-01-23
 */
function hideList() {
    $(".inputList").slideUp(500);
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
PersonHealth.prototype.getPersonListYear = function () {
    $("#choiceYear").html($($("#yearListId .list div")[0]).context.innerText);
    //学年
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
                setInterval(function () {
                    if ($("#secondTerm").css("display") == "none") {
                        $("#choiceTerm").html("第一学期");
                    }
                }, 10)
                var year = $("#choiceYear").text();
                var term = dataTerm[$("#choiceTerm").text()];
                getHistoryContent(term,year)
                $("#yearListId").slideUp(300);
                $("#yearId img").attr("src", "img/moredown_gray.png");
            })
        }(index)

    })
    //点击现在
    $("#nowYear").click(function () {
        $("#choiceYear").html($($("#yearListId .list div")[0]).context.innerText);
        var year = $("#choiceYear").text();
        var term = dataTerm[$("#choiceTerm").text()];
        getHistoryContent(term,year)
        $("#yearListId").slideUp(300);
        $("#yearId img").attr("src", "img/moredown_gray.png");
    })
    $(document).click(function (event) {
        $("#yearListId").slideUp(300);
        $("#yearId img").attr("src", "img/moredown_gray.png");
    })
};
PersonHealth.prototype.getPersonListTerm = function () {
    $("#choiceTerm").html($($("#termListId .list div")[0]).context.innerText);
    $("#termId").on("click", function (e) {
        hideList();
        if ($("#termListId").css("display") != "block") {
            $("#termListId").slideDown(300);
            $("#termId img").attr("src", "img/moreup_gray.png");
        } else {
            $("#termListId").slideUp(300);
            $("#termId img").attr("src", "img/moredown_gray.png");
        }
        stopBubble(e)
        //event.stopPropagation();
    })
    //选择学期
    $("#termListId .list div").each(function (index, val) {
        return function () {
            $($("#termListId .list div")[index]).click(function () {
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
    $(document).click(function (event) {
        $("#termListId").slideUp(300);
        $("#termId img").attr("src", "img/moredown_gray.png");
    })
}
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

    $("#choiceClass").html($($("#classListId .list div")[0]).context.innerText);
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
    sex_name = sexChange[childDataList[0].sex];
    stu_id = childDataList[0].student_id;
    year_name = childDataList[0].year;
    stu_age = childDataList[0].birth;
    stu_nation = NationArr[childDataList[0].nationality];
    term_name = dataTermBrr[childDataList[0].term];
    student_infoAddr += '<tr><td>姓名</td><td>' + stu_name + '</td><td>班级</td><td>' + class_name + '</td></tr>';
    student_infoAddr += '<tr><td>性别</td><td>' + sex_name + '</td><td>出生日期</td><td>' + stu_age + '</td></tr>';
    student_infoAddr += '<tr><td>学籍号</td><td>' + stu_id + '</td><td>民族</td><td>' + stu_nation + '</td></tr>';
    student_infoAddr += '<tr><td>学年</td><td>' + year_name + '</td><td>学期</td><td>' + term_name + '</td></tr>';

    $("#stuInfoAddr").html(student_infoAddr);
    $("#stuInfoAddr").html(student_infoAddr);
    student_infoList += '<tr><th colspan="6" style="border-top:none ;text-align: center">健康指标体系</th></tr>';
    student_infoList += '<tr><td>健康指标</td><td>单项指标</td><td>成绩</td><td>得分</td><td>国家级</td><td>健康指数(地区)</td></tr>';
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
    console.log(allItem)
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
            student_infoList += '<tr><td rowspan="' + td.form.length + '" colspan="1">身体形态</td><td colspan="1">' + allItem[a].item + '(' + allItem[a].unit + ')</td><td colspan="1">' + allItem[a].record + '</td><td colspan="1">' + isZero + '</td><td rowspan="' + td.form.length + '" colspan="1">'+BMIlevalCountry+'</td><td rowspan="' + td.form.length + '" colspan="1">/</td></tr>';
        }

        else {
            if(allItem[a].item=="BMI"){
                student_infoList += '<tr><td colspan="1">' + allItem[a].item + '(千克/平方米)</td><td colspan="1">' + allItem[a].record + '</td><td colspan="1">' + allItem[a].score + '</td></tr>';
            }else{
                student_infoList += '<tr><td colspan="1">' + allItem[a].item + '(' + allItem[a].unit + ')</td><td colspan="1">' + allItem[a].record + '</td><td colspan="1">' + isZero + '</td></tr>';
            }

        }
       /*if (a == 0 &&td.form[a].item !="BMI" ) {
            student_infoList += '<tr><td rowspan="' + td.form.length + '" colspan="1">身体形态</td><td colspan="1">' + td.form[a].item + '(' + td.form[a].unit + ')</td><td colspan="1">' + td.form[a].record + '</td><td colspan="1">' + isZero + '</td><td rowspan="' + td.form.length + '" colspan="1">'+BMIlevalCountry+'</td><td rowspan="' + td.form.length + '" colspan="1">/</td></tr>';
        } else if(a == 0 && td.form[a].item=="BMI" ){
            student_infoList += '<tr><td rowspan="' + td.form.length + '" colspan="1">身体形态</td><td colspan="1">' + td.form[a].item + '</td><td colspan="1">' + td.form[a].record + '</td><td colspan="1">' + isZero + '</td><td rowspan="' + td.form.length + '" colspan="1">'+BMIlevalCountry+'</td><td rowspan="' + td.form.length + '" colspan="1">/</td></tr>';
        }
        else {
            if(td.form[a].item=="BMI"){
                student_infoList += '<tr><td colspan="1">' + td.form[a].item + '</td><td colspan="1">' + td.form[a].record + '</td><td colspan="1">' + td.form[a].score + '</td></tr>';
            }else{
                student_infoList += '<tr><td colspan="1">' + td.form[a].item + '(' + td.form[a].unit + ')</td><td colspan="1">' + td.form[a].record + '</td><td colspan="1">' + isZero + '</td></tr>';
            }

        }*/
    }
    for (var a = 0; a < td.enginery.length; a++) {
        var isZero="/"
        if(td.enginery[a].score=="0"){
            isZero="/"
        }else{
            isZero=td.enginery[a].score;
        }

        if (a == 0) {
            student_infoList += '<tr><td rowspan="' + 3 + '" colspan="1">身体机能</td><td colspan="1">' + td.enginery[a].item + '(' + td.enginery[a].unit + ')</td><td colspan="1">' + td.enginery[a].record + '</td><td colspan="1">' + isZero+ '</td><td rowspan="" colspan="1">'+ScoreType[td.enginery[a].level]+'</td><td rowspan="" colspan="1">'+td.enginery[a].area+'级</td></tr>';
        } else {
            if(td.enginery[a].item=="视力"){
                var left = td.enginery[a].record.split(",")[0];
                var right = td.enginery[a].record.split(",")[1];
                var isNormalLeft = "";
                var isNormalRight = "";
                if(parseInt(left)>=5.0){
                    isNormalLeft ="正常"
                }else if(left==""){
                    isNormalLeft ="/"
                }else{
                    isNormalLeft ="正常"
                }
                if(parseInt(right)>=5.0){
                    isNormalRight ="正常"
                }else if(right==""){
                    isNormalRight ="/"
                }else{
                    isNormalRight ="不正常"
                }

                student_infoList += '<tr  ><td rowspan="2" style="padding:0 "><div style="float:left;line-height:61px;padding-left:12px">'+td.enginery[a].item+'</div><div style="float:right;    float: right; height: 97px;border-left: 1px solid #ababab;"><p style="width:100px;height:50%;border-bottom:1px solid #ababab;text-align: center;line-height:49px;">左眼</p><p style="width:100px;height:50%;border-bottom:1px solid #eeeeee;text-align: center;line-height:49px;">右眼</p></div></td><td>'+left+'</td><td>/</td><td>'+isNormalLeft+'</td><td>/</td>/</td></tr><tr ><td>'+right+'</td><td>/</td><td>'+isNormalRight+'</td><td>/</td></tr>'
            }else{

                student_infoList += '<tr><td colspan="1">' + td.enginery[a].item + '(' + td.enginery[a].unit + ')</td><td colspan="1">' + td.enginery[a].record + '</td><td colspan="1">' + isZero + '</td><td rowspan="" colspan="1">'+ScoreType[td.enginery[a].level]+'</td><td rowspan="" colspan="1">'+areaType[td.enginery[a].area]+'</td></tr>';
            }


        }

    }
    for (var a = 0; a < td.stamina.length; a++) {
        var scoreFormat = "";
        var isZero="/"
        if(td.stamina[a].score=="0"){
            isZero="/"
        }else{
            isZero=td.stamina[a].score;
        }
        if("50*8往返跑" == td.stamina[a].item){
            scoreFormat = timeFort(td.stamina[a].record)
        }else{
            scoreFormat = td.stamina[a].record;
        }
        if (a == 0) {
            student_infoList += '<tr><td rowspan="' + td.stamina.length + '" colspan="1">身体体能</td><td colspan="1">' + td.stamina[a].item + '(' + td.stamina[a].unit + ')</td><td colspan="1">' + scoreFormat + '</td><td colspan="1">' + isZero + '</td><td rowspan="" colspan="1">'+ScoreType[td.stamina[a].level]+'</td><td rowspan="" colspan="1">'+td.stamina[a].area+'级</td></tr>';
        } else {
            student_infoList += '<tr><td colspan="1">' + td.stamina[a].item + '(' + td.stamina[a].unit + ')</td><td colspan="1">' + scoreFormat + '</td><td colspan="1">' + isZero + '</td><td rowspan="" colspan="1">'+ScoreType[td.stamina[a].level]+'</td><td rowspan="" colspan="1">'+td.stamina[a].area+'级</td></tr>';

        }
    }
    var suggestHtml="";
    for(var b=0;b<td.suggestion.length;b++){

        if(td.suggestion[b].content.indexOf("BMI")>-1){
            suggestHtml+='<p>身体形态:</p>';
            suggestHtml+='<p style="margin-left: 34px;font-size: 14px;">'+td.suggestion[b].content+'</p>';

        }else{
            continue;
        }
    }
    suggestHtml+='<p>身体机能:</p>';
    for(var b=0;b<td.suggestion.length;b++){

        if(td.suggestion[b].content.indexOf("视力")>-1){

            suggestHtml+='<p style="margin-left: 34px;font-size: 14px;">视力:'+td.suggestion[b].content+'</p>';

        }else if(td.suggestion[b].content.indexOf("肺活量")>-1){
            suggestHtml+='<p style="margin-left: 34px;font-size: 14px;">肺活量:'+td.suggestion[b].content+'</p>';
        }
        else{
            continue;
        }
        //suggestHtml+='<p>'+td.suggestion[b].content+'</p>';

    }
    suggestHtml+='<p>身体体能:</p>';
    for(var b=0;b<td.suggestion.length;b++){

        if(td.suggestion[b].content.indexOf("50米往返")>-1){

            suggestHtml+='<p style="margin-left: 34px;font-size: 14px;">速度:'+td.suggestion[b].content+'</p>';

        }
        else if(td.suggestion[b].content.indexOf("50*8往返")>-1){
            suggestHtml+='<p style="margin-left: 34px;font-size: 14px;">耐力:'+td.suggestion[b].content+'</p>';
        }
        else if(td.suggestion[b].content.indexOf("坐位体前屈")>-1){
            suggestHtml+='<p style="margin-left: 34px;font-size: 14px;">柔韧:'+td.suggestion[b].content+'</p>';
        }
        else{
            continue;
        }
    }
   if(childDataList[0].total_score==""|| childDataList[0].total_score==null){
       student_infoList += '<tr><td colspan="6">总评:<span>分</span></td></td></tr><tr><th colspan="6" style="text-align:center"><span>运动建议</span></th></tr>';
       student_infoList += '<tr><td colspan="6" > <div class="imgCode"> <img src="img/code.png" style="float:left"/><div style="float:left;margin-left:100px;margin-top:15px">'+suggestHtml+'</div><div></div>  <div style="width: 100%;padding: 20px;"><p align="left" style="color: red;text-indent: 15px;clear:both">建议扫描安装“运动指导”手机客户端，可以科学有效的协助孩子的日常训练。</p><p align="right";color:rgba(50,20,30,.8);">签名：<span style="display:inline-block;width: 120px;border-bottom: 1px solid #ccc;"></span></p></div> </td></tr>'

   }else{
       student_infoList += '<tr><td colspan="6">总评:<span>'+childDataList[0].total_score.toFixed(2)+'分</span></td></td></tr><tr><th colspan="6" style="text-align:center"><span>运动建议</span></th></tr>';
       student_infoList += '<tr><td colspan="6" > <div class="imgCode"> <img src="img/code.png" style="float:left"/><div style="float:left;margin-left:100px;margin-top:15px">'+suggestHtml+'</div><div></div>  <div style="width: 100%;padding: 20px;"><p align="left" style="color: red;text-indent: 15px;clear:both">建议扫描安装“运动指导”手机客户端，可以科学有效的协助孩子的日常训练。</p><p align="right";color:rgba(50,20,30,.8);">签名：<span style="display:inline-block;width: 120px;border-bottom: 1px solid #ccc;"></span></p></div> </td></tr>'

   }
    $("#healthItemList").html(student_infoList);

}

function getChildPrintHtml(childDataList) {
    $("#stuTabePrint").html("")
    if (childDataList.length > 0) {
        for (var i = 0; i < childDataList.length; i++) {
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
            if (i != 0) {
                stu_table += '<div class="stuInfo" style="margin-top:1700px;margin-bottom:100px"><table class="healthTab">';
            } else {
                stu_table += '<div class="stuInfo"><table class="healthTab">';
            }

            class_name = dataArr[childDataList[i][0].class_id];
            sex_name = sexChange[childDataList[i][0].sex];
            stu_id = childDataList[i][0].student_id;
            year_name = childDataList[i][0].year;
            stu_age = childDataList[i][0].birth;
            stu_name = childDataList[i][0].student_name;
            stu_nation = NationArr[childDataList[i][0].nationality];
            term_name = dataTermBrr[childDataList[i][0].term];
            student_infoAddr += '<tr><td>姓名</td><td>' + stu_name + '</td><td>班级</td><td>' + class_name + '</td></tr>';
            student_infoAddr += '<tr><td>性别</td><td>' + sex_name + '</td><td>出生日期</td><td>' + stu_age + '</td></tr>';
            student_infoAddr += '<tr><td>学籍号</td><td>' + stu_id + '</td><td>民族</td><td>' + stu_nation + '</td></tr>';
            student_infoAddr += '<tr><td>学年</td><td>' + year_name + '</td><td>学期</td><td>' + term_name + '</td></tr>';
            stu_table += student_infoAddr;
            stu_table += '</table>';
            stu_table += '<table class="healthTab">';
            //$(".stuInfo").append('<table class="healthTab">'+student_infoAddr+'</table>');
            student_infoList += '<tr><th colspan="6" style="border-top:none ;">健康指标体系</th></tr>';
            student_infoList += '<tr><td>健康指标</td><td>单项指标</td><td>成绩</td><td>得分</td><td>国家级</td><td>健康指数(地区)</td></tr>';
            var td = childDataList[i][0];
            for (var a = 0; a < td.form.length; a++) {
                var isZero="/"
                var BMIlevalCountry="";
                if(td.form[a].score=="0"){
                    isZero="/"
                }else{
                    isZero=td.form[a].score;
                }
                for(var i=0;i<td.form.length; i++){
                    if(td.form[i].item=="BMI"){

                        BMIlevalCountry = fatAndThin[td.form[i].level];
                    }
                }
                if (a == 0) {
                    student_infoList += '<tr><td rowspan="' + td.form.length + '" colspan="1">身体形态</td><td colspan="1">' + td.form[a].item + '(' + td.form[a].unit + ')</td><td colspan="1">' + td.form[a].record + '</td><td colspan="1">' + isZero + '</td><td rowspan="' + td.form.length + '" colspan="1">'+BMIlevalCountry+'</td><td rowspan="' + td.form.length + '" colspan="1">/</td></tr>';
                } else {
                    if(td.form[a].item=="BMI"){
                        student_infoList += '<tr><td colspan="1">' + td.form[a].item + '(千克/平方米)</td><td colspan="1">' + td.form[a].record + '</td><td colspan="1">' + td.form[a].score + '</td></tr>';
                    }else{
                        student_infoList += '<tr><td colspan="1">' + td.form[a].item + '(' + td.form[a].unit + ')</td><td colspan="1">' + td.form[a].record + '</td><td colspan="1">' + isZero + '</td></tr>';
                    }

                }
            }
            for (var a = 0; a < td.enginery.length; a++) {
                var isZero="/"
                if(td.enginery[a].score=="0"){
                    isZero="/"
                }else{
                    isZero=td.enginery[a].score;
                }

                if (a == 0) {
                    student_infoList += '<tr><td rowspan="' + 3 + '" colspan="1">身体机能</td><td colspan="1">' + td.enginery[a].item + '(' + td.enginery[a].unit + ')</td><td colspan="1">' + td.enginery[a].record + '</td><td colspan="1">' + isZero+ '</td><td rowspan="" colspan="1">'+ScoreType[td.enginery[a].level]+'</td><td rowspan="" colspan="1">'+td.enginery[a].area+'级</td></tr>';
                } else {
                    if(td.enginery[a].item=="视力"){
                        var left = td.enginery[a].record.split(",")[0];
                        var right = td.enginery[a].record.split(",")[1];
                        var isNormalLeft = "";
                        var isNormalRight = "";
                        if(parseInt(left)>=5.0){
                            isNormalLeft ="正常"
                        }else if(left==""){
                            isNormalLeft ="/"
                        }else{
                            isNormalLeft ="正常"
                        }
                        if(parseInt(right)>=5.0){
                            isNormalRight ="正常"
                        }else if(right==""){
                            isNormalRight ="/"
                        }else{
                            isNormalRight ="不正常"
                        }

                        student_infoList += '<tr  ><td rowspan="2" style="padding:0 "><div style="float:left;line-height:61px;padding-left:12px">'+td.enginery[a].item+'</div><div style="float:right;    float: right; height: 97px;border-left: 1px solid #ababab;"><p style="width:100px;height:50%;border-bottom:1px solid #ababab;text-align: center;line-height:49px;">左眼</p><p style="width:100px;height:50%;border-bottom:1px solid #eeeeee;text-align: center;line-height:49px;">右眼</p></div></td><td>'+left+'</td><td>/</td><td>'+isNormalLeft+'</td><td>/</td>/</td></tr><tr ><td>'+right+'</td><td>/</td><td>'+isNormalRight+'</td><td>/</td></tr>'
                    }else{
                        student_infoList += '<tr><td colspan="1">' + td.enginery[a].item + '(' + td.enginery[a].unit + ')</td><td colspan="1">' + td.enginery[a].record + '</td><td colspan="1">' + isZero + '</td><td rowspan="" colspan="1">'+ScoreType[td.enginery[a].level]+'</td><td rowspan="" colspan="1">'+areaType[td.enginery[a].area]+'</td></tr>';
                    }


                }

            }
            for (var a = 0; a < td.stamina.length; a++) {
                var isZero="/"
                if(td.stamina[a].score=="0"){
                    isZero="/"
                }else{
                    isZero=td.stamina[a].score;
                }

                if (a == 0) {
                    student_infoList += '<tr><td rowspan="' + td.stamina.length + '" colspan="1">身体体能</td><td colspan="1">' + td.stamina[a].item + '(' + td.stamina[a].unit + ')</td><td colspan="1">' + td.stamina[a].record + '</td><td colspan="1">' + isZero + '</td><td rowspan="" colspan="1">'+ScoreType[td.stamina[a].level]+'</td><td rowspan="" colspan="1">'+td.stamina[a].area+'级</td></tr>';
                } else {
                    student_infoList += '<tr><td colspan="1">' + td.stamina[a].item + '(' + td.stamina[a].unit + ')</td><td colspan="1">' + td.stamina[a].record + '</td><td colspan="1">' + isZero + '</td><td rowspan="" colspan="1">'+ScoreType[td.stamina[a].level]+'</td><td rowspan="" colspan="1">'+td.stamina[a].area+'级</td></tr>';

                }
            }
            var suggestHtml="";
            for(var b=0;b<td.suggestion.length;b++){

                if(td.suggestion[b].content.indexOf("BMI")>-1){
                    suggestHtml+='<p>身体形态:</p>';
                    suggestHtml+='<p style="margin-left: 34px;font-size: 14px;">'+td.suggestion[b].content+'</p>';

                }else{
                    continue;
                }
            }
            suggestHtml+='<p>身体机能:</p>';
            for(var b=0;b<td.suggestion.length;b++){

                if(td.suggestion[b].content.indexOf("视力")>-1){

                    suggestHtml+='<p style="margin-left: 34px;font-size: 14px;">视力:'+td.suggestion[b].content+'</p>';

                }else if(td.suggestion[b].content.indexOf("肺活量")>-1){
                    suggestHtml+='<p style="margin-left: 34px;font-size: 14px;">肺活量:'+td.suggestion[b].content+'</p>';
                }
                else{
                    continue;
                }
                //suggestHtml+='<p>'+td.suggestion[b].content+'</p>';

            }
            suggestHtml+='<p>身体体能:</p>';
            for(var b=0;b<td.suggestion.length;b++){

                if(td.suggestion[b].content.indexOf("50米往返")>-1){

                    suggestHtml+='<p style="margin-left: 34px;font-size: 14px;">速度:'+td.suggestion[b].content+'</p>';

                }
                else if(td.suggestion[b].content.indexOf("50*8往返")>-1){
                    suggestHtml+='<p style="margin-left: 34px;font-size: 14px;">耐力:'+td.suggestion[b].content+'</p>';
                }
                else if(td.suggestion[b].content.indexOf("坐位体前屈")>-1){
                    suggestHtml+='<p style="margin-left: 34px;font-size: 14px;">柔韧:'+td.suggestion[b].content+'</p>';
                }
                else{
                    continue;
                }
            }
            if(childDataList[i][0].total_score==""|| childDataList[i][0].total_score==null){
                student_infoList += '<tr><td colspan="6">总评:<span>分</span></td></td></tr><tr><th colspan="6" style="text-align:center"><span>运动建议</span></th></tr>';
                student_infoList += '<tr><td colspan="6" > <div class="imgCode"> <img src="img/code.png" style="float:left"/><div style="float:left;margin-left:100px;margin-top:15px">'+suggestHtml+'</div><div></div>  <div style="width: 100%;padding: 20px;"><p align="left" style="color: red;text-indent: 15px;clear:both">建议扫描安装“运动指导”手机客户端，可以科学有效的协助孩子的日常训练。</p><p align="right";color:rgba(50,20,30,.8);">签名：<span style="display:inline-block;width: 120px;border-bottom: 1px solid #ccc;"></span></p></div> </td></tr>'

            }else{
                student_infoList += '<tr><td colspan="6">总评:<span>'+childDataList[i][0].total_score.toFixed(2)+'分</span></td></td></tr><tr><th colspan="6" style="text-align:center"><span>运动建议</span></th></tr>';
                student_infoList += '<tr><td colspan="6" > <div class="imgCode"> <img src="img/code.png" style="float:left"/><div style="float:left;margin-left:100px;margin-top:15px">'+suggestHtml+'</div><div></div>  <div style="width: 100%;padding: 20px;"><p align="left" style="color: red;text-indent: 15px;clear:both">建议扫描安装“运动指导”手机客户端，可以科学有效的协助孩子的日常训练。</p><p align="right";color:rgba(50,20,30,.8);">签名：<span style="display:inline-block;width: 120px;border-bottom: 1px solid #ccc;"></span></p></div> </td></tr>'

            } ////$("#healthItemList").html(student_infoList);
            stu_table += student_infoList;
            stu_table += '</table></div>';
            $("#stuTabePrint").append(stu_table);
        }
    }

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


}
PersonHealth.prototype.defalutData = function () {
    this.year = $("#choiceYear").text();
    this.term = $("#choiceTerm").text();
    this.grade = $("#choiceGrade").text();
    this.classRoom = $("#choiceClass").text();
    this.sex = $('#checkSex input[type="radio"]:checked ').val();
    if(this.grade=="暂无年级"){
        $("#title").html(this.year + "学年体质健康评分表暂无数据");
        $("#childList").html("");
        $("#studentListId").show();
        $("#stuInfoAddr").hide();
        $("#stuInfoAddrNoData").show();
        $("#healthItemList").hide();
        $("#healthItemListNoData").show();
        return;
        return;
    }else{
        $("#title").html(this.year + "学年" + this.term + this.grade + this.classRoom + "体质健康评分表");
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
    /*$("#aPrint").on("click", function () {
        setTimeout(function () {
            $("#stuTabePrint").printArea();
        }, 400)
    })
    $("#aPrintSign").on("click", function () {
        setTimeout(function () {
            $("#stuTabel").printArea();
        }, 400)
    })*/
   
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
    //classSort(classNameModel[k])
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
    console.log(classHtml)
    $("#choiceClass").html($($("#classListHtmlId div")[0]).text());
    defalutClassText = $($("#classListHtmlId div")[0]).text();
}

$(document).ready(function () {
    //判断是否登陆过
    if (!localStorage.getItem("userName")) {
        window.location.href = "index.html"
    }
    //鼠标滑动动画
    headerMove();
    var school = localStorage.getItem("schoolName");
    //var name = localStorage.getItem("userName")
    var name = localStorage.getItem("account")
    var is_root = localStorage.getItem("is_root")
    var dataSchoolInfo = {"name": name, "schoolName": school, "is_root": is_root};
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
                personList.getPersonListTerm();
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