var xmlHttp;

var allPageVue;
var queryConditionTemp = {
	"currPage" : "1",
	"totalPage" : "",
	"pageCount" : "10",
	"totalCount" : "",
	"train_name" : "",//查询
	"list" : ""
}

window.onload = function() {
	allPageVue = new Vue({
		el : '#allPage',
		data : {
			currPage : '1',
			totalPage : '',
			pageCount : '10',
			totalCount : '',
			train_name : '',
			trains : ''
		}
	});
	loadData();
}
//显示培训类别
var loadData = function() {
	$('#mainPanel').hide();
	$('#loadingLayer').show();
	var queryCondition = {
		"trainVO.currPage" : queryConditionTemp.currPage,
		"trainVO.totalPage" : queryConditionTemp.totalPage,
		"trainVO.pageCount" : queryConditionTemp.pageCount,
		"trainVO.totalCount" : queryConditionTemp.totalCount,
		"trainVO.train_name" : queryConditionTemp.train_name,
		"trainVO.list" : queryConditionTemp.list,
	}	
	$.ajax({
		url : '/rlzyos/train/train_getAllByPage',
		type : 'POST',
		data : queryCondition,
		success : function(data) {
			var result = JSON.parse(data);
			allPageVue.trains = result.trains;
			allPageVue.currPage = result.currPage;
			allPageVue.totalPage = result.totalPage;
			allPageVue.pageCount = result.pageCount;
			allPageVue.totalCount = result.totalCount;
			
			queryConditionTemp.currPage = result.currPage;
			queryConditionTemp.totalPage = result.totalPage;
			queryConditionTemp.pageCount = result.pageCount;
			queryConditionTemp.totalCount = result.totalCount;
			queryConditionTemp.train_name = result.train_name;
			$("#addContent input").val("");
			$("#addtrain_name").val("");
			$("#addtrain_startTime").val("");
			$("#addtrain_pay").val("");
			$("#addtrain_overTime").val("");
			$("#addtrain_content").val("");
			$(" textarea").val('');
			$("#addTrainBtn").val("");
			$('#loadingLayer').hide();
			$('#mainPanel').show();
		}
	});
}

function SubmitCk() {
//	 var reg = new RegExp("^[0-9]*$");
//	 var reg2 = new RegExp("^[\u4E00-\u9FA5]{1,5}$");
	 var obj = document.getElementById("train_name");
	 alert(obj.value);
	 var obj1 = document.getElementById("train_startTime");
	 alert(obj1.value);
	 var obj2 = document.getElementById("train_pay");
	 alert(obj2.value);
	 var obj3 = document.getElementById("train_overTime");
	 alert(obj3.value);
	 var obj4 = document.getElementById("train_content");
	 alert(obj4.value);
//	 var obj1 = document.getElementById("staffdepartment_amount");
//	 var obj2 = document.getElementById("staffdepartment_name");
//	 var obj3 = document.getElementById("staffdepartment_introduct");
//	 if(!reg.test(obj.value) || obj.value.length>11){ 
//		 toastr.error("电话请输入11位数字以内！");
//		 $("#addLoadingDiv").addClass("hideDiv");
//		 $("#addContent").removeClass("hideDiv");
//		 $("#addContent input").val("");
//		 $("#staffdepartment_introduct").val("");
//		 return false;
//	}else if(!reg.test(obj1.value) || obj1.value.length>5){ 
//		 toastr.error("部门人数请输入5位数字以内！");
//		 $("#addLoadingDiv").addClass("hideDiv");
//		 $("#addContent").removeClass("hideDiv");
//		 $("#addContent input").val("");
//		 $("#staffdepartment_introduct").val("");
//		 return false;
//	}else if(obj2.value.length>10){ 
//		 toastr.error("部门名称请输入10位汉字以内！");
//		 $("#addLoadingDiv").addClass("hideDiv");
//		 $("#addContent").removeClass("hideDiv");
//		 $("#addContent input").val("");
//		 $("#staffdepartment_introduct").val("");
//		 return false;
//	}else if(!reg2.test(obj2.value)){
//		 toastr.error("部门名称请输入10位汉字以内！");
//		 $("#addLoadingDiv").addClass("hideDiv");
//		 $("#addContent").removeClass("hideDiv");
//		 $("#addContent input").val("");
//		 $("#staffdepartment_introduct").val("");
//		 return false;
//	}else if(obj3.value.length>50){ 
//		 toastr.error("部门简介请输入50位字数以内！");
//		 $("#addLoadingDiv").addClass("hideDiv");
//		 $("#addContent").removeClass("hideDiv");
//		 $("#addContent input").val("");
//		 $("#staffdepartment_introduct").val("");
//		 return false;
//	}else{
//		addTrain();
//	}
	 addTrain();
	}

