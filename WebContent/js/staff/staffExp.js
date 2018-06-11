var xmlHttp;

var allPageVue;
var queryConditionTemp = {
	"currPage" : "1",
	"totalPage" : "",
	"pageCount" : "10",
	"totalCount" : "",
	"staffExp_staff" : ""//查询工号
}
window.onload = function() {
	allPageVue = new Vue({
		el : '#allPage',
		data : {
			currPage : '1',
			totalPage : '',
			pageCount : '10',
			totalCount : '',
			staffExps : ''
		}
	});
	loadData();
}
//改变筛选条件
//查询姓名
var changeName = function(event) {
	queryConditionTemp.staffExp_staff = event.value;
	queryConditionTemp.currPage = "1";
	loadData();
}

//显示员工履历
var loadData = function() {
	$('#mainPanel').hide();
	$('#loadingLayer').show();
	var queryCondition = {
		"staffExpVO.currPage" : queryConditionTemp.currPage,
		"staffExpVO.totalPage" : queryConditionTemp.totalPage,
		"staffExpVO.pageCount" : queryConditionTemp.pageCount,
		"staffExpVO.totalCount" : queryConditionTemp.totalCount,
		"staffExpVO.staffExp_staff" : queryConditionTemp.staffExp_staff,
	}	
	$.ajax({
		url : '/rlzyos/staff/staffExp_getAllStaffExpByPage',
		type : 'POST',
		data : queryCondition,
		success : function(data) {
			var result = JSON.parse(data);
			allPageVue.staffExps = result.staffExps;
			allPageVue.currPage = result.currPage;
			allPageVue.totalPage = result.totalPage;
			allPageVue.pageCount = result.pageCount;
			allPageVue.totalCount = result.totalCount;
			
			queryConditionTemp.currPage = result.currPage;
			queryConditionTemp.totalPage = result.totalPage;
			queryConditionTemp.pageCount = result.pageCount;
			queryConditionTemp.totalCount = result.totalCount;
			queryConditionTemp.staffExp_staff = result.staffExp_staff;
			$('#loadingLayer').hide();
			$('#mainPanel').show();
		}
	});
}

//跳转页面修改
//function createConfirmUpdata(event){
//	alert("进入修改页面");
//	enterUpdataPage(event);
//}
//function enterUpdataPage(event){
//	window.location = "/rlzyos/staff/staff_page_UpdataStaff?rlzy_staff_id=" + event.id;
//}
//进入修改员工履历模态框
function createConfirmUpdata(event) {
	$("#updateLoadingDiv").removeClass("hideDiv");
	$("#updateContent").addClass("hideDiv");
	getXmlHttp();
	xmlHttp.open("POST", "/rlzyos/staff/staffExp_getStaffExpByExpId", true);
	var formData = new FormData();
	formData.append("rlzy_staffExp_id", event.id);
	xmlHttp.send(formData);
	xmlHttp.onreadystatechange = getStaffExpByIdBack;
}
//通过Id得到履历回显
function getStaffExpByIdBack() {
	if (isBack()) {
		var result = xmlHttp.responseText;
		result = JSON.parse(result);
		$("#staffExp_staff").val(result.staffExp_staff);
		$("#staffExp_address").val(result.staffExp_address);
		$("#staffExp_startTime").val(result.staffExp_startTime);
		$("#staffExp_overTime").val(result.staffExp_overTime);
		$("#staffExp_remark").val(result.staffExp_remark);
		$("#updateStaffExpBtn").val(result.rlzy_staffExp_id);
		$("#updateLoadingDiv").addClass("hideDiv");
		$("#updateContent").removeClass("hideDiv");
	}
}
//修改
function updateStaffExp(event) {
	$("#updateLoadingDiv").removeClass("hideDiv");
	$("#updateContent").addClass("hideDiv");
	getXmlHttp();
	xmlHttp.open("POST", "/rlzyos/staff/staffExp_updataStaffExp", true);
	var formData = new FormData(updatestaffExpForm);
	formData.append("rlzy_staffExp_id", event.value);
	xmlHttp.send(formData);
	xmlHttp.onreadystatechange = function() {
		if (isBack()) {
			toastr.success("修改成功！");
			$("#updateLoadingDiv").addClass("hideDiv");
			$("#updateContent").removeClass("hideDiv");
		}
	}
}

////工作经历添加一条
//function add_oneStaffExp() {
//	console.log("工作履历添加");
//	// 添加一条数据
//	var staffWork_address_val = $(".staffWork_address").val();
//	var staffWork_duty_val = $(".staffWork_duty").val();
//	var staffWork_startTime_val = $(".staffWork_startTime").val();
//	var staffWork_stopTime_val = $(".staffWork_stopTime").val();
//	var staffWork_remarks_val = $(".staffWork_remarks").val();
//	
//	$.ajax({
//		type : "POST",
//		url : "/xsjsglxt/team/StaffWork_saveWorks?works.staffWork_staff="
//				+ staff_id,
//		data : {
//			"works[0].staffWork_address" : staffWork_address_val,
//			"works[0].staffWork_duty" : staffWork_duty_val,
//			"works[0].staffWork_startTime" : staffWork_startTime_val,
//			"works[0].staffWork_stopTime" : staffWork_stopTime_val,
//			"works[0].staffWork_remarks" : staffWork_remarks_val,
//		},
//		success : function(data) {
//			toastr.success('添加工作成功！');
//			show_workAjax(staff_id);
//		}
//	});
//}
//查询姓名
function getName(event) {
	$.ajax({
			type : "POST",
			url : "/rlzyos/staff/staffExp_getStaffNameByStaffNumber",
			data : {
				"staffExp_staff": event.value,
			},
			success : function(data) {
				var result = JSON.parse(data);
				var staff_name = $("#staff_addname");
				staff_name.val(result);
			}
		});
}

function addStaffExp(){
	for (var i = 0; i < document.addstaffExpForm.elements.length - 1; i++) {
		if (document.addstaffExpForm.elements[i].value == "") {
			toastr.error("当前表单不能有空项");
			document.form.elements[i].focus();
			return false;
		}
	}
	getXmlHttp();
	xmlHttp.open("POST", "/rlzyos/staff/staffExp_addStaffExp", true);
	var formData = new FormData(document.getElementById("addstaffExpForm"));
	xmlHttp.send(formData);
	xmlHttp.onreadystatechange = function (){
		if(isBack())
		var result = xmlHttp.responseText;
		if(result == "addSuccess"){
			toastr.success('添加成功！')
		}
	}
}



//删除工作经历一条
function delete_work(delete_button) {
	//把td送页面上删
	  var this_trId=delete_button.parentNode.parentNode.querySelector(".xsjsglxt_staffWork_id").getAttribute("id");
	  console.log("本行的id"+this_trId);
		//把这行td的数据数据库中删除
		$.ajax({
			url : '/xsjsglxt/team/StaffWork_deleteWork?work.xsjsglxt_staffWork_id='+this_trId,
			type : 'POST',
			success:function(data){
				toastr.success('删除工作经历成功！');
				show_workAjax(staff_id);
			},
		});
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
	if ($('#jumpInput').val() <= queryConditionTemp.totalPage
			&& $('#jumpInput').val() >= 1) {
		queryConditionTemp.currPage = $('#jumpInput').val()
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