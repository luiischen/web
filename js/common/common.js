/*
 autohr:lizhihu
 公共方法
 */
var url = "http://120.26.97.139:3000/";
//var url = "http://csh.linpoo.cn:3000/";
//var url="http://172.16.170.69:3000/"
var isScoreIn = false;
var COOKIE_NAME = 'userNameLogin';  
var COOKIE_PASS = 'passWDLogin';
    function getURL(){

        return url;
    }
var dataTerm = {
    "第一学期":"1",
    "第二学期":"2"

}
var unitTeam = {
    "BMI":"BMI(千克/平方米)",
    "50米跑":"50米跑(秒)",
    "平衡":"平衡(秒)",
    "身高":"身高(厘米)",
    "俯卧撑":"俯卧撑(个)",
    "坐位体前屈":"坐位体前屈(厘米)",
    "一分钟仰卧起坐":"一分钟仰卧起坐(个)",
    "肺活量":"肺活量(毫升)",
    "体重":"体重(千克)",
    "一分钟跳绳":"1分钟跳绳(个)",
    "50*8往返跑":"50米*8往返跑(分·秒)",
    "视力":"视力",
    "总分":"总评",
    "跳绳加分项":"跳绳(加分项)"
}
var dataTermBrr = {
    "1":"第一学期",
    "2":"第二学期"
}
var gradeBrr = {
    "全部年级":"0",
    "一年级":"1",
    "二年级":"2",
    "三年级":"3",
    "四年级":"4",
    "五年级":"5",
    "六年级":"6",
    "七年级":"7",
    "八年级":"8",
    "九年级":"9"
}
//全部学生
var gradeBrrClass = {
    "一年级":"11",
    "二年级":"12",
    "三年级":"13",
    "四年级":"14",
    "五年级":"15",
    "六年级":"16",
    "七年级":"17",
    "八年级":"18",
    "九年级":"19"
}
var gradeArr = {
    "0":"全部年级",
    "1":"一年级",
    "2":"二年级",
    "3":"三年级",
    "4":"四年级",
    "5":"五年级",
    "6":"六年级",
    "7":"七年级",
    "8":"八年级",
    "9":"九年级"
}
var classBrr = {
    "1班":"1",
    "2班":"2",
    "3班":"3",
    "4班":"4",
    "5班":"5",
    "6班":"6",
    "7班":"7",
    "8班":"8",
    "9班":"9",
    "10班":"10",
    "11班":"11",
    "12班":"12",
    "13班":"13",
    "14班":"14",
    "15班":"15",
    "16班":"16",
    "17班":"17",
    "18班":"18"
}
var classArr = {
    "1":"1班",
    "2":"2班",
    "3":"3班",
    "4":"4班",
    "5":"5班",
    "6":"6班",
    "7":"7班",
    "8":"8班",
    "9":"9班",
    "10":"10班",
    "11":"11班",
    "12":"12班",
    "13":"13班",
    "14":"14班",
    "15":"15班",
    "16":"16班",
    "17":"17班",
    "18":"18班"
}

   //处理解析班级信息
