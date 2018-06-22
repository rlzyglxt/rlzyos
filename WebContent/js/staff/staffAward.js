var xmlHttp;

var allPageVue;
var queryConditionTemp = {
	"currPage" : "1",
	"totalPage" : "",
	"pageCount" : "10",
	"totalCount" : "",
	"staff_number" : ""//查询工号
}
window.onload = function() {
	allPageVue = new Vue({
		el : '#allPage',
		data : {
			currPage : '1',
			totalPage : '',
			pageCount : '10',
			totalCount : '',
			staffAwards : ''
		}
	});
	loadData();
}
//改变筛选条件
//查询工号
var changeName = function(event) {
	queryConditionTemp.staff_number = event.value;
	queryConditionTemp.currPage = "1";
	loadData();
}

//显示员工履历
var loadData = function() {
	$('#mainPanel').hide();
	$('#loadingLayer').show();
	var queryCondition = {
		"staffAwardVO.currPage" : queryConditionTemp.currPage,
		"staffAwardVO.totalPage" : queryConditionTemp.totalPage,
		"staffAwardVO.pageCount" : queryConditionTemp.pageCount,
		"staffAwardVO.totalCount" : queryConditionTemp.totalCount,
		"staffAwardVO.staff_number" : queryConditionTemp.staff_number,
	}	
	$.ajax({
		url : '/rlzyos/staff/staffAward_getStaffAwardByPages',
		type : 'POST',
		data : queryCondition,
		success : function(data) {
			var result = JSON.parse(data);
			allPageVue.staffAwards = result.staffAwards;
			allPageVue.currPage = result.currPage;
			allPageVue.totalPage = result.totalPage;
			allPageVue.pageCount = result.pageCount;
			allPageVue.totalCount = result.totalCount;
			
			queryConditionTemp.currPage = result.currPage;
			queryConditionTemp.totalPage = result.totalPage;
			queryConditionTemp.pageCount = result.pageCount;
			queryConditionTemp.totalCount = result.totalCount;
			queryConditionTemp.staff_number = result.staff_number;
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
	var addstaffExpForm=document.getElementById("addstaffExpForm");
	var formData = new FormData(addstaffExpForm);
	xmlHttp.open("POST", "/rlzyos/staff/staffExp_addStaffExp", true);
	xmlHttp.send(formData);
	xmlHttp.onreadystatechange = function (){
		if(isBack())
		var result = xmlHttp.responseText;
		if(result == "addsuccess"){
			toastr.success('添加成功！');
		}
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
					loadData();
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
			'rlzy_staffExp_id' : event.id
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