var xmlHttp;

var allPageVue;
var queryConditionTemp = {
	"currPage" : "1",
	"totalPage" : "",
	"pageCount" : "10",
	"totalCount" : "",
	"staff_number" : "",//查询
	"staff_name" : "",
	"stafftrain_train" : ""
}

window.onload = function() {
	allPageVue = new Vue({
		el : '#allPage',
		data : {
			currPage : '1',
			totalPage : '',
			pageCount : '10',
			totalCount : '',
			staff_number : '',
			staffTrains : '',
		}
	});
	loadData();
	$.ajax({
		url : '/rlzyos/staff/staffTrain_getTrainName',
		type : 'post',
		success : function(data) {
			var result = JSON.parse(data);
			console.log(result);
			console.log(result.length);
			for (var i = 0; i < result.length; i++) {
				document.getElementById("stafftrain_train").innerHTML = document
						.getElementById("stafftrain_train").innerHTML
						+ "<option value='"
						+ result[i].train_name
						+ "'>"
						+ result[i].train_name
						+ "</option>";
			}
		}
	});
	$.ajax({
		url : '/rlzyos/staff/staffTrain_getTrainName',
		type : 'post',
		success : function(data) {
			var result = JSON.parse(data);
			console.log(result);
			console.log(result.length);
			for (var i = 0; i < result.length; i++) {
				document.getElementById("rlzy_train_id").innerHTML = document
						.getElementById("rlzy_train_id").innerHTML
						+ "<option value='"
						+ result[i].train_name
						+ "'>"
						+ result[i].train_name
						+ "</option>";
			}
		}
	});
}

//改变筛选条件
//查询姓名
var changeName = function(event) {
	queryConditionTemp.staff_number = event.value;
/*	queryConditionTemp.staff_name = event.value;
	queryConditionTemp.stafftrain_train = event.value;*/
	queryConditionTemp.currPage = "1";
	loadData();
}

//显示页面信息
var loadData = function() {
	$('#mainPanel').hide();
	$('#loadingLayer').show();
	var queryCondition = {
		"staffTrainVO.currPage" : queryConditionTemp.currPage,
		"staffTrainVO.totalPage" : queryConditionTemp.totalPage,
		"staffTrainVO.pageCount" : queryConditionTemp.pageCount,
		"staffTrainVO.totalCount" : queryConditionTemp.totalCount,
		"staffTrainVO.staff_number" : queryConditionTemp.staff_number,
		"staffTrainVO.staff_name" : queryConditionTemp.staff_name,
		"staffTrainVO.stafftrain_train" : queryConditionTemp.stafftrain_train,
	}
	$.ajax({
		url : '/rlzyos/staff/staffTrain_getAllStaffTrainByPage',
		type : 'POST',
		data : queryCondition,
		success : function(data) {
			var result = JSON.parse(data);
			allPageVue.staffTrains = result.staffTrains;
			allPageVue.currPage = result.currPage;
			allPageVue.totalPage = result.totalPage;
			allPageVue.pageCount = result.pageCount;
			allPageVue.totalCount = result.totalCount;
			
			queryConditionTemp.currPage = result.currPage;
			queryConditionTemp.totalPage = result.totalPage;
			queryConditionTemp.pageCount = result.pageCount;
			queryConditionTemp.totalCount = result.totalCount;
			queryConditionTemp.staff_number = result.staff_number;
			queryConditionTemp.staff_name = result.staff_name;
			queryConditionTemp.stafftrain_train = result.stafftrain_train;
			$('#loadingLayer').hide();
			$('#mainPanel').show();
		}
	});
}
//添加
//function addStaffTrain(){
//	for (var i = 0; i < document.addstafftrainForm.elements.length - 1; i++) {
//		if (document.addstafftrainForm.elements[i].value == "") {
//			toastr.error("当前表单不能有空项");
//			document.form.elements[i].focus();
//			return false;
//		}
//	}
//	getXmlHttp();
//	xmlHttp.open("POST", "/rlzyos/staff/staffTrain_addStaffTrain", true);
//	var formData = new FormData(document.getElementById("addstafftrainForm"));
//	xmlHttp.send(formData);
//	xmlHttp.onreadystatechange = function (){
//		if (isBack()) {
//			var result = xmlHttp.responseText;
//			if(result == "addsuccess"){
//				toastr.success("添加成功！");
//				$("#addLoadingDiv").addClass("hideDiv");
//				$("#addContent").removeClass("hideDiv");
//				$("#addContent input").val("");
//				loadData();
//			}
//		}
//	}
//}
//通过工号得到员工id,员工姓名，员工部门员工职务
function getValue(event){
$.ajax({
	type : "POST",
	url : "/rlzyos/staff/staffTrain_getStaffNameByStaffNumber",
	data : {
		"staff_number": event.value,
	},
	success : function(data) {
		var result = JSON.parse(data);
		var staff_name = $("#staff_addname");
		var staff_confirm = $("#addStaffTrainBtn");
		if(result==""){
			staff_name.val("没有该员工");
//			staff_depaterment.val("没有该部门");
//			staff_duty.val("没有该职务");
		}else{
			console.log("姓名为"+result[0].staff_name);
			staff_name.val(result[0].staff_name);
//			staff_depaterment.val(result[0].staff_depaterment);
//			staff_duty.val(result[0].staff_duty);
			staff_confirm.val(result[0].rlzy_staff_id);
		}	
	}
});
}

