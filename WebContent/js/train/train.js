var xmlHttp;

var allPageVue;
var queryConditionTemp = {
	"currPage" : "1",
	"totalPage" : "",
	"pageSize" : "10",
	"count" : "",
	"queryString" : ""//查询
}

window.onload = function() {
	allPageVue = new Vue({
		el : '#allPage',
		data : {
			currPage : '1',
			totalPage : '',
			pageSize : '10',
			count : '',
			queryString : '',
			list : ''
		}
	});
	loadData();
}

//改变筛选条件
//查询姓名
var changeName = function(event) {
	queryConditionTemp.queryString = event.value;
	queryConditionTemp.currPage = "1";
	loadData();
}

//显示员工履历
var loadData = function() {
	$('#mainPanel').hide();
	$('#loadingLayer').show();
	var queryCondition = {
		"trainVO.currPage" : queryConditionTemp.currPage,
		"trainVO.totalPage" : queryConditionTemp.totalPage,
		"trainVO.pageSize" : queryConditionTemp.pageSize,
		"trainVO.count" : queryConditionTemp.count,
		"trainVO.queryString" : queryConditionTemp.queryString,
	}	
	$.ajax({
		url : '/rlzyos/train/train_getTrainByPage',
		type : 'POST',
		data : queryCondition,
		success : function(data) {
			var result = JSON.parse(data);
			allPageVue.list = result.list;
			allPageVue.currPage = result.currPage;
			allPageVue.totalPage = result.totalPage;
			allPageVue.pageSize = result.pageSize;
			allPageVue.count = result.count;
			
			queryConditionTemp.currPage = result.currPage;
			queryConditionTemp.totalPage = result.totalPage;
			queryConditionTemp.pageSize = result.pageSize;
			queryConditionTemp.count = result.count;
			queryConditionTemp.queryString = result.queryString;
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
	xmlHttp.open("POST", "/rlzyos/train/train_getTrainById", true);
	var formData = new FormData();
	formData.append("train_id", event.id);
	xmlHttp.send(formData);
	xmlHttp.onreadystatechange = getTrainByIdBack;
}


//通过Id得到履历回显
function getTrainByIdBack() {
	if (isBack()) {
		var result = xmlHttp.responseText;
		result = JSON.parse(result);
		$("#train_name").val(result.train_name);
		$("#train_begintime").val(result.train_begintime);
		$("#train_endtime").val(result.train_endtime);
		$("#train_cost").val(result.train_cost);
		$("#train_content").val(result.train_content);
		$("#updateTrainBtn").val(result.rlzy_train_id);
		$("#updateLoadingDiv").addClass("hideDiv");
		$("#updateContent").removeClass("hideDiv");
	}
}

//修改
function updateTrain(event) {
	$("#updateLoadingDiv").removeClass("hideDiv");
	$("#updateContent").addClass("hideDiv");
	getXmlHttp();
	xmlHttp.open("POST", "/rlzyos/train/train_updateTrain", true);
	var formData = new FormData(updatetrainForm);
	formData.append("train_id", event.value);
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
	xmlHttp.open("POST", "/rlzyos/train/train_deleteTrain", true);
	var formData = new FormData();
	formData.append("train_id", event.id);
	xmlHttp.send(formData);
	xmlHttp.onreadystatechange = function() {
		if (isBack()) {
			toastr.success("删除成功");
			loadData();
		}
	}
}


function addTrain(){
	for (var i = 0; i < document.addtrainForm.elements.length - 1; i++) {
		if (document.addtrainForm.elements[i].value == "") {
			toastr.error("当前表单不能有空项");
			document.form.elements[i].focus();
			return false;
		}
	}
	getXmlHttp();
	xmlHttp.open("POST", "/rlzyos/train/train_addTrain", true);
	var formData = new FormData(document.getElementById("addtrainForm"));
	xmlHttp.send(formData);
	xmlHttp.onreadystatechange = function (){
		if (isBack()) {
			var result = xmlHttp.responseText;
			if (result == "samename") {
				toastr.error("培训名称已经存在请重新填写培训名称！");
				$("#addLoadingDiv").addClass("hideDiv");
				$("#addContent").removeClass("hideDiv");
			} else {
				toastr.success("上传成功！");
				$("#addLoadingDiv").addClass("hideDiv");
				$("#addContent").removeClass("hideDiv");
				$("#addContent input").val("");
			}
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