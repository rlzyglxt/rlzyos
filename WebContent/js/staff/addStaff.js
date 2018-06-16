var newStaff = {};
var xmlHttp;
window.onload = function() {
	alert("获得部门");
	$.ajax({
		url : '/rlzyos/depaterment/depaterment_getAllDepaterment',
		type : 'post',
		success : function(data) {
			var result = JSON.parse(data);
			console.log(result);
			console.log(result.length);
			for (var i = 0; i < result.length; i++) {
				document.getElementById("rlzy_staffdepartment_id").innerHTML = document
						.getElementById("rlzy_staffdepartment_id").innerHTML
						+ "<option value='"
						+ result[i].rlzy_staffdepartment_id
						+ "'>"
						+ result[i].staffdepartment_name
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
						var number = document.getElementsByName("staff.staff_number")[0].value;
						var name = document.getElementsByName("staff.staff_name")[0].value;
						var duty = document.getElementsByName("staff.staff_duty")[0].value;
						if (number == "" || name == "" || duty == "") {
							toastr.error('工号、姓名、职务不能为空！');
							return false;
						}
						addStaff_Info(url);
					}
					}
				}
			});
}
// 员工基本信息表
function addStaff_Info(url) {
	getXmlHttp();
	var staffDetails = document.getElementById("staffDetails");
	var formData = new FormData(staffDetails);
	xmlHttp.open("post", url, true);
	xmlHttp.send(formData);
	xmlHttp.onreadystatechange = function() {
		console.log("c2");
		if (isBack()) {
			console.log(xmlHttp.responseText);
			var id = xmlHttp.responseText;//返回id
			staffExp_ajax(id);
			staffAgreement_ajax(id);
			staffAward_ajax(id);
			toastr.success("新建成功");
			//返回修改页面(未做)	
			/*window.location.href = '/rlzyos/staff/staff_page_StaffInfo';*/
		
	}
	
}
}
//添加员工履历
function staffExp_ajax(id){	
	getXmlHttp();
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
		if (isBack()) {
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

//员工合同提交
function staffAgreement_ajax(id){	
	getXmlHttp();
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
		if (isBack()) {
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
	console.log("add_workExperience start");
	// 把表格的数据存到json中
	var staffAgreement_startTime = document.querySelector(".agreement_startTime").value;
	var staffAgreement_overtTime = document.querySelector(".agreement_overtTime").value;
	var staffAgreement_content = document.querySelector(".agreement_content").value;
	var staffAgreement_remark = document.querySelector(".agreement_remark").value;

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

//员工奖金提交
function staffAward_ajax(id){	
	getXmlHttp();
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
		if (isBack()) {
			// console.log("studyExp_ajax"+xmlHttp.responseText);
		}

	};
	xmlHttp.open("post", "/rlzyos/staff/staffAward_addStaffAward", true);
	// xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8");
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
	staffAward_amount.setAttribute("name", "staffAwards[" + y + "].award_amount");
	console.log(staffAward_amount.innerHTML);
	//结束时间
	var staffAward_provideTime = document.createElement("td");
	staffAward_provideTime.innerHTML = newStaff['staffAward_provideTime'];
	staffAward_provideTime.setAttribute("name", "staffAwards[" + y + "].award_provideTime");
	console.log(staffAward_provideTime.innerHTML);
	//内容
	var staffAward_provideDepartment = document.createElement("td");
	staffAward_provideDepartment.innerHTML = newStaff['staffAward_provideDepartment'];
	staffAward_provideDepartment.setAttribute("name", "staffAwards[" + y	+ "].award_provideDepartment");
	//备注
	var staffAward_provideReason = document.createElement("td");
	staffAward_provideReason.innerHTML = newStaff['staffAward_provideReason'];
	staffAward_provideReason.setAttribute("name", "staffAwards[" + y + "].award_provideReason");

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

function clear_iquery() {
	console.log("这是清空");
	$(" input[ type='text' ]").val('');
	$(" textarea").val('');
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
