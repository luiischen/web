/**
 * @author By lizhihu
 * @date By 2016-01-23
 */
function hideList(){
	 $(".inputList").slideUp(300);
}
var gradeNameModel = [];
var classNameModel = []
var PersonHealth = function(){
  this.term = "";
  this.year = "";
  this.grade = "";
  this.productName = "";
}
PersonHealth.prototype.getPersonListYear = function(){
	$("#choiceYear").html($($("#yearListId .list div")[0]).context.innerText);
	//学年
	$("#yearId").on("click",function(e){
		 hideList();
		if($("#yearListId").css("display")!="block"){
			$("#yearListId").slideDown(300);
			$("#yearId img").attr("src", "img/moreup_gray.png");
		}else{
			$("#yearListId").slideUp(300);
			$("#yearId img").attr("src", "img/moredown_gray.png");
		}
        stopBubble(e)
		//event.stopPropagation();
	});
	$("#yearListId .list div").each(function(index,val){
		return function(){
			$($("#yearListId .list div")[index]).click(function(){
				var _this = this;
				$("#choiceYear").html($(_this).context.innerText);
				$("#yearListId").slideUp(300);
				$("#yearId img").attr("src", "img/moredown_gray.png");
			})
		}(index)
		
	})
	//点击现在
	$("#nowYear").click(function(){
		$("#choiceYear").html($($("#yearListId .list div")[0]).context.innerText);
		$("#yearListId").slideUp(300);
		$("#yearId img").attr("src", "img/moredown_gray.png");
	})
	$(document).click(function(event){
		$("#yearListId").slideUp(300);
		$("#yearId img").attr("src", "img/moredown_gray.png");
	})
};
PersonHealth.prototype.getPersonListTerm = function(){
	$("#choiceTerm").html($($("#termListId .list div")[0]).context.innerText);
	$("#termId").on("click",function(e){
		 hideList();
		if($("#termListId").css("display")!="block"){
			$("#termListId").slideDown(300);
			$("#termId img").attr("src", "img/moreup_gray.png");
		}else{
			$("#termListId").slideUp(300);
			$("#termId img").attr("src", "img/moredown_gray.png");
		}
        stopBubble(e)
		//event.stopPropagation();
	})
	//选择学期
	$("#termListId .list div").each(function(index,val){
		return function(){
			$($("#termListId .list div")[index]).click(function(){
				var _this = this;
				$("#choiceTerm").html($(_this).context.innerText);
				
				$("#termListId").slideUp(300);
				$("#termId img").attr("src", "img/moredown_gray.png");
			})
		}(index)
		
	})
	$(document).click(function(event){
		$("#termListId").slideUp(300);
		$("#termId img").attr("src", "img/moredown_gray.png");
	})
}
PersonHealth.prototype.getPersonListGrade = function(){
	$("#choiceGrade").html($($("#gradeListId .list div")[0]).context.innerText);
	getProjectItem(gradeBrr[$($("#gradeListId .list div")[0]).context.innerText]);
	console.log("rank1",gradeBrr[$($("#gradeListId .list div")[0]).context.innerText])
	$("#gradeId").on("click",function(e){
		 hideList();
		if($("#gradeListId").css("display")!="block"){
			$("#gradeListId").slideDown(300);
			$("#gradeId img").attr("src", "img/moreup_gray.png");
		}else{
			$("#gradeListId").slideUp(300);
			$("#gradeId img").attr("src", "img/moredown_gray.png");
		}
        stopBubble(e)
		//event.stopPropagation();
	})
	//选择学期
	$("#gradeListId .list div").each(function(index,val){
		return function(){
			$($("#gradeListId .list div")[index]).click(function(){
				var _this = this;
				$("#choiceGrade").html($(_this).context.innerText);
				$("#gradeListId").slideUp(300);
				$("#gradeId img").attr("src", "img/moredown_gray.png");
				getProjectItem(gradeBrr[$(_this).context.innerText])
			})
		}(index)

	})
	$(document).click(function(event){
		$("#gradeListId").slideUp(300);
		$("#gradeId img").attr("src", "img/moredown_gray.png");
	})
}
//项目
PersonHealth.prototype.getPersonListProduct = function(){
	//$("#choiceProduct").html($($("#productListId .list div")[0]).context.innerText);
	$("#productId").on("click",function(e){
		 hideList();
		if($("#productListId").css("display")!="block"){
			$("#productListId").slideDown(300);
			$("#productId img").attr("src", "img/moreup_gray.png");
			$("#productListId .list div").each(function(index,val){
				return function(){
					$($("#productListId .list div")[index]).click(function(){
						var _this = this;
						$("#choiceProduct").html($(_this).context.innerText);
						$("#productListId").slideUp(300);
						$("#productId img").attr("src", "img/moredown_gray.png");
					})
				}(index)

			})
		}else{
			$("#productListId").slideUp(300);
			$("#productId img").attr("src", "img/moredown_gray.png");
		}
        stopBubble(e)
		//event.stopPropagation();
	})
	//选择项目

	$(document).click(function(event){
		$("#productListId").slideUp(300);
		$("#productId img").attr("src", "img/moredown_gray.png");
	})
}
PersonHealth.prototype.bindEvent = function(){
	var claerTime,claerTime1;
	$(".biaoNow").hover(function(){
		clearTimeout(claerTime1);
		clearTimeout(claerTime);
		if($(".biaoList").css("display")!="block"){
			$(".biaoList").slideDown('500');
			$($(".biaoNow").find("img")[0]).attr("src","img/moreup_gray.png");
		}
	},function(event){
		claerTime =  setTimeout(function(){
			$(".biaoList").slideUp('500');
			$($(".biaoNow").find("img")[0]).attr("src","img/moredown_gray.png");
		},500)
		
	});
	$(".biaoList").hover(function(){
		clearTimeout(claerTime);
		clearTimeout(claerTime1);
		$(".biaoList").css("display","block");
		},function(){
			claerTime1 =  setTimeout(function(){
				$(".biaoList").slideUp('500');
				$($(".biaoNow").find("img")[0]).attr("src","img/moredown_gray.png");
			},500)
		})

}
PersonHealth.prototype.defalutData = function(){
	      this.year = $("#choiceYear").text();
		  this.grade = $("#choiceGrade").text();
          this.productName = $("#choiceProduct").text()
          var product = productArr[this.productName];
          var gradeName = gradeBrr[this.grade];

         $("#title").html(this.year+"学年"+this.grade+this.productName+"成绩排行榜");

// 2016 1 11有数据
	var school_id = localStorage.getItem("schoolId");
    var data1 = {
        "year": this.year,
        "item_id":product,
        "grade":gradeName,
		"school_id":school_id
    };
    $.ajax({
        data: data1,
        type: "post",
        url: getURL()+"grade_sport_item_rank",
        success: function(dataRes) {
            console.log(dataRes)
            if(dataRes.header.code=="200"){
                var htmlRank = "";
                htmlRank+='<tr><th>排行</th><th>班级</th><th>平均分</th><th>个人最高</th></tr>';
                if(dataRes.data.grade_sport_item_rank.length>0){
                    $("#gradeRankNoData").hide();
                    for(var i=0;i<dataRes.data.grade_sport_item_rank.length;i++){
                        var gradeAndClass = dataArr[dataRes.data.grade_sport_item_rank[i].class_id].split(",").join("");
                        var j=i+1;
                        htmlRank+='<tr><td>'+j+'</td><td>'+gradeAndClass+'</td><td>'+dataRes.data.grade_sport_item_rank[i].avg.toFixed(2)+'</td><td>'+dataRes.data.grade_sport_item_rank[i].max.toFixed(2)+'</td></tr>';
                    }
                    $("#gradeRank").html(htmlRank)
                }else{
                    $("#gradeRank").html(htmlRank)
                    $("#gradeRankNoData").show();
                }

            }else{
                 new  ModelCon("数据获取失败,请刷新重试");
                $(".isCancleOk").hide();
                $(".isSure").off().on("click",function(){
                    $(".mod_wapper").hide();
                    $(".markHide").hide();
                   window.location.href="graderank.html"
                })
                return;
            }
        },error:function(){
        	  new  ModelCon("网络异常，请检查您的网络");
                $(".isCancleOk").hide();
                $(".isSure").off().on("click",function(){
                    $(".mod_wapper").hide();
                    $(".markHide").hide();
                    window.location.href="graderank.html"
                })
                return;
        }
    });
}
PersonHealth.prototype.getAllData = function(){
	
	var _this = this;
	_this.defalutData();
	$("#gradeRankCheck").on("click",function(){
		_this.defalutData();
	})
	$(document).keydown(function(e){
	if (!e) {
    	     e = window.event; 
    	    }
    if ((e.keyCode || e.which) == 13) {
    	 _this.defalutData();
    }
   
})
	/*$("#aPrint").on("click",function(){
                	setTimeout(function(){
                		$("#printArea").printArea();
                	},400)
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
}
function getProjectItem(grade){
	var url = getURL() + "get_grade_sport_item";
	$.ajax({
		data:{"grade":grade},
		type:"post",
		url:url,
		success:function(data){
			if(data.header.code=="200"){
				var htmlItem = "";
				for(var i=0;i<data.data.sport_item.length;i++){
					if(product[data.data.sport_item[i]]=="身高" ||product[data.data.sport_item[i]]=="体重"){
						continue;
					}
					else{
						htmlItem+='<div><span>'+product[data.data.sport_item[i]]+'</span></div>';
					}

				}
				$("#productListId .list").html(htmlItem)
				$("#choiceProduct").html($($("#productListId .list div")[0]).context.innerText)
			}else{
				new  ModelCon("数据获取失败,请刷新重试");
				$(".isCancleOk").hide();
				$(".isSure").off().on("click",function(){
					$(".mod_wapper").hide();
					$(".markHide").hide();
					window.location.href="graderank.html"
				})
				return;
			}
		},error:function(){
			new  ModelCon("网络异常，请检查您的网络");
			$(".isCancleOk").hide();
			$(".isSure").off().on("click",function(){
				$(".mod_wapper").hide();
				$(".markHide").hide();
				window.location.href="graderank.html"
			})
			return;
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
    var school=localStorage.getItem("schoolName");
    var name = localStorage.getItem("userName")
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
            console.log(dataRes)
            if(dataRes.header.code=="200"){

                if($.trim(dataRes.data.user_class[0])!=""){
                    classAndGrade(dataRes.data.user_class);
                    //alert("获取数据失败")
                }else {
                    // new Notice("获取数据失败");
                    new ModelCon("获取数据失败，请刷新重试");
                    $(".isCancleOk").hide();
                    $(".isSure").off().on("click", function () {
                        window.location.href = "graderank.html";
                    })
                    return;
                }
                var dataHeal = new PersonHealth();
                dataHeal.bindEvent();
                //学年
                dataHeal.getPersonListYear();
                //学期
                dataHeal.getPersonListGrade();
                //班级
                dataHeal.getPersonListProduct();
                //获取默认值
               // dataHeal.defalutData();
                //点击后数据展示
				setTimeout(function(){
					dataHeal.getAllData();
				},300)
                //dataHeal.getAllData();
            }else{
                 new  ModelCon("数据获取失败,请刷新重试");
                $(".isCancleOk").hide();
                $(".isSure").off().on("click",function(){
                    $(".mod_wapper").hide();
                    $(".markHide").hide();
                    window.location.href="graderank.html"
                })
                return;
            }

        },error:function(){
        	 new  ModelCon("网络异常，请检查您的网络");
                $(".isCancleOk").hide();
                $(".isSure").off().on("click",function(){
                    $(".mod_wapper").hide();
                    $(".markHide").hide();
                    window.location.href="graderank.html"
                })
                return;
        }
        });
	//初始化数据


})