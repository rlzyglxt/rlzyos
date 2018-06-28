
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
	var staffMove_timee = $("#staffMove_timee").val();
	var staffMove_remark =  $("#staffMove_remark").val();
	var staffMove_staff =  $("#staffMove_staff").val();
	var staff_addname =  $("#staff_addname").val();
	
	var addStaffMoveBtn =  $("#addStaffMoveBtn").val();
	var reg = new RegExp("^[0-9]*$");
	
	//js校验
	if(!reg.test(staffMove_staff) || staffMove_staff.length>5){ 
		 toastr.error("工号请输入5位数字以内！");
		 $("#staffMove_staff").val("");
		 return false;
	}else if(staff_addname=="没有该员工"){
		 toastr.error("你输入的工号没有对应的员工,请重新输入！");
		 $("#staff_addname").val("");
		return false;
	}else if(staffMove_remark.length > 25){
		$("#staffMove_remark").val("");
		 toastr.error("输入的字数不可大于25个");
		 return false;
	}else if(staffMove_nowdepartment==staffMove_bfdepartment && staffMove_nowduty==staffMove_bfduty){
		/*if(staffMove_nowduty==staffMove_bfduty){*/
			toastr.error("调动无效,请检查前后部门与职位是否变化");
			return false;	
	}else {/*if(staffMove_nowdepartment!=staffMove_bfdepartment)
		if(staffMove_nowduty!=staffMove_bfduty){
		*/
		$('#addStaffMove').modal('hide');
	/*alert("员工id"+addStaffMoveBtn);*/
	$.ajax({
		type : "POST",
		url : "/rlzyos/staff/staffMove_addStaffMove?staffMove_staff="
				+ addStaffMoveBtn,
		data : {
			"staffMoves[0].staffMove_staff" : addStaffMoveBtn,
			"staffMoves[0].staffMove_bfdepartment" : staffMove_bfdepartment,
			"staffMoves[0].staffMove_bfduty" : staffMove_bfduty,
			"staffMoves[0].staffMove_nowdepartment" : staffMove_nowdepartment,
			"staffMoves[0].staffMove_nowduty" : staffMove_nowduty,
			"staffMoves[0].staffMove_time" : staffMove_timee,
			"staffMoves[0].staffMove_remark" : staffMove_remark,
			"staffMove_nowduty" : staffMove_nowduty,
			"staffMove_nowdepartment" : staffMove_nowdepartment
		},
		success : function(data) {
			toastr.success('调动成功！');
			loadData();
		}
	});
	}
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
						+ result[i].staffdepartment_name
						+ "'>"
						+ result[i].staffdepartment_name
						+ "</option>";
			}
		}
	});
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
			//清空模态框
			$("#staff_addname").val("");
			$("#staffMove_staff").val("");
			$("#staffMove_bfdepartment").val("");
			$("#staffMove_bfduty").val("");
			$("#staffMove_nowdepartment").val("");
			$("#staffMove_nowduty").val("");
			$("#staffMove_timee").val("");
			$("#staffMove_remark").val("");
			$('#loadingLayer').hide();
			$('#mainPanel').show();
		}
	});
}
//删除员工调配信息
var deleteStaffMove = function(event) {
	/*alert(event.id);*/
	//删除
	$.ajax({
//		url : '/rlzyos/staff/staffMove_deleteStaffMove?staffMove.rlzy_staffMove_id='+event.id,
//		type : 'POST',
//		data : {
//			'staffMove.rlzy_staffMove_id' : event.id
//		}
		url : '/rlzyos/staff/staffMove_deleteStaffMove?staffmove.rlzy_staffMove_id='+event.id,
		type : 'POST',
		success:function(data){
			toastr.success('删除成功！');
			loadData();
		},
	});
}
//确认删除提示
function createConfirmDeleteMove(event) {
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
					deleteStaffMove(event);
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