//一个员工工作调动
function addStaffTrain() {
	// 添加数据
	var reg = new RegExp("^[0-9]*$");
	var reg1 = new RegExp("^[\u4E00-\u9FA5]{1,5}$");
	var rlzy_train_id = $("#rlzy_train_id").val();
	var stafftrain_score = $("#addstafftrain_score").val();
	var c = stafftrain_score;
	var stafftrain_certificate = $("#addstafftrain_certificate").val();
	var addStaffTrainBtn =  $("#addStaffTrainBtn").val();
	var a = addStaffTrainBtn.length;
	var b = a+1;
	if(!reg.test(c)){
		toastr.error("请正确输入成绩(0-100的整数)！");
		$("#addLoadingDiv").addClass("hideDiv");
		$("#addContent").removeClass("hideDiv");
		$("#addstafftrain_score").val("");
		return false;
	}else if(c<0 || c>100){
		toastr.error("请正确输入成绩(0-100的整数)！");
		$("#addLoadingDiv").addClass("hideDiv");
		$("#addContent").removeClass("hideDiv");
		$("#addstafftrain_score").val("");
		return false;
	}else if(!reg1.test(stafftrain_certificate) || stafftrain_certificate.length>10){
		toastr.error("培训证书请输入10位汉字以内！");
		$("#addLoadingDiv").addClass("hideDiv");
		$("#addContent").removeClass("hideDiv");
		$("#addstafftrain_certificate").val("");
		return false;
	}else if(b != 1){
	$.ajax({
		type : "POST",
		url : "/rlzyos/staff/staffTrain_addStaffTrain?stafftrain_staff="
				+ addStaffTrainBtn,
		data : {
			"stafftrains[0].stafftrain_staff" : addStaffTrainBtn,
			"stafftrains[0].stafftrain_train" : rlzy_train_id,
			"stafftrains[0].stafftrain_score" : stafftrain_score,
			"stafftrains[0].stafftrain_certificate" : stafftrain_certificate
		},
		success : function(data) {
			toastr.success('记录添加成功！');
			$("#stafftrain_staff").val("");
			$("#staff_addname").val("");
			$("#rlzy_train_id").val("");
			$("#addstafftrain_score").val("");
			$("#addstafftrain_certificate").val("");
			$("#addStaffTrainBtn").val("");
			$("#addStaffTrain").modal("hide");
			loadData();
		}
	});
  }else{
	  toastr.error("请输入正确员工工号!");
	  return false;
  }
}
//删除
var deleteStaffTrain = function(event) {
	$.ajax({
		url : '/rlzyos/staff/staffTrain_deleteStaffTrain',
		type : 'POST',
		data : {
			'stafftrain.rlzy_stafftrain_id' : event.id
		},	success:function(data){
			toastr.success('删除成功！');
			loadData();
		}
	});
}

//确认删除提示
function createConfirmDeleteStaffTrain(event) {
	$.confirm({
		title : '真的要删除吗？',
		content : '',
		type : 'red',
		autoClose : 'closeAction|5500',
		buttons : {
			deleteAction : {
				text : '确认',
				btnClass : 'btn-blue',
				action : function() {
					deleteStaffTrain(event);
					console.log("删除全部信息"+event);
					
				}
			},
			closeAction : {
				text : '取消',
				btnClass : 'btn-red',
				action : function() {

				}
			}
		}
	})
}
//进入修改模态框
function createConfirmUpdata(event) {
	$("#updateLoadingDiv").removeClass("hideDiv");
	$("#updateContent").addClass("hideDiv");
	getXmlHttp();
	xmlHttp.open("POST", "/rlzyos/staff/staffTrain_getStaffTrainById", true);
	var formData = new FormData();
	formData.append("rlzy_stafftrain_id", event.id);
	xmlHttp.send(formData);
	xmlHttp.onreadystatechange = getStaffTrainByIdBack;
}


