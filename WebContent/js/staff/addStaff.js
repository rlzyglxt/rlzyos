var newStaff = {};
/*
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
}*/
window.onload = function() {
	$.ajax({
		url : '/rlzyos/depaterment/depaterment_getAllDepaterment',
		type : 'post',
		success : function(data) {
			var result = JSON.parse(data);
			console.log(result);
			console.log(result.length);
			for (var i = 0; i < result.length; i++) {

				document.getElementById("staff_depaterment").innerHTML = document
						.getElementById("staff_depaterment").innerHTML
						+ "<option value='"
						+ result[i].staffdepartment_name
						+ "'>"
						+ result[i].staffdepartment_name
						+ "</option>";
			}
		}
	});
	$.ajax({
		url : '/rlzyos/depaterment/depaterment_getAllDepaterment',
		type : 'post',
		success : function(data) {
			var result = JSON.parse(data);
			console.log(result);
			console.log(result.length);
			for (var i = 0; i < result.length; i++) {

				document.getElementById("staff_qdepaterment").innerHTML = document
						.getElementById("staff_qdepaterment").innerHTML
						+ "<option value='"
						+ result[i].staffdepartment_name
						+ "'>"
						+ result[i].staffdepartment_name
						+ "</option>";
			}
		}
	});
	$.ajax({
		url : '/rlzyos/depaterment/depaterment_getAllDepaterment',
		type : 'post',
		success : function(data) {
			var result = JSON.parse(data);
			console.log(result);
			console.log(result.length);
			for (var i = 0; i < result.length; i++) {

				document.getElementById("staff_wdepaterment").innerHTML = document
						.getElementById("staff_wdepaterment").innerHTML
						+ "<option value='"
						+ result[i].staffdepartment_name
						+ "'>"
						+ result[i].staffdepartment_name
						+ "</option>";
			}
		}
	});
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

// addStaff新建人员
function Add_Staff() {
	var url= "/rlzyos/staff/staff_addStaff";
	$.confirm({
			title : '新建!',
			content : '确定新建!',
			buttons : {
				取消 : function() {
					// here the button key 'hey' will be used as the text.
				},
				确定 : {
					action : function() {
						// 判断是否为空
						var number = document.getElementsByName("staff.staff_number")[0].value;//工号
						var name = document.getElementsByName("staff.staff_name")[0].value;//姓名
						var duty = document.getElementsByName("staff.staff_duty")[0].value;//职务
						var record = document.getElementsByName("staff.staff_record")[0].value;//学历
						var cardid = document.getElementsByName("staff.staff_cardid")[0].value;//身份证
						var tel = document.getElementsByName("staff.staff_tel")[0].value;//电话
						var address = document.getElementsByName("staff.staff_address")[0].value;//电话
						$.ajax({
							type : "POST",
							url : "/rlzyos/staff/staffMove_getValueByNumber",
							data : {
								"staff_number": number,
							},
							success : function(data) {
								var result = JSON.parse(data);
								if(number==result[0].staff_number){
									toastr.error('该工号已存在，不可再添加！');
									return false;
								}else if (number == "" || name == "" || duty == "" || record == "" || cardid == "" || tel == "" || address =="") {
									toastr.error('该表单不可有空项！');
									return false;
								}
								addStaff_Info(url);
							}
					});
						
					}
					}
				}
			});
}

function getvalue(event) {
	$.ajax({
			type : "POST",
			url : "/rlzyos/staff/staffMove_getValueByNumber",
			data : {
				"staff_number": event.value,
			},
			success : function(data) {
				var result = JSON.parse(data);
				var number = document.getElementsByName("staff.staff_number")[0].value;
				if(number==""){
					toastr.error("工号不能为空");
				}else if(result==""){
					toastr.success("该工号可用");
					return false;
				}else{
					toastr.warning("该工号以存在，请输入其他工号");
					return true;
				}
			}
		});
	
}
// 员工基本信息表
function addStaff_Info(url) {
	if (window.XMLHttpRequest) {
		// IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
		xmlHttp=new XMLHttpRequest();
	} else {
		// IE6, IE5 浏览器执行代码
		xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	var staffDetails = document.getElementById("staffDetails");
	var formData = new FormData(staffDetails);
	xmlHttp.open("post", url, true);
	xmlHttp.send(formData);
	xmlHttp.onreadystatechange = function() {
		console.log("c2");
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
			console.log(xmlHttp.responseText);
			var id = xmlHttp.responseText;//返回id
			
			staffExp_ajax(id);
			staffAgreement_ajax(id);
			staffAward_ajax(id);
			staffMove_ajax(id)
			staffTrain_ajax(id);
			toastr.success("新建成功");
			//返回修改页面(未做)	
			window.location.href = '/rlzyos/staff/staff_page_StaffInfo';
		
	}
	
}
}
//添加员工履历
function staffExp_ajax(id){	
	if (window.XMLHttpRequest) {
		// IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
		xmlHttp=new XMLHttpRequest();
	} else {
		// IE6, IE5 浏览器执行代码
		xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	var formdata = new FormData();
	// 得到每行
	var s_tr = document.getElementById("staffExp_table").getElementsByTagName("tr");

	for (var i = 1; i < s_tr.length; i++) {
		// 得到每列
		var s_td = s_tr[i].getElementsByTagName("td");
		for (var j = 0; j < s_td.length; j++) {
			// 得到每列的class名
			if (s_td[j].innerHTML == "") {
				s_td[j].innerHTML = "d";
			}
			var s_tdName = s_td[j].getAttribute("name");
			console.log("列名" + s_tdName);
			// 将每列的名和值放到formdata中
			formdata.append(s_tdName, s_td[j].innerHTML);
		}
		// 将id放到每行中
		formdata.append("staffExps.staffExp_staff", id);
	}
	xmlHttp.onreadystatechange = function() {
		console.log("c3");
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
			// console.log("studyExp_ajax"+xmlHttp.responseText);
		}

	};
	xmlHttp.open("post", "/rlzyos/staff/staffExp_addStaffExp", true);
	// xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8");
	xmlHttp.send(formdata);
}
//添加履历到表格
var w = 0;
function add_staffExp() {
	console.log("add_workExperience start");
	// 把表格的数据存到json中
	var staffExp_address = document.querySelector(".staffExp_address").value;
	var staffExp_startTime = document.querySelector(".staffExp_startTime").value;
	var staffExp_overTime = document.querySelector(".staffExp_overTime").value;
	var staffExp_remark = document.querySelector(".staffExp_remark").value;
	//字符验证
	var time = /[^0-9]/ig;
	var str1 = staffExp_startTime.replace(time,"");
	var str2 = staffExp_overTime.replace(time,"");
	if(staffExp_address.length>10){ 
		 toastr.error("请输入20个字以内的地址");
		 document.querySelector(".staffExp_address").val("");
		 return false;
	}else if (str1 > str2){//判断起始时间不能大于结束时间
		toastr.error("请输入时间顺序有误");
		return false;
	}else if (staffExp_remark.length > 20){
		toastr.error("备注不可超过20字");
		return false;
	}else{
		$('#addStaffExp_Modal').modal('hide');
	console.log(staffExp_address);
	newStaff['staffExp_address'] = staffExp_address;
	newStaff['staffExp_startTime'] = staffExp_startTime;
	newStaff['staffExp_overTime'] = staffExp_overTime;
	newStaff['staffExp_remark'] = staffExp_remark;
	console.log(newStaff['staffExp_address']);
	// 动态创建表格
	var staffExp_table = document.getElementById("staffExp_table");
	staffExp_table.setAttribute("class", "long_table");

	var exp_tr = document.createElement("tr");
	//地址
	var staffWork_address = document.createElement("td");
	staffWork_address.innerHTML = newStaff['staffExp_address'];
	staffWork_address.setAttribute("name", "staffExps[" + w + "].staffExp_address");
	console.log(staffWork_address.innerHTML);
	//开始时间
	var staffExp_startTime = document.createElement("td");
	staffExp_startTime.innerHTML = newStaff['staffExp_startTime'];
	staffExp_startTime.setAttribute("name", "staffExps[" + w + "].staffExp_startTime");
	console.log(staffExp_startTime.innerHTML);
	//结束时间
	var staffExp_overTime = document.createElement("td");
	staffExp_overTime.innerHTML = newStaff['staffExp_overTime'];
	staffExp_overTime.setAttribute("name", "staffExps[" + w	+ "].staffExp_overTime");
	//备注
	var staffExp_remark = document.createElement("td");
	staffExp_remark.innerHTML = newStaff['staffExp_remark'];
	staffExp_remark.setAttribute("name", "staffExps[" + w + "].staffExp_remark");

	// 增加删除按钮的列
	var reviseTd = document.createElement("td");
	// 增加删除按钮及样式
	var delete_button = document.createElement("button");
	delete_button.className = 'btn btn-default btn-xs';
	delete_button.setAttribute("type", "button");
	delete_button.addEventListener('click', function() {
		this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);}, false);
	delete_button.style['margin-left'] = "10px";
	// 添加按钮里的图标
	var delete_icon = document.createElement("i");
	delete_icon.className = "fa fa-trash";
	delete_button.append(delete_icon);
	reviseTd.append(delete_button);

	exp_tr.appendChild(staffWork_address);
	exp_tr.appendChild(staffExp_startTime);
	exp_tr.appendChild(staffExp_overTime);
	exp_tr.appendChild(staffExp_remark);
	exp_tr.appendChild(reviseTd);
	staffExp_table.children[0].append(exp_tr);
	w++;
	}
}