var dataBrr={
	"一年级,1班":"1101",
	"一年级,2班":"1102",
	"一年级,3班":"1103",
	"一年级,4班":"1104",
	"一年级,5班":"1105",
	"一年级,6班":"1106",
	"一年级,7班":"1107",
	"一年级,8班":"1108",
	"一年级,9班":"1109",
	"一年级,10班":"1110",
    "一年级,11班":"1111",
    "一年级,12班":"1112",
    "一年级,13班":"1113",
    "一年级,14班":"1114",
    "一年级,15班":"1115",
    "一年级,16班":"1116",
    "一年级,17班":"1117",
    "一年级,18班":"1118",
    "一年级,19班":"1119",
    "一年级,20班":"1120",
	"二年级,1班":"1201",
	"二年级,2班":"1202",
	"二年级,3班":"1203",
	"二年级,4班":"1204",
	"二年级,5班":"1205",
	"二年级,6班":"1206",
	"二年级,7班":"1207",
	"二年级,8班":"1208",
	"二年级,9班":"1209",
	"二年级,10班":"1210",
    "二年级,11班":"1211",
    "二年级,12班":"1212",
    "二年级,13班":"1213",
    "二年级,14班":"1214",
    "二年级,15班":"1215",
    "二年级,16班":"1216",
    "二年级,17班":"1217",
    "二年级,18班":"1218",
    "二年级,19班":"1219",
    "二年级,20班":"1220",
	"三年级,1班":"1301",
	"三年级,2班":"1302",
	"三年级,3班":"1303",
	"三年级,4班":"1304",
	"三年级,5班":"1305",
	"三年级,6班":"1306",
	"三年级,7班":"1307",
	"三年级,8班":"1308",
	"三年级,9班":"1309",
	"三年级,10班":"1310",
    "三年级,11班":"1311",
    "三年级,12班":"1312",
    "三年级,13班":"1313",
    "三年级,14班":"1314",
    "三年级,15班":"1315",
    "三年级,16班":"1316",
    "三年级,17班":"1317",
    "三年级,18班":"1318",
    "三年级,19班":"1319",
    "三年级,20班":"1320",
	"四年级,1班":"1401",
	"四年级,2班":"1402",
	"四年级,3班":"1403",
	"四年级,4班":"1404",
	"四年级,5班":"1405",
	"四年级,6班":"1406",
	"四年级,7班":"1407",
	"四年级,8班":"1408",
	"四年级,9班":"1409",
	"四年级,10班":"1410",
    "四年级,11班":"1411",
    "四年级,12班":"1412",
    "四年级,13班":"1413",
    "四年级,14班":"1414",
    "四年级,15班":"1415",
    "四年级,16班":"1416",
    "四年级,17班":"1417",
    "四年级,18班":"1418",
    "四年级,19班":"1419",
    "四年级,20班":"1420",
	"五年级,1班":"1501",
	"五年级,2班":"1502",
	"五年级,3班":"1503",
	"五年级,4班":"1504",
	"五年级,5班":"1505",
	"五年级,6班":"1506",
	"五年级,7班":"1507",
	"五年级,8班":"1508",
	"五年级,9班":"1509",
	"五年级,10班":"1510",
    "五年级,11班":"1511",
    "五年级,12班":"1512",
    "五年级,13班":"1513",
    "五年级,14班":"1514",
    "五年级,15班":"1515",
    "五年级,16班":"1516",
    "五年级,17班":"1517",
    "五年级,18班":"1518",
    "五年级,19班":"1519",
    "五年级,20班":"1520",
	"六年级,1班":"1601",
	"六年级,2班":"1602",
	"六年级,3班":"1603",
	"六年级,4班":"1604",
	"六年级,5班":"1605",
	"六年级,6班":"1606",
	"六年级,7班":"1607",
	"六年级,8班":"1608",
	"六年级,9班":"1609",
	"六年级,10班":"1610",
    "六年级,11班":"1611",
    "六年级,12班":"16120",
    "六年级,13班":"1613",
    "六年级,14班":"1614",
    "六年级,15班":"1615",
    "六年级,16班":"1616",
    "六年级,17班":"1617",
    "六年级,18班":"1618",
    "六年级,19班":"1619",
    "六年级,20班":"1620"
}
var dataArr = {
	"1101":"一年级,1班",
	"1102":"一年级,2班",
	"1103":"一年级,3班",
	"1104":"一年级,4班",
	"1105":"一年级,5班",
	"1106":"一年级,6班",
	"1107":"一年级,7班",
	"1108":"一年级,8班",
	"1109":"一年级,9班",
	"1110":"一年级,10班",
    "1111":"一年级,11班",
    "1112":"一年级,12班",
    "1113":"一年级,13班",
    "1114":"一年级,14班",
    "1115":"一年级,15班",
    "1116":"一年级,16班",
    "1117":"一年级,17班",
    "1118":"一年级,18班",
    "1119":"一年级,19班",
    "1120":"一年级,20班",
	"1201":"二年级,1班",
	"1202":"二年级,2班",
	"1203":"二年级,3班",
	"1204":"二年级,4班",
	"1205":"二年级,5班",
	"1206":"二年级,6班",
	"1207":"二年级,7班",
	"1208":"二年级,8班",
	"1209":"二年级,9班",
	"1210":"二年级,10班",
    "1211":"二年级,11班",
    "1212":"二年级,12班",
    "1213":"二年级,13班",
    "1214":"二年级,14班",
    "1215":"二年级,15班",
    "1216":"二年级,16班",
    "1217":"二年级,17班",
    "1218":"二年级,18班",
    "1219":"二年级,19班",
    "1220":"二年级,20班",
	"1301":"三年级,1班",
	"1302":"三年级,2班",
	"1303":"三年级,3班",
	"1304":"三年级,4班",
	"1305":"三年级,5班",
	"1306":"三年级,6班",
	"1307":"三年级,7班",
	"1308":"三年级,8班",
	"1309":"三年级,9班",
	"1310":"三年级,10班",
    "1311":"三年级,11班",
    "1312":"三年级,12班",
    "1313":"三年级,13班",
    "1314":"三年级,14班",
    "1315":"三年级,15班",
    "1316":"三年级,16班",
    "1317":"三年级,17班",
    "1318":"三年级,18班",
    "1319":"三年级,19班",
    "1320":"三年级,20班",
	"1401":"四年级,1班",
	"1402":"四年级,2班",
	"1403":"四年级,3班",
	"1404":"四年级,4班",
	"1405":"四年级,5班",
	"1406":"四年级,6班",
	"1407":"四年级,7班",
	"1408":"四年级,8班",
	"1409":"四年级,9班",
	"1410":"四年级,10班",
	"1501":"五年级,1班",
	"1502":"五年级,2班",
	"1503":"五年级,3班",
	"1504":"五年级,4班",
	"1505":"五年级,5班",
	"1506":"五年级,6班",
	"1507":"五年级,7班",
	"1508":"五年级,8班",
	"1509":"五年级,9班",
	"1510":"五年级,10班",
    "1511":"五年级,11班",
    "1512":"五年级,12班",
    "1513":"五年级,13班",
    "1514":"五年级,14班",
    "1515":"五年级,15班",
    "1516":"五年级,16班",
    "1517":"五年级,17班",
    "1518":"五年级,18班",
    "1519":"五年级,19班",
    "1520":"五年级,20班",
	"1601":"六年级,1班",
	"1602":"六年级,2班",
	"1603":"六年级,3班",
	"1604":"六年级,4班",
	"1605":"六年级,5班",
	"1606":"六年级,6班",
	"1607":"六年级,7班",
	"1608":"六年级,8班",
	"1609":"六年级,9班",
	"1610":"六年级,10班",
    "1611":"六年级,11班",
    "1612":"六年级,12班",
    "1613":"六年级,13班",
    "1614":"六年级,14班",
    "1615":"六年级,15班",
    "1616":"六年级,16班",
    "1617":"六年级,17班",
    "1618":"六年级,18班",
    "1619":"六年级,19班",
    "1620":"六年级,20班"
}
var sexChange={
	"3":"",
	"1":"男",
	"2":"女"
}

