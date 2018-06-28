var xmlHttp;

window.onload = function() {
	getXmlHttp();
	xmlHttp.open("POST", "/rlzyos/paper/paper_getPaperByPage", true);
	var formData = new FormData();
	formData.append("currPage", "1");
	formData.append("queryString", "");
	xmlHttp.send(formData);
	xmlHttp.onreadystatechange = loadPaperBack;
}

function cleanInput() {
	$("#addPaperForm input").val("");
}

function addPaper() {
	for (var i = 0; i < document.addPaperForm.elements.length - 1; i++) {
		if (document.addPaperForm.elements[i].value == "") {
			toastr.error("当前表单不能有空项");
			document.form1.elements[i].focus();
			return false;
		}
	}
	$("#addContent").addClass("hideDiv");
	$("#addLoadingDiv").removeClass("hideDiv");
	xmlHttp.open("POST", "/rlzyos/paper/paper_addPaper", true);
	var formData = new FormData(document.getElementById("addPaperForm"));
	xmlHttp.send(formData);
	xmlHttp.onreadystatechange = addPaperBack;
}

function addPaperBack() {
	if (isBack()) {
		var result = xmlHttp.responseText;
		if (result == "培训名称存在") {
			toastr.error("培训名称已经存在请重新填写培训名称！");
			$("#addLoadingDiv").addClass("hideDiv");
			$("#addContent").removeClass("hideDiv");
		} else {
			toastr.success("上传成功！");
			$("#addLoadingDiv").addClass("hideDiv");
			$("#addContent").removeClass("hideDiv");
			$("#addContent input").val("");
			$("#addContent input[name='paper_name']").focus();
		}
	}
}

function deletePaper(event) {
	getXmlHttp();
	xmlHttp.open("POST", "/rlzyos/paper/paper_deletePaper", true);
	var formData = new FormData();
	formData.append("paper_id", event.value);
	xmlHttp.send(formData);
	xmlHttp.onreadystatechange = deletePaperBack;
}

function deletePaperBack() {
	if (isBack()) {
		toastr.success("删除成功");
		reLoadPaper();
	}
}

function updatePaper(event) {
	for (var i = 0; i < document.updatePaperForm.elements.length - 1; i++) {
		if (document.updatePaperForm.elements[i].value == "") {
			toastr.error("当前表单不能有空项");
			document.form1.elements[i].focus();
			return false;
		}
	}
	$("#updateLoadingDiv").removeClass("hideDiv");
	$("#updateContent").addClass("hideDiv");
	getXmlHttp();
	xmlHttp.open("POST", "/rlzyos/paper/paper_updatePaper", true);
	var formData = new FormData(updatePaperForm);
	formData.append("paper_id", event.value);
	xmlHttp.send(formData);
	xmlHttp.onreadystatechange = updatePaperBack;
}

function updatePaperBack() {
	if (isBack()) {
		toastr.success("修改成功！");
		$("#updateLoadingDiv").addClass("hideDiv");
		$("#updateContent").removeClass("hideDiv");
	}
}

function getPaperById(event) {
	$("#updateContent").addClass("hideDiv");
	$("#updateLoadingDiv").removeClass("hideDiv");
	getXmlHttp();
	xmlHttp.open("POST", "/rlzyos/paper/paper_getPaperById", true);
	var formData = new FormData();
	formData.append("paper_id", event.value);
	xmlHttp.send(formData);
	xmlHttp.onreadystatechange = getPaperByIdBack;
}

function getPaperByIdBack() {
	if (isBack()) {
		var result = xmlHttp.responseText;
		result = JSON.parse(result);
		$("#staff_number_update").val(result.staff_number);
		$("#staff_name_update").val(result.staff_name);
		$("#paper_name_update").val(result.paper_name);
		$("#paper_time_update").val(result.paper_time);
		$("#updateBtn").val(result.rlzy_paper_id);
		$("#updateLoadingDiv").addClass("hideDiv");
		$("#updateContent").removeClass("hideDiv");
	}
}

function reLoadPaper() {
	$("#addContent input").val("");
	$("#addContent input[name='paper_name']").focus();
	document.getElementById("paperTable").innerHTML = "<tr style='background-color: #696969; color: white;'><td>员工工号</td><td>员工姓名</td><td>证书名称</td><td>发证时间</td><td>操作</td></tr>";
	$("#loadingDiv").removeClass("hideDiv");
	$("#tableDiv").addClass("hideDiv");
	getXmlHttp();
	xmlHttp.open("POST", "/rlzyos/paper/paper_getPaperByPage", true);
	var formData = new FormData();
	formData.append("currPage", "1");
	formData.append("queryString",'');
	xmlHttp.send(formData);
	xmlHttp.onreadystatechange = loadPaperBack;
}

