/**
 * 
 */
var allPageVue;
var queryConditionTemp = {
	"currPage" : "1",
	"totalPage" : "",
	"pageCount" : "",
	"totalCount" : "",
	"staffName" : "",//查询姓名
	"staffSex" : "", //筛选性别
	"staffStatus" : "",//筛选状态
	"staffInTime" : "",//入职时间
	"staffRecord" : ""
}
window.onload = function() {
	allPageVue = new Vue({
		el : '#allPage',
		data : {
			staffs : ""
			
		}
	});
	loadData();
}
//改变筛选条件
//查询姓名
var changeName = function(event) {
	queryConditionTemp.staffName = event.value;
	queryConditionTemp.currPage = "1";
	loadData();
}
//筛选员工职业状态
var changeStatus =function(event) {
	queryConditionTemp.staffStatus =event.value;
	queryConditionTemp.currPage = "1";
	loadData();
}
//性别筛选
var changeSex = function(event) {
	queryConditionTemp.staffSex = event.value;
	queryConditionTemp.currPage = "1";
	loadData();
}

var changeRecord = function(event) {
	queryConditionTemp.staffRecord = event.value;
	queryConditionTemp.currPage = "1";
	loadData();
}
//时间排序
var changeTime = function(event) {
	queryConditionTemp.staffInTime = event.value;
	queryConditionTemp.currPage = "1";
	loadData();
}

//进入修改页面
function createConfirmUpdata(event){
/*	alert("进入修改页面");*/
	enterUpdataPage(event);
}

//跳转到修改
function enterUpdataPage(event){
	window.location = "/rlzyos/staff/staff_page_UpdataStaff?rlzy_staff_id=" + event.id;
}

//显示数据
var loadData = function() {
	$('#mainPanel').hide();
	$('#loadingLayer').show();
	var queryCondition = {
		"staffVO.currPage" : queryConditionTemp.currPage,
		"staffVO.totalPage" : queryConditionTemp.totalPage,
		"staffVO.pageCount" : queryConditionTemp.pageCount,
		"staffVO.totalCount" : queryConditionTemp.totalCount,
		"staffVO.staff_name" : queryConditionTemp.staffName,
		"staffVO.staff_sex" : queryConditionTemp.staffSex,
		"staffVO.staff_status" : queryConditionTemp.staffStatus,
		"staffVO.staff_InTime" : queryConditionTemp.staffInTime,
		"staffVO.staff_record" : queryConditionTemp.staffRecord,
		
	}
	$.ajax({
		url : '/rlzyos/staff/staff_getStaffByPage',
		type : 'POST',
		data : queryCondition,
		success : function(data) {
			allPageVue.staffs = JSON.parse(data);
			
//			allPageVue.totalCount = allPageVue.staffs.totalCount;
//			allPageVue.currPage = allPageVue.staffs.currPage;
//			allPageVue.totalPage = allPageVue.staffs.totalPage;
//			allPageVue.pageCount = allPageVue.staffs.pageCount;
//			allPageVue.totalCount = allPageVue.staffs.totalCount;
//			
//			queryConditionTemp.currPage = allPageVue.staffs.currPage;
//			queryConditionTemp.totalPage = allPageVue.staffs.totalPage;
//			queryConditionTemp.pageCount = allPageVue.staffs.pageCount;
//			queryConditionTemp.totalCount = allPageVue.staffs.totalCount;
//			
			$('#loadingLayer').hide();
			$('#mainPanel').show();
		}
	});
}


var skipToDetail = function(event) {
	window.location = "/rlzyos/staff/staff_page_staffDetails?rlzy_staff_id="
			+ event.id;
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
/*		alert($('#skipPage').val());   */
		queryConditionTemp.currPage = $('#skipPage').val()
		loadData();
	} else {
		toastr.error("不存在这一页");
	}
}
var selectAllbox = function(event) {
	if (event.checked) {
		console.log("选中了");
		var che = document.getElementsByName("chooseCheckBox");
		for (var int = 0; int < che.length; int++) {
			che[int].checked = true;
		}
	} else {
		console.log("没选中");
		var che = document.getElementsByName("chooseCheckBox");
		for (var int = 0; int < che.length; int++) {
			che[int].checked = false;
		}
	}
}
var exportCurrPage = function() {
	window.location.href = "/rlzyos/staff/staff_exportStaff?staffVO.currPage=" 
			+ queryConditionTemp.currPage
//			+ "&staffVO.totalPage="
//			+ queryConditionTemp.totalPage
//			+ "&staffVO.pageCount="
//			+ queryConditionTemp.pageCount
//			+ "&staffVO.totalCount="
//			+ queryConditionTemp.totalCount
			+ "&staffVO.staff_name="
			+ queryConditionTemp.staffName
			+ "&staffVO.staff_sex="
			+ queryConditionTemp.staffSex
			+ "&staffVO.staff_status="
			+ queryConditionTemp.staffStatus
			+ "&staffVO.staff_InTime="
			+ queryConditionTemp.staffInTime
			+ "&staffVO.staff_record="
			+ queryConditionTemp.staffRecord;
}
			