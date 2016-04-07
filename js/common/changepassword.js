/**
 * Created by hard work on 2016/2/24.
 */
function passWord(){
    $("#old").change(function(){
        $("#oldPass").hide();
        $("#NewPass").hide();
        $("#configPass").hide();
        $("#compPass").hide();
    })
    $("#new").change(function(){
        $("#oldPass").hide();
        $("#NewPass").hide();
        $("#configPass").hide();
        $("#compPass").hide();
    })
    $("#r_new").change(function(){
        $("#oldPass").hide();
        $("#NewPass").hide();
        $("#configPass").hide();
        $("#compPass").hide();
    })
    $("#button").on("click",function(){
        var oldPass = $("#old").val();
        var newPass = $("#new").val();
        var configPass = $("#r_new").val();

        if(oldPass==""){
            $("#oldPass").show();
            $("#NewPass").hide();
            $("#configPass").hide();
            return;
        }
        else if(newPass==""){
            $("#oldPass").hide();
            $("#NewPass").show();
            $("#configPass").hide();
            return;
            //alert("请输入新密码");
        }else if(configPass==""){
            $("#oldPass").hide();
            $("#NewPass").hide();
            $("#configPass").show();
            return;
        }
        else if($.trim(newPass)!= $.trim(configPass)){
            $("#compPass").show();
            $("#oldPass").hide();
            $("#NewPass").hide();
            $("#configPass").hide();
            return;
        }else{
            $("#compPass").hide();
            $("#oldPass").hide();
            $("#NewPass").hide();
            $("#configPass").hide();
            var name = localStorage.getItem("userName")
            var url = getURL() + "mod_password";
            var data = {
                "account": name,
                "old_password":oldPass,
                "password":newPass
            };
            $.ajax({
                data: data,
                type: "post",
                url: url,
                success: function (dataRes) {
                    console.log(dataRes);
                    if(dataRes.header.code=="200"){
                        if(dataRes.data.code=="0"){
                            var hrefStr = window.opener.location.href;
                            hrefStr=hrefStr.split('/');
                            console.log(hrefStr)
                            new  ModelCon("密码修改成功");
                            $(".isCancleOk").hide();
                            $(".isSure").off().on("click",function() {
                                $(".mod_wapper").hide();
                                $(".markHide").hide();
                               // window.location.href = hrefStr[hrefStr.length-1];
                                setTimeout(function () {
                                    window.opener = null;
                                    window.close();
                                }, 100)
                            });

                        }else{
                            $("#compPass").show();
                            $("#compPass").html(dataRes.data.msg);
                        }
                    }else{
                    	new  ModelCon("数据获取"+dataRes.header.msg+"请重新登录");
                $(".isCancleOk").hide();
                $(".isSure").off().on("click",function(){
                    $(".mod_wapper").hide();
                    $(".markHide").hide();
                    window.location.href="index.html"
                })
                return;
                    }
                }
            });
        }


    })

}
$(document).ready(function(){
    $("#goLogin").on("click",function(){
        window.location.href="index.html";
    })
    passWord();
})