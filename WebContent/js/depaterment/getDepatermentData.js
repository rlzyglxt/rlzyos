var xmlHttp;

window.onload = function() {
	getXmlHttp();
	xmlHttp.open("POST", "/rlzyos/depaterment/depaterment_getDepatermentByPage", true);
	var formData = new FormData();
	formData.append("currPage", "1");
	formData.append("queryString", "");
	xmlHttp.send(formData);
	xmlHttp.onreadystatechange = loadDepatermentBack;
}

function cleanInput() {
	$("#addDepatermentForm input").val("");
}

function addDepaterment() {
	for (var i = 0; i < document.addDepatermentForm.elements.length - 1; i++) {
		if (document.addDepatermentForm.elements[i].value == "") {
			toastr.error("当前表单不能有空项");
			document.form1.elements[i].focus();
			return false;
		}
	}
	$("#addContent").addClass("hideDiv");
	$("#addLoadingDiv").removeClass("hideDiv");
	xmlHttp.open("POST", "/rlzyos/depaterment/depaterment_addDepaterment", true);
	var formData = new FormData(document.getElementById("addDepatermentForm"));
	xmlHttp.send(formData);
	xmlHttp.onreadystatechange = addDepatermentBack;
}

function addDepatermentBack() {
	if (isBack()) {
		var result = xmlHttp.responseText;
		if (result == "部门名称存在") {
			toastr.error("部门名称已经存在请重新填写部门名称！");
			$("#addLoadingDiv").addClass("hideDiv");
			$("#addContent").removeClass("hideDiv");
		} else {
			toastr.success("上传成功！");
			$("#addLoadingDiv").addClass("hideDiv");
			$("#addContent").removeClass("hideDiv");
			$("#addContent input").val("");
			$("#addContent input[name='depaterment_name']").focus();
		}
	}
}

function deleteDepaterment(event) {
	getXmlHttp();
	xmlHttp.open("POST", "/rlzyos/depaterment/depaterment_deleteDepaterment", true);
	var formData = new FormData();
	formData.append("depaterment_id", event.value);
	xmlHttp.send(formData);
	xmlHttp.onreadystatechange = deleteDepatermentBack;
}

function deleteDepatermentBack() {
	if (isBack()) {
		toastr.success("删除成功");
		reLoadDepaterment();
	}
}

function updateDepaterment(event) {
	$("#updateLoadingDiv").removeClass("hideDiv");
	$("#updateContent").addClass("hideDiv");
	getXmlHttp();
	xmlHttp.open("POST", "/rlzyos/depaterment/depaterment_updateDepaterment", true);
	var formData = new FormData(updateDepatermentForm);
	formData.append("depaterment_id", event.value);
	xmlHttp.send(formData);
	xmlHttp.onreadystatechange = updateDepatermentBack;
}

function updateDepatermentBack() {
	if (isBack()) {
		toastr.success("修改成功！");
		$("#updateLoadingDiv").addClass("hideDiv");
		$("#updateContent").removeClass("hideDiv");
	}
}

function getDepatermentById(event) {
	$("#updateContent").addClass("hideDiv");
	$("#updateLoadingDiv").removeClass("hideDiv");
	getXmlHttp();
	xmlHttp.open("POST", "/rlzyos/depaterment/depaterment_getDepatermentById", true);
	var formData = new FormData();
	formData.append("depaterment_id", event.value);
	xmlHttp.send(formData);
	xmlHttp.onreadystatechange = getDepatermentByIdBack;
}

function getDepatermentByIdBack() {
	if (isBack()) {
		var result = xmlHttp.responseText;
		result = JSON.parse(result);
		$("#depaterment_name_update").val(result.depaterment_name);
		$("#depaterment_duty_update").val(result.depaterment_duty);
		$("#depaterment_tel_update").val(result.depaterment_tel);
		$("#depaterment_num_update").val(result.depaterment_num);
		$("#updateBtn").val(result.rlzy_depaterment_id);
		$("#updateLoadingDiv").addClass("hideDiv");
		$("#updateContent").removeClass("hideDiv");
	}
}

function reLoadDepaterment() {
	$("#addContent input").val("");
	$("#addContent input[name='depaterment_name']").focus();
	document.getElementById("depatermentTable").innerHTML = "<tr style='background-color: #696969; color: white;'><td>部门名称</td><td>部门职务</td><td>部门号码</td><td>部门人数</td><td>操作</td></tr>";
	$("#loadingDiv").removeClass("hideDiv");
	$("#tableDiv").addClass("hideDiv");
	getXmlHttp();
	xmlHttp.open("POST", "/rlzyos/depaterment/depaterment_getDepatermentByPage", true);
	var formData = new FormData();
	formData.append("currPage", "1");
	formData.append("queryString",'');
	xmlHttp.send(formData);
	xmlHttp.onreadystatechange = loadDepatermentBack;
}

