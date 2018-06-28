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
			$("#staffExp_addstaff").val("");
			$("#staff_addname").val("");
			$("#addstaffExp_address").val("");
			$("#addstaffExp_startTime").val("");
			$("#addstaffExp_overTime").val("");
			$("#addstaffExp_remark").val("");
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

////查询姓名
//function getName(event) {
//	$.ajax({
//			type : "POST",
//			url : "/rlzyos/staff/staffExp_getStaffNameByStaffNumber",
//			data : {
//				"staffExp_staff": event.value,
//			},
//			success : function(data) {
//				var result = JSON.parse(data);
//				var staff_name = $("#staff_addname");
//				staff_name.val(result);
//			}
//		});
//}
//通过工号得到员工id,员工姓名，员工部门员工职务
function getName(event){
	$.ajax({
		type : "POST",
		url : "/rlzyos/staff/staffMove_getValueByNumber",
		data : {
			"staff_number": event.value,
		},
		success : function(data) {
			var result = JSON.parse(data);
			var staff_name = $("#staff_addname");
//			var staff_depaterment = $("#staffMove_bfdepartment");
//			var staff_duty = $("#staffMove_bfduty");
			var staff_confirm = $("#addStaffExpBtn");
			if(result==""){
				staff_name.val("没有该员工");
//				staff_depaterment.val("没有该部门");
//				staff_duty.val("没有该职务");
			}else{
				console.log("姓名为"+result[0].staff_name);
				staff_name.val(result[0].staff_name);
//				staff_depaterment.val(result[0].staff_depaterment);
//				staff_duty.val(result[0].staff_duty);
				staff_confirm.val(result[0].rlzy_staff_id);
			}	
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
//	var addstaffExpForm=document.getElementById("addstaffExpForm");
//	var formData = new FormData(addstaffExpForm);
//	xmlHttp.open("POST", "/rlzyos/staff/staffExp_addStaffExp", true);
//	xmlHttp.send(formData);
//	xmlHttp.onreadystatechange = function (){
//		if(isBack())
//		var result = xmlHttp.responseText;
//		if(result == "addsuccess"){
//			toastr.success('添加成功！');
//		}
//	}
	// 添加数据
	var staffExp_address = $("#addstaffExp_address").val();
	var staffExp_startTime = $("#addstaffExp_startTime").val();
	var staffExp_overTime = $("#addstaffExp_overTime").val();
	var staffExp_remark = $("#addstaffExp_remark").val();
	var staffExp_staff = $("#staffExp_addstaff").val();
	var staffExp_staffname = $("#staff_addname").val();
	
	var addStaffExpBtn =  $("#addStaffExpBtn").val();
	/*alert("员工id"+addStaffExpBtn);*/
	/*alert("员工结束时间"+staffExp_overTime);*/
	//字符验证
	var time = /[^0-9]/ig;
	var reg = new RegExp("^[0-9]*$");
	var str1 = staffExp_startTime.replace(time,"");
	var str2 = staffExp_overTime.replace(time,"");
	if(!reg.test(staffExp_staff) || staffExp_staff.length>5){ 
		 toastr.error("工号请输入5位数字以内！");
		 $("#staffExp_addstaff").val("");
		 return false;
	}else if(staffExp_staffname=="没有该员工"){
		 toastr.error("你输入的工号没有对应的员工,请重新输入！");
		 $("#staffExp_addstaff").val("");
		return false;
	}else if(staffExp_address.length>10){ 
		 toastr.error("请输入20个字以内的地址");
		 document.querySelector(".staffExp_address").val("");
		 return false;
	}else if (str1 >= str2){//判断起始时间不能大于结束时间
		toastr.error("请输入时间顺序有误");
		$("#addstaffExp_startTime").val("");
		$("#addstaffExp_overTime").val("");
		return false;
	}else if (staffExp_remark.length > 20){
		toastr.error("备注不可超过20字");
		return false;
	}else{
		$('#addStaffExp').modal('hide');
	$.ajax({
		type : "POST",
		url : "/rlzyos/staff/staffExp_addStaffExp?staffExp_staff="
				+ addStaffExpBtn,
		data : {
			"staffExps[0].staffExp_address" : staffExp_address,
			"staffExps[0].staffExp_startTime" : staffExp_startTime,
			"staffExps[0].staffExp_overTime" : staffExp_overTime,
			"staffExps[0].staffExp_remark" : staffExp_remark,
			"staffExps[0].staffExp_staff" : addStaffExpBtn,
		},
		success : function(data) {
			toastr.success('添加成功！');
			$("#updateLoadingDiv").addClass("hideDiv");
			$("#updateContent").removeClass("hideDiv");
			$("#staffExp_addstaff").val("");
			$("#staff_addname").val("");
			$("#addstaffExp_address").val("");
			$("#addstaffExp_startTime").val("");
			$("#addstaffExp_overTime").val("");
			$("#addstaffExp_remark").val("");
			loadData();
		}
	});
	}
}


//确认删除提示
var createConfirmDeleteExp = function(event) {
	$.confirm({
		title : '真的要删除吗？',
		content : '',
		type : 'red',
		autoClose : 'closeAction|5000',
		buttons : {
			deleteAction : {
				text : '确认',
				btnClass : 'btn-blue',
				action : function() {
					deleteStaffExp(event);
					/*alert(event);*/
					
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

//删除员工履历
var deleteStaffExp = function(event) {
	//删除员工的基本信息
	$.ajax({
		url : '/rlzyos/staff/staffExp_deleteStaffExp',
		type : 'POST',
		data : {
			'staffExp.rlzy_staffExp_id' : event.id
		},
	success:function(data){
		toastr.success('删除成功！');
		loadData();
	}
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