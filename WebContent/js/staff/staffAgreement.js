/**
 * 员工合同
 */

var queryConditionTemp = {
	"currPage" : "1",
	"totalPage" : "",
	"pageCount" : "10",
	"totalCount" : "",
	"agreement_startTime" : "",//时间筛选
	"agreement_overtTime" : ""
	
}
var allPageVue;
window.onload = function() {
	allPageVue = new Vue({
		el : '#allPage',
		data : {
			currPage : '1',
			totalPage : '',
			pageCount : '10',
			totalCount : '',
			staffAgreements : ''
		}
});
	loadData();
	var currDate = new Date();
	var currMonth = currDate.getMonth() + 1;
	if (currMonth <= 10) {
		currMonth = '0' + currMonth;
	}
	queryConditionTemp.agreement_startTime = currDate.getFullYear() + '-'
			+ currMonth + '-01';
	queryConditionTemp.agreement_overtTime = currDate.getFullYear() + '-' + currMonth
			+ '-31';
	$('#agreement_startTime').val(currDate.getFullYear() + '-' + currMonth + '-01');
	$('#agreement_overtTime').val(currDate.getFullYear() + '-' + currMonth + '-30');
	$.datetimepicker.setLocale('ch');
	$('.Time').datetimepicker({
		yearStart : 1900, // 设置最小年份
		yearEnd : 2100, // 设置最大年份
		yearOffset : 0, // 年偏差
		timepicker : false, // 关闭时间选项
		format : 'Y-m-d', // 格式化日期年-月-日
		minDate : '1900/01/01', // 设置最小日期
		maxDate : '2100/01/01', // 设置最大日期
	});
}
//导出合同
var exportAgreement = function(event) {
	window.location.href = "/rlzyos/staff/staffAgreement_exportAgreement?agreement.rlzy_agreement_id="
			+ event.id;
}
//时间筛选
var QuerySort = function() {
//	queryConditionTemp.query_name = $('#searchInput').val();
	queryConditionTemp.agreement_startTime = $('#agreement_startTime').val();
	queryConditionTemp.agreement_overtTime = $('#agreement_overtTime').val();
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
		"showagreementVO.agreement_startTime" : queryConditionTemp.agreement_startTime,
		"showagreementVO.agreement_overtTime" : queryConditionTemp.agreement_overtTime,
	}	
	$.ajax({
		url : '/rlzyos/staff/staffAgreement_getStaffAgreementByPage',
		type : 'POST',
		data : queryCondition,
		success : function(data) {
			var result = JSON.parse(data);
			/*alert(result);*/
			allPageVue.staffAgreements = result.staffAgreements;
			allPageVue.currPage = result.currPage;
			allPageVue.totalPage = result.totalPage;
			allPageVue.pageCount = result.pageCount;
			allPageVue.totalCount = result.totalCount;
			
			queryConditionTemp.currPage = result.currPage;
			queryConditionTemp.totalPage = result.totalPage;
			queryConditionTemp.pageCount = result.pageCount;
			queryConditionTemp.totalCount = result.totalCount;
			queryConditionTemp.agreement_startTime = result.agreement_startTime;
			queryConditionTemp.agreement_overtTime = result.agreement_overtTime;
			$("#staff_name").val("");
			$("#staff_number").val("");
			$("#addstaffAgreement_StartTime").val("");
			$("#addstaffAgreement_OverTime").val("");
			$("#addstaff_contactsRemark").val("");
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
	/*alert(event.value);*/
	xmlHttp.send(formData);
	xmlHttp.onreadystatechange = function() {
		if (isBack()) {
			toastr.success("修改成功！");
			$("#updateLoadingDiv").addClass("hideDiv");
			$("#updateContent").removeClass("hideDiv");
		}
	}
}

//function getName(event) {
//	$.ajax({
//			type : "POST",
//			url : "/rlzyos/staff/staffExp_getStaffNameByStaffNumber",
//			data : {
//				"staff_number": event.value,
//			},
//			success : function(data) {
//				var result = JSON.parse(data);
//				var staff_name = $("#staff_name");
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
			var staff_name = $("#staff_name");
//			var staff_depaterment = $("#staffMove_bfdepartment");
//			var staff_duty = $("#staffMove_bfduty");
			var staff_confirm = $("#addStaffStaffAgreementbtn");
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
//添加
function addStaffStaffAgreement(){
//	for (var i = 0; i < document.addAgreementForm.elements.length - 1; i++) {
//		if (document.addAgreementForm.elements[i].value == "") {
//			toastr.error("当前表单不能有空项");
//			document.form.elements[i].focus();
//			return false;
//		}
//	}
//	getXmlHttp();
//	xmlHttp.open("POST", "/rlzyos/staff/staffAgreement_addStaffAgreement", true);
//	var formData = new FormData(document.getElementById("addAgreementForm"));
//	xmlHttp.send(formData);
//	xmlHttp.onreadystatechange = function (){
//		if(isBack())
//		var result = xmlHttp.responseText;
//		if(result == "addSuccess"){
//			toastr.success('添加成功！')
//		}
//	}
	for (var i = 0; i < document.addAgreementForm.elements.length - 1; i++) {
	if (document.addAgreementForm.elements[i].value == "") {
		toastr.error("当前表单不能有空项");
		document.form.elements[i].focus();
		return false;
		}
	}
	// 添加数据
	var staffAgreement_StartTime = $("#addstaffAgreement_StartTime").val();
	var staffAgreement_OverTime = $("#addstaffAgreement_OverTime").val();
	var staff_contactsRemark = $("#addstaff_contactsRemark").val();
	var staff_agreementremark = $("#staff_agreementremark").val();
	
	var staff_number = $("#staff_number").val();
	var staff_name = $("#staff_name").val();
	var addStaffAgreementBtn =  $("#addStaffStaffAgreementbtn").val();
    /*alert("员工id"+addStaffAgreementBtn);*/
	/*alert("员工结束时间"+staff_contactsRemark);*/
	var time = /[^0-9]/ig;
	var reg = new RegExp("^[0-9]*$");
	var str1 = staffAgreement_StartTime.replace(time,"");
	var str2 = staffAgreement_OverTime.replace(time,"");
	if(staffAgreement_StartTime == ""|| staffAgreement_OverTime == "" || staff_contactsRemark==""){
		toastr.error("当前表不能有空");
	}else if(!reg.test(staff_number) || staff_number.length>5){ 
		 toastr.error("工号请输入5位数字以内！");
		 $("#staff_number").val("");
		 return false;
	}else if(staff_name=="没有该员工"){
		 toastr.error("你输入的工号没有对应的员工,请重新输入！");
		 $("#staff_number").val("");
		 $("#staff_name").val("");
		return false;
	}else if(staff_contactsRemark.length>40){ 
		 toastr.error("请输入40个字以内的内容");
		 $("#addstaff_contactsRemark").val("");
		 return false;
	}else if (str1 >= str2){//判断起始时间不能大于结束时间
		
		$("#addstaffAgreement_StartTime").val("");
		 $("#addstaffAgreement_OverTime").val("");
		toastr.error("请输入时间顺序有误,请重新输入");
		
		return false;
	}else if (staff_agreementremark.length > 20){
		$("#staff_agreementremark").val("");
		toastr.error("备注不可超过20字");
		return false;
	}else {
		$('#addAgreement').modal('hide');
		$.ajax({
			type : "POST",
			url : "/rlzyos/staff/staffAgreement_addStaffAgreement?agreement_staff="
					+ addStaffAgreementBtn,
			data : {
				"staffagreements[0].agreement_startTime" : staffAgreement_StartTime,
				"staffagreements[0].agreement_overtTime" : staffAgreement_OverTime,
				"staffagreements[0].agreement_content" : staff_contactsRemark,
				"staffagreements[0].agreement_remark" : staff_agreementremark,
				"staffagreements[0].agreement_staff" : addStaffAgreementBtn,
			},
			success : function(data) {
				toastr.success('添加成功！');
				$("#updateLoadingDiv").addClass("hideDiv");
				$("#updateContent").removeClass("hideDiv");
				$("#staff_name").val("");
				$("#staff_number").val("");
				$("#addstaffAgreement_StartTime").val("");
				$("#addstaffAgreement_OverTime").val("");
				$("#addstaff_contactsRemark").val("");
				loadData();
			}
		});
	}
}


//删除员工所有信息(在职，离职)
var deleteStaffAgreement = function(event) {
	//删除员工的基本信息
	$.ajax({
		url : '/rlzyos/staff/staffAgreement_deleteStaffAgreement',
		type : 'POST',
		data : {
			'agreement.rlzy_agreement_id' : event.id
		},
		success:function(data){
			toastr.success('删除成功！');
			loadData();
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