var xmlHttp;

window.onload = function() {
	getXmlHttp();
	xmlHttp.open("POST", "/rlzyos/train/train_getTrainByPage", true);
	alert("onload");
	var formData = new FormData();
	formData.append("currPage", "1");
	formData.append("queryString", "");
	xmlHttp.send(formData);
	alert("onload323");
	xmlHttp.onreadystatechange = loadTrainBack;
}

function cleanInput() {
	$("#addTrainForm input").val("");
}

function addTrain() {
	for (var i = 0; i < document.addTrainForm.elements.length - 1; i++) {
		if (document.addTrainForm.elements[i].value == "") {
			toastr.error("当前表单不能有空项");
			document.form1.elements[i].focus();
			return false;
		}
	}
	$("#addContent").addClass("hideDiv");
	$("#addLoadingDiv").removeClass("hideDiv");
	xmlHttp.open("POST", "/rlzyos/train/train_addTrain", true);
	var formData = new FormData(document.getElementById("addTrainForm"));
	xmlHttp.send(formData);
	xmlHttp.onreadystatechange = addTrainBack;
}

function addTrainBack() {
	if (isBack()) {
		var result = xmlHttp.responseText;
		
		alert("addtrain")
		if (result == "培训名称存在") {
			toastr.error("培训名称已经存在请重新填写培训名称！");
			$("#addLoadingDiv").addClass("hideDiv");
			$("#addContent").removeClass("hideDiv");
		} else {
			toastr.success("上传成功！");
			$("#addLoadingDiv").addClass("hideDiv");
			$("#addContent").removeClass("hideDiv");
			$("#addContent input").val("");
			$("#addContent input[name='train_name']").focus();
		}
	}
}

function deleteTrain(event) {
	alert(event.value);
	getXmlHttp();
	xmlHttp.open("POST", "/rlzyos/train/train_deleteTrain", true);
	var formData = new FormData();
	formData.append("train_id", event.value);
	xmlHttp.send(formData);
	xmlHttp.onreadystatechange = deleteTrainBack;
}

function deleteTrainBack() {
	if (isBack()) {
		toastr.success("删除成功");
		reLoadTrain();
	}
}

function updateTrain(event) {
	$("#updateLoadingDiv").removeClass("hideDiv");
	$("#updateContent").addClass("hideDiv");
	getXmlHttp();
	xmlHttp.open("POST", "/rlzyos/train/train_updateTrain", true);
	var formData = new FormData(updateTrainForm);
	formData.append("train_id", event.value);
	xmlHttp.send(formData);
	xmlHttp.onreadystatechange = updateTrainBack;
}

function updateTrainBack() {
	if (isBack()) {
		toastr.success("修改成功！");
		$("#updateLoadingDiv").addClass("hideDiv");
		$("#updateContent").removeClass("hideDiv");
	}
}

function getTrainById(event) {
	$("#updateContent").addClass("hideDiv");
	$("#updateLoadingDiv").removeClass("hideDiv");
	getXmlHttp();
	xmlHttp.open("POST", "/rlzyos/train/train_getTrainById", true);
	var formData = new FormData();
	formData.append("train_id", event.value);
	xmlHttp.send(formData);
	xmlHttp.onreadystatechange = getTrainByIdBack;
}

function getTrainByIdBack() {
	if (isBack()) {
		var result = xmlHttp.responseText;
		result = JSON.parse(result);
		$("#train_name_update").val(result.train_name);
		$("#train_begintime_update").val(result.train_begintime);
		$("#train_endtime_update").val(result.train_endtime);
		$("#train_cost_update").val(result.train_cost);
		$("#train_content_update").val(result.train_content);
		$("#updateBtn").val(result.rlzy_train_id);
		$("#updateLoadingDiv").addClass("hideDiv");
		$("#updateContent").removeClass("hideDiv");
	}
}

function reLoadTrain() {
	$("#addContent input").val("");
	$("#addContent input[name='train_name']").focus();
	document.getElementById("trainTable").innerHTML = "<tr style='background-color: #696969; color: white;'><td>培训名称</td><td>开始时间</td><td>结束时间</td><td>培训费用</td><td>培训介绍</td><td>操作</td></tr>";
	$("#loadingDiv").removeClass("hideDiv");
	$("#tableDiv").addClass("hideDiv");
	getXmlHttp();
	xmlHttp.open("POST", "/rlzyos/train/train_getTrainByPage", true);
	var formData = new FormData();
	formData.append("currPage", "1");
	formData.append("queryString",'');
	xmlHttp.send(formData);
	xmlHttp.onreadystatechange = loadTrainBack;
}