//员工合同提交
function staffAgreement_ajax(id){	
	if (window.XMLHttpRequest) {
		// IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
		xmlHttp=new XMLHttpRequest();
	} else {
		// IE6, IE5 浏览器执行代码
		xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	var formdata = new FormData();
	// 得到每行
	var s_tr = document.getElementById("staffAgreement_table").getElementsByTagName("tr");

	for (var i = 1; i < s_tr.length; i++) {
		// 得到每列
		var s_td = s_tr[i].getElementsByTagName("td");
		for (var j = 0; j < s_td.length; j++) {
			// 得到每列的class名
			if (s_td[j].innerHTML == "") {
				s_td[j].innerHTML = "d";
			}
			var s_tdName = s_td[j].getAttribute("name");
			console.log("列名" + s_tdName);
			// 将每列的名和值放到formdata中
			formdata.append(s_tdName, s_td[j].innerHTML);
		}
		// 将id放到每行中
		formdata.append("staffagreements.agreement_staff", id);
	}
	xmlHttp.onreadystatechange = function() {
		console.log("c3");
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
			// console.log("studyExp_ajax"+xmlHttp.responseText);
		}

	};
	xmlHttp.open("post", "/rlzyos/staff/staffAgreement_addStaffAgreement", true);
	// xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8");
	xmlHttp.send(formdata);
}
//添加合同到表格
var y = 0;
function add_staffAgreement() {
	// 把表格的数据存到json中
	var staffAgreement_startTime = document.querySelector(".agreement_startTime").value;
	var staffAgreement_overtTime = document.querySelector(".agreement_overtTime").value;
	var staffAgreement_content = document.querySelector(".agreement_content").value;
	var staffAgreement_remark = document.querySelector(".agreement_remark").value;
	console.log("add_workExperience start");
	//js验证
	var time = /[^0-9]/ig;
	var str1 = staffAgreement_startTime.replace(time,"");
	var str2 = staffAgreement_overtTime.replace(time,"");
	if(staffAgreement_startTime == ""|| staffAgreement_overtTime == "" || staffAgreement_content==""){
		toastr.error("当前表不能有空");
	}else if(staffAgreement_content.length>30){ 
		 toastr.error("请输入30个字以内的内容");
		 $("#agreement_content").val("");
		 return false;
	}else if (str1 > str2){//判断起始时间不能大于结束时间
		
		$("#agreement_startTime").val("");
		 $("#agreement_overtTime").val("");
		toastr.error("请输入时间顺序有误");
		
		return false;
	}else if (staffAgreement_remark.length > 20){
		$("#staffAgreement_remark").val("");
		toastr.error("备注不可超过20字");
		
		return false;
	}else {
	$('#addAgreement_Modal').modal('hide');
	toastr.success("添加成功");
	console.log(staffAgreement_startTime);
	newStaff['staffAgreement_startTime'] = staffAgreement_startTime;
	newStaff['staffAgreement_overtTime'] = staffAgreement_overtTime;
	newStaff['staffAgreement_content'] = staffAgreement_content;
	newStaff['staffAgreement_remark'] = staffAgreement_remark;
	console.log(newStaff['staffAgreement_startTime']);
	// 动态创建表格
	var staffAgreement_table = document.getElementById("staffAgreement_table");
	staffAgreement_table.setAttribute("class", "long_table");

	var agr_tr = document.createElement("tr");
	//开始时间
	var staffAgreement_startTime = document.createElement("td");
	staffAgreement_startTime.innerHTML = newStaff['staffAgreement_startTime'];
	staffAgreement_startTime.setAttribute("name", "staffagreements[" + y + "].agreement_startTime");
	console.log(staffAgreement_startTime.innerHTML);
	//结束时间
	var staffAgreement_overtTime = document.createElement("td");
	staffAgreement_overtTime.innerHTML = newStaff['staffAgreement_overtTime'];
	staffAgreement_overtTime.setAttribute("name", "staffagreements[" + y + "].agreement_overtTime");
	console.log(staffAgreement_overtTime.innerHTML);
	//内容
	var staffAgreement_content = document.createElement("td");
	staffAgreement_content.innerHTML = newStaff['staffAgreement_content'];
	staffAgreement_content.setAttribute("name", "staffagreements[" + y	+ "].agreement_content");
	//备注
	var staffAgreement_remark = document.createElement("td");
	staffAgreement_remark.innerHTML = newStaff['staffAgreement_remark'];
	staffAgreement_remark.setAttribute("name", "staffagreements[" + y + "].agreement_remark");

	// 增加删除按钮的列
	var reviseTd = document.createElement("td");
	// 增加删除按钮及样式
	var delete_button = document.createElement("button");
	delete_button.className = 'btn btn-default btn-xs';
	delete_button.setAttribute("type", "button");
	delete_button.addEventListener('click', function() {
		this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);}, false);
	delete_button.style['margin-left'] = "10px";
	// 添加按钮里的图标
	var delete_icon = document.createElement("i");
	delete_icon.className = "fa fa-trash";
	delete_button.append(delete_icon);
	reviseTd.append(delete_button);

	agr_tr.appendChild(staffAgreement_startTime);
	agr_tr.appendChild(staffAgreement_overtTime);
	agr_tr.appendChild(staffAgreement_content);
	agr_tr.appendChild(staffAgreement_remark);
	agr_tr.appendChild(reviseTd);
	staffAgreement_table.children[0].append(agr_tr);
	y++;
	}
}

