/**
 * 
 */
var allPageVue;
var queryConditionTemp = {
	"currPage" : "1",
	"totalPage" : "",
	"pageCount" : "10",
	"totalCount" : "",
	"staffName" : "",//查询姓名
	"staffSex" : "", //筛选性别
	"staffStatus" : "",//筛选状态
}
window.onload = function() {
	allPageVue = new Vue({
		el : '#allPage',
		data : {
			currPage : '1',
			totalPage : '',
			pageCount : '10',
			totalCount : '',
			staffs : ''
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


function enterRelivePage(event){
	window.location = "/rlzyos/staff/Staff_intoUpdate?rlzy_staff_id="
		+ event.id;
}
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
	}	
	$.ajax({
		url : '/rlzyos/staff/staff_getStaffByPage',
		type : 'POST',
		data : queryCondition,
		success : function(data) {
			var result = JSON.parse(data);
			allPageVue.staffs = result.staffs;
			allPageVue.currPage = result.currPage;
			allPageVue.totalPage = result.totalPage;
			allPageVue.pageCount = result.pageCount;
			allPageVue.totalCount = result.totalCount;
			
			queryConditionTemp.currPage = result.currPage;
			queryConditionTemp.totalPage = result.totalPage;
			queryConditionTemp.pageCount = result.pageCount;
			queryConditionTemp.totalCount = result.totalCount;
			
			queryConditionTemp.staffName = result.staff_name;
			queryConditionTemp.staffSex = result.staff_sex;
			queryConditionTemp.staffStatus = result.staff_status
			$('#loadingLayer').hide();
			$('#mainPanel').show();
		}
	});
}

//相应分页

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