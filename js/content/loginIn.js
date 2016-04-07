/**
 * Created by hard work on 2016/3/16.
 * user:lizhihu
 */

function save() {
    if($("#check").prop("checked")){
        var username = $("#user").val();
        var password = $("#passWd").val();
        $.cookie("rmbUser", "true", { expires: 7 }); //存储一个带7天期限的cookie
        $.cookie("username", username, { expires: 7 });
        $.cookie("password", password, { expires: 7 });
    }else{
        $.cookie("rmbUser", "false", { expire: -1 });
        $.cookie("username", "", { expires: -1 });
        $.cookie("password", "", { expires: -1 });
    }
};
function check(){
    var username = $("#user").val();
    var password = $("#passWd").val();
    if(username == ""){
        $("#inputNameOrPass").show();
        $("#inputNameOrPass").text("请输入用户名");
        $("#user").focus();
        return false;
    }
    if(password == ""){
        $("#inputNameOrPass").show();
        $("#inputNameOrPass").text("请输入密码");
        $("#passWd").focus();
        return false;
    }

    return true;
}

function loginIn(){

    var userNum = $("#user").val();
    var userPassWd = $("#passWd").val();
    var url =getURL()+"school_login";
    var data={"user_name":userNum,"password":userPassWd}
    $.ajax({
        type: "post",
        url: url,
        data: data,
        success: function (data) {
            if(data.header.code=="200") {
                if (data.data.result == "0") {
                    $("#inputNameOrPass").hide();
                    save();
                    localStorage.setItem("schoolName",data.data.school);
                    localStorage.setItem("account",data.data.uid)
                    localStorage.setItem("userName",userNum);
                    localStorage.setItem("schoolId",data.data.school_id);
                    localStorage.setItem("is_root",data.data.is_root);
                    //window.location.href="personhealthyscore.html"
                    //contractEnd(localStorage.getItem("schoolName"))
                    var url = getURL()+"get_remind_day";
                    $.ajax({
                        type:"post",
                        url:url,
                        data:{"school":localStorage.getItem("schoolName")},
                        success:function(data){
                            if(data.header.code==200){
                                if(data.data.day==""){
                                    localStorage.clear();
                                    $("#inputNameOrPass").show();
                                    $("#inputNameOrPass").text("您的合同已经到期,请及时续费");
                                    return;
                                }else{
                                    var nowDate = new Date();
                                    var year = nowDate.getFullYear();
                                    var month = nowDate.getMonth()+1;
                                    var date = nowDate.getDate();
                                    var str1 = year+"-"+month+"-"+date;
                                    $("#numDate").html(DateDiff(data.data.day,str1))
                                    if(DateDiff(data.data.day,str1)<=0){
                                        new  ModelCon("您的合同已经到期,如果您想继续使用,请您续费");
                                        //css("height",175+"px")
                                        $(".mod_wapper").animate({"height" : 175},0);
                                        $(".isCancleOk").hide();
                                        $(".isSure").off().on("click",function(){
                                            $(".mod_wapper").hide();
                                            $(".markHide").hide();
                                        })
                                        window.location.href="index.html";
                                    }else{
                                        window.location.href="personhealthyscore.html";
                                    }
                                }

                            }
                        },error:function(){
                            new  ModelCon("网络异常,请刷新重试");
                            //css("height",175+"px")
                            $(".mod_wapper").animate({"height" : 175},0);
                            $(".isCancleOk").hide();
                            $(".isSure").off().on("click",function(){
                                $(".mod_wapper").hide();
                                $(".markHide").hide();
                            })
                        }

                    })

                }else{
                    localStorage.clear();
                    $("#inputNameOrPass").show();
                    $("#inputNameOrPass").text(data.data.msg);
                }
            }else{
                $("#inputNameOrPass").show();
                $("#inputNameOrPass").text(data.header.msg);
                return;
            }
        },error:function(){
            new  ModelCon("网络异常，请检查您的网络");
            $(".isCancleOk").hide();
            $(".isSure").off().on("click",function(){
                $(".mod_wapper").hide();
                $(".markHide").hide();
            })
            return;
        }
    });
}
$(document).ready(function(){
    if(!$.cookie("username")){
        if(!($.NV('name')=="chrome" || $.NV('name')=="firefox" || $.NV('name')=="360安全浏览器")){
            new  ModelCon("为了不影响您的体验,请您使用最新的360安全浏览器或者火狐浏览器或者谷歌浏览器");
            //css("height",175+"px")
            $(".mod_wapper").animate({"height" : 175},0);
            $(".isCancleOk").hide();
            $(".isSure").off().on("click",function(){
                $(".mod_wapper").hide();
                $(".markHide").hide();
            })
        }
    }

    localStorage.removeItem("schoolName");
    localStorage.removeItem("userName");
    localStorage.removeItem("schoolId");
    localStorage.removeItem("is_root");
    $("#check").click(function(){
        if($(this).prop("checked")){
            $(this).prev("#img").css("background-image","url(img/select.png)")
        }else{
            $(this).prev("#img").css("background-image","url(img/unselect.png)")
        }
    })
    if ($.cookie("rmbUser") == "true") {
        $("#img").css("background-image","url(img/select.png)")
        $("#check").prop("checked", true);
        $("#user").val($.cookie("username"));
        $("#passWd").val($.cookie("password"));
    }else{
        $("#img").css("background-image","url(img/unselect.png)")
        $("#user").val("");
        $("#passWd").val("");
    }
    $("#l_in").click(function(){
        if(check()){
            loginIn();
        }
    });
    if($("#user").val()!=""){
        $(".hiddenUser").css("display","block")
    }
    //动画
    $(".input").find("input").each(function(index){
        return function(){
            if(index!=2){
                var inputId = $($(".input").find("input")[index]).attr("id");
                    $($(".input").find("input")[index]).focus(function(){
                        //字体变色
                        $($(".hiddenUser")[index]).css("color","#0099FF")
                        if( $("#"+inputId).val()=="") {
                            $($(".hiddenUser")[index]).css("display","none")
                            $($(".input").find("input")[index]).prev("span").css({"opacity":1,"color":"#0099FF"});
                            $($(".input").find("input")[index]).prev("span").stop().animate({
                                "top": "-8px",
                                "font-size": "12px",
                                "z-index": "100",
                                "padding": "0 6px",
                                "color":"#0099FF"
                            }, 300).animate({
                                opacity: 1
                            }, 300);
                        }else{
                            $($(".input").find("input")[index]).prev("span").css({"opacity":1,"color":"#767676"});
                            $($(".input").find("input")[index]).prev("span").css({
                                "top": "-8px",
                                "font-size": "12px",
                                "z-index": "100",
                                "padding": "0 6px"
                            })
                        }
                    })
                    $($(".input").find("input")[index]).blur(function(){
                        $($(".hiddenUser")[index]).css("color","#767676");
                          $($(".phoneAndPass")[index]).css("color","#767676");

                        if($($(".input").find("input")[index]).val()==""){
                            $($(".hiddenUser")[index]).css("display","none");
                            $($(".input").find("input")[index]).prev("span").css("opacity",1);
                            $($(".input").find("input")[index]).prev("span").css({"opacity":1,"color":"#767676"});
                            $($(".input").find("input")[index]).prev("span").stop().animate({
                                "top":"16px",
                                "font-size":"14px",
                                "z-index":"-100",
                                "padding":"0"
                            },300).animate({
                                opacity:0
                            },3);
                        }
                    });

            }


        }(index)
    })

});