//添加培训类别
function addTrain(){
	for (var i = 0; i < document.addtrainForm.elements.length - 1; i++) {
		if (document.addtrainForm.elements[i].value == "") {
			toastr.error("当前表单不能有空项");
			document.form.elements[i].focus();
			return false;
		}
	}
	var train_name = $("#addtrain_name").val();
	var train_startTime = $("#addtrain_startTime").val();
	var train_pay = $("#addtrain_pay").val();
	var train_overTime = $("#addtrain_overTime").val();
	var train_content = $("#addtrain_content").val();
	
	var biaoDa1=/[^0-9]/ig;
	var reg = new RegExp("^[0-9]*$");
	var reg2 = new RegExp("^[\u4E00-\u9FA5]{1,5}$");
	var str = train_startTime.replace(biaoDa1,"");
	var str1 = train_overTime.replace(biaoDa1,"");
	alert(train_name);
	alert(train_name.length);
	
	if(str >= str1){
		toastr.error("请正确填写时间！");
		return false;
	}else if(!reg.test(train_pay) || train_pay.length>5){ 
		 toastr.error("培训金额请输入5位数字以内！");
		 $("#updateLoadingDiv").addClass("hideDiv");
		 $("#updateContent").removeClass("hideDiv");
		 $("#train_pay").val("");
		 return false;
	}else if(train_name.length > 10){ 
		 $("#train_name").val("");
		 toastr.error("培训名称请输入10位字以内！");
		
		 return false;
	}else if(!reg2.test(train_name)){
		 toastr.error("培训名称请输入10位汉字以内！");
		 $("#train_name").val("");
		 return false;
	}else if(train_content.length>50){ 
		 toastr.error("培训简介请输入50位字数以内！");
		 $("#train_content").val("");
		 return false;
	}else{
		getXmlHttp();
		 
	xmlHttp.open("POST", "/rlzyos/train/train_addTrain", true);
	var formData = new FormData(document.getElementById("addtrainForm"));
	xmlHttp.send(formData);
	xmlHttp.onreadystatechange = function (){
		if (isBack()) {
			var result = xmlHttp.responseText;
			if (result == "samename") {
				toastr.error("培训名称已经存在请重新填写！");
				$("#addLoadingDiv").addClass("hideDiv");
				$("#addContent").removeClass("hideDiv");
				$("#train_name").val("");
			} else {
				toastr.success("添加成功！");
				$("#updateLoadingDiv").val("");
				$("#updateContent").val("");
				$("#addLoadingDiv").addClass("hideDiv");
				$("#addContent").removeClass("hideDiv");
				$("#addContent input").val("");
				$("#addtrain_name").val("");
				$("#addtrain_startTime").val("");
				$("#addtrain_pay").val("");
				$("#addtrain_overTime").val("");
				$("#addtrain_content").val("");
				$("#addTrainBtn").val("");
				$(" textarea").val('');
				$('#addTrain').modal('hide');
				loadData();
			}
		}
	}
}
	}