//员工奖金提交
function staffAward_ajax(id){	
	if (window.XMLHttpRequest) {
		// IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
		xmlHttp=new XMLHttpRequest();
	} else {
		// IE6, IE5 浏览器执行代码
		xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	var formdata = new FormData();
	// 得到每行
	var s_tr = document.getElementById("staffAward_table").getElementsByTagName("tr");

	for (var i = 1; i < s_tr.length; i++) {
		// 得到每列
		var s_td = s_tr[i].getElementsByTagName("td");
		for (var j = 0; j < s_td.length; j++) {
			// 得到每列的class名
			if (s_td[j].innerHTML == "") {
				s_td[j].innerHTML = "d";
			}
			var s_tdName = s_td[j].getAttribute("name");
			console.log("列名" + s_tdName);
			// 将每列的名和值放到formdata中
			formdata.append(s_tdName, s_td[j].innerHTML);
		}
		// 将id放到每行中
		formdata.append("staffAwards.award_staff", id);
	}
	xmlHttp.onreadystatechange = function() {
		console.log("c3");
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
			// console.log("studyExp_ajax"+xmlHttp.responseText);
		}
	};
	xmlHttp.open("post", "/rlzyos/staff/staffAward_addStaffAward", true);
	xmlHttp.send(formdata);
}
//添加奖金到表格
var x = 0;
function add_staffAward() {
	console.log("add_award start");
	// 把表格的数据存到json中
	var staffAward_amount = document.querySelector(".award_amount").value;
	var staffAward_provideTime = document.querySelector(".award_provideTime").value;
	var staffAward_provideDepartment = document.querySelector(".award_provideDepartment").value;
	var staffAward_provideReason = document.querySelector(".award_provideReason").value;
	//js校验
	var reg = new RegExp("^[0-9]*$");
	 if(!reg.test(staffAward_amount) || staffAward_amount.value.length>5){ 
		$("#staffAward_amount").val("");
		 toastr.error("部门人数请输入5位以内的数字！");
		 return false;
	 }else if(staffAward_provideReason.length > 25){
		 $("#staffAward_provideReason").val("");
		 toastr.error("输入的字数不可大于25个");
		 return false;
	 }else {
		 $('#addAward_Modal').modal('hide');
	console.log(staffAward_provideReason);
	newStaff['staffAward_amount'] = staffAward_amount;
	newStaff['staffAward_provideTime'] = staffAward_provideTime;
	newStaff['staffAward_provideDepartment'] = staffAward_provideDepartment;
	newStaff['staffAward_provideReason'] = staffAward_provideReason;
	console.log(newStaff['staffAward_provideReason']);
	// 动态创建表格
	var staffAward_table = document.getElementById("staffAward_table");
	staffAward_table.setAttribute("class", "long_table");

	var awa_tr = document.createElement("tr");
	//开始时间
	var staffAward_amount = document.createElement("td");
	staffAward_amount.innerHTML = newStaff['staffAward_amount'];
	staffAward_amount.setAttribute("name", "staffAwards[" + x + "].award_amount");
	console.log(staffAward_amount.innerHTML);
	//结束时间
	var staffAward_provideTime = document.createElement("td");
	staffAward_provideTime.innerHTML = newStaff['staffAward_provideTime'];
	staffAward_provideTime.setAttribute("name", "staffAwards[" + x + "].award_provideTime");
	console.log(staffAward_provideTime.innerHTML);
	//内容
	var staffAward_provideDepartment = document.createElement("td");
	staffAward_provideDepartment.innerHTML = newStaff['staffAward_provideDepartment'];
	staffAward_provideDepartment.setAttribute("name", "staffAwards[" +  x	+ "].award_provideDepartment");
	//备注
	var staffAward_provideReason = document.createElement("td");
	staffAward_provideReason.innerHTML = newStaff['staffAward_provideReason'];
	staffAward_provideReason.setAttribute("name", "staffAwards[" + x + "].award_provideReason");

	// 增加删除按钮的列
	var reviseTd = document.createElement("td");
	// 增加删除按钮及样式
	var delete_button = document.createElement("button");
	delete_button.className = 'btn btn-default btn-xs';
	delete_button.setAttribute("type", "button");
	delete_button.addEventListener('click', function() {
		this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);}, false);
	delete_button.style['margin-left'] = "10px";
	// 添加按钮里的图标
	var delete_icon = document.createElement("i");
	delete_icon.className = "fa fa-trash";
	delete_button.append(delete_icon);
	reviseTd.append(delete_button);

	awa_tr.appendChild(staffAward_amount);
	awa_tr.appendChild(staffAward_provideTime);
	awa_tr.appendChild(staffAward_provideDepartment);
	awa_tr.appendChild(staffAward_provideReason);
	awa_tr.appendChild(reviseTd);
	staffAward_table.children[0].append(awa_tr);
	x++;
	}
}

