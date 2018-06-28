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
	"staffInTime" : "desc",//入职时间
	"staffRecord" : ""
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
			queryConditionTemp.staffStatus = result.staff_status;
			queryConditionTemp.staffInTime = result.staff_InTime;
			queryConditionTemp.staffRecord = result.staff_record;
			$('#loadingLayer').hide();
			$('#mainPanel').show();
		}
	});
}
//删除员工所有信息(离职)
var deleteStaff = function(event) {
//	getXmlHttp();
//	xmlHttp.open("POST", "/rlzyos/staff/staff_getStaffById", true);
//	var formData = new FormData();
//	formData.append("rlzy_staff_id", event.id);
//	xmlHttp.send(formData);
//	xmlHttp.onreadystatechange = function() {
//		if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
//			var result = xmlHttp.responseText;
//			result = JSON.parse(result);
//			if(result.staff_status=="离职"){//离职全部删除
				$.ajax({
					url : '/rlzyos/staff/staff_deleteStaff',
					type : 'POST',
					data : {
						'rlzy_staff_id' : event.id
					},success:function(data){
						toastr.success('删除成功！');
						loadData();
					}
				});
				console.log("删除员工履历");
				$.ajax({//删除员工的工作履历
					url : '/rlzyos/staff/staffExp_deleteStaffExps',
					type : 'POST',
					data : {
						'staffExp.staffExp_staff' : event.id
					}
				});
				console.log("删除合同信息");
				$.ajax({//删除员工的合同信息
					url : '/rlzyos/staff/staffAgreement_deleteStaffAgreements',
					type : 'POST',
					data : {
						'agreement.agreement_staff' : event.id
					}
				});
				
				//删除员工的奖金记录
				console.log("删除奖金信息");
				$.ajax({//删除员工的奖金信息
					url : '/rlzyos/staff/staffAward_deleteStaffAwards',
					type : 'POST',
					data : {
						'staffAward.award_staff' : event.id
					}
				});
				//删除调配记录
				console.log("删除调动信息");
				$.ajax({//删除员工的奖金信息
					url : '/rlzyos/staff/staffMove_deleteStaffMoves',
					type : 'POST',
					data : {
						'staffmove.staffMove_staff' : event.id
					}
				});
				//删除培训记录
				console.log("删除培训信息");
				$.ajax({//删除员工的奖金信息
					url : '/rlzyos/staff/staffTrain_deleteStaffTrains',
					type : 'POST',
					data : {
						'stafftrain.stafftrain_staff' : event.id
					}
				});
//				toastr.success("删除成功");
//			}else  {
//				toastr.warning("该员工还未离职,请离职后再来删除");
//			}
//		}
//	}
	//删除员工的基本信息
				
	
	
}
	
//确认删除提示
function createConfirmDelete(event) {
	getXmlHttp();
	xmlHttp.open("POST", "/rlzyos/staff/staff_getStaffById", true);
	var formData = new FormData();
	formData.append("rlzy_staff_id", event.id);
	xmlHttp.send(formData);
	xmlHttp.onreadystatechange = function() {
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
			var result = xmlHttp.responseText;
			result = JSON.parse(result);
			if(result.staff_status=="离职"){
					$.confirm({
						title : '',
						content : '一经删除该员工全部信息将清空，请慎重考虑，真的要删除吗？',
						type : 'red',
						autoClose : 'closeAction|5500',
						buttons : {
							deleteAction : {
								text : '确认',
								btnClass : 'btn-blue',
								action : function() {
									
									deleteStaff(event);
									/*alert(event);*/
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
				}else {
					toastr.error("该员工还未离职,请离职后再来删除");
				}
			}
	}		
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