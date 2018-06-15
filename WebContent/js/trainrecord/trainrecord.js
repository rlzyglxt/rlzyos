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
			list : ''
		}
	});
	loadData();
}

//改变筛选条件
//查询姓名
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
		"trainrecordVO.currPage" : queryConditionTemp.currPage,
		"trainrecordVO.totalPage" : queryConditionTemp.totalPage,
		"trainrecordVO.pageCount" : queryConditionTemp.pageCount,
		"trainrecordVO.totalCount" : queryConditionTemp.totalCount,
		"trainrecordVO.staff_number" : queryConditionTemp.staff_number,
	}	
	$.ajax({
		url : '/rlzyos/trainrecord/trainrecord_getTrainrecordByPage',
		type : 'POST',
		data : queryCondition,
		success : function(data) {
			var result = JSON.parse(data);
			allPageVue.list = result.list;
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

//进入修改员工履历模态框
function createConfirmUpdata(event) {
	$("#updateLoadingDiv").removeClass("hideDiv");
	$("#updateContent").addClass("hideDiv");
	getXmlHttp();
	xmlHttp.open("POST", "/rlzyos/trainrecord/trainrecord_getTrainrecordByExpId", true);
	var formData = new FormData();
	formData.append("rlzy_record_id", event.id);
	xmlHttp.send(formData);
	xmlHttp.onreadystatechange = getTrainrecordByIdBack;
}


//通过Id得到履历回显
function getTrainrecordByIdBack() {
	if (isBack()) {
		var result = xmlHttp.responseText;
		result = JSON.parse(result);
		$("#staff_number").val(result.staff_number);
		$("#staff_name").val(result.staff_name);
		$("#record_grade").val(result.record_grade);
		$("#train_name").val(result.train_name);
		$("#paper_name").val(result.paper_name);
		$("#updateTrainrecordBtn").val(result.rlzy_record_id);
		$("#updateLoadingDiv").addClass("hideDiv");
		$("#updateContent").removeClass("hideDiv");
	}
	getName(event);
}

//修改
function updateTrainrecord(event) {
	$("#updateLoadingDiv").removeClass("hideDiv");
	$("#updateContent").addClass("hideDiv");
	getXmlHttp();
	xmlHttp.open("POST", "/rlzyos/trainrecord/trainrecord_updataTrainrecord", true);
	var formData = new FormData(updatetrainrecordForm);
	formData.append("rlzy_record_id", event.value);
	xmlHttp.send(formData);
	xmlHttp.onreadystatechange = function() {
		if (isBack()) {
			toastr.success("修改成功！");
			$("#updateLoadingDiv").addClass("hideDiv");
			$("#updateContent").removeClass("hideDiv");
		}
	}
}

//删除
function createConfirmDelete(event) {
	getXmlHttp();
	xmlHttp.open("POST", "/rlzyos/trainrecord/trainrecord_deleteTrainrecord", true);
	var formData = new FormData();
	formData.append("rlzy_record_id", event.id);
	xmlHttp.send(formData);
	xmlHttp.onreadystatechange = function() {
		if (isBack()) {
			toastr.success("删除成功");
			loadData();
		}
	}
}



//查询姓名
function getName(event) {
	$.ajax({
			type : "POST",
			url : "/rlzyos/trainrecord/trainrecord_getStaffNameByStaffNumber",
			data : {
				"staff_number": event.value,
			}, 
			success : function(data) {
				var result = JSON.parse(data);
				var staff_name = $("#staff_addname");
				staff_name.val(result);
			}
		});
}

function addTrainrecord(){
	for (var i = 0; i < document.addtrainrecordForm.elements.length - 1; i++) {
		if (document.addtrainrecordForm.elements[i].value == "") {
			toastr.error("当前表单不能有空项");
			document.form.elements[i].focus();
			return false;
		}
	}
	getXmlHttp();
	xmlHttp.open("POST", "/rlzyos/trainrecord/trainrecord_addTrainrecord", true);
	var formData = new FormData(document.getElementById("addtrainrecordForm"));
	xmlHttp.send(formData);
	xmlHttp.onreadystatechange = function (){
		if(isBack())
		var result = xmlHttp.responseText;
		if(result == "addsuccess"){
			toastr.success('添加成功！')
			$("#addLoadingDiv").addClass("hideDiv");
			$("#addContent").removeClass("hideDiv");
			$("#addContent input").val("");
		}
	}
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