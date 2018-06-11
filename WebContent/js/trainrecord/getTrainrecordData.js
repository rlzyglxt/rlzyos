var xmlHttp;

window.onload = function() {
	getXmlHttp();
	xmlHttp.open("POST", "/rlzyos/trainrecord/trainrecord_getTrainrecordByPage", true);
	alert("onload");
	var formData = new FormData();
	formData.append("currPage", "1");
	formData.append("queryString", "");
	xmlHttp.send(formData);
	alert("onload323");
	xmlHttp.onreadystatechange = loadTrainrecordBack;
}

function cleanInput() {
	$("#addTrainrecordForm input").val("");
}

function addTrainrecord() {
	for (var i = 0; i < document.addTrainrecordForm.elements.length - 1; i++) {
		if (document.addTrainrecordForm.elements[i].value == "") {
			toastr.error("当前表单不能有空项");
			document.form1.elements[i].focus();
			return false;
		}
	}
	$("#addContent").addClass("hideDiv");
	$("#addLoadingDiv").removeClass("hideDiv");
	xmlHttp.open("POST", "/rlzyos/trainrecord/trainrecord_addTrainrecord", true);
	var formData = new FormData(document.getElementById("addTrainrecordForm"));
	xmlHttp.send(formData);
	xmlHttp.onreadystatechange = addTrainrecordBack;
}

function addTrainrecordBack() {
	if (isBack()) {
		alert("addtrainrecord")
			toastr.success("上传成功！");
			$("#addLoadingDiv").addClass("hideDiv");
			$("#addContent").removeClass("hideDiv");
			$("#addContent input").val("");
		}
	}


function deleteTrainrecord(event) {
	alert(event.value);
	getXmlHttp();
	xmlHttp.open("POST", "/rlzyos/trainrecord/trainrecord_deleteTrainrecord", true);
	var formData = new FormData();
	formData.append("record_id", event.value);
	xmlHttp.send(formData);
	xmlHttp.onreadystatechange = deleteTrainrecordBack;
}

function deleteTrainrecordBack() {
	if (isBack()) {
		toastr.success("删除成功");
		reLoadTrainrecord();
	}
}

function updateTrainrecord(event) {
	$("#updateLoadingDiv").removeClass("hideDiv");
	$("#updateContent").addClass("hideDiv");
	getXmlHttp();
	xmlHttp.open("POST", "/rlzyos/trainrecord/trainrecord_updateTrainrecord", true);
	var formData = new FormData(updateTrainrecordForm);
	formData.append("record_id", event.value);
	xmlHttp.send(formData);
	xmlHttp.onreadystatechange = updateTrainrecordBack;
}

function updateTrainrecordBack() {
	if (isBack()) {
		toastr.success("修改成功！");
		$("#updateLoadingDiv").addClass("hideDiv");
		$("#updateContent").removeClass("hideDiv");
		$("#addContent input").val("");
	}
}

function getTrainrecordById(event) {
	$("#updateContent").addClass("hideDiv");
	$("#updateLoadingDiv").removeClass("hideDiv");
	getXmlHttp();
	xmlHttp.open("POST", "/rlzyos/trainrecord/trainrecord_getTrainrecordById", true);
	var formData = new FormData();
	formData.append("record_id", event.value);
	xmlHttp.send(formData);
	xmlHttp.onreadystatechange = getTrainrecordByIdBack;
}

function getTrainrecordByIdBack() {
	if (isBack()) {
		var result = xmlHttp.responseText;
		result = JSON.parse(result);
		$("#staff_number_update").val(result.staff_number);
		$("#staff_name_update").val(result.staff_name);
		$("#record_grade_update").val(result.record_grade);
		$("#train_name_update").val(result.train_name);
		$("#paper_name_update").val(result.paper_name);
		$("#updateBtn").val(result.rlzy_record_id);
		$("#updateLoadingDiv").addClass("hideDiv");
		$("#updateContent").removeClass("hideDiv");
	}
}

function reLoadTrainrecord() {
	$("#addContent input").val("");
	$("#addContent input[name='staff_number']").focus();
	document.getElementById("trainrecordTable").innerHTML = "<tr style='background-color: #696969; color: white;'><td>员工工号</td><td>员工姓名</td><td>成绩</td><td>培训名称</td><td>证书名称</td><td>操作</td></tr>";
	$("#loadingDiv").removeClass("hideDiv");
	$("#tableDiv").addClass("hideDiv");
	getXmlHttp();
	xmlHttp.open("POST", "/rlzyos/trainrecord/trainrecord_getTrainrecordByPage", true);
	var formData = new FormData();
	formData.append("currPage", "1");
	formData.append("queryString",'');
	xmlHttp.send(formData);
	xmlHttp.onreadystatechange = loadTrainrecordBack;
}