var sexBrr = {
    "":"3",
    "男":"1",
    "女":"2"
}
var htmlPop=""
function showPop(){
	htmlPop='<div  style="z-index:2;background-color:#CCCCCC;filter: alpha(opacity=50);opacity: 0.5;width:100%;height:100%;position:absolute;left:0px;top:0px"></div>'
	return htmlPop;
}
var htmlHide = ""
function hidePop(){
	htmlHide='<div  style="z-index:1;background-color:#CCCCCC;filter: alpha(opacity=80);width:100%;height:100%;position:absolute;left:0px;top:0px;display:none"></div>';
	return htmlHide;
}


var product ={
    "-1":"BMI",
    '0':"50米跑",
    "1":"平衡",
    "2":"身高",
    "3":"俯卧撑",
    "4":"坐位体前屈",
    "5":"1分钟仰卧起坐",
    "6":"肺活量",
    "7":"体重",
    "8":"1分钟跳绳",
    "9":"5米*8往返跑",
    "10":"立定跳远",
    "11":"引体向上",
    "12":"800米",
    "13":"1000米",
    "14":"视力",
    "16":"总分"
}

var productArr = {
    "BMI":"-1",
    "50米跑":"0",
    "平衡":"1",
    "身高":"2",
    "俯卧撑":"3",
    "坐位体前屈":"4",
    "1分钟仰卧起坐":"5",
    "肺活量":"6",
    "体重":"7",
    "1分钟跳绳":"8",
    "5米*8往返跑":"9",
    "立定跳远":"10",
    "引体向上":"11",
    "800米":"12",
    "1000米":"13",
    "视力":"14",
    "总分":"16"
}
var NationArr = {
    "1":"汉族",
    "2":"蒙古族",
    "3":"回族",
    "4":"藏族",
    "5":"维吾尔族",
    "6":"苗族",
    "7":"彝族",
    "8":"壮族",
    "9":"布依族",
    "10":"朝鲜族",
    "11":"满族",
    "12":"侗族",
    "13":"瑶族",
    "14":"白族",
    "15":"土家族",
    "16":"哈尼族",
    "17":"哈萨克族",
    "18":"傣族",
    "19":"黎族",
    "20":"傈僳族",
    "21":"佤族",
    "22":"畲族",
    "23":"高山族",
    "24":"拉祜族",
    "25":"水族",
    "26":"东乡族",
    "27":"纳西族",
    "28":"景颇族",
    "29":"柯尔克孜族",
    "30":"土族",
    "31":"达斡尔族",
    "32":"仫佬族",
    "33":"羌族",
    "34":"布朗族",
    "35":"撒拉族",
    "36":"毛南族",
    "37":"仡佬族",
    "38":"锡伯族",
    "39":"阿昌族",
    "40":"普米族",
    "41":"塔吉克族",
    "42":"怒族",
    "43":"乌孜别克族",
    "44":"俄罗斯族",
    "45":"鄂温克族",
    "46":"德昂族",
    "47":"保安族",
    "48":"裕固族",
    "49":"京族",
    "50":"塔塔尔族",
    "51":"独龙族",
    "52":"鄂伦春族",
    "53":"赫哲族",
    "54":"门巴族",
    "55":"珞巴族",
    "56":"基诺族",
    "57":"其他",
    "58":"外国血统"
}
//成绩以及国家级
var ScoreType={
    "":"",
    "-1":"",
    "-2":"\\",
    "0":"不及格",
    "1":"及格",
    "2":"良好",
    "3":"优秀",
    "4":"满分"
}
var fatAndThin={
    "0":"偏瘦",
    "1":"正常",
    "2":"超重",
    "3":"肥胖",
    "":""
}
//地区等级
var areaType={
    "1":"差",
    "2":"下",
    "3":"中",
    "4":"良",
    "5":"优"
}

