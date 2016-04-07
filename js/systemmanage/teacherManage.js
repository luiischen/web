/**
 * Created by hard work on 2016/2/2.
 */
var TeacherManage = function(){

};
var gradeNameModelTep= [];
var classNameModelTep = [];
var htmlConnect="";
function hideList() {
    $(".t_drop").slideUp(500);
}
var gradeIndex = new Array();
var gradeTeacher = [];
var classTeacher = [];
function getGradeAndClass(data){
    var gradeTeacher = [];
    var classTeacher = [];
    var dataGrade = data.class_list.split(",");
    var temp="";

    for (var i = 0; i < dataGrade.length; i++) {
        var gradeName = dataArr[dataGrade[i]].split(",")[0];
        //var className = dataArr[dataGrade[i]].toString().split(",")[1];
        if (temp != gradeName) {
            gradeTeacher.push(gradeName);
            temp = gradeName;
        }
    }
    gradeSort(gradeTeacher);
    for (var k = 0; k < gradeTeacher.length; k++) {
        classTeacher[k] = new Array();
        for (var j = 0; j < dataGrade.length; j++) {
            if (gradeTeacher[k] == dataArr[dataGrade[j]].toString().split(",")[0]) {

                classTeacher[k].push(dataArr[dataGrade[j]].toString().split(",")[1])
            }
        }
        classSort(classTeacher[k]);

    }
    var strGradeAndClass="";
    for (var j = 0; j < gradeTeacher.length; j++) {
        var strClass = ""
        for(var a=0;a<classTeacher[j].length;a++){
            if(a==classTeacher[j].length-1 ){
                strClass+=classBrr[classTeacher[j][a]];
                //strGradeAndClass+=gradeTeacher[j]+strGradeAndClass+"/"+"班";
            }else if(a<classTeacher[j].length-1){
                strClass+=classBrr[classTeacher[j][a]]+"/";
            }
        }
        if(j==gradeTeacher.length-1){
            strGradeAndClass+=gradeTeacher[j]+strClass+"/"+"班";
        }else if(j<=gradeTeacher.length){
            strGradeAndClass+=gradeTeacher[j]+strClass+"/"+"班"+"、";
        }

    }
    return strGradeAndClass;

}
function reverClassAndGrade(data){
    var reverClassModel = [];
    var reverClassData = data.split("、");
    for(var i=0;i<reverClassData.length;i++){
        var reverseData = reverClassData[i].split("/");
        var grade = reverseData[0].toString().substring(0,3);
        for(var j=0;j<reverseData.length-1;j++){
            var classTep = "";
            if(j==0){
                classTep = classArr[reverseData[j].toString().substring(3,4)]
            }else{
                classTep = classArr[reverseData[j]];
            }
            reverClassModel.push(grade+classTep)
        }

    }
   return reverClassModel;
}
TeacherManage.prototype.getTeacherAcco = function(){
    var _this = this;
    var schoolIdName = localStorage.getItem("schoolId");
    var data = {
        "school_id":schoolIdName
    }
    $.ajax({
        url: getURL()+"get_teacher" ,
        type: 'post',
        data: data,
        success: function (returndata) {
           if(returndata.header.code=="200"){
               var teacherData = returndata.data.teacher_list;
               //班级和年级的处理
               var html="";
               for(var i=0;i<teacherData.length;i++){
                  var classFont =  getGradeAndClass(teacherData[i])
                   var classList = [];
                   /*var classListInit = teacherData[i].class_list.split(",");
                   var str="";
                   for(var k=0;k<classListInit.length;k++){
                       if(k==classListInit.length-1){
                           str += dataArr[classListInit[k]]
                       }else{
                           str += dataArr[classListInit[k]]+"/";
                       }

                   }*/
                   html+='<div class="col-lg-6 items"><ul> <li><span class="names">'+teacherData[i].teacher_name+'</span></li>';
                   html+='<li><span class="phone-lab">账号:</span><span>'+teacherData[i].account+'</span></li>';
                   html+='<li><span class="lab">班级:</span><p class="inline">'+classFont+'</p><p class="inline"></p></li></ul>';
                   html+='<div class="toolbar"><a class="rectPass" >重置密码</a> <a class="change ">修改</a>  <a class="del" id="'+teacherData[i].id+'">删除</a> </div></div>';
               }
               $("#teachId").html(html);
               _this.deleteTea();
               _this.modelTeacher();
               _this.recetPass()
               modTeachInfo()
           }else{
                new  ModelCon("数据获取"+dataRes.header.msg+"请重新登录");
                $(".isCancleOk").hide();
                $(".isSure").off().on("click",function(){
                    $(".mod_wapper").hide();
                    $(".markHide").hide();
                    //window.location.href="index.html"
                })
                return;
           }
        },
        error: function (returndata) {
             new  ModelCon("网络异常，请检查您的网络");
                $(".isCancleOk").hide();
                $(".isSure").off().on("click",function(){
                    $(".mod_wapper").hide();
                    $(".markHide").hide();
                   // window.location.href="index.html"
                })
                return;
        }
    });
}
//设置年级
function setGrade(dataGrade){
    var gradeHtml = ""
    //click-active
    for (var k = 0; k < dataGrade.length; k++) {
        gradeHtml += '<li class="" id="'+k+'grade"><span class="">' + dataGrade[k] + '</span></li>'
    }
    $("#allgrade").html(gradeHtml);
    $($("#allgrade").find("li")[0]).attr("class","click-active");

}
//设置班级
function setClass(dataClass){
 //默认初始化班级
    var classHtml=""
    for (var i = 0; i < dataClass[0].length; i++) {
        classHtml += '<li>' + dataClass[0][i] + ' <span class="checkbox-ico-uncheck"></span></li>'
    }
    $("#fallowClass").html(classHtml);
}

