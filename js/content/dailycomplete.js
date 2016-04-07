/**
 * @date 2016-02-01
 * @author By Lyq
 * @content For 日常训练
 */
window.onload = function() {
    var gradeNameModel = [];
    var classNameModel = [];
    var tableHtml = ""
    var PersonHealth = function() {
        this.term = "";
        this.year = "";
        this.grade = "";
        this.classRoom = "";
        this.sex = "";

    }
    PersonHealth.prototype.getPersonListGrade = function() {

       $("#choiceGrade").html($($("#gradeListId .list div")[0]).context.innerText);
    if($.trim($("#choiceGrade").text()) == "全部年级"){
        $("#classListHtmlId").html($($("#classListHtmlId div")[0]).text());
    }
    $("#gradeId").on("click", function(e) {
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
    $("#gradeListId .list div").each(function(index, val) {
        return function() {
            $($("#gradeListId .list div")[index]).click(function() {
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
                for (var j = 0; j < classNameModel[classIdNum+1].length; j++) {
                    classHtml += '<div><span>' + classNameModel[classIdNum+1][j] + '</span></div>';
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
    PersonHealth.prototype.getPersonListClass = function() {
       if($.trim($("#choiceGrade").text()) == "全部年级"){
        $("#classListHtmlId").html("全部班级");

        $("#choiceClass").html("全部班级");
    }else{

        $("#choiceClass").html($($("#classListId .list div")[0]).context.innerText);
    }

    $("#classId").on("click", function(e) {
        if ($("#classListId").css("display") != "block") {
            $("#classListId").slideDown(500);
            $("#classId img").attr("src", "img/moreup_gray.png");
        } else {
            $("#classListId").slideUp(500);
            $("#classId img").attr("src", "img/moredown_gray.png");
        }
        stopBubble(e)
       // event.stopPropagation();
        $("#classListId .list div").each(function(index, val) {
            return function() {
                $($("#classListId .list div")[index]).click(function() {
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
    function classAndGrade(data) {

        if(!localStorage.getItem("userName")){
            window.location.href="index.html"
        }
        //鼠标滑动动画
        headerMove();
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
    var url = getURL() + "get_user_class";
    var school=localStorage.getItem("schoolName");
    var name = localStorage.getItem("userName")
    var is_root = localStorage.getItem("is_root")
    var dataSchoolInfo ={"name":name,"schoolName":school,"is_root":is_root};
    var data = {
        "account": name
    };

    getStuInfo(dataSchoolInfo)
    $.ajax({
        data: data,
        type: "post",
        url: url,
        success: function (dataRes) {
            if(dataRes.header.code=="200"){

                if($.trim(dataRes.data.user_class[0])!=""){
                    classAndGrade(dataRes.data.user_class);
                    //alert("获取数据失败")
                }else {
                    // new Notice("获取数据失败");
                    new ModelCon("获取数据失败，请刷新重试");
                    $(".isCancleOk").hide();
                    $(".isSure").off().on("click", function () {
                        window.location.href = "dailytraining.html";
                    })
                    return;
                }
                var detail = new PersonHealth();
                detail.getPersonListGrade();
                detail.getPersonListClass();
                var grade = $("#choiceGrade").text();
                var classRoom = $("#choiceClass").text();
                var classId="";

                if($.trim(grade)=="全部年级" && $.trim(classRoom)=="全部班级"){
                    classId="";

                }
                if($.trim(grade)!="全部年级" && $.trim(classRoom)=="全部班级"){
                    classId = gradeBrrClass[$.trim(grade)];
                }else{
                    classId = grade + "," + classRoom;

                    classId = dataBrr[classId];
                }


                new Daily(document.getElementById("day_chart"),classId);

                /*var comp = $("#complate")
                 console.log(comp)
                 if(comp=="undefined%"){
                 $("#complate").html("暂无数据")
                 }*/
                $("#checkDetail").on("click",function(){
                    var grade = $("#choiceGrade").text();
                    var classRoom = $("#choiceClass").text();
                    var classId="";

                    if($.trim(grade)=="全部年级" && $.trim(classRoom)=="全部班级"){
                        classId="";

                    }
                    if($.trim(grade)!="全部年级" && $.trim(classRoom)=="全部班级"){
                        classId = gradeBrrClass[$.trim(grade)];
                    }else{
                        classId = grade + "," + classRoom;

                        classId = dataBrr[classId];
                    }
                    new Daily(document.getElementById("day_chart"),classId);
                });
                $(document).keydown(function(e){
	if (!e) {
    	     e = window.event; 
    	    }
    if ((e.keyCode || e.which) == 13) {
        var grade = $("#choiceGrade").text();
        var classRoom = $("#choiceClass").text();
        var classId="";

        if($.trim(grade)=="全部年级" && $.trim(classRoom)=="全部班级"){
            classId="";

        }
        if($.trim(grade)!="全部年级" && $.trim(classRoom)=="全部班级"){
            classId = gradeBrrClass[$.trim(grade)];
        }else{
            classId = grade + "," + classRoom;

            classId = dataBrr[classId];
        }
                    new Daily(document.getElementById("day_chart"),classId);
                    console.log("copm111::",$("#complate").html())
    }
   
})
            }else{
                new  ModelCon("获取数据失败，请刷新重试");
                $(".isCancleOk").hide();
                $(".isSure").off().on("click",function(){
                    $(".isCancleOk").hide();
                    $(".mod_wapper").hide();
                    window.location.href = "dailytraining.html";

                })
                return;
            }




        }
    });
    ////日期时间的计算
    function getDuringDate(num,num1){
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        var date = date.getDate();
        var dataFort = [];
        var bigMonth = [31,29,31,30,31,30,31,31,30,31,30,31];
        var smallMonth = [31,28,31,30,31,30,31,31,30,31,30,31]
        var date7;
        //7天,30天,半年,1年
        //7天的数据
        if(num==num1){
            var num = 0;
           for(var i=0;i<num1;i++){
               date7 = date-num;
               if(date7<=0){
                  month = month-1;
                   if(month<=0){
                       year=year-1;
                       month = 12;
                   }
                   if(((year % 4)==0) && ((year % 100)!=0) || ((year % 400)==0)){
                       date7 = bigMonth[month-1];
                   }else{
                       date7 = smallMonth[month-1];
                   }

                   var strDate = year+"-"+month+"-"+date7;
                   dataFort.push(strDate);
                   date = date7;
                   num = 0;
               }else{

                   var strDate = year+"-"+month+"-"+date7;
                   dataFort.push(strDate);
               }
               num++;
           }

        }
        console.log(dataFort)
        return dataFort;
        
    }




    function Daily(ele,classId) {
		this.ele = ele;
		this.sbool = false;
		this.smooth = true;
		this.data = [];
		this.arr = [];
		this.arr_x = [];
        this.class_id = classId;
		this.init();
		this.something();
		
	}

	Daily.prototype = {
		constructor: Daily,

		init: function() {
			this.days_one();
		},
		ops: function() {
			var that=this;
			var opt = {
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						lineStyle: {
							color: "#ff7247"
						}
					},
					formatter: "<div class='day_tip'><div class='day_sixh'>{b0}</div><div class='day_sixc'>完成率</div><div class='day_ty' id='complate'>{c0}%</div></div>"
				},
				grid: {
					top: "6",
					left: '6',
					right: '6',
					bottom: '5',
					borderColor: "#f0f0f0",
					containLabel: true
				},
				xAxis: [{
					type: 'category',
					boundaryGap: false,
					axisLabel: {
						show: that.sbool,
						interval: that.fsyle || null,
						textStyle: {
							color: "#767676"
						},
						formatter: function(value,key){
							if (key != 0) {
							    value=value.slice(5);
							    return value;
							}else{
								return value;
							}
						}
					},
					axisLine: {
						show: true,
						lineStyle: {
							color: "#f0f0f0",
							type: 'solid',
							opacity: 1
						}
					},
					data: that.arr_x,
					axisTick: {
						show: false
					}
				}],
				yAxis: [{
					type: 'value',
					splitNumber: 10,
					axisLabel: {
						show: true,
						interval: 1,
						inside: true,
						formatter: '{value}%',
						textStyle: {
							color: "#adadad"
						}
					},
					max: 100,
					axisTick: {
						show: false
					},
					axisLine: {
						lineStyle: {
							color: "#e6e6e6",
							type: 'solid',
							opacity: 0.5
						}
					},
					splitLine: {
						show: true,
						lineStyle: {
							type: 'solid',
							color: "#f0f0f0"
						}
					}
				}],
				series: [{
					name: '训练活跃度',
					type: 'line',
					symbolSize: 6,
					lineStyle: {
						normal: {
							color: "#ff7247",
							width: 2
						}
					},
					smooth: that.smooth,
					stack: '总量',
					itemStyle:{normal:{borderColor:"#ff7247",borderWidth:2,opacity:1}} ,
					label: {
						normal: {
							show: false,
							position: 'top'
						}
					},
					areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    	{
                        offset: 0,
                        color: 'rgba(255, 76, 35, 0.50)'
                    }, 
                    {
                        offset: 1,
                        color: 'rgba(255, 168, 0, 0.50)'
                    }
                    ])
                }
            },

					data: that.data
				}]
			}

			return opt;
		},
		arr_eg: function(arr) {
			for (var i = 0; i < arr.length; i++) {
				var day = new Date(arr[i]);
				arr[i] = day.getFullYear() + "年" + (day.getMonth() + 1) + "月" + day.getDate() + "日";
			}
			arr[0] = {
				'value': arr[0],
				'textStyle': {
					'align': 'left'
				}
			};
			arr[arr.length - 1] = {
				'value': arr[arr.length - 1],
				'textStyle': {
					'align': 'right'
				}
			};
            if(arr.length==1){
                arr=["暂无数据"]
            }
             console.log(arr.length)
			return arr;
		},
		format: function (a,n){
			function band(i,r){
				if(i%(a) == 0) {
					return r;
				}
				if(i == n){
					return r;
				}
			};
			return band;
		},
		get_ajax: function (class_id,days){
			var that=this;
            var schoolIdName = localStorage.getItem("schoolId");
			 var data1={
			 	"class_id":class_id,"days":days,"school_id":schoolIdName
			 }
			$.ajax({
			data: data1,
             type: "post",
             url: getURL()+"get_daily_training_rate",
            success: function(dataRes) {
                console.log("data:",dataRes)
				if (dataRes.header.code == 200) {
                    console.log("rate:",dataRes)
                    if(dataRes.data.training_rate.length==0){
                        //没有训练数据的时候
                        $(".no_data").show();
                        if(days==7){
                            that.key_arr = getDuringDate(7,7);
                            console.log("error::",that.key_arr.length)
                            that.data = [70,90,20,60,30,80,10];
                            that.arr_x = that.arr_eg(that.key_arr);
                            that.chart = echarts.init(that.ele);
                            /*that.sbool = true;
                             that.smooth = false;*/
                            that.fsyle = null;
                            that.chart.setOption(that.ops());
                        }else if(days==30){
                            that.key_arr = getDuringDate(180,180);
                            //this.key_arr = ["2015-11-11","2015-11-12","2015-11-13","2015-11-14","2015-11-15","2015-11-16","2015-11-17","2015-11-18","2015-11-19","2015-11-20","2015-11-21","2015-11-22","2015-11-23","2015-11-24","2015-11-25","2015-11-26","2015-11-27","2015-11-28","2015-11-29","2015-11-30","2015-12-01","2015-12-02","2015-12-03","2015-12-04","2015-12-05","2015-12-06","2015-12-07","2015-12-08","2015-12-09","2015-12-10","2015-12-11"];
                            that.data = [70,90,100,100,90,70,80,100,80,50,60,60,70,80,90,100,100,100,90,80,80,50,80,100,90,100,80,90,100,100,100];
                            that.arr_x = that.arr_eg(that.key_arr);
                            that.chart = echarts.init(that.ele);
                            that.fsyle = that.format(6,31);
                            that.chart.setOption(that.ops())
                        }else{
                            that.key_arr = getDuringDate(180,180);
                            //this.key_arr = ["2015-11-11","2015-11-12","2015-11-13","2015-11-14","2015-11-15","2015-11-16","2015-11-17","2015-11-18","2015-11-19","2015-11-20","2015-11-21","2015-11-22","2015-11-23","2015-11-24","2015-11-25","2015-11-26","2015-11-27","2015-11-28","2015-11-29","2015-11-30","2015-12-01","2015-12-02","2015-12-03","2015-12-04","2015-12-05","2015-12-06","2015-12-07","2015-12-08","2015-12-09","2015-12-10","2015-12-11"];
                            that.data = [70,90,100,100,90,70,80,100,80,50,60,60,70,80,90,100,100,100,90,80,80,50,80,100,90,100,80,90,100,100,100];
                            that.arr_x = that.arr_eg(that.key_arr);
                            that.chart = echarts.init(that.ele);
                            that.fsyle = that.format(6,31);
                            that.chart.setOption(that.ops())
                        }

                    }else{
                        $(".no_data").hide();
                        that.key_arr=[]; that.value_arr=[];
                        for(var i in dataRes.data.training_rate){
                            that.key_arr[i]=dataRes.data.training_rate[i].ds;
                            that.value_arr[i]=result.data.training_rate[i].rate*100;
                        }
                        that.chart = echarts.init(that.ele);
                        that.data = that.value_arr;
                        if(that.data.length > '8'){
                            that.a = parseInt(that.data.length/4);
                        }else{
                            that.a = 1;
                        };
                        that.n = that.data.length-1;
                        that.fsyle = that.format(that.a,that.n);
                        that.arr_x = that.arr_eg(that.key_arr);
                        that.chart.setOption(that.ops());
                    }
				}else {
                    new  ModelCon("数据获取失败,请刷新重试");
                   $(".isCancleOk").hide();
                   $(".isSure").off().on("click",function(){
                    $(".mod_wapper").hide();
                    $(".markHide").hide();
                    window.location.href="dailytraining.html"
                })
                return;
				}
			},error:function(){
				new  ModelCon("网络异常，请检查您的网络");
                $(".isCancleOk").hide();
                $(".isSure").off().on("click",function(){
                    $(".mod_wapper").hide();
                    $(".markHide").hide();
                    window.location.href="dailytraining.html"
                })
                return;
			}
			 
		}
			)},
		something: function(){
			var that=this;
            $(".select_group div").each(function(index){
                return function(){
                    if($($(".select_group div")[index]).hasClass("over")){
                        switch (index){
                            case 0:
                                that.days_one();
                                break;
                            case 1:
                                that.days_two();
                                break;
                            case 2:
                                that.days_three();
                                break;
                            case 3:
                                that.days_four();
                                break;
                            case 4:
                                that.days_five();
                                break;
                            default:
                                new Notice("数据出错，请联系管理员！")
                               // alert("数据出错，请联系管理员！")
                                break;
                        }
                    }
                }(index)
            })
			$("div",".select_group").each(function(i,r){

					$(this).click(function(){
						$(this).removeClass("def").addClass("over").siblings("div").removeClass("over").addClass("def");
						switch (i){
							case 0:
							    that.days_one();
								break;
							case 1:
							    that.days_two();
								break;
							case 2:
							    that.days_three();
								break;
							case 3:
							    that.days_four();
								break;
							case 4:
							    that.days_five();
								break;
							default:
                                new Notice("数据出错，请联系管理员！")
							   // alert("数据出错，请联系管理员！")
								break;
						}
					})
				})
		},

		days_one: function(){
            //如果没有数据
            /*this.days= 7;
            this.key_arr = getDuringDate(7,7);
            this.data = [70,90,20,60,30,80,10];
            this.arr_x = this.arr_eg(this.key_arr);
            this.chart = echarts.init(this.ele);
            this.sbool = true;
            this.smooth = false;
            this.fsyle = null;
            this.chart.setOption(this.ops());*/


            //如果有数据
            this.days= 7;
            this.get_ajax(this.class_id,this.days);
            this.sbool = true;
            this.smooth = false;
			/*this.days= 7;
		//this.get_ajax(this.class_id,this.days);
			this.key_arr = ["2015-11-11","2015-11-12","2015-11-13","2015-11-14","2015-11-15","2015-11-16","2015-11-17"];
            this.data = [70,90,100,100,90,70,80];
            this.arr_x = this.arr_eg(this.key_arr);
            this.chart = echarts.init(this.ele);
            //上面是假数据
			this.sbool = true;
			this.smooth = false;
            setInterval(function(){
                if("undefined%" == $(".day_ty").html()){
                    $(".day_ty").html("暂无数据")
                }
            },100)*/




          // console.log(getDuringDate(7))
         setInterval(function(){
             if("undefined%" == $(".day_ty").html()){
                $(".day_ty").html("暂无数据")
             }
         },100)

		},
		days_two: function(){
			//以前的数据
			/*this.days=30;
			this.get_ajax(this.class_id,this.days);
			this.sbool = true;
			this.smooth = true;*/
			this.days=30;
           /* this.key_arr = getDuringDate(31,31);
			//this.key_arr = ["2015-11-11","2015-11-12","2015-11-13","2015-11-14","2015-11-15","2015-11-16","2015-11-17","2015-11-18","2015-11-19","2015-11-20","2015-11-21","2015-11-22","2015-11-23","2015-11-24","2015-11-25","2015-11-26","2015-11-27","2015-11-28","2015-11-29","2015-11-30","2015-12-01","2015-12-02","2015-12-03","2015-12-04","2015-12-05","2015-12-06","2015-12-07","2015-12-08","2015-12-09","2015-12-10","2015-12-11"];
            this.data = [70,90,100,100,90,70,80,58,100,0,60,60,70,80,90,100,100,100,90,80,80,50,80,100,90,100,80,90,100,30,70];
            this.arr_x = this.arr_eg(this.key_arr);
            this.chart = echarts.init(this.ele);
//			this.get_ajax(this.class_id,this.days);
			this.sbool = true;
			this.smooth = true;
			this.fsyle = this.format(6,31);
			this.chart.setOption(this.ops())*/
            this.get_ajax(this.class_id,this.days);
            this.sbool = true;
            this.smooth = false;
            setInterval(function(){
                if("undefined%" == $(".day_ty").html()){
                    $(".day_ty").html("暂无数据")
                }
            },100)
		},
		days_three: function(){
			this.days= 90;
			/*this.get_ajax(this.class_id,this.days);
			this.sbool = true;
			this.smooth = true;*/
           /* this.key_arr = getDuringDate(90,90);
			//this.key_arr = ["2015-11-11","2015-11-12","2015-11-13","2015-11-14","2015-11-15","2015-11-16","2015-11-17","2015-11-18","2015-11-19","2015-11-20","2015-11-21","2015-11-22","2015-11-23","2015-11-24","2015-11-25","2015-11-26","2015-11-27","2015-11-28","2015-11-29","2015-11-30","2015-12-01","2015-12-02","2015-12-03","2015-12-04","2015-12-05","2015-12-06","2015-12-07","2015-12-08","2015-12-09","2015-12-10","2015-12-11"];
            this.data = [70,90,100,100,90,70,80,58,100,40,70,90,100,100,90,70,80,58,100,40,70,90,100,100,90,70,80,58,100,50,70,90,10,10,90,70,80,58,100,50,70,90,100,100,90,70,80,58,100,60,70,90,100,100,90,70,80,58,100,60,70,90,100,100,90,70,80,58,100,70,70,90,100,100,90,70,80,58,100,80,70,90,100,100,90,70,80,58,100,80];
            this.arr_x = this.arr_eg(this.key_arr);
            this.chart = echarts.init(this.ele);
//			this.get_ajax(this.class_id,this.days);
			this.sbool = true;
			this.smooth = true;
			this.fsyle = this.format(14,90);
			this.chart.setOption(this.ops())*/
            this.get_ajax(this.class_id,this.days);
            this.sbool = true;
            this.smooth = false;
            setInterval(function(){
                if("undefined%" == $(".day_ty").html()){
                    $(".day_ty").html("暂无数据")
                }
            },100)
		},
		days_four: function(){
			this.days= 180;
			/*this.get_ajax(this.class_id,this.days);
			this.sbool = true;
			this.smooth = true;*/
          /*  this.key_arr = getDuringDate(180,180);
			//this.key_arr = ["2015-11-11","2015-11-12","2015-11-13","2015-11-14","2015-11-15","2015-11-16","2015-11-17","2015-11-18","2015-11-19","2015-11-20","2015-11-21","2015-11-22","2015-11-23","2015-11-24","2015-11-25","2015-11-26","2015-11-27","2015-11-28","2015-11-29","2015-11-30","2015-12-01","2015-12-02","2015-12-03","2015-12-04","2015-12-05","2015-12-06","2015-12-07","2015-12-08","2015-12-09","2015-12-10","2015-12-11"];
            this.data = [70,90,100,100,90,70,80,100,80,50,60,60,70,80,90,100,100,100,90,80,80,50,80,100,90,100,80,90,100,100,100];
            this.arr_x = this.arr_eg(this.key_arr);
            this.chart = echarts.init(this.ele);
//			this.get_ajax(this.class_id,this.days);
			this.sbool = true;
			this.smooth = true;
			this.fsyle = this.format(6,31);
			this.chart.setOption(this.ops())*/
            this.get_ajax(this.class_id,this.days);
            this.sbool = true;
            this.smooth = false;
            setInterval(function(){
                if("undefined%" == $(".day_ty").html()){
                    $(".day_ty").html("暂无数据")
                }
            },100)
		},
		days_five: function(){
			this.days= 365;
			/*this.get_ajax(this.class_id,this.days);
			this.sbool = true;
			this.smooth = true;*/
			/*this.key_arr = ["2015-11-11","2015-11-12","2015-11-13","2015-11-14","2015-11-15","2015-11-16","2015-11-17","2015-11-18","2015-11-19","2015-11-20","2015-11-21","2015-11-22","2015-11-23","2015-11-24","2015-11-25","2015-11-26","2015-11-27","2015-11-28","2015-11-29","2015-11-30","2015-12-01","2015-12-02","2015-12-03","2015-12-04","2015-12-05","2015-12-06","2015-12-07","2015-12-08","2015-12-09","2015-12-10","2015-12-11"];
            this.data = [70,90,100,100,90,70,80,100,80,50,60,60,70,80,90,100,100,100,90,80,80,50,80,100,90,100,80,90,100,100,100];
            this.arr_x = this.arr_eg(this.key_arr);
            this.chart = echarts.init(this.ele);
//			this.get_ajax(this.class_id,this.days);
			this.sbool = true;
			this.smooth = true;
			this.fsyle = this.format(6,31);
			this.chart.setOption(this.ops())*/

            this.get_ajax(this.class_id,this.days);
            this.sbool = true;
            this.smooth = false;
            setInterval(function(){
                if("undefined%" == $(".day_ty").html()){
                    $(".day_ty").html("暂无数据")
                }
            },100)

		}

	}

}