function getStuInfo(data){
    console.log("data____",data)
    if(data.is_root=="0"){
        $("#systemManageInfo").hide();
    }
    var quitHtml = "";
    quitHtml+='<div class="quit" id="quit"><div class="user_tip"><div class="img_person"></div><div class="tip_person">';
    quitHtml+='<span class="user_name">'+data.name+'</span><div><div class="img_loct"></div><span class="school_name">'+data.schoolName+'</span></div>';
    quitHtml+='</div></div><hr class="q_hr" /><div class="fn_info"><div class="q_h" id="modPass" style="cursor:pointer"><div class="img_change"></div><span>修改密码</span></div>';
    quitHtml+='<hr class="q_hr" /><div class="q_h" id="quitId" style="cursor:pointer"><div class="img_quit"></div><span>退出</span></div>';
    quitHtml+='</div></div>';
    $("body").append(quitHtml);
    var claerTime, claerTime1;
    $("#quitLogin").hover(function() {
        clearTimeout(claerTime1);
        clearTimeout(claerTime);
        if ($("#quit").css("display") != "block") {
            $("#quit").slideDown(300);
        }
    }, function(event) {
        claerTime = setTimeout(function() {
            $("#quit").slideUp(300);
        }, 500)
    });
    $("#quit").hover(function() {
        clearTimeout(claerTime);
        clearTimeout(claerTime1);
        $("#quit").css("display", "block");
    }, function() {
        claerTime1 = setTimeout(function() {
            $("#quit").slideUp('500');
        }, 500)
    })
    $("#quitId").on("click",function(){
        localStorage.removeItem("schoolName");
        localStorage.removeItem("userName");
        localStorage.removeItem("schoolId");
        localStorage.removeItem("is_root");
        window.location.href="index.html";
    })
    $("#modPass").on("click",function(){
        window.open("changepassword.html","_self");
    });

}
function gradeSort(gradeNameModel){
    var gradeModel = new Array();
    gradeNameModel = $.unique(gradeNameModel);
    for(var i=0;i<gradeNameModel.length;i++){
        gradeModel[i]=gradeBrr[gradeNameModel[i]];
    }
    gradeModel.sort(function(a,b){
        return a-b;
    })
    for(var i=0;i<gradeModel.length;i++){
        gradeNameModel[i]=gradeArr[gradeModel[i]];
    }
}
function classSort(classNameModel){
    var classModel = new Array();
    classNameModel = $.unique(classNameModel)
    for(var i=0;i<classNameModel.length;i++){
        classModel[i]=classBrr[classNameModel[i]];
    }
    classModel.sort(function(a,b){
        return a-b;
    })
    for(var i=0;i<classModel.length;i++){
        classNameModel[i]=classArr[classModel[i]];
    }
}
//冒泡处理
function stopBubble(e){
    var ev = e || window.event;
    if (ev.stopPropagation) {
        ev.stopPropagation();
    }
    else if (window.event) {//IE
        window.event.cancelBubble = true;//IE
    }

}
var isClick=false;
//消息到期提醒