function choiceGrade(){
    var gradeLen = $("#allgrade").find("li").length;
    for(var i=0;i<gradeLen;i++){
        gradeIndex.push(i+"index");
    }
    var indexNum=0;
    choiceClass(indexNum);
    $("#allgrade").find("li").each(function(index){
           return function(){
              $( $("#allgrade").find("li")[index]).on("click",function(){
                  indexNum=index;
                  var classData = classNameModelTep[index];
                  var classHtml=""
                      for(var i=0;i<classData.length;i++){
                          classHtml += '<li>' + classData[i] + ' <span class="checkbox-ico-uncheck"></span></li>'
                      }
                  $("#fallowClass").html(classHtml);
                  $("#allgrade").find("li").attr("class","");
                  $($("#allgrade").find("li")[index]).attr("class","click-active");
                  choiceClass(indexNum);
                  $("#connectClass").find("label").each(function(classNum){
                      return function(){
                          if( $($("#connectClass").find("label")[classNum]).text().indexOf(($($("#allgrade").find("li")[index]).text()))!=-1){
                               var strClass = $($("#connectClass").find("label")[classNum]).text().substring(3,5)
                              $("#fallowClass").find("li").find("span").each(function(indexClass){
                                    return function(){
                                          if($.trim($($("#fallowClass").find("li")[indexClass]).text()) == $.trim(strClass)){
                                              $($("#fallowClass").find("li").find("span")[indexClass]).attr("class","checkbox-ico");
                                          }
                                    }(indexClass)
                              });
                          }
                      }(classNum)
                  })

              })
           }(index);
    })

}