//通过Id得到履历回显
function getStaffTrainByIdBack() {
	if (isBack()) {
		var result = xmlHttp.responseText;
		result = JSON.parse(result);
		$("#stafftrain_staff").val(result.stafftrain_staff);
		$("#stafftrain_train").val(result.stafftrain_train);
		$("#updateStaffTrainBtn").val(result.stafftrain_train);
		$("#stafftrain_score").val(result.stafftrain_score);
		$("#stafftrain_certificate").val(result.stafftrain_certificate);
		$("#updateStaffTrainBtn").val(result.rlzy_stafftrain_id);
		
		$("#updateLoadingDiv").addClass("hideDiv");
		$("#updateContent").removeClass("hideDiv");
	}
}


//修改
function updateStaffTrain(event) {
	var reg = new RegExp("^[0-9]*$");
	var reg1 = new RegExp("^[\u4E00-\u9FA5]{1,5}$");
	var stafftrain_score = $("#stafftrain_score").val();
	var c = stafftrain_score;
	var stafftrain_certificate = $("#stafftrain_certificate").val();
	if(!reg.test(c)){
		toastr.error("请正确输入成绩(0-100的整数)！");
		$("#updateLoadingDiv").addClass("hideDiv");
		$("#updateContent").removeClass("hideDiv");
		$("#stafftrain_score").val("");
		return false;
	}else if(c<0 || c>100){
		toastr.error("请正确输入成绩(0-100的整数)！");
		$("#updateLoadingDiv").addClass("hideDiv");
		$("#updateContent").removeClass("hideDiv");
		$("#stafftrain_score").val("");
		return false;
	}else if(!reg1.test(stafftrain_certificate) || stafftrain_certificate.length>10){
		toastr.error("培训证书请输入10位汉字以内！");
		$("#updateLoadingDiv").addClass("hideDiv");
		$("#updateContent").removeClass("hideDiv");
		$("#stafftrain_certificate").val("");
		return false;
	}
	getXmlHttp();
	xmlHttp.open("POST", "/rlzyos/staff/staffTrain_updateStaffTrain", true);
	var formData = new FormData(updatestafftrainForm);
	formData.append("rlzy_stafftrain_id", event.value);
	xmlHttp.send(formData);
	xmlHttp.onreadystatechange = function() {
		if (isBack()) {
			toastr.success("修改成功！");
			$("#updateLoadingDiv").addClass("hideDiv");
			$("#updateContent").removeClass("hideDiv");
			$("#updateContent input").val("");
			$("#updateStaffTrain").modal("hide");
		}
		loadData();
	}
}






//相应分页响应
var firstPage = function() {
	if (queryConditionTemp.currPage <= 1) {
		toastr.error("已经是第一页");
	} else {
		queryConditionTemp.currPage = '1';
		loadData();
	}
}

var prePage = function() {
	if (queryConditionTemp.currPage <= 1) {
		toastr.error("没有上一页了哦");
	} else {
		queryConditionTemp.currPage = --queryConditionTemp.currPage;
		loadData();
	}
}

var nextPage = function() {
	if (queryConditionTemp.currPage >= queryConditionTemp.totalPage) {
		toastr.error("没有下一页了哦");
	} else {
		queryConditionTemp.currPage = ++queryConditionTemp.currPage;
		loadData();
	}
}

var endPage = function() {
	if (queryConditionTemp.currPage >= queryConditionTemp.totalPage) {
		toastr.error("已经是最后一页");
	} else {
		queryConditionTemp.currPage = queryConditionTemp.totalPage;
		loadData();
	}
}

var jumpPage = function() {
	if ($('#skipPage').val() <= queryConditionTemp.totalPage
			&& $('#skipPage').val() >= 1) {
		queryConditionTemp.currPage = $('#skipPage').val()
		loadData();
	} else {
		toastr.error("不存在这一页");
	}
}

function getXmlHttp() {
	if (window.XMLHttpRequest) {
		// IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
		xmlHttp=new XMLHttpRequest();
	} else {
		// IE6, IE5 浏览器执行代码
		xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
}

function isBack() {
	if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
		return true;
	} else {
		return false;
	}
}