function messageInfo(){
    /*if(1){
        $("#messageInfo").slideDown(300);
        $(".colse").on("click",function(){
            $("#messageInfo").slideUp(300);
        })
    }*/

    $(".colse").click(function(){
        var clickNum = localStorage.getItem("clickNum")
        clickNum++;
        localStorage.setItem("clickNum",clickNum);
        var _this = this;
        var $marginlefty = $(_this).next();
        $("#messageInfo").animate({
            right: 89+'px',
            opacity:1
        },'1',function(){

            $marginlefty.toggle(100);
            opacity:1
        });
    });

}

function headerMove(){
    var $current_nav = $("#current_nav"); //current元素（当前所在导航项)
    var current_nav_width = $current_nav.innerWidth();
    var current_nav_left = $current_nav.position().left;
    var $nav_animate_block = $("#nav_animate_block"); //动画滑块
    $nav_animate_block.css({ width:current_nav_width, left:current_nav_left });
    $("#nav_menu a").hover(function(){
        var _this = this;
        var index = $(_this).index();
        var $a_cur = $("#nav_menu").find("a").eq(index);//鼠标移动到的a元素

        //利用触发的a元素索引获取其left位置和它的宽度
        var width = $a_cur.innerWidth();
        var left = $a_cur.position().left;

        //设置动画滑块位置
        $nav_animate_block.stop().animate({
            width: width,
            left: left
        }, 300)
    }, function(){
        //鼠标离开a元素时，动画滑块返回current元素位置
        $nav_animate_block.stop().animate({
            width: current_nav_width,
            left: current_nav_left
        })
    })

}
function contractEnd(schoolName){
    var url = getURL()+"get_remind_day";
    $.ajax({
        type:"post",
        url:url,
        data:{"school":schoolName},
        success:function(data){
            if(data.header.code==200){
                if(data.data.day==""){
                    new  ModelCon("您的合同已经到期,如果您想继续使用,请您续费");
                    //css("height",175+"px")
                    $(".mod_wapper").animate({"height" : 175},0);
                    $(".isCancleOk").hide();
                    $(".isSure").off().on("click",function(){
                        $(".mod_wapper").hide();
                        $(".markHide").hide();
                        window.location.href="index.html"
                    })

                    return;
                }else{

                    var nowDate = new Date();
                    var year = nowDate.getFullYear();
                    var month = nowDate.getMonth()+1;
                    var date = nowDate.getDate();
                    var str1 = year+"-"+month+"-"+date;
                    var leftDate = 0;
                    if(isNaN(DateDiff(data.data.day,str1))){
                        //leftDate="10"
                    }else{

                        leftDate=DateDiff(data.data.day,str1);
                        if(leftDate<=30 || leftDate<="30"){
                            $(".warn").show();
                        }
                    }
                    $("#numDate").html("距离合同到期还有<b>"+leftDate+"</b>天")
                    if(DateDiff(data.data.day,str1)<=0){
                        new  ModelCon("您的合同已经到期,如果您想继续使用,请您续费");
                        $(".mod_wapper").animate({"height" : 175},0);
                        $(".isCancleOk").hide();
                        $(".isSure").off().on("click",function(){
                            $(".mod_wapper").hide();
                            $(".markHide").hide();
                            window.location.href="index.html"
                        })

                    }
                }

            }
        },error:function(){
            new  ModelCon("网络异常,请您刷新重试");
            //css("height",175+"px")
            $(".mod_wapper").animate({"height" : 175},0);
            $(".isCancleOk").hide();
            $(".isSure").off().on("click",function(){
                $(".mod_wapper").hide();
                $(".markHide").hide();
            })
        }

    })
}
function  DateDiff(sDate1,  sDate2){    //sDate1和sDate2是2006-12-18格式
    var  aDate,  oDate1,  oDate2,  iDays
    aDate  =  sDate1.split("-")
    oDate1  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0]) //转换为12-18-2006格式
    aDate  =  sDate2.split("-")
    oDate2  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])
    iDays  =  parseInt((oDate1  -  oDate2)  /  1000  /  60  /  60  /24) //把相差的毫秒数转换为天数
    return  iDays
}
function printArea(){
	$("#aPrint").on("click",function(){
		            $("#aPrint").hide();
                    $("#aPrintAll").hide();
                	$("#printChildF").hide();
                	$("#printF").hide();
                	$("#printS").hide();
                    $("#printArea").css("height","98%");
                     $("#isPrintRight").show ();
                     $("#isPrintRight").css("height","98%")
                    $("#allDiv").hide ();
                	window.print()
                	setTimeout(function(){
                	$("#printF").show();
                	$("#printS").show();
                		$("#printChildF").show();
                			$("#aPrint").show();
                        $("#aPrintAll").show ();
                        $("#isPrintRight").hide ();
                        $("#allDiv").show ();
                        $("#isPrintRight").css("height","100%")
                        $("#printArea").css("height","100%");
                	},100)
	})
}
$(document).ready(function(){

    messageInfo();

    //获取学年
    var newYear = new Date();
    var year = newYear.getFullYear();
    var month = newYear.getMonth();
    var yearArr = new Array();
    var termFirst = "第一学期";
    var termSecond = "第二学期";
    for(var i=0;i<5;i++){
        if(month>=2 && month<=7){
            yearArr.push(year-i-1+'<span style="display:-moz-inline-box; display:inline-block; width:25px;"></span>'+termSecond);
            yearArr.push(year-i-1+'<span style="display:-moz-inline-box; display:inline-block; width:25px;"></span>'+termFirst );
        }else{
            yearArr.push(year-i+'<span style="display:-moz-inline-box; display:inline-block; width:25px;"></span>'+termSecond);
            yearArr.push(year-i+'<span style="display:-moz-inline-box; display:inline-block; width:25px;"></span>'+termFirst );
        }

    };

    var yearHtml="";
    for(var i=0;i<yearArr.length;i++){
        yearHtml+='<div><span style="margin-left:20px;">'+yearArr[i]+'</span></div>'
    }
    $("#yearListId .list").html(yearHtml);
    //setInterval(function(){
       /* if(month>=7 && (year==$("#choiceYear").text())){
            $("#secondTerm").hide();
        }else{
            $("#secondTerm").show();
        }*/
    //},1)


    if(month>=2 && month<=7){
        var htmlTerm = "";
        htmlTerm+='<div class="list" >';
        htmlTerm+='<div id="secondTerm"><span>第二学期</span></div>';
        htmlTerm+='<div id="firstTerm"><span>第一学期</span></div></div>';
        $("#termListId").html(htmlTerm);
    }else{
        var htmlTerm = "";
        htmlTerm+='<div class="list" >';
        htmlTerm+='<div id="firstTerm"><span>第一学期</span></div>';
        htmlTerm+='<div id="secondTerm"><span>第二学期</span></div>';
        $("#termListId").html(htmlTerm);
    }
    setInterval(function(){
        if(month>=7 && (year==$("#choiceYear").text())){
            $("#secondTerm").hide();
        }else{
            $("#secondTerm").show();
        }
    },1)

    //系统管理里面的成绩倒入日期计算
    var yearHtmlSystem="";
    for(var i=0;i<yearArr.length;i++){
        yearHtml+='<div><span>'+yearArr[i]+'</span></div>'
    }
    $("#yearListId .t_list").html(yearHtmlSystem);
    console.log("yearList", $("#yearListId .t_list").html())

    //


})

$(function() {
	$(document).scroll(function() {
		if ($(this).scrollTop() > 82) {
			$(".s_nv").css({
				"position": "fixed",
				width: "100%",
				zIndex: 100
			});
            $('.scoll.mCustomScrollbar._mCS_1').width(156);
			$(".s_top").css("margin-top", "40px");
		} else {
			$(".s_nv").css({
				"position": "relative",
				width: "",
				zIndex: ""
			});
			$(".s_top").css("margin-top", "0");
		}
	})
})