function choiceClass(indexNum){

    $("#fallowClass").find("li").find("span").each(function(index1){
        return function(){
            $($("#fallowClass").find("li").find("span")[index1]).on("click",function(){
                if($($("#fallowClass").find("li").find("span")[index1]).hasClass("checkbox-ico-uncheck")){
                    $($("#fallowClass").find("li").find("span")[index1]).attr("class","checkbox-ico");
                    htmlConnect += '<label class="class-item">' + gradeNameModelTep[indexNum] + classNameModelTep[indexNum][index1] + '<span class=""></span></label>'
                    $("#connectClass").html(htmlConnect);

                    //delImg();
                }else{
                    $($("#fallowClass").find("li").find("span")[index1]).attr("class","checkbox-ico-uncheck");
                  $("#connectClass").find("label").each(function(index3,value){
                        return function(){
                            if($($("#connectClass").find("label")[index3]).text()==(gradeNameModelTep[indexNum] + classNameModelTep[indexNum][index1])){
                                $($("#connectClass").find("label")[index3]).remove();
                                //实时跟新删除的代码
                                htmlConnect = $("#connectClass").html()

                            }
                        }(index3)
                    })
                }
                //找到对应的班级
                findClassName()
               // $($("#fallowClass").find("li").find("span")[index1]).attr("class","checkbox-ico")
            })
        }(index1)
    })

}
var labelName = []
var labelNameMod=[]
function findClassName(){

    $("#connectClass").find("label").each(function(index3,value){
         labelName[index3]=( $($("#connectClass").find("label")[index3]).text())
    })
    $("#allgrade").find("li").each(function(index) {
       for(var i=0;i<labelName.length;i++){
            if($($("#allgrade").find("li")[index]).hasClass("click-active")){
               for(var k=0;k<$("#fallowClass").find("li").find("span").length;k++){
                   var className = $($("#fallowClass").find("li")[k]).text();
                   var gradeName = $($("#allgrade").find("li")[index]).text()
                   var classAndGrade = gradeName+className;
                   if($.trim(labelName[i])==($.trim(classAndGrade))){
                       $($("#fallowClass").find("li").find("span")[k]).attr("class","checkbox-ico");
                   }
               }

            }
       }

    })
    labelName=[];
}
TeacherManage.prototype.addTeacher = function(){
    $("#addAccountImg").on("click", function() {
        $("#accountAlter").css("display", "block");
        $("#popId").show();
        $("#popId").html(showPop());
    });

    //下拉框
    $("#openList").on("click", function() {
        if ($("#openList").hasClass("ico")) {
            $("#openList").attr("class", "ico-up");
            $("#TeacherclassListDetail").slideDown(100);
        } else {
            $("#openList").attr("class", "ico");
            $("#TeacherclassListDetail").slideUp(100);
        }
        //下拉以后的显示内容
    })
    setGrade(gradeNameModelTep);
    //设置班级
    setClass(classNameModelTep);
    //点击每个年级
    choiceGrade();
    //选中每个班级
}
//删除账号
function deleteTeacher(id){
    var url = getURL() + "del_teacher";
    new  ModelCon("确认删除");
    $(".isSure").off().on("click",function(){
        $.ajax({
            data: {id:id},
            type: "post",
            url: url,
            success:function(data){
            	//服务好了需要看的地方
                if(data.data.result=="0"){

                    $(".mod_wapper").animate({"height" : 0},100,function() {
                        $(".markHide").fadeOut(1);
                    })
                    setTimeout(function(){
                        window.location.href="systemmanage.html";
                    },100)
                }else{
                    new  ModelCon("删除失败");
                    $(".isCancleOk").hide();
                    $(".isSure").off().on("click",function(){
                        $(".mod_wapper").hide();
                        $(".markHide").hide();
                        //window.location.href="systemmanage.html";
                    })
                }
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
    });
    $(".isCancleOk").off().on("click",function(){
        $(".mod_wapper").animate({"height" : 0},10,function() {
            $(".markHide").fadeOut(1);
        })
    });
    $(".mod_quit").off().on("click",function(){
        $(".mod_wapper").animate({"height" : 0},300,function() {
            $(".markHide").fadeOut(1);
        })
    });
}
//删除账号
TeacherManage.prototype.deleteTea = function(){
    $("#teachId").find("div .toolbar").find(".del").each(function(index){
        return function(){
            $( $("#teachId").find("div .toolbar").find(".del")[index]).on("click",function(){
               var _this = this;
                deleteTeacher($(_this).attr("id"));
                //
            })
        }(index)
    })

}
//重置密码
TeacherManage.prototype.recetPass = function(){
    $("#teachId").find("div .toolbar").find(".rectPass").each(function(index) {

        return function () {
            $($("#teachId").find("div .toolbar").find(".rectPass")[index]).on("click", function () {
                var modPhone = $($("#teachId").find("div ul")[index]).find(".phone-lab").next().text();
                ///var url = getURL() + "reset_school_user_password";
                console.log(modPhone)
                new  ModelCon("确定重置密码为123456？");
                /*$(".isCancleOk").hide();*/
                $(".isSure").off().on("click",function(){
                    $(".mod_wapper").hide();
                    $(".markHide").hide();
                    $.ajax({
                        data: {"account": modPhone},
                        type: "post",
                        url: getURL() + "reset_school_user_password",
                        success: function (data) {
                            if(data.header.code=="200"){

                            }else{
                                new  ModelCon("设置失败，请重试");
                                $(".isCancleOk").hide();
                                $(".isSure").off().on("click",function(){
                                    $(".mod_wapper").hide();
                                    $(".markHide").hide();
                                    // window.location.href="index.html"
                                })
                                return;
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
                    $(".mod_wapper").hide();
                    $(".markHide").hide();
                })
                return;

            });
        }(index)
    })
}
//修改账号
TeacherManage.prototype.modelTeacher = function(){
    $("#teachId").find("div .toolbar").find(".change ").each(function(index){
        return function(){
            $( $("#teachId").find("div .toolbar").find(".change")[index]).on("click",function(){
               //teacher_name teacher_phone class_list
                $("#accountMod").css("display", "block");
                $("#popId").show();
                $("#popId").html(showPop());
                var _this = this;
                var modName = $($("#teachId").find("div ul")[index]).find(".names").text();
                var modPhone = $($("#teachId").find("div ul")[index]).find(".phone-lab").next().text();
                var modClass = $($("#teachId").find("div ul")[index]).find(".lab").next().text();
                var modClassRev =  reverClassAndGrade(modClass);
               var modHtmlCon = ""
                //var modeClassArr=[];
               $($("#accountMod").find("ul li")[0]).find("input").val(modName)
                $($("#accountMod").find("ul li")[1]).find("input").val(modPhone);
               /* modClass = modClass.split("/");
                for(var i=0;i<modClass.length;i++){
                    modeClassArr[i] = modClass[i].split(",").join("");
                }
                for(var j=0;j<modeClassArr.length;j++){
                    modHtmlCon += '<label class="class-item">' + modeClassArr[j] + '<span></span></label>'

                }*/
                for(var j=0;j<modClassRev.length;j++){
                    modHtmlCon += '<label class="class-item">' + modClassRev[j] + '<span></span></label>'

                }
                $("#connectClassMod").html(modHtmlCon);
            })
        }(index)
    })
}
function addTeaInfo(msg){
    $("#addTeaInfo").show();
    $("#addTeaInfo").html(msg);
}
function addTeaInfoModel(msg){
    $("#addTeaInfoModel").show();
    $("#addTeaInfoModel").html(msg);
}
//点击菜单下拉修改
function modTeachInfo(){
    $("#openListMod").on("click", function() {
        if ($("#openListMod").hasClass("ico")) {
            $("#openListMod").attr("class", "ico-up");
            $("#TeacherclassListDetailMod").slideDown(100);
        } else {
            $("#openListMod").attr("class", "ico");
            $("#TeacherclassListDetailMod").slideUp(100);
        }
        setGradeMod(gradeNameModelTep);
        setClassMod(classNameModelTep);
        //点击每个年级
        choiceGradeMod();
        //选中每个班级
        findClassNameMod()

    })
    $("#addTeacherIdMod").on("click",function(){
        var teachName = $($("#accountMod").find("ul li")[0]).find("input").val();
        var teachPhone = $($("#accountMod").find("ul li")[1]).find("input").val();
        var labelNameMod = new Array();
        $("#connectClassMod").find("label").each(function(index){
            labelNameMod[index]=( $($("#connectClassMod").find("label")[index]).text())
        })
        var labelNameList = "";
        for(var j=0;j<labelNameMod.length;j++){
            var k =labelNameMod[j].split("级");
            if(j==labelNameMod.length-1){
                labelNameList+=dataBrr[k[0]+"级,"+k[1] ];
            }else{
                labelNameList+=dataBrr[k[0]+"级,"+k[1] ]+",";
            }

        }
        if($.trim(teachName)==""){
            addTeaInfoModel("请输入老师名字");
            $($("#accountMod").find("ul li")[0]).find("input").focus();
            return;
        }else if($.trim(teachPhone)==""){
            addTeaInfoModel("请输入老师手机号码");
            $($("#accountMod").find("ul li")[1]).find("input").focus();
            return;
         }
         else if(!testPhone($.trim(teachPhone))){
         	addTeaInfoModel("请输入正确的手机号码");
         	$($("#accountMod").find("ul li")[1]).find("input").val("");
         	$($("#accountMod").find("ul li")[1]).find("input").focus();
         	return;
        
        }else if($.trim(labelNameList)==""){
            addTeaInfoModel("请选择关联班级");
            return;
        }
        var data2 = {
            "teacher_name":teachName,
            "teacher_phone":teachPhone,
            "class_list":labelNameList
        }
        $.ajax({
            type:"post",
            data:data2,
            url: getURL()+"mod_teacher",
            success:function(data){
                if(data.header.code=="200"){
                    $("#accountMod").css("display","none");
                    $("#popId").hide();
                    setInterval(function(){
                        window.location.href="systemmanage.html";
                    },100)

                }
                else{
                    new  ModelCon("修改失败,请重试");
                $(".isCancleOk").hide();
                $(".isSure").off().on("click",function(){
                    $(".mod_wapper").hide();
                    $(".markHide").hide();
                   // window.location.href="index.html"
                })
                return;
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
    //将class和grade放到列表里面

}

//设置年级
function setGradeMod(dataGrade){
    var gradeHtml = ""
    //click-active
    for (var k = 0; k < dataGrade.length; k++) {
        gradeHtml += '<li class="" id="'+k+'grade"><span class="">' + dataGrade[k] + '</span></li>'
    }
    $("#allgradeMod").html(gradeHtml);
    $($("#allgradeMod").find("li")[0]).attr("class","click-active");

}
//设置班级
function setClassMod(dataClass){
    //默认初始化班级
    var classHtml=""
    for (var i = 0; i < dataClass[0].length; i++) {
        classHtml += '<li>' + dataClass[0][i] + ' <span class="checkbox-ico-uncheck"></span></li>'
    }
    $("#fallowClassMod").html(classHtml);
}
var indexNum=0;
function choiceGradeMod(){
    var gradeLen = $("#allgradeMod").find("li").length;
    for(var i=0;i<gradeLen;i++){
        gradeIndex.push(i+"index");
    }

    choiceClassMod(indexNum);
    $("#allgradeMod").find("li").each(function(index){

        return function(){
            $( $("#allgradeMod").find("li")[index]).on("click",function(){
                indexNum=index;
                var classData = classNameModelTep[index];
                var classHtml=""
                for(var i=0;i<classData.length;i++){
                    classHtml += '<li>' + classData[i] + ' <span class="checkbox-ico-uncheck"></span></li>'
                }
                $("#fallowClassMod").html(classHtml);
                $("#allgradeMod").find("li").attr("class","");
                $($("#allgradeMod").find("li")[index]).attr("class","click-active");
                choiceClassMod(indexNum);

                $("#connectClassMod").find("label").each(function(classNum){

                    return function(){
                        if( $($("#connectClassMod").find("label")[classNum]).text== ($("#allgradeMod").find("li")[index])){

                        }
                    }(classNum)
                })

            })
        }(index);
    })

}

function choiceClassMod(indexNum){
    findClassNameMod()

    $("#fallowClassMod").find("li").find("span").each(function(index1){
        return function(){
            $($("#fallowClassMod").find("li").find("span")[index1]).on("click",function(){

                if($($("#fallowClassMod").find("li").find("span")[index1]).hasClass("checkbox-ico-uncheck")){
                    $($("#fallowClassMod").find("li").find("span")[index1]).attr("class","checkbox-ico");
                    var htmlConnnectNum = ""
                    htmlConnnectNum += '<label class="class-item">' + gradeNameModelTep[indexNum] + classNameModelTep[indexNum][index1] + '<span></span></label>'

                    var htmlCon = $("#connectClassMod").html();
                    var allHtml = htmlCon+htmlConnnectNum;
                    $("#connectClassMod").html(allHtml)

                }else{
                    $($("#fallowClassMod").find("li").find("span")[index1]).attr("class","checkbox-ico-uncheck");
                    $("#connectClassMod").find("label").each(function(index3,value){
                        return function(){
                            if($($("#connectClassMod").find("label")[index3]).text()==(gradeNameModelTep[indexNum] + classNameModelTep[indexNum][index1])){
                                $($("#connectClassMod").find("label")[index3]).remove();
                                //实时跟新删除的代码
                                htmlConnect = $("#connectClassMod").html()

                            }
                        }(index3)
                    })

                }
                //找到对应的班级
                findClassNameMod()
                // $($("#fallowClass").find("li").find("span")[index1]).attr("class","checkbox-ico")
            })
        }(index1)
    })

}
function findClassNameMod(){
    $("#connectClassMod").find("label").each(function(index3,value){
        labelNameMod[index3]=( $($("#connectClassMod").find("label")[index3]).text())
    })
    $("#allgradeMod").find("li").each(function(index) {
        for(var i=0;i<labelNameMod.length;i++){
            if($($("#allgradeMod").find("li")[index]).hasClass("click-active")){
                for(var k=0;k<$("#fallowClassMod").find("li").find("span").length;k++){
                    var className = $($("#fallowClassMod").find("li")[k]).text();
                    var gradeName = $($("#allgradeMod").find("li")[index]).text()
                    var classAndGrade = gradeName+className;
                    if($.trim(labelNameMod[i])==($.trim(classAndGrade))){
                        $($("#fallowClassMod").find("li").find("span")[k]).attr("class","checkbox-ico");
                    }
                }

            }
        }

    })
    //每次情况
    labelNameMod=[];
}
//请求修改

//班级关联
function classAndGradeInfo(data){
    var arrGradeAndClass = new Array();
    var commonData = dataArr;
    var temp = ""
    for (var i = 0; i < data.length; i++) {
        var gradeName = commonData[data[i]].split(",")[0];
        var className = commonData[data[i]].split(",")[1];
        if (temp != gradeName) {
            gradeNameModelTep.push(gradeName);
            temp = gradeName;

        }
    }
   gradeSort(gradeNameModelTep)
    for (var k = 0; k < gradeNameModelTep.length; k++) {
        classNameModelTep[k] = new Array();
        for (var j = 0; j < data.length; j++) {
            if (gradeNameModelTep[k] == commonData[data[j]].split(",")[0]) {

                classNameModelTep[k].push(commonData[data[j]].split(",")[1])
            }
        }
        classSort(classNameModelTep[k])
    }
}
//发送短信通知对方
TeacherManage.prototype.createAccount = function(){
    $("#addTeacherId").on("click",function(){
        if($("#connectClass").find("label").length<=0){
            addTeaInfo("请选择关联班级")
            //alert("");
        }else{
            var teachName = $($("#accountAlter").find("ul li")[0]).find("input").val();
            var teachPhone = $($("#accountAlter").find("ul li")[1]).find("input").val();
            var schoolAccount = localStorage.getItem("schoolId");
            var labelName = new Array();
             $("#connectClass").find("label").each(function(index){
                 labelName[index]=( $($("#connectClass").find("label")[index]).text())
            })
            var labelNameList = "";
            for(var j=0;j<labelName.length;j++){
                var k =labelName[j].split("级");
                if(j==labelName.length-1){
                    labelNameList+=dataBrr[k[0]+"级,"+k[1] ];
                }else{
                    labelNameList+=dataBrr[k[0]+"级,"+k[1] ]+",";
                }

            }
            
            if($.trim(teachName)==""){
            addTeaInfo("请输入老师名字");
            $($("#accountAlter").find("ul li")[0]).find("input").focus();
            return;
        }else if($.trim(teachPhone)==""){
            addTeaInfo("请输入老师手机号码");
            $($("#accountAlter").find("ul li")[1]).find("input").focus();
            return;
         }
         else if(!testPhone($.trim(teachPhone))){
         	addTeaInfo("请输入正确的手机号码");
         	$($("#accountAlter").find("ul li")[1]).find("input").val("");
         	$($("#accountAlter").find("ul li")[1]).find("input").focus();
         	return;
        
        }else if($.trim(labelNameList)==""){
            addTeaInfoModel("请选择关联班级1");
            return;
        }
         /*   
            
            
            if($.trim(teachName)==""){
                addTeaInfo("请输入老师名字")
                //alert("请输入老师名字");
                return;
            }else if($.trim(teachPhone)==""){
                addTeaInfo("请输入老师手机号码")
                //alert("请输入老师手机号码");
                return;
            }else if($.trim(labelNameList)==""){
                addTeaInfo("请选择关联班级")
                //alert("请选择关联班级");
                return;
            }*/
            var schoolName = localStorage.getItem("schoolName")
           var data2 = {
                "teacher_name":teachName,
                "teacher_phone":teachPhone,
                "class_list":labelNameList,
                "school_id":schoolAccount,
                "school":schoolName
            }
            $.ajax({
                data: data2,
                type: "post",
                url: getURL()+"add_teacher",
                success: function(dataRes) {
                	console.log(dataRes)
                    if(dataRes.header.code=="200"){
                        $("#accountAlter").css("display","none");
                        $("#popId").hide();
                        setInterval(function(){
                           window.location.href="systemmanage.html";
                        },100)

                    }
                    else{
                        $("#accountAlter").css("display","none");
                        $("#popId").hide();
                        new  ModelCon("数据获取失败,请刷新重试");
                $(".isCancleOk").hide();
                $(".isSure").off().on("click",function(){
                    $(".mod_wapper").hide();
                    $(".markHide").hide();
                    //window.location.href="index.html"
                })
                return;
                    }
                },error:function(state){
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
        }
    })

}

$(document).ready(function(){
    //判断是否登陆过
    if(!localStorage.getItem("userName")){
        window.location.href="index.html"
    }

    //鼠标移动到item
    $("#firstItem").hover(function(){
        $("#addManage").hide();
        $("#addManageHover").show();

    },function(){
        $("#addManage").show();
        $("#addManageHover").hide();
    })
    //鼠标滑动动画
    headerMove();
    //获取班级
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
            if(dataRes.header.code=="200"){
                if($.trim(dataRes.data.user_class[0])!=""){
                    classAndGradeInfo(dataRes.data.user_class);
                    //alert("获取数据失败")
                }else{
                    return;
                }
                var teacher = new TeacherManage();
                teacher.getTeacherAcco();

                teacher.addTeacher();
                $("#accountAlter img").on("click",function(){
                    $("#addTeaInfo").hide();
                    $("#accountAlter").css("display","none");
                    $("#popId").hide();
                })
                teacher.createAccount();
              /* teacher.recetPass();*/
                $("#accountMod img").on("click",function(){
                    $("#addTeaInfoModel").hide();
                    $("#accountMod").css("display","none");
                    $("#popId").hide();
                })

                $("#accountMod #cancelMod").on("click",function(){
                    $("#addTeaInfoModel").hide();
                    $("#accountMod").css("display","none");
                    $("#popId").hide();
                })
            }else{
                new  ModelCon("数据获取失败,请刷新重试");
                $(".isCancleOk").hide();
                $(".isSure").off().on("click",function(){
                    $(".mod_wapper").hide();
                    $(".markHide").hide();
                   // window.location.href="index.html"
                })
                return;
            }


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
    })

})