//员工调动记录提交
function staffMove_ajax(id){	
	if (window.XMLHttpRequest) {
		// IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
		xmlHttp=new XMLHttpRequest();
	} else {
		// IE6, IE5 浏览器执行代码
		xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	var formdata = new FormData();
	// 得到每行
	var s_tr = document.getElementById("staffMove_table").getElementsByTagName("tr");

	for (var i = 1; i < s_tr.length; i++) {
		// 得到每列
		var s_td = s_tr[i].getElementsByTagName("td");
		for (var j = 0; j < s_td.length; j++) {
			// 得到每列的class名
			if (s_td[j].innerHTML == "") {
				s_td[j].innerHTML = "d";
			}
			var s_tdName = s_td[j].getAttribute("name");
			console.log("列名" + s_tdName);
			// 将每列的名和值放到formdata中
			formdata.append(s_tdName, s_td[j].innerHTML);
		}
		// 将id放到每行中
		formdata.append("staffMoves.staffMove_staff", id);
	}
	xmlHttp.onreadystatechange = function() {
		console.log("c3");
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
			// console.log("studyExp_ajax"+xmlHttp.responseText);
		}
	};
	xmlHttp.open("post", "/rlzyos/staff/staffMove_addStaffMove?staffMoves.staffMove_staff="+id, true);
	xmlHttp.send(formdata);
}
//添加调动到表格
var a = 0;
function add_staffMove() {
	console.log("add_move start");
	// 把表格的数据存到json中
	var staffMove_nowdepartment = document.querySelector(".staffMove_nowdepartment").value;
	var staffMove_nowduty = document.querySelector(".staffMove_nowduty").value;
	var staffMove_time = document.querySelector(".staffMove_time").value;
	var staffMove_remark = document.querySelector(".staffMove_remark").value;
	//js校验
	if(staffMove_remark.length > 25){
		$("#staffMove_remark").val("");
		 toastr.error("输入的字数不可大于25个");
		 return false;
	}else{
		$('#addMove_Modal').modal('hide');

	console.log(staffMove_nowdepartment);
	newStaff['staffMove_nowdepartment'] = staffMove_nowdepartment;
	newStaff['staffMove_nowduty'] = staffMove_nowduty;
	newStaff['staffMove_time'] = staffMove_time;
	newStaff['staffMove_remark'] = staffMove_remark;
	console.log(newStaff['staffMove_remark']);
	// 动态创建表格
	var staffMove_table = document.getElementById("staffMove_table");
	staffMove_table.setAttribute("class", "long_table");

	var move_tr = document.createElement("tr");
	//调入部门
	var staffMove_nowdepartment = document.createElement("td");
	staffMove_nowdepartment.innerHTML = newStaff['staffMove_nowdepartment'];
	staffMove_nowdepartment.setAttribute("name", "staffMoves[" + x + "].staffMove_nowdepartment");
	console.log(staffMove_nowdepartment.innerHTML);
	//导入职务
	var staffMove_nowduty = document.createElement("td");
	staffMove_nowduty.innerHTML = newStaff['staffMove_nowduty'];
	staffMove_nowduty.setAttribute("name", "staffMoves[" + x + "].staffMove_nowduty");
	console.log(staffMove_nowduty.innerHTML);
	//调动时间
	var staffMove_time = document.createElement("td");
	staffMove_time.innerHTML = newStaff['staffMove_time'];
	staffMove_time.setAttribute("name", "staffMoves[" +  x	+ "].staffMove_time");
	//备注
	var staffMove_remark = document.createElement("td");
	staffMove_remark.innerHTML = newStaff['staffMove_remark'];
	staffMove_remark.setAttribute("name", "staffMoves[" + x + "].staffMove_remark");

	// 增加删除按钮的列
	var reviseTd = document.createElement("td");
	// 增加删除按钮及样式
	var delete_button = document.createElement("button");
	delete_button.className = 'btn btn-default btn-xs';
	delete_button.setAttribute("type", "button");
	delete_button.addEventListener('click', function() {
		this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);}, false);
	delete_button.style['margin-left'] = "10px";
	// 添加按钮里的图标
	var delete_icon = document.createElement("i");
	delete_icon.className = "fa fa-trash";
	delete_button.append(delete_icon);
	reviseTd.append(delete_button);

	move_tr.appendChild(staffMove_nowdepartment);
	move_tr.appendChild(staffMove_nowduty);
	move_tr.appendChild(staffMove_time);
	move_tr.appendChild(staffMove_remark);
	move_tr.appendChild(reviseTd);
	staffMove_table.children[0].append(move_tr);
	a++;
	}
}

