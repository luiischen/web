/**
 * @author By Lyq
 * @date By 2016-01-26
 * @content for 自定义命名空间&&配置接口文件
 */
if(!window.linpoo){
	window.linpoo={};
	window.linpoo.src=null;
	window.linpoo.ele=null;
	window.linpoo.boon=[];
	window.linpoo.addD={};
	window.linpoo.herf={"area":{"province":"http://csh.linpoo.cn:3000/get_province","city":"http://csh.linpoo.cn:3000/get_city","district":"http://csh.linpoo.cn:3000/get_district"},
 "school":{"school":"http://csh.linpoo.cn:3000/get_school","addSchool":"http://csh.linpoo.cn:3000/add_school","delSchool":"http://csh.linpoo.cn:3000/del_school","editSchool":"http://csh.linpoo.cn:3000/mod_school"},
 "grade":{"grade":"http://csh.linpoo.cn:3000/get_grade","addGrade":"http://csh.linpoo.cn:3000/add_grade","delGrade":"http://csh.linpoo.cn:3000/del_grade"},
 "classR":{"classR":"http://csh.linpoo.cn:3000/get_class","addClassR":"http://csh.linpoo.cn:3000/add_class","delClassR":"http://csh.linpoo.cn:3000/del_class"},
 "contract":{"contract":"http://csh.linpoo.cn:3000/get_contract","addContract":"http://csh.linpoo.cn:3000/add_contract","delContract":"http://csh.linpoo.cn:3000/del_contract","editContract":"http://csh.linpoo.cn:3000/mod_contract","resetC":"http://csh.linpoo.cn:3000/reset_default_password"},
 "health":{"health":"http://csh.linpoo.cn:3000/get_health_item","addHealth":"http://csh.linpoo.cn:3000/add_health_item","delHealth":"http://csh.linpoo.cn:3000/del_health_item"},
 "sport":{"sport":"http://csh.linpoo.cn:3000/get_sport_item","addSport":"http://csh.linpoo.cn:3000/add_sport_item","delSport":"http://csh.linpoo.cn:3000/del_sport_item","editSport":"http://csh.linpoo.cn:3000/mod_sport_item"},
 "level":{"level":"http://csh.linpoo.cn:3000/get_score_level","addLevel":"http://csh.linpoo.cn:3000/add_score_level","delLevel":"http://csh.linpoo.cn:3000/del_score_level","editLevel":"http://csh.linpoo.cn:3000/mod_score_level"}
 };
}
//$(function(){
//	$.ajax({
//		type:"get",
//		url:"js/config.json",
//		async:false,
//		success:function(data){
//			window.linpoo.herf=eval('('+data+')');
//		}
//	});
//})
	