function loadTrainBack() {
	if (isBack()) {
		var result = xmlHttp.responseText;
		alert(result);
		result = JSON.parse(result);
		var trainTable = document.getElementById("trainTable");
		var hideQueryString = document.getElementById("hideQueryString");
		var hideCurrPage = document.getElementById("hideCurrPage");
		var queryString = document.getElementById("queryString");
		var currPage = document.getElementById("currPage");
		var totalPage = document.getElementById("totalPage");
		var skipPage = document.getElementById("skipPage");
		for (var i = 0; i < result.list.length; i++) {
			trainTable.innerHTML = trainTable.innerHTML
					+ "<tr class='trHover'><td>"
					+ result.list[i].train_name
					+ "</td>"
					+ "<td>"
					+ result.list[i].train_begintime
					+ "</td>"
					+ "<td>"
					+ result.list[i].train_endtime
					+ "</td>"
					+ "<td>"
					+ result.list[i].train_cost
					+ "</td>"
					+ "<td>"
					+ result.list[i].train_content
					+ "</td>"
					+ "<td>"
					+ "<button onclick='deleteTrain(this)' value='"
					+ result.list[i].rlzy_train_id
					+ "' class='btn btn-danger managerPower'>删除</button>"
					+ "<button onclick='getTrainById(this)' value='"
					+ result.list[i].rlzy_train_id
					+ "' data-toggle='modal' data-target='#updateTrain' style='margin-left: 5px;' class='btn btn-primary managerPower'>修改</button>"
					+ "</td></tr>";
		}
		hideQueryString.value = result.queryString;
		hideCurrPage.value = result.currPage;
		queryString.value = result.queryString;
		currPage.innerHTML = result.currPage;
		totalPage.innerHTML = result.totalPage;
		skipPage.value = result.currPage;
		$("#loadingDiv").addClass("hideDiv");
		$("#tableDiv").removeClass("hideDiv");
	}
}

document.onkeydown = keyListener;
function keyListener(e) {
	// 当按下回车键，执行我们的代码
	if (e.keyCode == 13) {
		// 我们要做的事情
		queryTrain();
	}
}
function queryTrain() {
	$("#loadingDiv").removeClass("hideDiv");
	$("#tableDiv").addClass("hideDiv");
	document.getElementById("trainTable").innerHTML = "<tr style='background-color: #696969; color: white;'><td>培训名称</td><td>开始时间</td><td>结束时间</td><td>培训费用</td><td>培训介绍</td><td>操作</td></tr>";
	var queryString = document.getElementById("queryString").value;
	getXmlHttp();
	xmlHttp.open("POST", "/rlzyos/train/train_getTrainByPage", true);
	var formData = new FormData();
	formData.append("currPage", "1");
	formData.append("queryString", queryString);
	xmlHttp.send(formData);
	xmlHttp.onreadystatechange = loadTrainBack;
}

function skipToIndexPage() {
	var currPage = document.getElementById("hideCurrPage").value;
	var totalPage = document.getElementById("totalPage").innerHTML;
	var queryString = document.getElementById("hideQueryString").value;
	if (currPage == "1") {
		toastr.error("已经是第一页");
	} else {
		$("#loadingDiv").removeClass("hideDiv");
		$("#tableDiv").addClass("hideDiv");
		document.getElementById("trainTable").innerHTML = "<tr style='background-color: #696969; color: white;'><td>培训名称</td><td>开始时间</td><td>结束时间</td><td>培训费用</td><td>培训介绍</td><td>操作</td></tr>";
		var queryString = document.getElementById("queryString").value;
		getXmlHttp();
		xmlHttp.open("POST", "/rlzyos/train/train_getTrainByPage", true);
		var formData = new FormData();
		formData.append("currPage", "1");
		formData.append("queryString", queryString);
		xmlHttp.send(formData);
		xmlHttp.onreadystatechange = loadTrainBack;
	}
}