function loadTrainrecordBack() {
	if (isBack()) {
		var result = xmlHttp.responseText;
		alert(result);
		result = JSON.parse(result);
		var trainrecordTable = document.getElementById("trainrecordTable");
		var hideQueryString = document.getElementById("hideQueryString");
		var hideCurrPage = document.getElementById("hideCurrPage");
		var queryString = document.getElementById("queryString");
		var currPage = document.getElementById("currPage");
		var totalPage = document.getElementById("totalPage");
		var skipPage = document.getElementById("skipPage");
		for (var i = 0; i < result.list.length; i++) {
			trainrecordTable.innerHTML = trainrecordTable.innerHTML
					+ "<tr class='trHover'><td>"
					+ result.list[i].staff_number
					+ "</td>"
					+ "<td>"
					+ result.list[i].staff_name
					+ "</td>"
					+ "<td>"
					+ result.list[i].record_grade
					+ "</td>"
					+ "<td>"
					+ result.list[i].train_name
					+ "</td>"
					+ "<td>"
					+ result.list[i].paper_name
					+ "</td>"
					+ "<td>"
					+ "<button onclick='deleteTrainrecord(this)' value='"
					+ result.list[i].rlzy_record_id
					+ "' class='btn btn-danger managerPower'>删除</button>"
					+ "<button onclick='getTrainrecordById(this)' value='"
					+ result.list[i].rlzy_record_id
					+ "' data-toggle='modal' data-target='#updateTrainrecord' style='margin-left: 5px;' class='btn btn-primary managerPower'>修改</button>"
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
		queryTrainrecord();
	}
}
function queryTrainrecord() {
	$("#loadingDiv").removeClass("hideDiv");
	$("#tableDiv").addClass("hideDiv");
	document.getElementById("trainrecordTable").innerHTML = "<tr style='background-color: #696969; color: white;'><td>员工工号</td><td>员工姓名</td><td>成绩</td><td>培训名称</td><td>证书名称</td><td>操作</td></tr>";
	var queryString = document.getElementById("queryString").value;
	getXmlHttp();
	xmlHttp.open("POST", "/rlzyos/trainrecord/trainrecord_getTrainrecordByPage", true);
	var formData = new FormData();
	formData.append("currPage", "1");
	formData.append("queryString", queryString);
	xmlHttp.send(formData);
	xmlHttp.onreadystatechange = loadTrainrecordBack;
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
		document.getElementById("trainrecordTable").innerHTML = "<tr style='background-color: #696969; color: white;'><td>员工工号</td><td>员工姓名</td><td>成绩</td><td>培训名称</td><td>证书名称</td><td>操作</td></tr>";
		var queryString = document.getElementById("queryString").value;
		getXmlHttp();
		xmlHttp.open("POST", "/rlzyos/trainrecord/trainrecord_getTrainrecordByPage", true);
		var formData = new FormData();
		formData.append("currPage", "1");
		formData.append("queryString", queryString);
		xmlHttp.send(formData);
		xmlHttp.onreadystatechange = loadTrainrecordBack;
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
		document.getElementById("trainrecordTable").innerHTML = "<tr style='background-color: #696969; color: white;'><td>员工工号</td><td>员工姓名</td><td>成绩</td><td>培训名称</td><td>证书名称</td><td>操作</td></tr>";
		var queryString = document.getElementById("queryString").value;
		getXmlHttp();
		xmlHttp.open("POST", "/rlzyos/trainrecord/trainrecord_getTrainrecordByPage", true);
		var formData = new FormData();
		formData.append("currPage", ++currPage);
		formData.append("queryString", queryString);
		xmlHttp.send(formData);
		xmlHttp.onreadystatechange = loadTrainrecordBack;
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
		document.getElementById("trainrecordTable").innerHTML = "<tr style='background-color: #696969; color: white;'><td>员工工号</td><td>员工姓名</td><td>成绩</td><td>培训名称</td><td>证书名称</td><td>操作</td></tr>";
		var queryString = document.getElementById("queryString").value;
		getXmlHttp();
		xmlHttp.open("POST", "/rlzyos/trainrecord/trainrecord_getTrainrecordByPage", true);
		var formData = new FormData();
		formData.append("currPage", --currPage);
		formData.append("queryString", queryString);
		xmlHttp.send(formData);
		xmlHttp.onreadystatechange = loadTrainrecordBack;
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
		document.getElementById("trainrecordTable").innerHTML = "<tr style='background-color: #696969; color: white;'><td>员工工号</td><td>员工姓名</td><td>成绩</td><td>培训名称</td><td>证书名称</td><td>操作</td></tr>";
		var queryString = document.getElementById("queryString").value;
		getXmlHttp();
		xmlHttp.open("POST", "/rlzyos/trainrecord/trainrecord_getTrainrecordByPage", true);
		var formData = new FormData();
		formData.append("currPage", totalPage);
		formData.append("queryString", queryString);
		xmlHttp.send(formData);
		xmlHttp.onreadystatechange = loadTrainrecordBack;
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
		document.getElementById("trainrecordTable").innerHTML = "<tr style='background-color: #696969; color: white;'><td>员工工号</td><td>员工姓名</td><td>成绩</td><td>培训名称</td><td>证书名称</td><td>操作</td></tr>";
		var queryString = document.getElementById("queryString").value;
		getXmlHttp();
		xmlHttp.open("POST", "/rlzyos/trainrecord/trainrecord_getTrainrecordByPage", true);
		var formData = new FormData();
		formData.append("currPage", currPage);
		formData.append("queryString", queryString);
		xmlHttp.send(formData);
		xmlHttp.onreadystatechange = loadTrainrecordBack;
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