//员工教育培训记录提交
function staffTrain_ajax(id){	
	if (window.XMLHttpRequest) {
		// IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
		xmlHttp=new XMLHttpRequest();
	} else {
		// IE6, IE5 浏览器执行代码
		xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	var formdata = new FormData();
	// 得到每行
	var s_tr = document.getElementById("staffTrain_table").getElementsByTagName("tr");

	for (var i = 1; i < s_tr.length; i++) {
		// 得到每列
		var s_td = s_tr[i].getElementsByTagName("td");
		for (var j = 0; j < s_td.length; j++) {
			// 得到每列的class名
			if (s_td[j].innerHTML == "") {
				s_td[j].innerHTML = "d";
			}
			var s_tdName = s_td[j].getAttribute("name");
			console.log("列名" + s_tdName);
			// 将每列的名和值放到formdata中
			formdata.append(s_tdName, s_td[j].innerHTML);
		}
		// 将id放到每行中
		formdata.append("stafftrains.stafftrain_staff", id);
	}
	xmlHttp.onreadystatechange = function() {
		console.log("c3");
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
			// console.log("studyExp_ajax"+xmlHttp.responseText);
		}
	};
	xmlHttp.open("post", "/rlzyos/staff/staffTrain_addStaffTrain", true);
	xmlHttp.send(formdata);
}
//添加教育培训记录到表格
var b = 0;
function add_staffTrain() {
	console.log("add_train start");
	var reg = new RegExp("^[0-9]*$");
	// 把表格的数据存到json中
	var stafftrain_train = document.querySelector(".stafftrain_train").value;
	var stafftrain_score = document.querySelector(".stafftrain_score").value;
	var stafftrain_certificate = document.querySelector(".stafftrain_certificate").value;
	if(!reg.test(stafftrain_score) || stafftrain_score.length>5){ 
		 $("#stafftrain_score").val("");
		 toastr.error("请输入3位数字以内！");
		return false; 
	}else if(stafftrain_certificate.length>8){
		$("#stafftrain_certificate").val("");
		toastr.error("请输入8个字以内！");
	}else {
		$('#addTrain_Modal').modal('hide');
	

	console.log(stafftrain_certificate);
	newStaff['stafftrain_train'] = stafftrain_train;
	newStaff['stafftrain_score'] = stafftrain_score;
	newStaff['stafftrain_certificate'] = stafftrain_certificate;
	console.log(newStaff['stafftrain_train']);
	// 动态创建表格
	var staffTrain_table = document.getElementById("staffTrain_table");
	staffTrain_table.setAttribute("class", "long_table");

	var tra_tr = document.createElement("tr");
	//开始时间
	var stafftrain_train = document.createElement("td");
	stafftrain_train.innerHTML = newStaff['stafftrain_train'];
	stafftrain_train.setAttribute("name", "stafftrains[" + b + "].stafftrain_train");
	console.log(stafftrain_train.innerHTML);
	//结束时间
	var stafftrain_score = document.createElement("td");
	stafftrain_score.innerHTML = newStaff['stafftrain_score'];
	stafftrain_score.setAttribute("name", "stafftrains[" + b + "].stafftrain_score");
	console.log(stafftrain_score.innerHTML);
	//内容
	var stafftrain_certificate = document.createElement("td");
	stafftrain_certificate.innerHTML = newStaff['stafftrain_certificate'];
	stafftrain_certificate.setAttribute("name", "stafftrains[" +  b	+ "].stafftrain_certificate");
/*	//备注
	var staffAward_provideReason = document.createElement("td");
	staffAward_provideReason.innerHTML = newStaff['staffAward_provideReason'];
	staffAward_provideReason.setAttribute("name", "staffAwards[" + b + "].award_provideReason");*/

	// 增加删除按钮的列
	var reviseTd = document.createElement("td");
	// 增加删除按钮及样式
	var delete_button = document.createElement("button");
	delete_button.className = 'btn btn-default btn-xs';
	delete_button.setAttribute("type", "button");
	delete_button.addEventListener('click', function() {
		this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);}, false);
	delete_button.style['margin-left'] = "10px";
	// 添加按钮里的图标
	var delete_icon = document.createElement("i");
	delete_icon.className = "fa fa-trash";
	delete_button.append(delete_icon);
	reviseTd.append(delete_button);

	tra_tr.appendChild(stafftrain_train);
	tra_tr.appendChild(stafftrain_score);
	tra_tr.appendChild(stafftrain_certificate);
//	tra_tr.appendChild(staffAward_provideReason);
	tra_tr.appendChild(reviseTd);
	staffTrain_table.children[0].append(tra_tr);
	b++;
	}
}