function loadPaperBack() {
	if (isBack()) {
		var result = xmlHttp.responseText;
		result = JSON.parse(result);
		var paperTable = document.getElementById("paperTable");
		var hideQueryString = document.getElementById("hideQueryString");
		var hideCurrPage = document.getElementById("hideCurrPage");
		var queryString = document.getElementById("queryString");
		var currPage = document.getElementById("currPage");
		var totalPage = document.getElementById("totalPage");
		var skipPage = document.getElementById("skipPage");
		for (var i = 0; i < result.list.length; i++) {
			paperTable.innerHTML = paperTable.innerHTML
					+ "<tr class='trHover'><td>"
					+ result.list[i].staff_number
					+ "</td>"
					+ "<td>"
					+ result.list[i].staff_name
					+ "</td>"
					+ "<td>"
					+ result.list[i].paper_name
					+ "</td>"
					+ "<td>"
					+ result.list[i].paper_time
					+ "</td>"
					+ "<td>"
					+ "<button onclick='deletePaper(this)' value='"
					+ result.list[i].rlzy_paper_id
					+ "' class='btn btn-danger managerPower'>删除</button>"
					+ "<button onclick='getPaperById(this)' value='"
					+ result.list[i].rlzy_paper_id
					+ "' data-toggle='modal' data-target='#updatePaper' style='margin-left: 5px;' class='btn btn-primary managerPower'>修改</button>"
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
		queryPaper();
	}
}
function queryPaper() {
	$("#loadingDiv").removeClass("hideDiv");
	$("#tableDiv").addClass("hideDiv");
	document.getElementById("paperTable").innerHTML = "<tr style='background-color: #696969; color: white;'><td>员工工号</td><td>员工姓名</td><td>证书名称</td><td>发证时间</td><td>操作</td></tr>";
	var queryString = document.getElementById("queryString").value;
	getXmlHttp();
	xmlHttp.open("POST", "/rlzyos/paper/paper_getPaperByPage", true);
	var formData = new FormData();
	formData.append("currPage", "1");
	formData.append("queryString", queryString);
	xmlHttp.send(formData);
	xmlHttp.onreadystatechange = loadPaperBack;
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
		document.getElementById("paperTable").innerHTML = "<tr style='background-color: #696969; color: white;'><td>员工工号</td><td>员工姓名</td><td>证书名称</td><td>发证时间</td><td>操作</td></tr>";
		var queryString = document.getElementById("queryString").value;
		getXmlHttp();
		xmlHttp.open("POST", "/rlzyos/paper/paper_getPaperByPage", true);
		var formData = new FormData();
		formData.append("currPage", "1");
		formData.append("queryString", queryString);
		xmlHttp.send(formData);
		xmlHttp.onreadystatechange = loadPaperBack;
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
		document.getElementById("paperTable").innerHTML = "<tr style='background-color: #696969; color: white;'><td>员工工号</td><td>员工姓名</td><td>证书名称</td><td>发证时间</td><td>操作</td></tr>";
		var queryString = document.getElementById("queryString").value;
		getXmlHttp();
		xmlHttp.open("POST", "/rlzyos/paper/paper_getPaperByPage", true);
		var formData = new FormData();
		formData.append("currPage", ++currPage);
		formData.append("queryString", queryString);
		xmlHttp.send(formData);
		xmlHttp.onreadystatechange = loadPaperBack;
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
		document.getElementById("paperTable").innerHTML = "<tr style='background-color: #696969; color: white;'><td>员工工号</td><td>员工姓名</td><td>证书名称</td><td>发证时间</td><td>操作</td></tr>";
		var queryString = document.getElementById("queryString").value;
		getXmlHttp();
		xmlHttp.open("POST", "/rlzyos/paper/paper_getPaperByPage", true);
		var formData = new FormData();
		formData.append("currPage", --currPage);
		formData.append("queryString", queryString);
		xmlHttp.send(formData);
		xmlHttp.onreadystatechange = loadPaperBack;
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
		document.getElementById("paperTable").innerHTML = "<tr style='background-color: #696969; color: white;'><td>员工工号</td><td>员工姓名</td><td>证书名称</td><td>发证时间</td><td>操作</td></tr>";
		var queryString = document.getElementById("queryString").value;
		getXmlHttp();
		xmlHttp.open("POST", "/rlzyos/paper/paper_getPaperByPage", true);
		var formData = new FormData();
		formData.append("currPage", totalPage);
		formData.append("queryString", queryString);
		xmlHttp.send(formData);
		xmlHttp.onreadystatechange = loadPaperBack;
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
		document.getElementById("paperTable").innerHTML = "<tr style='background-color: #696969; color: white;'><td>员工工号</td><td>员工姓名</td><td>证书名称</td><td>发证时间</td><td>操作</td></tr>";
		var queryString = document.getElementById("queryString").value;
		getXmlHttp();
		xmlHttp.open("POST", "/rlzyos/paper/paper_getPaperByPage", true);
		var formData = new FormData();
		formData.append("currPage", currPage);
		formData.append("queryString", queryString);
		xmlHttp.send(formData);
		xmlHttp.onreadystatechange = loadPaperBack;
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
