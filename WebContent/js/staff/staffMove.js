window.onload = function() {
	/*alert("获得部门");*/
	$.ajax({
		url : '/rlzyos/depaterment/depaterment_getAllDepaterment',
		type : 'post',
		success : function(data) {
			var result = JSON.parse(data);
			console.log(result);
			console.log(result.length);
			for (var i = 0; i < result.length; i++) {
				document.getElementById("staffMove_nowdepartment").innerHTML = document
						.getElementById("staffMove_nowdepartment").innerHTML
						+ "<option value='"
						+ result[i].rlzy_staffdepartment_id
						+ "'>"
						+ result[i].staffdepartment_name
						+ "</option>";
			}
		}
	});
}
var allPageVue;
//通过工号得到员工id,员工姓名，员工部门员工职务
function getValue(event){
	$.ajax({
		type : "POST",
		url : "/rlzyos/staff/staffMove_getValueByNumber",
		data : {
			"staff_number": event.value,
		},
		success : function(data) {
			var result = JSON.parse(data);
			var staff_name = $("#staff_addname");
			var staff_depaterment = $("#staffMove_bfdepartment");
			var staff_duty = $("#staffMove_bfduty");
			var staff_confirm = $("#addStaffMoveBtn");
			if(result==""){
				staff_name.val("没有该员工");
				staff_depaterment.val("没有该部门");
				staff_duty.val("没有该职务");
			}else{
				console.log("姓名为"+result[0].staff_name);
				staff_name.val(result[0].staff_name);
				staff_depaterment.val(result[0].staff_depaterment);
				staff_duty.val(result[0].staff_duty);
				staff_confirm.val(result[0].rlzy_staff_id);
			}	
		}
	});
}
//一个员工工作调动
function addStaffMove() {
	console.log("工作调动添加");
	// 添加数据
	var staffMove_bfdepartment = $("#staffMove_bfdepartment").val();
	var staffMove_bfduty = $("#staffMove_bfduty").val();
	var staffMove_nowdepartment = $("#staffMove_nowdepartment").val();
	var staffMove_nowduty = $("#staffMove_nowduty").val();
	var staffMove_time = $("#staffMove_time").val();
	var staffMove_remark =  $("#staffMove_remark").val();
	
	var addStaffMoveBtn =  $("#addStaffMoveBtn").val();
	
	alert("员工id"+addStaffMoveBtn);
	$.ajax({
		type : "POST",
		url : "/rlzyos/staff/staffMove_addStaffMove?staffMove_staff="
				+ addStaffMoveBtn,
		data : {
			"staffMove[0].staffMove_staff" : addStaffMoveBtn,
			"staffMove[0].staffMove_bfdepartment" : staffMove_bfdepartment,
			"staffMove[0].staffMove_bfduty" : staffMove_bfduty,
			"staffMove[0].staffMove_nowdepartment" : staffMove_nowdepartment,
			"staffMove[0].staffMove_nowduty" : staffMove_nowduty,
			"staffMove[0].staffMove_time" : staffMove_time,
			"staffMove[0].staffMove_remark" : staffMove_remark,
			"staffMove_nowduty" : staffMove_nowduty,
			"staffMove_nowdepartment" : staffMove_nowdepartment
		},
		success : function(data) {
			toastr.success('调动成功！');
		}
	});
}


var queryConditionTemp = {
	"currPage" : "1",
	"totalPage" : "",
	"pageCount" : "10",
	"totalCount" : "",
	"staffName" : "",//查询姓名
	"staffNumber" : "", //筛选性别
	"staffMoveTime" : "desc"  //时间排序
}
window.onload = function() {
	allPageVue = new Vue({
		el : '#allPage',
		data : {
			currPage : '1',
			totalPage : '',
			pageCount : '10',
			totalCount : '',
			staffMoves : ''
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
var changeTime = function(event) {
	queryConditionTemp.staffMove_time = event.value;
	queryConditionTemp.currPage = "1";
	loadData();
}
//显示数据
var loadData = function() {
	$('#mainPanel').hide();
	$('#loadingLayer').show();
	var queryCondition = {
		"staffMoveVO.currPage" : queryConditionTemp.currPage,
		"staffMoveVO.totalPage" : queryConditionTemp.totalPage,
		"staffMoveVO.pageCount" : queryConditionTemp.pageCount,
		"staffMoveVO.totalCount" : queryConditionTemp.totalCount,
		"staffMoveVO.staff_name" : queryConditionTemp.staff_name,
		"staffMoveVO.staff_number" : queryConditionTemp.staff_number,
		"staffMoveVO.staffMove_time" : queryConditionTemp.staffMove_time,
	}	
	$.ajax({
		url : '/rlzyos/staff/staffMove_getAllStaffMoveByPage',
		type : 'POST',
		data : queryCondition,
		success : function(data) {
			var result = JSON.parse(data);
			allPageVue.staffMoves = result.staffmoves;
			allPageVue.currPage = result.currPage;
			allPageVue.totalPage = result.totalPage;
			allPageVue.pageCount = result.pageCount;
			allPageVue.totalCount = result.totalCount;
			
			queryConditionTemp.currPage = result.currPage;
			queryConditionTemp.totalPage = result.totalPage;
			queryConditionTemp.pageCount = result.pageCount;
			queryConditionTemp.totalCount = result.totalCount;
			
			queryConditionTemp.staff_name = result.staff_name;
			queryConditionTemp.staff_number = result.staff_number;
			queryConditionTemp.staffMove_time = result.staffMove_time;
			$('#loadingLayer').hide();
			$('#mainPanel').show();
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