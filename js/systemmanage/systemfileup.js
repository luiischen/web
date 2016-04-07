/**
 * Created by hard work on 2016/1/31.
 */
var FileUp = function(){
}
var inputFileName="";
function hideList() {
    $(".t_drop").slideUp(500);
}
FileUp.prototype.getYear = function(){
    var newYear = new Date();
    var year = newYear.getFullYear();
    var month = newYear.getMonth();
    var yearArr = new Array();
    for(var i=0;i<5;i++){
        if(month<7){
            yearArr.push(year-i-1);
        }else{
            yearArr.push(year-i);
        }

    };

    var yearHtml="";
    for(var i=0;i<yearArr.length;i++){
        yearHtml+='<div><span>'+yearArr[i]+'</span></div>'
    }

    $("#yearListId .t_list").html(yearHtml)
    console.log(parseInt($("#choiceTermList").text()))
    setInterval(function(){
        if(month>=7 && (year==parseInt($("#choiceYear").text()))){
            $("#secondTermFileIn").hide();
        }else{
            $("#secondTermFileIn").show();
        }
        if($("#secondTermFileIn").css("display")=="none"){
            $("#choiceTermList").html("第一学期");
        }
    },1)

    //学年
    $("#yearId").on("click", function(e) {
        $("#inputScore").hide();
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
    $("#yearListId .t_list div").each(function(index, val) {
        $("#choiceYear").html($($("#yearListId .t_list div")[0]).context.innerText);
        return function() {
            $($("#yearListId .t_list div")[index]).click(function() {
                var _this = this;
                $("#choiceYear").html($(_this).context.innerText);
                console.log(parseInt($("#choiceTermList").html()))


                $("#yearListId").slideUp(500);
            })
        }(index)

    })
    //点击现在
    $("#nowYear").click(function() {
        $("#choiceYear").html($($("#yearListId .t_list div")[0]).context.innerText);
        $("#yearListId").slideUp(500);
        $("#yearId img").attr("src", "img/moredown_gray.png");
    })
    $(document).click(function(event) {
        $("#yearListId").slideUp(500);
        $("#yearId img").attr("src", "img/moredown_gray.png");
    })

}
FileUp.prototype.getTerm = function(){
    $("#termIdFile").on("click", function(e) {
        $("#inputScore").hide();
        hideList();
        if ($("#termListIdFIle").css("display") != "block") {
            $("#termListIdFIle").slideDown(500);
            $("#termIdFile img").attr("src", "img/moreup_gray.png");
        } else {
            $("#termListIdFIle").slideUp(500);
            $("#termIdFile img").attr("src", "img/moredown_gray.png");
        }
        stopBubble(e)
        //event.stopPropagation();
    })
    //选择学期
    $("#termListIdFIle .t_list div").each(function(index, val) {
        $("#choiceTermList").html($($("#termListIdFIle .t_list div")[0]).context.innerText);
        return function() {
            $($("#termListIdFIle .t_list div")[index]).click(function() {
                var _this = this;
                $("#choiceTermList").html($(_this).context.innerText);

                $("#termListIdFIle").slideUp(500);
                $("#termIdFile img").attr("src", "img/moredown_gray.png");
            })
        }(index)

    })
    $(document).click(function(event) {
        $("#termListIdFIle").slideUp(500);
        $("#termIdFile img").attr("src", "img/moredown_gray.png");
    })
}
FileUp.prototype.getOutYear = function(){
    var newYear = new Date();
    var year = newYear.getFullYear();
    var month = newYear.getMonth();
    var yearArr = new Array();
    for(var i=0;i<5;i++){
        if(month<7){
            yearArr.push(year-i-1);
        }else{
            yearArr.push(year-i);
        }

    };

    var yearHtml="";
    for(var i=0;i<yearArr.length;i++){
        yearHtml+='<div><span>'+yearArr[i]+'</span></div>'
    }

    $("#schoolYearListId .t_list").html(yearHtml)
    setInterval(function(){
        if(month>=7 && (year==parseInt($("#choiceSchoolYear").text()))){
            $("#secondTermFileOut").hide();
        }else{
            $("#secondTermFileOut").show();
        }
        if($("#secondTermFileOut").css("display")=="none"){
            $("#choiceSchoolTerm").html("第一学期");
        }
    },1)
    //学年
    $("#schoolYearId").on("click", function(e) {
        hideList();
        if ($("#schoolYearListId").css("display") != "block") {
            $("#schoolYearListId").slideDown(500);
            $("#schoolYearId img").attr("src", "img/moreup_gray.png");
        } else {
            $("#schoolYearListId").slideUp(500);
            $("#schoolYearId img").attr("src", "img/moredown_gray.png");
        }
        stopBubble(e)
        //event.stopPropagation();
    });
    $("#schoolYearListId .t_list div").each(function(index, val) {
        $("#choiceSchoolYear").html($($("#schoolYearListId .t_list div")[0]).context.innerText);
        return function() {
            $($("#schoolYearListId .t_list div")[index]).click(function() {
                var _this = this;
                $("#choiceSchoolYear").html($(_this).context.innerText);

                $("#schoolYearListId").slideUp(500);
            })
        }(index)

    })
    //点击现在
    $("#nowSchoolYear").click(function() {
        $("#choiceSchoolYear").html($($("#yearListId .t_list div")[0]).context.innerText);
        $("#schoolYearListId").slideUp(500);
        $("#schoolYearId img").attr("src", "img/moredown_gray.png");
    })
    $(document).click(function(event) {
        $("#schoolYearListId").slideUp(500);
        $("#schoolYearId img").attr("src", "img/moredown_gray.png");
    })

}
FileUp.prototype.getOutTerm = function(){
    $("#schoolTermId").on("click", function(e) {
        hideList();
        if ($("#schoolTermListId").css("display") != "block") {
            $("#schoolTermListId").slideDown(500);
            $("#schoolTermId img").attr("src", "img/moreup_gray.png");
        } else {
            $("#termListIdFIle").slideUp(500);
            $("#schoolTermId img").attr("src", "img/moredown_gray.png");
        }
        stopBubble(e)
        //event.stopPropagation();
    })
    //选择学期
    $("#schoolTermListId .t_list div").each(function(index, val) {
        $("#choiceSchoolTerm").html($($("#schoolTermListId .t_list div")[0]).context.innerText);
        return function() {
            $($("#schoolTermListId .t_list div")[index]).click(function() {
                var _this = this;
                $("#choiceSchoolTerm").html($(_this).context.innerText);

                $("#schoolTermListId").slideUp(500);
                $("#schoolTermId img").attr("src", "img/moredown_gray.png");
            })
        }(index)

    })
    $(document).click(function(event) {
        $("#schoolTermListId").slideUp(500);
        $("#schoolTermId img").attr("src", "img/moredown_gray.png");
    })
}

FileUp.prototype.upLoad = function(){
    var inputChange = $(".download-btn-box input");
    inputChange.change(function(){
        $("#inputScore").hide();
        var _this = this;
        var schoolNameScore = $(_this).val();
        var arr = schoolNameScore.split('\\');
        schoolNameScore=arr[arr.length-1];//这就是要取得的图片名称
        inputFileName = schoolNameScore;
        var htmlUpload="";
        if($.trim($("#file_upload").val())!=""){
            $("#inputScore").hide();
            htmlUpload+= '<li><span class="ico"></span><span class="file-name">'+schoolNameScore+'</span> </li>';
            $("#upload").html(htmlUpload)
        }else{
            $("#upload").html("");
            $("#inputScore").show();
            $("#inputScore").html("*您取消了文件选择，请重新选择上传文件");
        }
        if($("#upload").css("display","block")){
            $(".sub-list").show();
        }
        /*$("#upload li").each(function(index,value){
            return function(){
               $($("#upload li")[index]).find("a").on("click",function(){
                   alert("删除成功")
               })
            }(index)
        })*/
    })

}
var bartimer;
function setProcess(){
    var processbar = document.getElementById("progressBar");
    processbar.style.width = parseInt(processbar.style.width) + 1 + "%";
    $("#progressBar").css("width",processbar.style.width);
    $("#progressLen").text(processbar.style.width);
    if(processbar.style.width == "100%"){

            new  ModelCon("上传成功");
            $(".isCancleOk").hide();
            $(".isSure").off().on("click",function(){
                $(".mod_wapper").hide();
                $(".markHide").hide();
            })

        window.clearInterval(bartimer);
       // new Notice("上传成功");
        $("#upload").html("")
        $("#inputScore").show();
        $("#inputScore").html("文件上传成功");
        $("#inputScore").hide();

            $("#procressId").hide();
            processbar.style.width="0%";
        setTimeout(function(){
            $("#upload").html("")
            $("#inputScore").hide();
        },100)

    }
}
function getDownList(account){

    $.ajax({
        data: {"account":account},
        type: "post",
        url: getURL()+"get_download_list" ,
        success:function(data){
            console.log(data)
            $("#downLoadList  tr:not(:first)").empty();
            var downLoadHtml = "";
            var downLoadCon = data.data.download_list
             for(var i=0;i<downLoadCon.length;i++){
                 downLoadHtml+=' <tr class="tr-hover"><td><i></i>'+downLoadCon[i].file_name+'</td><td>'+downLoadCon[i].year+'</td> <td>'+downLoadCon[i].opt_time+'</td><td>'+downLoadCon[i].account+'</td><td><a href="'+downLoadCon[i].file_path+'">下载</a></td></tr>';
             }
            $("#downLoadList").append(downLoadHtml)
        },error:function(){

        }
    })
}
function inScoreList(account,inputFileName){
    $.ajax({
        data: {"account":account,"file_name":inputFileName},
        type: "post",
        url: getURL()+"get_upload_list" ,
        success:function(data){
            $("#inList  tr:not(:first)").empty();
            var downLoadHtml = "";
            var downLoadCon = data.data.upload_list;
            for(var i=0;i<downLoadCon.length;i++){
                downLoadHtml+=' <tr class="tr-hover"><td><i></i>'+downLoadCon[i].file_name+'</td><td>'+downLoadCon[i].year+'</td> <td>'+downLoadCon[i].upload_time+'</td><td>'+downLoadCon[i].account+'</td><td><a href="'+downLoadCon[i].file_path+'">下载</a></td></tr>';
            }
            $("#inList").append(downLoadHtml)
        },error:function(){

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
    //console.log($(".download-btn-box input")[0])
    var school=localStorage.getItem("schoolName");
    var name = localStorage.getItem("account")
    //var name = localStorage.getItem("userName")
    var is_root = localStorage.getItem("is_root");
    var schoolIdName = localStorage.getItem("schoolId");

    var dataSchoolInfo ={"name":name,"schoolName":school,"is_root":is_root};
    getStuInfo(dataSchoolInfo)
    var fileDown = new FileUp();
    fileDown.getYear();
    fileDown.getTerm();
    fileDown.upLoad();
    inScoreList(name);
    function doUpload() {
        var termList = $.trim($("#choiceTermList").text());
        termList  = dataTerm[termList];
        $("#year").val($.trim($("#choiceYear").text()));
        $("#term").val(termList)
        $("#school").val(school)
        $("#school_id").val(schoolIdName);
        $("#account").val(name);
        $("#file_name").val(inputFileName);
        var formData = new FormData($( "#uploadForm" )[0]);
       $.ajax({
            url: getURL()+"score_input",
            type: 'post',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (returndata) {
               if(returndata.header.code=="200"){
                   if(returndata.data.result=="0"){
                       inScoreList(name);
                   }
               }else{
               	new  ModelCon(returndata.header.msg);
                $(".isCancleOk").hide();
                $(".isSure").off().on("click",function(){
                    $(".mod_wapper").hide();
                    $(".markHide").hide();
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
    $(".sub").on("click",function(){
        if($("#choiceYear").text()=="请选择"){
            $("#inputScore").show();
            $("#inputScore").html("*请选择学年");
            return;
            //alert("请选择学年");
        }else if($("#choiceTermList").text()=="请选择"){
            $("#inputScore").show();
            $("#inputScore").html("*请选择学期");
            return;
           //alert("请选择学期")
        }else{
            $(".sub-list").hide();
            $("#inputScore").hide();
            if($.trim($("#upload").html())){
                $("#procressId").css("display","block");

                bartimer = setInterval(function(){
                    setProcess();
                },100);
                doUpload();
                return;
            }else{
                $("#inputScore").show();
                $("#inputScore").html("*请选择文件");
                return;
                //alert("请选择文件");
            }

        }

    })
    fileDown.getOutYear();
    fileDown.getOutTerm();
    var account1 = localStorage.getItem("account");
    getDownList(account1)
    $("#scoueOut").on("click",function() {
        if ($("#choiceSchoolYear").text() == "请选择") {
            alert("请选择学年");
        } else if ($("#choiceSchoolTerm").text() == "请选择") {
            alert("请选择学期")
        } else {

            var url = getURL() + "score_output";

            var schoolClassTerm = $("#choiceSchoolTerm").text();
            schoolClassTerm = dataTerm[$.trim(schoolClassTerm)];
            var schoolId = localStorage.getItem("schoolId");
            var account = localStorage.getItem("account");
            var data = {"class_id": "", "school_id": schoolId,"account":account, "year": $.trim($("#choiceSchoolYear").text()), "term": schoolClassTerm};

            $.ajax({
                data: data,
                type: "post",
                url: url,
                success: function (dataRes) {
                    console.log("isData",dataRes)
                    if (dataRes.header.code == "200") {
                        if(dataRes.data.result!=-1){
                            window.location.href=dataRes.data.url;
                            getDownList(account)
                        }else{
                            new  ModelCon(dataRes.data.msg);
                            $(".isCancleOk").hide();
                            $(".isSure").off().on("click",function() {
                                $(".mod_wapper").hide();
                                $(".markHide").hide();
                            })
                        }

                    } else {
                        new  ModelCon("下载失败，请重试");
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
                   // window.location.href="index.html";
                })
                return;
                }

            })
        }
    });
})