function skipToNextPage() {
	var currPage = document.getElementById("hideCurrPage").value;
	var totalPage = document.getElementById("totalPage").innerHTML;
	var queryString = document.getElementById("hideQueryString").value;
	if (currPage == totalPage) {
		toastr.error("已经是最后一页");
	} else {

		$("#loadingDiv").removeClass("hideDiv");
		$("#tableDiv").addClass("hideDiv");
		document.getElementById("trainTable").innerHTML = "<tr style='background-color: #696969; color: white;'><td>培训名称</td><td>开始时间</td><td>结束时间</td><td>培训费用</td><td>培训介绍</td><td>操作</td></tr>";
		var queryString = document.getElementById("queryString").value;
		getXmlHttp();
		xmlHttp.open("POST", "/rlzyos/train/train_getTrainByPage", true);
		var formData = new FormData();
		formData.append("currPage", ++currPage);
		formData.append("queryString", queryString);
		xmlHttp.send(formData);
		xmlHttp.onreadystatechange = loadTrainBack;
	}
}

function skipToPrimaryPage() {
	var currPage = document.getElementById("hideCurrPage").value;
	var totalPage = document.getElementById("totalPage").innerHTML;
	var queryString = document.getElementById("hideQueryString").value;
	if (currPage == "1") {
		toastr.error("已经是第一页");
	} else {
		$("#loadingDiv").removeClass("hideDiv");
		$("#tableDiv").addClass("hideDiv");
		document.getElementById("trainTable").innerHTML = "<tr style='background-color: #696969; color: white;'><td>培训名称</td><td>开始时间</td><td>结束时间</td><td>培训费用</td><td>培训介绍</td><td>操作</td></tr>";
		var queryString = document.getElementById("queryString").value;
		getXmlHttp();
		xmlHttp.open("POST", "/rlzyos/train/train_getTrainByPage", true);
		var formData = new FormData();
		formData.append("currPage", --currPage);
		formData.append("queryString", queryString);
		xmlHttp.send(formData);
		xmlHttp.onreadystatechange = loadTrainBack;
	}
}
function skipToLastPage() {
	var currPage = document.getElementById("hideCurrPage").value;
	var totalPage = document.getElementById("totalPage").innerHTML;
	var queryString = document.getElementById("hideQueryString").value;
	if (currPage == totalPage) {
		toastr.error("已经是最后一页");
	} else {
		$("#loadingDiv").removeClass("hideDiv");
		$("#tableDiv").addClass("hideDiv");
		document.getElementById("trainTable").innerHTML = "<tr style='background-color: #696969; color: white;'><td>培训名称</td><td>开始时间</td><td>结束时间</td><td>培训费用</td><td>培训介绍</td><td>操作</td></tr>";
		var queryString = document.getElementById("queryString").value;
		getXmlHttp();
		xmlHttp.open("POST", "/rlzyos/train/train_getTrainByPage", true);
		var formData = new FormData();
		formData.append("currPage", totalPage);
		formData.append("queryString", queryString);
		xmlHttp.send(formData);
		xmlHttp.onreadystatechange = loadTrainBack;
	}
}
function skipToArbitrarilyPage() {
	var currPage = document.getElementById("skipPage").value;
	var totalPage = document.getElementById("totalPage").innerHTML;
	var queryString = document.getElementById("hideQueryString").value;
	if (currPage <= 0 || currPage > totalPage) {
		toastr.error("不存在此页");
	} else {
		$("#loadingDiv").removeClass("hideDiv");
		$("#tableDiv").addClass("hideDiv");
		document.getElementById("trainTable").innerHTML = "<tr style='background-color: #696969; color: white;'><td>培训名称</td><td>开始时间</td><td>结束时间</td><td>培训费用</td><td>培训介绍</td><td>操作</td></tr>";
		var queryString = document.getElementById("queryString").value;
		getXmlHttp();
		xmlHttp.open("POST", "/rlzyos/train/train_getTrainByPage", true);
		var formData = new FormData();
		formData.append("currPage", currPage);
		formData.append("queryString", queryString);
		xmlHttp.send(formData);
		xmlHttp.onreadystatechange = loadTrainBack;
	}
}

function getXmlHttp() {
	if (window.XMLHttpRequest) {
		// IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
		xmlHttp = new XMLHttpRequest();
	} else {
		// IE6, IE5 浏览器执行代码
		xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
}

function isBack() {
	if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
		return true;
	} else {
		return false;
	}
}
