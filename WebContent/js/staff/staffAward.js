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
	$.ajax({
		url : '/rlzyos/depaterment/depaterment_getAllDepaterment',
		type : 'post',
		success : function(data) {
			var result = JSON.parse(data);
			console.log(result);
			console.log(result.length);
			for (var i = 0; i < result.length; i++) {
				document.getElementById("staff_nordepaterment").innerHTML = document
						.getElementById("staff_nordepaterment").innerHTML
						+ "<option value='"
						+ result[i].staffdepartment_name
						+ "'>"
						+ result[i].staffdepartment_name
						+ "</option>";
			}
		}
	});
}
//改变筛选条件
//查询工号
var changeName = function(event) {
	queryConditionTemp.staff_number = event.value;
	queryConditionTemp.currPage = "1";
	loadData();
}

//显示员工奖金
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
			$("#staff_number").val("");
			$("#staff_addname").val("");
			$("#award_amount").val("");
			$("#award_provideTime").val("");
			$("#staff_nordepaterment").val("");
			$("#award_provideReason").val("");
			$('#loadingLayer').hide();
			$('#mainPanel').show();
		}
	});
}

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
			url : "/rlzyos/staff/staffMove_getValueByNumber",
			data : {
				"staff_number": event.value,
			},
			success : function(data) {
				var result = JSON.parse(data);
				var staff_name = $("#staff_addname");
				var staff_confirm = $("#addStaffAwardBtn");
				if(result==""){
					staff_name.val("该员工不存在的");
				}else{
					console.log("姓名为"+result[0].staff_name);
					staff_name.val(result[0].staff_name);
					staff_confirm.val(result[0].rlzy_staff_id);
				}
			}
		});
}

function addStaffAward(){
	for (var i = 0; i < document.addstaffAwardForm.elements.length - 1; i++) {
		if (document.addstaffAwardForm.elements[i].value == "") {
			toastr.error("当前表单不能有空项");
			document.form.elements[i].focus();
			return false;
		}
	}
	getXmlHttp();
	var award_amount = $("#award_amount").val();
	var award_provideTime = $("#award_provideTime").val();
	var award_provideDepartment = $("#staff_nordepaterment").val();
	var award_provideReason = $("#award_provideReason").val();
	var staff_number = $("#staff_number").val();
	
	var addStaffAwardBtn =  $("#addStaffAwardBtn").val();
	//js校验
	var reg = new RegExp("^[0-9]*$");
	 if(!reg.test(award_amount) || award_amount.length>5){ 
		$("#award_amount").val("");
		 toastr.error("金额请输入5位以内的数字！");
		 return false;
	}else if(!reg.test(staff_number) || staff_number.length>5){ 
		 toastr.error("工号请输入5位数字以内！");
		 $("#staff_number").val("");
		 return false;
	}else if($("#staff_addname").val()=="该员工不存在的"){
		 $("#staff_number").val("");
		 toastr.error("该员工不存在！");
	 }else if(award_provideReason.length > 25){
		 $("#award_provideReason").val("");
		 toastr.error("输入的字数不可大于25个");
		 return false;
	 }else {
		 $('#addStaffAward').modal('hide');
	$.ajax({
		type : "POST",
		url : "/rlzyos/staff/staffAward_addStaffAward?award_staff="
				+ addStaffAwardBtn,
		data : {
			"staffAwards[0].award_staff" : addStaffAwardBtn,
			"staffAwards[0].award_amount" : award_amount,
			"staffAwards[0].award_provideTime" : award_provideTime,
			"staffAwards[0].award_provideDepartment" : award_provideDepartment,
			"staffAwards[0].award_provideReason" : award_provideReason,
		},
		success : function(data) {
			toastr.success('添加成功！');
			$("#staff_number").val("");
			$("#staff_addname").val("");
			$("#award_amount").val("");
			$("#award_provideTime").val("");
			$("#staff_nordepaterment").val("");
			$("#award_provideReason").val("");
			loadData();
		}
	});
	 }
}


//确认删除提示
var createConfirmDeleteaward= function(event) {
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
					deleteStaffAward(event);
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
var deleteStaffAward = function(event) {
	//删除员工的基本信息
	$.ajax({
		url : '/rlzyos/staff/staffAward_deleteStaffAward',
		type : 'POST',
		data : {
			'staffAward.rlzy_staffAward_id' : event.id
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