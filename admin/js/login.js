/**
 * @author By Lyq
 * @date By 2016-01-04
 * @content for 登录！前端验证！
 * */
//前端验证成功后登录
function submitForm(){
	var userName=document.getElementById("userName").value;
	var password=document.getElementById("password").value;
	var code=document.getElementById("authcode").value;
	var ma=document.getElementById("yz").innerText;
	if(userName==""||userName==null){
		alert("请输入用户名！");
		return false;
	}
	if(password==""||password==null){
		alert("请输入密码！");
		return false;
	}
	if(code==""||code==null){
		alert("请输入验证码！");
		return false;
	}
	if(code!=ma){
		alert("请确保输入正确的验证码！");
		return false;
	}
	if(userName=="admin"&&password=="poo111111"){
		document.getElementById("msg").innerHTML="正在登录，请稍候......";
	    document.getElementById("msg").style.display="block";
	    setTimeout(function(){
	    	window.location.href="main.html";
	    },300)
	}else{
		alert("用户名或密码错！");
	}
//	document.getElementById("msg").innerHTML="正在登录，请稍候......";
//	document.getElementById("msg").style.display="block";
//	var login_data={"user":userName,"password":password};
//	$.post("", login_data, function(data) {
//					if (data.header.code == 200) {
//						if (data.data.result == "0") {
//							document.getElementById("msg").innerHTML="正在登录，请稍候......";
//			                window.location.href="main.html";
//						} else {
//							Message('验证失败!');
//						}
//					} else {
//						alert(data.header.msg)
//					}
//				}, 'json');
	return false;
}
//自制验证码
function refresh(){
					var char=[0,1,2,3,4,5,6,7,8,9,'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z','A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
								var str = "", str2 = "";
				                var num = [], strs2 = [], strs = [];
				                var i = 0;
				
				               for (i = 0; i < 3; i++) {
				                   num.push(parseInt(Math.random() * 255));
				                   }
				              for (i = 0; i < num.length; i++) {
				                   strs.push(num[i].toString(16));
				                   strs2.push((255 - num[i]).toString(16))
				                  }
				             for (i = 0; i < strs.length; i++) {
				               str += strs[i];
				               str2 += strs2[i];
				                  }
				             var str="<span style='color: #"+str+";'>"+char[Math.floor(Math.random()*34)]+"</span><span style='color: #"+str2+";'>"+char[Math.floor(Math.random()*34)]+"</span><span style='color: #"+str+";'>"+char[Math.floor(Math.random()*34)]+"</span><span style='color: #"+str2+";'>"+char[Math.floor(Math.random()*34)]+"</span>"
				             document.getElementById("yz").innerHTML=str;
				}
window.onload=function(){
	refresh();
}
