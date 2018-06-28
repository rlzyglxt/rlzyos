var xmlHttp;

var allPageVue;
var queryConditionTemp = {
	"currPage" : "1",
	"totalPage" : "",
	"pageCount" : "10",
	"totalCount" : "",
	"queryString" : ""//查询
}

window.onload = function() {
	allPageVue = new Vue({
		el : '#allPage',
		data : {
			currPage : '1',
			totalPage : '',
			pageCount : '10',
			totalCount : '',
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
		"depatermentVO.currPage" : queryConditionTemp.currPage,
		"depatermentVO.totalPage" : queryConditionTemp.totalPage,
		"depatermentVO.pageCount" : queryConditionTemp.pageCount,
		"depatermentVO.totalCount" : queryConditionTemp.totalCount,
		"depatermentVO.queryString" : queryConditionTemp.queryString,
	}	
	$.ajax({
		url : '/rlzyos/depaterment/depaterment_getDepatermentByPage',
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
	xmlHttp.open("POST", "/rlzyos/depaterment/depaterment_getDepatermentById", true);
	var formData = new FormData();
	formData.append("rlzy_staffdepartment_id", event.id);
	xmlHttp.send(formData);
	xmlHttp.onreadystatechange = getDepatermentByIdBack;
}
//通过Id得到履历回显
function getDepatermentByIdBack() {
	if (isBack()) {
		var result = xmlHttp.responseText;
		result = JSON.parse(result);
		$("#updatastaffdepartment_name").val(result.staffdepartment_name);
		$("#updatastaffdepartment_introduct").val(result.staffdepartment_introduct);
		$("#updatastaffdepartment_tel").val(result.staffdepartment_tel);
		$("#updatastaffdepartment_amount").val(result.staffdepartment_amount);
		$("#updateDepatermentBtn").val(result.rlzy_staffdepartment_id);
		$("#updateLoadingDiv").addClass("hideDiv");
		$("#updateContent").removeClass("hideDiv");
	}
}
//修改
function updateDepaterment(event) {
	 var reg = new RegExp("^[0-9]*$");
	 var reg2 = new RegExp("^[\u4E00-\u9FA5]{1,5}$");
	 var obj = document.getElementById("updatastaffdepartment_tel");
	 var obj1 = document.getElementById("updatastaffdepartment_amount");
	 var obj2 = document.getElementById("updatastaffdepartment_name");
	 var obj3 = document.getElementById("updatastaffdepartment_introduct");
	 if(!reg.test(obj.value) || obj.value.length>11){ 
		 toastr.error("电话请输入11位数字以内！");
		 return false;
	}else if(!reg.test(obj1.value) || obj1.value.length>5){ 
		 toastr.error("部门人数请输入5位数字以内！");
		 return false;
	}else if(!reg2.test(obj2.value) || obj2.value.length>10){
		 toastr.error("部门名称请输入10位汉字以内！");
		 return false;
	}else if(obj3.value.length>50){ 
		 toastr.error("部门简介请输入50位字数以内！");
		 return false;
	}
	$("#updateLoadingDiv").removeClass("hideDiv");
	$("#updateContent").addClass("hideDiv");
	getXmlHttp();
	xmlHttp.open("POST", "/rlzyos/depaterment/depaterment_updateDepaterment", true);
	var formData = new FormData(updatedepatermentForm);
	formData.append("rlzy_staffdepartment_id", event.value);
	xmlHttp.send(formData);
	xmlHttp.onreadystatechange = function() {
		if (isBack()) {
			toastr.success("修改成功！");
			$("#updateLoadingDiv").addClass("hideDiv");
			$("#updateContent").removeClass("hideDiv");
			$("#updateContent input").val("");
			$('#updateDepaterment').modal('hide');
		}
		loadData();
	}
}


//确认删除提示
var createConfirmDelete= function(event) {
	$.confirm({
		title : '真的要删除吗？',
		content : '',
		type : 'red',
		autoClose : 'closeAction|5000',
		buttons : {
			deleteAction : {
				text : '确认',
				btnClass : 'btn-blue',
				action : function() {
					deletedepartment(event);
					 toastr.success("删除成功！");
					
					/*alert(event);*/
					
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

//删除员工履历
var deletedepartment = function(event) {
	//删除员工的基本信息
	$.ajax({
		url : '/rlzyos/depaterment/depaterment_deleteDepaterment',
		type : 'POST',
		data : {
			'rlzy_staffdepartment_id' : event.id
		},	success:function(data){
			toastr.success('删除成功！');
			loadData();
		}
	});
}


function SubmitCk() {
	 var reg = new RegExp("^[0-9]*$");
	 var reg2 = new RegExp("^[\u4E00-\u9FA5]{1,5}$");
	 var obj = document.getElementById("staffdepartment_tel");
	 var obj1 = document.getElementById("staffdepartment_amount");
	 var obj2 = document.getElementById("staffdepartment_name");
	 var obj3 = document.getElementById("staffdepartment_introduct");
	 if(!reg.test(obj.value) || obj.value.length>11){ 
		 toastr.error("电话请输入11位数字以内！");
		 $("#addLoadingDiv").addClass("hideDiv");
		 $("#addContent").removeClass("hideDiv");
		 $("#staffdepartment_tel").val("");
		 return false;
	}else if(!reg.test(obj1.value) || obj1.value.length>5){ 
		 toastr.error("部门人数请输入5位数字以内！");
		 $("#addLoadingDiv").addClass("hideDiv");
		 $("#addContent").removeClass("hideDiv");
		 $("#staffdepartment_amount").val("");
		 return false;
	}else if(!reg2.test(obj2.value) || obj2.value.length>10){
		 toastr.error("部门名称请输入10位汉字以内！");
		 $("#addLoadingDiv").addClass("hideDiv");
		 $("#addContent").removeClass("hideDiv");
		 $("#staffdepartment_name").val("");
		 return false;
	}else if(obj3.value.length>50){ 
		 toastr.error("部门简介请输入50位字数以内！");
		 $("#addLoadingDiv").addClass("hideDiv");
		 $("#addContent").removeClass("hideDiv");
		 $("#staffdepartment_introduct").val("");
		 return false;
	}else{
		addDepaterment();
	}
	}

//添加部门
function addDepaterment(){
	for (var i = 0; i < document.adddepatermentForm.elements.length - 1; i++) {
		if (document.adddepatermentForm.elements[i].value == "") {
			toastr.error("当前表单不能有空项");
			document.form.elements[i].focus();
			$("#addLoadingDiv").addClass("hideDiv");
			$("#addContent").removeClass("hideDiv");
			return false;
		}
	}
	getXmlHttp();
	xmlHttp.open("POST", "/rlzyos/depaterment/depaterment_addDepaterment", true);
	var formData = new FormData(document.getElementById("adddepatermentForm"));
	xmlHttp.send(formData);
	xmlHttp.onreadystatechange = function (){
		 if (isBack()) {
			var result = xmlHttp.responseText;
			if (result == "samename") {
				toastr.error("部门名称已经存在请重新填写！");
				$("#addLoadingDiv").addClass("hideDiv");
				$("#addContent").removeClass("hideDiv");
				$("#staffdepartment_name").val("");
			} else {
				toastr.success("上传成功！");
				$("#addLoadingDiv").addClass("hideDiv");
				$("#addContent").removeClass("hideDiv");
				$("#addContent input").val("");
				$("#staffdepartment_introduct").val("");

				$('#addDepaterment').modal('hide');
				

			}
		}
		 loadData();
		
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