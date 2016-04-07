/**
 * Created by hard work on 2016/2/2.
 */
function hideList() {
    $(".t_drop").slideUp(500);
}
var gradeNameModel = [];
var classNameModel = [];
//默认班级
var defalutClassText = "";
var SystemStuManage = function() {

    this.grade = "";
    this.classRoom = "";

}
SystemStuManage.prototype.getPersonListGrade = function() {
    $("#choiceGrade").html($($("#gradeListId .t_list div")[0]).context.innerText);
    if($.trim($("#choiceGrade").text()) == "全部年级"){
        $("#classListHtmlId").html($($("#classListHtmlId div")[0]).text());
    }
    $("#gradeId").on("click", function(e) {
        hideList();
        if ($("#gradeListId").css("display") != "block") {
            $("#gradeListId").slideDown(500);
            $("#gradeId img").attr("src", "img/moreup_gray.png");
        } else {
            $("#gradeListId").slideUp(500);
            $("#gradeId img").attr("src", "img/moredown_gray.png");
        }
        stopBubble(e)
        //event.stopPropagation();
    })
    //选择学期
    $("#gradeListId .t_list div").each(function(index, val) {
        return function() {
            $($("#gradeListId .t_list div")[index]).click(function() {
                var _this = this;
                $("#choiceGrade").html($(_this).context.innerText);
                $("#gradeListId").slideUp(500);
                $("#gradeId img").attr("src", "img/moredown_gray.png");
                var _this = this;
                $("#choiceGrade").html($(_this).context.innerText);

                $("#gradeListId").slideUp(500);
                $("#gradeId img").attr("src", "img/moredown_gray.png");

                //初始化另一个
                for (var i = 0; i < gradeNameModel.length; i++) {
                    if ($.trim($("#choiceGrade").text()) == $.trim(gradeNameModel[i])) {
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
                if($.trim($("#choiceGrade").text()) == "全部年级"){
                    $("#classListHtmlId").html($($("#classListHtmlId div")[0]).text());
                }
            })
        }(index)

    })

    $(document).click(function(event) {
        $("#gradeListId").slideUp(500);
        $("#gradeId img").attr("src", "img/moredown_gray.png");
    })
}
//班级
SystemStuManage.prototype.getPersonListClass = function() {
    if($.trim($("#choiceGrade").text()) == "全部年级"){
        $("#classListHtmlId").html("全部班级");

        $("#choiceClass").html("全部班级");
    }else{

        $("#choiceClass").html($($("#classListId .t_list div")[0]).context.innerText);
    }

    $("#classId").on("click", function(e) {
        hideList();
        if ($("#classListId").css("display") != "block") {
            $("#classListId").slideDown(500);
            $("#classId img").attr("src", "img/moreup_gray.png");
        } else {
            $("#classListId").slideUp(500);
            $("#classId img").attr("src", "img/moredown_gray.png");
        }
        stopBubble(e)
       // event.stopPropagation();
        $("#classListId .t_list div").each(function(index, val) {
            return function() {
                $($("#classListId .t_list div")[index]).click(function() {
                    var _this = this;
                    $("#choiceClass").html($(_this).context.innerText);
                    $("#classListId").slideUp(500);
                    $("#classId img").attr("src", "img/moredown_gray.png");
                })
            }(index)

        })
    })

    //选择学期

    $(document).click(function(event) {
        $("#classListId").slideUp(500);
        $("#classId img").attr("src", "img/moredown_gray.png");
    })
}

SystemStuManage.prototype.defalutDataFirst = function() {
    var _this = this;
    var pageId = 1;
    this.grade = $("#choiceGrade").text();
    this.classRoom = $("#choiceClass").text();
    $("#titleStu").html(  this.grade + this.classRoom + "学生信息")
    var class_id=dataBrr[$.trim(this.grade)+","+$.trim(this.classRoom)];
    var url = getURL()+"get_all_student";
    var schoolId = localStorage.getItem("schoolId");
    var data = {"page":pageId,"school_id":schoolId};
    $.ajax({
        data: data,
        type: "post",
        url: url,
        success: function(dataRes) {
            console.log("dataLLL::res",dataRes)
            if(dataRes.header.code=="200"){
                var pageIndexInfo = 1;
                var pageNum = Math.ceil(dataRes.data.total/20);
                if(dataRes.data.total<20){
                    pageNum=1;
                }else{

                    if(pageNum>10){
                        pageNum=10;
                    }
                }

                getStudentList(dataRes);
                _this.editStudent();
                _this.delateStu();
                var pageInfoNum = 1;
                var pageButtonNum = Math.ceil(dataRes.data.total/20);
                if(dataRes.data.total<20){
                    pageButtonNum=1;
                }
                $("#pageInfoNow").html("一共有"+'<span style="color:red">'+dataRes.data.total+"</span>条数据,共"+'<span style="color:red">'+pageButtonNum+"</span>页"+"当前是第"+'<span style="color:red">'+1+"</span>页");
                $(".pagination").jBootstrapPage({
                    pageSize : 20,
                    total : dataRes.data.total,
                    maxPageButton:pageNum,
                    onPageClicked: function(obj, pageIndex) {
                        _this.defalutData(pageIndex+1);
                        pageIndexInfo=pageIndex+1;
                        $("#pageInfoNow").html("一共有"+'<span style="color:red">'+dataRes.data.total+"</span>条数据,共"+'<span style="color:red">'+pageButtonNum+"</span>页"+"当前是第"+'<span style="color:red">'+pageIndexInfo+"</span>页");
                    }

                });
            }else{
                new  ModelCon("获取数据失败,请刷新重试");
                $(".isCancleOk").hide();
                $(".isSure").off().on("click",function(){
                    $(".mod_wapper").hide();
                    $(".markHide").hide();
                    //window.location.href="systemmanage.html"
                })
                return;
            }


            //获取值
        },error:function(){
        	 new  ModelCon("网络异常，请检查您的网络");
                $(".isCancleOk").hide();
                $(".isSure").off().on("click",function(){
                    $(".mod_wapper").hide();
                    $(".markHide").hide();
                    //window.location.href="systemmanage.html"
                })
                return;
        }
    });
}
SystemStuManage.prototype.defalutData = function(page) {
    var _this = this;
    var pageId = page;
    this.grade = $("#choiceGrade").text();
    this.classRoom = $("#choiceClass").text();
    $("#titleStu").html(  this.grade + this.classRoom + "学生信息");
    var class_id=dataBrr[$.trim(this.grade)+","+$.trim(this.classRoom)];
    var url = getURL()+"get_all_student";
    var schoolId = localStorage.getItem("schoolId");
    var data = {"page":pageId,"school_id":schoolId};
    $.ajax({
        data: data,
        type: "post",
        url: url,
        success: function(dataRes) {
            console.log("default::",dataRes)
            getStudentList(dataRes);
            _this.editStudent();
            _this.delateStu();
            //获取值
        },error:function(){
        	 new  ModelCon("网络异常，请检查您的网络");
                $(".isCancleOk").hide();
                $(".isSure").off().on("click",function(){
                    $(".mod_wapper").hide();
                    $(".markHide").hide();
                    //window.location.href="index.html"
                })
                return;
        }
    });
}
SystemStuManage.prototype.searchData = function() {
    var _this = this;
    var pageId = 1;
    this.grade = $("#choiceGrade").text();
    this.classRoom = $("#choiceClass").text();
    var gradeRoomId = "";
    var classRoomId ="";
    if($.trim(this.grade)=="全部年级"){
        gradeRoomId=""
    }else{
        gradeRoomId = gradeBrr[$.trim(this.grade)];
    }
    if($.trim(this.classRoom)=="全部班级"){
        classRoomId=""
    }else{
        classRoomId =classBrr[$.trim(this.classRoom)];
    }
    var inputVal= $.trim($("#inputSearch input").val());
    $("#titleStu").html(  this.grade + this.classRoom + "学生信息")
    //var class_id=dataBrr[$.trim(this.grade)+","+$.trim(this.classRoom)];
    var url = getURL()+"search_student";
    var schoolId = localStorage.getItem("schoolId");
    var data = {"input":inputVal,"school_id":schoolId,"cls":classRoomId,"grade":gradeRoomId,"page":pageId};

    $.ajax({
        data: data,
        type: "post",
        url: url,
        success: function(dataRes) {
            if(dataRes.header.code=="200"){
                getStudentList(dataRes);
                _this.editStudent();
                _this.delateStu();
                var pageNum = Math.ceil(dataRes.data.total/20);
                if(dataRes.data.total<20){
                    pageNum=1;
                }else{

                    if(pageNum>10){
                        pageNum=10;
                    }
                }
                var pageInfoNum = 1;
                var pageButtonNum = Math.ceil(dataRes.data.total/20);
                if(dataRes.data.total<20){
                    pageButtonNum=1;
                }
                $("#pageInfoNow").html("一共有"+'<span style="color:red">'+dataRes.data.total+"</span>条数据,共"+'<span style="color:red">'+pageButtonNum+"</span>页"+"当前是第"+'<span style="color:red">'+1+"</span>页");
                $(".pagination").jBootstrapPage({
                    pageSize : 20,
                    total : dataRes.data.total,
                    maxPageButton:pageNum,
                    onPageClicked: function(obj, pageIndex) {
                        _this.defalutSearchData(pageIndex+1);
                        pageInfoNum = pageIndex+1;
                        $("#pageInfoNow").html("一共有"+'<span style="color:red">'+dataRes.data.total+"</span>条数据,共"+'<span style="color:red">'+pageButtonNum+"</span>页"+"当前是第"+'<span style="color:red">'+pageInfoNum+"</span>页");
                    }
                });
            }else{
                new  ModelCon("获取数据失败");
                $(".isCancleOk").hide();
                $(".isSure").off().on("click",function(){
                    $(".mod_wapper").hide();
                    $(".markHide").hide();
                   // window.location.href="index.html"
                })
                return;
            }

            //获取值
        },error:function(){
        	 new  ModelCon("网络异常，请检查您的网络");
                $(".isCancleOk").hide();
                $(".isSure").off().on("click",function(){
                    $(".mod_wapper").hide();
                    $(".markHide").hide();
                    //window.location.href="index.html"
                })
                return;
        }
    });
}
SystemStuManage.prototype.defalutSearchData = function(pageIndex) {
    var _this = this;
    var pageId = 1;
    this.grade = $("#choiceGrade").text();
    this.classRoom = $("#choiceClass").text();
    var gradeRoomId = "";
    var classRoomId ="";
    if($.trim(this.grade)=="全部年级"){
        gradeRoomId=""
    }else{
        gradeRoomId = gradeBrr[$.trim(this.grade)];
    }
    if($.trim(this.classRoom)=="全部班级"){
        classRoomId=""
    }else{
        classRoomId =classBrr[$.trim(this.classRoom)];
    }
    var inputVal= $.trim($("#inputSearch input").val());
    $("#titleStu").html(  this.grade + this.classRoom + "学生信息")
    //var class_id=dataBrr[$.trim(this.grade)+","+$.trim(this.classRoom)];
    var url = getURL()+"search_student";
    var schoolId = localStorage.getItem("schoolId");
    var data = {"input":inputVal,"school_id":schoolId,"cls":classRoomId,"grade":gradeRoomId,"page":pageIndex};

    $.ajax({
        data: data,
        type: "post",
        url: url,
        success: function(dataRes) {
            getStudentList(dataRes);
            _this.editStudent();
            _this.delateStu();

        },error:function(){
        	 new  ModelCon("网络异常，请检查您的网络");
                $(".isCancleOk").hide();
                $(".isSure").off().on("click",function(){
                    $(".mod_wapper").hide();
                    $(".markHide").hide();
                    //window.location.href="index.html"
                })
                return;
        }
    });
}
SystemStuManage.prototype.getAllData = function(e) {
    var _this = this;
    $("#findStudentInfo").on("click", function() {
        _this.searchData();
    })
    
$(document).keydown(function(e){
	if (!e) {
    	     e = window.event; 
    	    }
    if ((e.keyCode || e.which) == 13) {
    	 _this.searchData();
    }
   
})

  
}
//获取默认学生信息
function getStudentList(dataRes){
   console.log("nation",dataRes)
   var stuList = dataRes.data.student_list;
    var stuHtml="";
    stuHtml+='<tr><th>姓名</th><th>性别</th><th style="width:17%">学籍号</th><th>班级</th><th>民族</th><th>出生年月</th><th style="width:25%">家庭住址</th></tr>';
    if(stuList.length<=0){
        $("#noDataStudentList").show();
        $("#stuInfoAddr").html(stuHtml);
        $("#pageInfoNow").hide();
    }else{
        $("#pageInfoNow").show();
        $("#noDataStudentList").hide();
        for(var i=0;i<stuList.length;i++){
            var stuNat=""
            if(isNaN(parseInt(stuList[i].nationality))){
                 stuNat = stuList[i].nationality
            }else{
                stuNat = NationArr[stuList[i].nationality];
            }
            stuHtml+='<tr><td>'+stuList[i].student_name+'</td><td>'+sexChange[stuList[i].sex]+'</td><td>'+stuList[i].student_id+'</td><td>'+dataArr[stuList[i].class_id].split(",").join("")+'</td><td>'+stuNat+'</td><td>'+stuList[i].birth+'</td><td>'+stuList[i].address+'</td>';
          /*  stuHtml+='<td><div class="toolbar"> <a class="change">编辑</a> <a class="del">删除</a> </div></td>'*/
        }
        $("#stuInfoAddr").html(stuHtml);

    }

}
//提示信息
function warMass(msg,num){
    if(num==0){
        $("#addStuInfoRight").hide();
    }else{
        $("#addStuInfoRight").show();
        $("#addStuInfoRight").text(msg);
        return;
    }
}
//编辑学生信息
function warMassEdit(msg,num){
    if(num==0){
        $("#editStuInfoRight").hide();
    }else{
        $("#editStuInfoRight").show();
        $("#editStuInfoRight").text(msg);
        return;
    }
}
//增加学生信息
SystemStuManage.prototype.addStudentInfo = function(){
    var _this = this;
    $("#addStudent").on("click", function() {
        $("#addStuInfoRight").hide();
         $($(".add-stu-list").find('input')[0]).val("")
        $($(".add-stu-list").find('input')[1]).val("");
        $($(".add-stu-list").find('input')[2]).val("");
         $($(".add-stu-list").find('input')[3]).val("");
         $($(".add-stu-list").find('input')[4]).val("");
        $("#popId").show();
        $("#popId").html(showPop());
        $("#add_Student").slideDown(500);
        $("#manIdAdd").on("click", function() {
            $($("#manIdAdd").find("label")).attr("class", "ico acitve");
            $($("#girlIdAdd").find("label")).attr("class", "ico");
        })
        $("#girlIdAdd").on("click", function() {
            $("#girlIdAdd").find("label").attr("class", "ico acitve");
            $($("#manIdAdd").find("label")).attr("class", "ico");
        })
        $("#addSure").on("click",function(){
            var stuSex = ""
            var stuName = $($(".add-stu-list").find('input')[0]).val()
            if ($($("#man").find("label")).hasClass("ico acitve")) {
                stuSex = "男";
            } else {
                stuSex = "女";
            }
            var stuNation = $($(".add-stu-list").find('input')[1]).val();
            var stuId = $($(".add-stu-list").find('input')[2]).val();
            var stuBirthDay = $($(".add-stu-list").find('input')[3]).val();
            var stuAddress = $($(".add-stu-list").find('input')[4]).val();
            var stuGrade = gradeBrr[$.trim($("#choiceGrade").text())];
            var stuClass = classBrr[$.trim($("#choiceClass").text())];
            var schoolNameId=localStorage.getItem("schoolId");
            var stuSchoolId = schoolNameId// 这个写死暂时
            if($.trim($("#choiceGrade").text())=="全部年级"){
                warMass("请选择正确的年级",1)
                return;
            }else if($.trim($("#choiceClass").text())=="全部班级"){
                warMass("请选择正确的班级",1)
                return;
            }else{
                //隐藏
                warMass("",0);
                var stuClass_id = dataBrr[$.trim($("#choiceGrade").text())+","+$.trim($("#choiceClass").text())];
                var schoolName=localStorage.getItem("schoolName");
                var stuSchoolName = schoolName;
                //var stuGrade =
                if ($.trim(stuName) == "") {
                    warMass("请输入学生姓名",1)
                   // alert("请输入学生姓名")
                } else if ($.trim(stuNation) == "") {
                    warMass("请输入名族",1)
                   // alert("请输入名族")
                } else if ($.trim(stuId) == "") {
                    warMass("请输入学籍号",1)
                   // alert("请输入学籍号")
                } else if ($.trim(stuBirthDay)== "") {
                    warMass("请输入出生年月",1)
                    //alert("请输入出生年月")
                } else if ($.trim(stuAddress) == "") {
                    warMass("请输入家庭住址",1)
                    //alert("请输入家庭个住址")
                } else {
                    warMass("",0)
                    var data = {
                        "student_name": stuName,
                        "sex": sexBrr[stuSex],
                        "nationality": stuNation,
                        "grade": stuGrade,
                        "cls": stuClass,
                        "school_id": stuSchoolId,
                        "student_id": stuId,
                        "birth": stuBirthDay,
                        "school": stuSchoolName,
                        "address": stuAddress,
                        "class_id": stuClass_id
                    }
                    console.log("data::",data)
                    var url= getURL()+"add_student";
                    $.ajax({
                        data:data,
                        url:url,
                        type:"post",
                        success:function(dataRes){
                            if(dataRes.header.code=="200"){
                                $("#popId").html(hidePop());
                                $("#add_Student").hide();
                                $("#findStudentInfo").trigger("click");
                            }else{
                                new  ModelCon("添加失败");
                                $("#add_Student").hide();
                                $(".isCancleOk").hide();
                                $(".isSure").off().on("click",function(){
                                    $(".mod_wapper").hide();
                                    $(".markHide").hide();
                                    $("#popId").html(hidePop());
                                    $("#findStudentInfo").trigger("click");

                                    //window.location.href="index.html"
                                })
                                return;
                            }

                        },error:function(){
                            ModelCon("网络异常，请检查您的网络");
                $(".isCancleOk").hide();
                $(".isSure").off().on("click",function(){
                    $(".mod_wapper").hide();
                    $(".markHide").hide();
                    //window.location.href="index.html"
                })
                return;
                        }
                    })

                }
            }

        })
    })
}
SystemStuManage.prototype.delateStu = function() {

    $("#stuInfoAddr tr").find("td .del").each(function (index) {
        var _thisTr = this;
        return function () {
            $(_thisTr).on("click", function () {
                var indexIsClick = 0;
                 console.log("this:::",_thisTr)
                if(indexIsClick==0){
                    new  ModelCon("确认删除?");
                    $(".isSure").off().on("click",function(){
                        var student_id =  $($(_thisTr).parents("tr").find("td")[2]).text();
                        var url= getURL()+"del_student";
                        $.ajax({
                            data:{"student_id":student_id},
                            url:url,
                            type:"post",
                            success:function(dataRes){
                                if(dataRes.header.code=="200"){

                                    if(dataRes.data.result=="0"){
                                        $(".mod_wapper").animate({"height" : 0},300,function() {
                                            $(".markHide").fadeOut(1);
                                        })
                                        setTimeout(function(){
                                            $("#findStudentInfo").trigger('click');
                                        },300)

                                    }else{
                                        new  ModelCon("删除失败");
                                        $(".isCancleOk").hide();
                                        $(".isSure").off().on("click",function(){
                                            $(".mod_wapper").hide();
                                            $(".markHide").hide();
                                        })
                                        return;
                                    }
                                }

                            },error:function(){
                            	 new  ModelCon("网络异常，请检查您的网络");
                $(".isCancleOk").hide();
                $(".isSure").off().on("click",function(){
                    $(".mod_wapper").hide();
                    $(".markHide").hide();
                   // window.location.href="index.html"
                })
                return;
                            }
                        })
                    })
                    $(".isCancleOk").off().on("click",function(){
                        $(".mod_wapper").animate({"height" : 0},300,function() {
                            $(".markHide").fadeOut(1);
                        })
                    })
                   /* $(".isCancleOk").off().on("click",function(){
                        $(".mod_wapper").animate({"height" : 0},300,function() {
                            $(".markHide").fadeOut(1);
                        })
                    });*/
                   /* $(".isCancleOk").off().on("click",function(){
                        $(".mod_wapper").animate({"height" : 0},300,function() {
                            $(".markHide").fadeOut(1);
                        })
                    });
                    $(".mod_quit").off().on("click",function(){
                        $(".mod_wapper").animate({"height" : 0},300,function() {
                            $(".markHide").fadeOut(1);
                        })
                    });*/
                }
                indexIsClick++;


            });
        }(index)
    })
}
//编辑学生
SystemStuManage.prototype.editStudent = function(){
    var student_name ="";
    var sex = "";
    var nationality = "";
    var student_id= "";
    var birth = "";
    var address="";
    $("#stuInfoAddr tr").find("td .change").each(function(index){
        var _thisTr = this;
         return function(){
               $(_thisTr).on("click",function(){
                   $("#add_Student").hide();
                   $("#popId").show();
                   $("#popId").html(showPop());
                   $("#edit_Student").slideDown(500);
                   var tableName = $(_thisTr).parents("tr").find("td");
                 // $($("#edit_Student").find('input')[0]).val($($(_thisTr).parents("tr").find("th")[0]).text());
                   var editName = $("#edit_Student").find('input');
                   //设置学籍号，出生年月无法修改
                   $(editName[2]).attr("readonly",true);
                   $(editName[3]).attr("readonly",true);
                   $(editName[0]).val($(tableName[0]).text())
                   var sexinfo = $(tableName[1]).text();
                   if (sexinfo == "男") {
                       $($("#manId").find("label")).attr("class", "ico acitve");
                       $($("#girlId").find("label")).attr("class", "ico");
                   } else {
                       $("#girlId").find("label").attr("class", "ico acitve");
                       $($("#manId").find("label")).attr("class", "ico");
                   }
                   $("#manId").on("click", function () {
                       $($("#manId").find("label")).attr("class", "ico acitve");
                       $($("#girlId").find("label")).attr("class", "ico");
                   })
                   $("#girlId").on("click", function () {
                       $("#girlId").find("label").attr("class", "ico acitve");
                       $($("#manId").find("label")).attr("class", "ico");
                   })
                   $(editName[1]).val($(tableName[4]).text());
                   $(editName[2]).val($(tableName[2]).text());
                   $(editName[3]).val($(tableName[5]).text());
                   $(editName[4]).val($(tableName[6]).text());

               })
         }(index);
    })
    $("#addSureEdit .alert-btn").on("click",function(){
        warMassEdit("",0)
        student_name = $($("#edit_Student").find('input')[0]).val();

        if ($($("#manId").find("label")).hasClass("ico acitve")) {
            sex = "男";
        } else {
            sex = "女";
        }
        sex = sexBrr[sex];
        nationality = $($("#edit_Student").find('input')[1]).val();
        student_id = $($("#edit_Student").find('input')[2]).val();
        birth = $($("#edit_Student").find('input')[3]).val();
        address = $($("#edit_Student").find('input')[4]).val();

        if ($.trim(student_name) == "") {
            warMassEdit("请输入学生姓名",1)
            // alert("请输入学生姓名")
        } else if ($.trim(nationality) == "") {
            warMassEdit("请输入名族",1)
            // alert("请输入名族")
        } else if ($.trim(student_id) == "") {
            warMassEdit("请输入学籍号",1)
            // alert("请输入学籍号")
        } else if ($.trim(birth)== "") {
            warMassEdit("请输入出生年月",1)
            //alert("请输入出生年月")
        } else if ($.trim(address) == "") {
            warMassEdit("请输入家庭住址",1)
            //alert("请输入家庭个住址")
        }else{
            warMassEdit("",0)
            var url= getURL()+"mod_student";
            var dataEdit = {
                "student_name":student_name,
                "sex":sex,
                "nationality":nationality,
                "student_id":student_id,
                "birth":birth,
                "address":address
            };
            $.ajax({
                data:dataEdit,
                url:url,
                type:"post",
                success:function(dataRes){
                    console.log(dataRes)
                    if(dataRes.header.code=="200"){
                        if(dataRes.data.result=="0"){
                            $("#findStudentInfo").trigger('click');
                            $("#edit_Student").hide();
                            setTimeout(function(){
                                $("#popId").html(hidePop())
                            },100)

                        }
                    }else{
                        new  ModelCon("编辑失败");
                        $(".isCancleOk").hide();
                        $(".isSure").off().on("click",function(){
                            $(".mod_wapper").hide();
                            $(".markHide").hide();
                            //window.location.href="index.html"
                        })
                        return;
                    }

                },error:function(){
                	 new  ModelCon("网络异常，请检查您的网络");
                $(".isCancleOk").hide();
                $(".isSure").off().on("click",function(){
                    $(".mod_wapper").hide();
                    $(".markHide").hide();
                    //window.location.href="systemmanage.html"
                })
                return;
                }
            })
        }


    })
}


function classAndGrade(data) {
    var arrGradeAndClass = new Array();
    var commonData = dataArr;
    var temp = ""
    var gradeHtml = "";
    var classHtml = "";
    var classIdNum = "";
    gradeNameModel.push("全部年级");
    for (var i = 0; i < data.length; i++) {
        var gradeName = commonData[data[i]].split(",")[0];
        var className = commonData[data[i]].split(",")[1];
        if (temp != gradeName) {
            gradeNameModel.push(gradeName);
            temp = gradeName;
        }
    }
    for (var j = 0; j < gradeNameModel.length; j++) {
        gradeHtml += '<div><span>' + gradeNameModel[j] + '</span></div>'
        $("#gradeListHtmlId").html(gradeHtml);
        $("#choiceGrade").html($($("#gradeListHtmlId div")[0]).text());
    }
    for (var k = 1; k < gradeNameModel.length; k++) {
        classNameModel[k] = new Array();
        for (var j = 0; j < data.length; j++) {
            if (gradeNameModel[k] == commonData[data[j]].split(",")[0]) {

                classNameModel[k].push(commonData[data[j]].split(",")[1])
            }
        }
    }
    for (var i = 0; i < gradeNameModel.length; i++) {
        if ($.trim($("#choiceGrade").text()) == $.trim(gradeNameModel[i])) {
            classIdNum = i;
        }
    }
    var classHtml = "";
    classHtml += '<div><span>' + "全部班级" + '</span></div>';
    for (var j = 0; j < classNameModel[classIdNum+1].length; j++) {
        classHtml += '<div><span>' + classNameModel[classIdNum+1][j] + '</span></div>';
    }
    $("#classListHtmlId").html(classHtml);
    $("#choiceClass").html($($("#classListHtmlId div")[0]).text());
    defalutClassText = $($("#classListHtmlId div")[0]).text();
    /*if($.trim($("#choiceGrade").text()) == "全部年级"){
        $("#classListHtmlId").html($($("#classListHtmlId div")[0]).text());
    }*/
}

$(document).ready(function() {
    //判断是否登陆过
    if(!localStorage.getItem("userName")){
        window.location.href="index.html"
    }
    //鼠标滑动动画
    headerMove();
    //将按钮金辉
    $("#addStudent").css("background-color","#cccccc");
    var school=localStorage.getItem("schoolName");
    //var name = localStorage.getItem("userName")
    var name = localStorage.getItem("account");
    var is_root = localStorage.getItem("is_root")
    var dataSchoolInfo ={"name":name,"schoolName":school,"is_root":is_root};
    getStuInfo(dataSchoolInfo)

    $("#dt").on("click",function(){
    	WdatePicker();
    })
    var url = getURL() + "get_user_class";
    var data = {
        "account": name
    };
    $.ajax({
        data: data,
        type: "post",
        url: url,
        success: function (dataRes) {
            if(dataRes.header.code=="200"){
                console.log("student:",dataRes)
                if($.trim(dataRes.data.user_class[0])!=""){
                    classAndGrade(dataRes.data.user_class);
                    //alert("获取数据失败")
                }else{
                    return;
                }
                //点击个人健康评分表

                //初始化数据
                var dataHeal = new SystemStuManage();

                //学期
                dataHeal.getPersonListGrade();
                //班级
                dataHeal.getPersonListClass();
                //获取默认值
                //dataHeal.defalutData();
                //点击后数据展示
                // dataHeal.getAllData();
                dataHeal.defalutDataFirst();
                dataHeal.getAllData();
                //dataHeal.searchData();
                //dataHeal.pageInfo()
                //增加学生
                //dataHeal.addStudentInfo();

                $("#add_Student img").on("click",function(){
                    $("#add_Student").hide();
                    $("#popId").hide(100);
                })
                $("#edit_Student img").on("click",function(){
                    $("#edit_Student").hide();
                    $("#popId").hide(100);
                })
                $("#addSureEdit .alert-btn-cancle").on("click",function(){
                    $("#edit_Student").hide();
                    $("#popId").hide(100);
                })
            }else{
                new  ModelCon("获取数据失败,请刷新重试");
                $(".isCancleOk").hide();
                $(".isSure").off().on("click",function(){
                    $(".mod_wapper").hide();
                    $(".markHide").hide();
                   // window.location.href="systemmanage.html"
                })
                return;
            }


        },error:function(){
        	 new  ModelCon("网络异常，请检查您的网络");
                $(".isCancleOk").hide();
                $(".isSure").off().on("click",function(){
                    $(".mod_wapper").hide();
                    $(".markHide").hide();
                    //window.location.href="systemmanage.html"
                })
                return;
        }

    })

});