// 改变性别方法
function changeSex(even) {
	var sex = document.getElementById("staff_sex");
	sex.value = even.value;
	return sex.value;
}

// 长表格每行的删除
function delete_long() {
	console.log("删除方法执行");
	var this_tbody = this.parentNode.parentNode.parentNode;
	this_tbody.removeChild(this.parentNode.parentNode);
}

function stopPropagation(e) {
	if (e.stopPropagation)
		e.stopPropagation();
	else
		e.cancelBubble = true;
}

//从身份证自动获取年龄 和判断身份证 格式
function getAge() {
	var ID = document.getElementsByName("staff.staff_cardid")[0].value;
	var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
	if (reg.test(ID) == false) {
		toastr.error('身份证格式错误,请输入有效身份证！');
		var idNumber = document.getElementById("idNumber");
		idNumber.value = "";
		idNumber.focus();
	}
	var sex_man = document.getElementsByName("staff.staff_sex")[0];
	var sex_woman = document.getElementsByName("staff.staff_sex")[1];
	// 根据身份证得到性别
	if (parseInt(ID.substr(16, 1)) % 2 == 1) {
		sex_man.checked = true;
	} else {
		sex_woman.checked = true;
	}
	// 根据身份证得到生日
	var year = ID.substring(6, 10);
	var month = ID.substring(10, 12);
	var date = ID.substring(12, 14);
	document.querySelector(".staff_birth").value = year + "-" + month + "-"
			+ date;
	// 根据身份证得到年龄
	var myDate = new Date();
	var month = myDate.getMonth() + 1;
	var day = myDate.getDate();
	var age = myDate.getFullYear() - ID.substring(6, 10) - 1;
	if (ID.substring(10, 12) < month || ID.substring(10, 12) == month
			&& ID.substring(12, 14) <= day) {
		age++;
	}
	var staff_age = document.getElementsByName("staff.staff_age")[0];
	staff_age.value = age;
	console.log("年龄更新" + age);
	return age;
}
function clear_iquery() {
	console.log("这是清空");
	$(" input[ type='text' ]").val('');
	$(" textarea").val('');
}


