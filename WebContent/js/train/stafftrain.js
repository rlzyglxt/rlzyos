var xmlHttp;

var allPageVue;
var queryConditionTemp = {
	"currPage" : "1",
	"totalPage" : "",
	"pageCount" : "10",
	"totalCount" : "",
	"staff_number" : "",//查询
	"staff_name" : "",
	"stafftrain_train" : ""
}

window.onload = function() {
	allPageVue = new Vue({
		el : '#allPage',
		data : {
			currPage : '1',
			totalPage : '',
			pageCount : '10',
			totalCount : '',
			staff_number : '',
			staffTrains : ''
		}
	});
	loadData();
	$.ajax({
		url : '/rlzyos/staff/staffTrain_getTrainName',
		type : 'post',
		success : function(data) {
			var result = JSON.parse(data);
			console.log(result);
			console.log(result.length);
			for (var i = 0; i < result.length; i++) {
				document.getElementById("stafftrain_train").innerHTML = document
						.getElementById("stafftrain_train").innerHTML
						+ "<option value='"
						+ result[i].train_name
						+ "'>"
						+ result[i].train_name
						+ "</option>";
			}
		}
	});
}

//改变筛选条件
//查询姓名
var changeName = function(event) {
	queryConditionTemp.staff_number = event.value;
/*	queryConditionTemp.staff_name = event.value;
	queryConditionTemp.stafftrain_train = event.value;*/
	queryConditionTemp.currPage = "1";
	loadData();
}

//显示
var loadData = function() {
	$('#mainPanel').hide();
	$('#loadingLayer').show();
	var queryCondition = {
		"staffTrainVO.currPage" : queryConditionTemp.currPage,
		"staffTrainVO.totalPage" : queryConditionTemp.totalPage,
		"staffTrainVO.pageCount" : queryConditionTemp.pageCount,
		"staffTrainVO.totalCount" : queryConditionTemp.totalCount,
		"staffTrainVO.staff_number" : queryConditionTemp.staff_number,
		"staffTrainVO.staff_name" : queryConditionTemp.staff_name,
		"staffTrainVO.stafftrain_train" : queryConditionTemp.stafftrain_train,
	}
	$.ajax({
		url : '/rlzyos/staff/staffTrain_getAllStaffTrainByPage',
		type : 'POST',
		data : queryCondition,
		success : function(data) {
			var result = JSON.parse(data);
			allPageVue.staffTrains = result.staffTrains;
			allPageVue.currPage = result.currPage;
			allPageVue.totalPage = result.totalPage;
			allPageVue.pageCount = result.pageCount;
			allPageVue.totalCount = result.totalCount;
			
			queryConditionTemp.currPage = result.currPage;
			queryConditionTemp.totalPage = result.totalPage;
			queryConditionTemp.pageCount = result.pageCount;
			queryConditionTemp.totalCount = result.totalCount;
			queryConditionTemp.staff_number = result.staff_number;
			queryConditionTemp.staff_name = result.staff_name;
			queryConditionTemp.stafftrain_train = result.stafftrain_train;
			$('#loadingLayer').hide();
			$('#mainPanel').show();
		}
	});
}

//进入修改模态框
function createConfirmUpdata(event) {
	$("#updateLoadingDiv").removeClass("hideDiv");
	$("#updateContent").addClass("hideDiv");
	getXmlHttp();
	xmlHttp.open("POST", "/rlzyos/train/stafftrain_getStaffTrainById", true);
	var formData = new FormData();
	formData.append("rlzy_stafftrain_id", event.id);
	xmlHttp.send(formData);
	xmlHttp.onreadystatechange = getStaffTrainByIdBack;
}


//通过Id得到履历回显
function getStaffTrainByIdBack() {
	if (isBack()) {
		var result = xmlHttp.responseText;
		result = JSON.parse(result);
		$("#stafftrain_staff").val(result.stafftrain_staff);
		$("#stafftrain_train").val(result.stafftrain_train);
		$("#stafftrain_score").val(result.stafftrain_score);
		$("#stafftrain_certificate").val(result.stafftrain_certificate);
		$("#updateStaffTrainBtn").val(result.rlzy_stafftrain_id);
		$("#updateLoadingDiv").addClass("hideDiv");
		$("#updateContent").removeClass("hideDiv");
	}
}


//修改
function updateStaffTrain(event) {
	$("#updateLoadingDiv").removeClass("hideDiv");
	$("#updateContent").addClass("hideDiv");
	getXmlHttp();
	xmlHttp.open("POST", "/rlzyos/staff/staffTrain_updateStaffTrain", true);
	var formData = new FormData(updatestafftrainForm);
	formData.append("rlzy_stafftrain_id", event.value);
	xmlHttp.send(formData);
	xmlHttp.onreadystatechange = function() {
		if (isBack()) {
			toastr.success("修改成功！");
			$("#updateLoadingDiv").addClass("hideDiv");
			$("#updateContent").removeClass("hideDiv");
			$("#updateContent input").val("");
		}
	}
}

//查询姓名
function getName(event) {
	$.ajax({
			type : "POST",
			url : "/rlzyos/train/stafftrain_getStaffNameByStaffNumber",
			data : {
				"stafftrain_staff": event.value,
			},
			success : function(data) {
				var result = JSON.parse(data);
				var staff_name = $("#staff_addname");
				staff_name.val(result);
			}
		});
}

//删除
var deleteStaffTrain = function(event) {
	$.ajax({
		url : '/rlzyos/train/stafftrain_deleteStaffTrain',
		type : 'POST',
		data : {
			'rlzy_stafftrain_id' : event.id
		}
	});
}

//确认删除提示
function createConfirmDelete(event) {
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
					deleteStaffTrain(event);
					console.log("删除全部信息"+event);
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