function loadDepatermentBack() {
	if (isBack()) {
		var result = xmlHttp.responseText;
		result = JSON.parse(result);
		var depatermentTable = document.getElementById("depatermentTable");
		var hideQueryString = document.getElementById("hideQueryString");
		var hideCurrPage = document.getElementById("hideCurrPage");
		var queryString = document.getElementById("queryString");
		var currPage = document.getElementById("currPage");
		var totalPage = document.getElementById("totalPage");
		var skipPage = document.getElementById("skipPage");
		for (var i = 0; i < result.list.length; i++) {
			depatermentTable.innerHTML = depatermentTable.innerHTML
					+ "<tr class='trHover'><td>"
					+ result.list[i].depaterment_name
					+ "</td>"
					+ "<td>"
					+ result.list[i].depaterment_duty
					+ "</td>"
					+ "<td>"
					+ result.list[i].depaterment_tel
					+ "</td>"
					+ "<td>"
					+ result.list[i].depaterment_num
					+ "</td>"
					+ "<td>"
					+ "<button onclick='deleteDepaterment(this)' value='"
					+ result.list[i].rlzy_depaterment_id
					+ "' class='btn btn-danger managerPower'>删除</button>"
					+ "<button onclick='getDepatermentById(this)' value='"
					+ result.list[i].rlzy_depaterment_id
					+ "' data-toggle='modal' data-target='#updateDepaterment' style='margin-left: 5px;' class='btn btn-primary managerPower'>修改</button>"
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
		queryDepaterment();
	}
}
function queryDepaterment() {
	$("#loadingDiv").removeClass("hideDiv");
	$("#tableDiv").addClass("hideDiv");
	document.getElementById("depatermentTable").innerHTML = "<tr style='background-color: #696969; color: white;'><td>部门名称</td><td>部门职务</td><td>部门电话</td><td>部门人数</td><td>操作</td></tr>";
	var queryString = document.getElementById("queryString").value;
	getXmlHttp();
	xmlHttp.open("POST", "/rlzyos/depaterment/depaterment_getDepatermentByPage", true);
	var formData = new FormData();
	formData.append("currPage", "1");
	formData.append("queryString", queryString);
	xmlHttp.send(formData);
	xmlHttp.onreadystatechange = loadDepatermentBack;
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
		document.getElementById("depatermentTable").innerHTML = "<tr style='background-color: #696969; color: white;'><td>部门名称</td><td>部门职务</td><td>部门电话</td><td>部门人数</td><td>操作</td></tr>";
		var queryString = document.getElementById("queryString").value;
		getXmlHttp();
		xmlHttp.open("POST", "/rlzyos/depaterment/depaterment_getDepatermentByPage", true);
		var formData = new FormData();
		formData.append("currPage", "1");
		formData.append("queryString", queryString);
		xmlHttp.send(formData);
		xmlHttp.onreadystatechange = loadDepatermentBack;
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
		document.getElementById("depatermentTable").innerHTML = "<tr style='background-color: #696969; color: white;'><td>部门名称</td><td>部门职务</td><td>部门电话</td><td>部门人数</td><td>操作</td></tr>";
		var queryString = document.getElementById("queryString").value;
		getXmlHttp();
		xmlHttp.open("POST", "/rlzyos/depaterment/depaterment_getDepatermentByPage", true);
		var formData = new FormData();
		formData.append("currPage", ++currPage);
		formData.append("queryString", queryString);
		xmlHttp.send(formData);
		xmlHttp.onreadystatechange = loadDepatermentBack;
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
		document.getElementById("depatermentTable").innerHTML = "<tr style='background-color: #696969; color: white;'><td>部门名称</td><td>部门职务</td><td>部门电话</td><td>部门人数</td><td>操作</td></tr>";
		var queryString = document.getElementById("queryString").value;
		getXmlHttp();
		xmlHttp.open("POST", "/rlzyos/depaterment/depaterment_getDepatermentByPage", true);
		var formData = new FormData();
		formData.append("currPage", --currPage);
		formData.append("queryString", queryString);
		xmlHttp.send(formData);
		xmlHttp.onreadystatechange = loadDepatermentBack;
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
		document.getElementById("depatermentTable").innerHTML = "<tr style='background-color: #696969; color: white;'><td>部门名称</td><td>部门职务</td><td>部门电话</td><td>部门人数</td><td>操作</td></tr>";
		var queryString = document.getElementById("queryString").value;
		getXmlHttp();
		xmlHttp.open("POST", "/rlzyos/depaterment/depaterment_getDepatermentByPage", true);
		var formData = new FormData();
		formData.append("currPage", totalPage);
		formData.append("queryString", queryString);
		xmlHttp.send(formData);
		xmlHttp.onreadystatechange = loadDepatermentBack;
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
		document.getElementById("depatermentTable").innerHTML = "<tr style='background-color: #696969; color: white;'><td>部门名称</td><td>部门职务</td><td>部门电话</td><td>部门人数</td><td>操作</td></tr>";
		var queryString = document.getElementById("queryString").value;
		getXmlHttp();
		xmlHttp.open("POST", "/rlzyos/depaterment/depaterment_getDepatermentByPage", true);
		var formData = new FormData();
		formData.append("currPage", currPage);
		formData.append("queryString", queryString);
		xmlHttp.send(formData);
		xmlHttp.onreadystatechange = loadDepatermentBack;
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