//删除类别
var deleteTrain = function(event) {
	$.ajax({
		url : '/rlzyos/train/train_deleteTrain',
		type : 'POST',
		data : {
			'rlzy_train_id' : event.id
		},	success:function(data){
			toastr.success('删除成功！');
			loadData();
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
					deleteTrain(event);
					console.log("删除信息"+event);
					
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

//修改类别
//进入修改模态框
function createConfirmUpdata(event) {
	$("#updateLoadingDiv").removeClass("hideDiv");
	$("#updateContent").addClass("hideDiv");
	getXmlHttp();
	xmlHttp.open("POST", "/rlzyos/train/train_getTrainById", true);
	var formData = new FormData();
	formData.append("rlzy_train_id", event.id);
	xmlHttp.send(formData);
	xmlHttp.onreadystatechange = getTrainByIdBack;
}
//通过Id得到履历回显
function getTrainByIdBack() {
	if (isBack()) {
		var result = xmlHttp.responseText;
		result = JSON.parse(result);
		$("#train_name").val(result.train_name);
		$("#train_startTime").val(result.train_startTime);
		$("#train_overTime").val(result.train_overTime);
		$("#train_pay").val(result.train_pay);
		$("#train_content").val(result.train_content);
		$("#updateTrainBtn").val(result.rlzy_train_id);
		$("#updateLoadingDiv").addClass("hideDiv");
		$("#updateContent").removeClass("hideDiv");
	}
}

//修改
function updateTrain(event) {
	var biaoDa1=/[^0-9]/ig;
	var obj = document.getElementById("train_startTime").value;
	var obj1 = document.getElementById("train_overTime").value;
	var str = obj.replace(biaoDa1,"");
	var str1 = obj1.replace(biaoDa1,"");
	if(str > str1){
		toastr.error("请正确填写时间！");
		return false;
	}
	var reg = new RegExp("^[0-9]*$");
	var reg2 = new RegExp("^[\u4E00-\u9FA5]{1,5}$");
	var obj3 = document.getElementById("train_pay");
	var obj2 = document.getElementById("train_name");
	var obj4 = document.getElementById("train_content");
	if(!reg.test(obj3.value) || obj3.value.length>5){ 
		 toastr.error("培训金额请输入5位数字以内！");
		 $("#updateLoadingDiv").addClass("hideDiv");
		 $("#updateContent").removeClass("hideDiv");
		 $("#train_pay").val("");
		 return false;
	}else if(obj2.value.length>10){ 
		 toastr.error("培训名称请输入10位汉字以内！");
		 $("#updateLoadingDiv").addClass("hideDiv");
		 $("#updateContent").removeClass("hideDiv");
		 $("#train_name").val("");
		 return false;
	}else if(!reg2.test(obj2.value)){
		 toastr.error("培训名称请输入10位汉字以内！");
		 $("#updateLoadingDiv").addClass("hideDiv");
		 $("#updateContent").removeClass("hideDiv");
		 $("#train_name").val("");
		 return false;
	}else if(obj4.value.length>50){ 
		 toastr.error("培训简介请输入50位字数以内！");
		 $("#updateLoadingDiv").addClass("hideDiv");
		 $("#updateContent").removeClass("hideDiv");
		 $("#train_content").val("");
		 return false;
	}
	getXmlHttp();
	xmlHttp.open("POST", "/rlzyos/train/train_updateTrain", true);
	var formData = new FormData(updatetrainForm);
	formData.append("rlzy_train_id", event.value);
	xmlHttp.send(formData);
	xmlHttp.onreadystatechange = function() {
		if (isBack()) {
			toastr.success("修改成功！");
			$("#updateLoadingDiv").addClass("hideDiv");
			$("#updateContent").removeClass("hideDiv");
			$('#updateTrain').modal('hide');
		}
		loadData();
	}
}
//查询
var changeName = function(event) {
	queryConditionTemp.train_name = event.value;
	queryConditionTemp.currPage = "1";
	loadData();
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
