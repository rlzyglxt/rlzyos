/**
 * 员工合同
 */
var allPageVue;
var queryConditionTemp = {
	"currPage" : "1",
	"totalPage" : "",
	"pageCount" : "10",
	"totalCount" : ""
	
}
window.onload = function() {
	allPageVue = new Vue({
		el : '#allPage',
		data : {
			currPage : '1',
			totalPage : '',
			pageCount : '10',
			totalCount : '',
			staffAgreements : '',
		}
	});
	loadData();
}
//显示数据
var loadData = function() {
	$('#mainPanel').hide();
	$('#loadingLayer').show();
	var queryCondition = {
		"showagreementVO.currPage" : queryConditionTemp.currPage,
		"showagreementVO.totalPage" : queryConditionTemp.totalPage,
		"showagreementVO.pageCount" : queryConditionTemp.pageCount,
		"showagreementVO.totalCount" : queryConditionTemp.totalCount,
	}	
	$.ajax({
		url : '/rlzyos/staff/staffAgreement_getStaffAgreementByPage',
		type : 'POST',
		data : queryCondition,
		success : function(data) {
			var result = JSON.parse(data);
			alert(result);
			allPageVue.staffAgreements = result.staffAgreements;
			allPageVue.currPage = result.currPage;
			allPageVue.totalPage = result.totalPage;
			allPageVue.pageCount = result.pageCount;
			allPageVue.totalCount = result.totalCount;
			queryConditionTemp.currPage = result.currPage;
			queryConditionTemp.totalPage = result.totalPage;
			queryConditionTemp.pageCount = result.pageCount;
			queryConditionTemp.totalCount = result.totalCount;
			
			$('#loadingLayer').hide();
			$('#mainPanel').show();
		}
	});
}
//进入修改员工合同模态框得到数据
function createConfirmUpdataAgreement(event) {
	$("#updateLoadingDiv").removeClass("hideDiv");
	$("#updateContent").addClass("hideDiv");
	getXmlHttp();
	xmlHttp.open("POST", "/rlzyos/staff/staffAgreement_getStaffAgreementById", true);
	var formData = new FormData();
	formData.append("rlzy_agreement_id", event.id);
	xmlHttp.send(formData);
	xmlHttp.onreadystatechange = getStaffExpByIdBack;
}
//通过Id得到履历回显
function getStaffExpByIdBack() {
	if (isBack()) {
		var result = xmlHttp.responseText;
		result = JSON.parse(result);
		$("#staffAgreement_StartTime").val(result.agreement_startTime);
		$("#staffAgreement_OverTime").val(result.agreement_overtTime);
		$("#staffAgreement_content").val(result.agreement_content);
		$("#updateStaffAgreementBtn").val(result.rlzy_agreement_id);
		$("#updateLoadingDiv").addClass("hideDiv");
		$("#updateContent").removeClass("hideDiv");
	}
}
//修改
function updateStaffAgreement(event) {
	$("#updateLoadingDiv").removeClass("hideDiv");
	$("#updateContent").addClass("hideDiv");
	getXmlHttp();
	xmlHttp.open("POST", "/rlzyos/staff/staffAgreement_updataStaffAgreement", true);
	var formData = new FormData(updateStaffAgreemenForm);
	formData.append("rlzy_agreement_id", event.value);
	alert(event.value);
	xmlHttp.send(formData);
	xmlHttp.onreadystatechange = function() {
		if (isBack()) {
			toastr.success("修改成功！");
			$("#updateLoadingDiv").addClass("hideDiv");
			$("#updateContent").removeClass("hideDiv");
		}
	}
}

function getName(event) {
	$.ajax({
			type : "POST",
			url : "/rlzyos/staff/staffExp_getStaffNameByStaffNumber",
			data : {
				"staff_number": event.value,
			},
			success : function(data) {
				var result = JSON.parse(data);
				var staff_name = $("#staff_name");
				staff_name.val(result);
			}
		});
}

//添加
function addStaffStaffAgreement(){
	for (var i = 0; i < document.addAgreementForm.elements.length - 1; i++) {
		if (document.addAgreementForm.elements[i].value == "") {
			toastr.error("当前表单不能有空项");
			document.form.elements[i].focus();
			return false;
		}
	}
	getXmlHttp();
	xmlHttp.open("POST", "/rlzyos/staff/staffAgreement_addStaffAgreement", true);
	var formData = new FormData(document.getElementById("addAgreementForm"));
	xmlHttp.send(formData);
	xmlHttp.onreadystatechange = function (){
		if(isBack())
		var result = xmlHttp.responseText;
		if(result == "addSuccess"){
			toastr.success('添加成功！')
		}
	}
}


//删除员工所有信息(在职，离职)
var deleteStaffAgreement = function(event) {
	//删除员工的基本信息
	$.ajax({
		url : '/rlzyos/staff/staffAgreement_deleteStaffAgreement',
		type : 'POST',
		data : {
			'rlzy_agreement_id' : event.id
		}
	});
}
	//删除员工的合同信息
	//删除员工的工作履历
	//删除员工的奖金记录
//确认删除提示
var createConfirmDeleteAgreement = function(event) {
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
					deleteStaffAgreement(event);
					alert(event);
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