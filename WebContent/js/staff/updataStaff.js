//载入界面
window.onload = function() {
	var url = window.location.href;
	staff_id = url.substring(url.indexOf("=") + 1);

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
	console.log(staff_id);
	alert(staff_id);
	get_staffDetails(staff_id);
	
}
//通过id获取员工。并且显示该员工信息
function get_staffDetails(staff_id) {
	/*alert("通过id得到信息并修改");*/
	/*alert(staff_id);*/
	var url = "/rlzyos/staff/staff_getStaffById?rlzy_staff_id="
			+ staff_id;
	get_staffDetails_Ajax(url,staff_id);
	
}

function get_staffDetails_Ajax(url,staff_id) {
	console.log("基本信息");
	getXmlHttp();
	xmlHttp.open("POST",url,true);
	xmlHttp.send();
	xmlHttp.onreadystatechange = function() {
		if (isBack()) {
			//传回信息，加载到数据框中
			var staff = xmlHttp.responseText;
			staff = JSON.parse(staff);
			/*alert(staff.staff_number);*/
			
			// 遍历并插入input的value
			$.each(staff, function(key, value) {
				if(key=="staff_status"){
					if(value=="离职"){
						document.querySelector(".staff_leaveTime_label").style.display = "";
						document.querySelector(".staff_leaveTime").style.display = "";
						
						document.querySelector(".staff_leaveReason_label").style.display = "";
						document.querySelector(".staff_leaveReason").style.display = "";
						$('input[name="staff.' + key + '"]').val(value);
			}
				
			}
				$('input[name="staff.' + key + '"]').val(value);
		});
			
			
			$('#staff_number').val(staff.staff_number);
			$('#staff_name').val(staff.staff_name);
			$('#staff_sex').val(staff.staff_sex);
			$('#staff_birthTime').val(staff.staff_birth);
			$('#staff_tel').val(staff.staff_tel);
			$('#staff_address').val(staff.staff_address);
			$('#staff_record').val(staff.staff_record);
			$('#staff_duty').val(staff.staff_duty);
			$('#staff_status').val(staff.staff_status);
			$('#staff_depaterment').val(staff.staff_depaterment);
//			$('.staff_leaveTime').val(staff.staff_leaveTime);
//			$('.staff_leaveReason').val(staff.staff_leaveReason);
			show_staffExpAjax(staff_id);
			show_staffAgreeAjax(staff_id);
			show_staffAwardAjax(staff_id);
	}
}
	}

//显示工作经历
function show_staffExpAjax(staff_id) {
	console.log("显示工作履历");
	var staffExp_xmlHttp;
	if (window.XMLHttpRequest) {
		staffExp_xmlHttp=new XMLHttpRequest();
	} else {
		// IE6, IE5 浏览器执行代码
		staffExp_xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	staffExp_xmlHttp.onreadystatechange = function() {
		if (staffExp_xmlHttp.readyState == 4 && staffExp_xmlHttp.status == 200) {
			var staff_Exp = staffExp_xmlHttp.responseText;
			if(staff_Exp=="null"){
				$('#staffExperience_table tbody').html("");
			}else{
				staff_Exp = JSON.parse(staff_Exp);
				console.log(staff_Exp);
			var table_elements=$("#staffExperience_table tbody");
			for(var i=1;i<table_elements.length;i++){
				table_elements.removeChild(table_elements.element[i]);
			}
			var str1 = '';
			for (var len = 0; len < staff_Exp.length; len++) {
				var rlzy_staffExp_id = staff_Exp[len].rlzy_staffExp_id;
				str1 += '<tr>';
				str1 += '<input type="hidden" class="rlzy_staffExp_id" id="'
						+ rlzy_staffExp_id + '">';
				str1 += '<td>' + staff_Exp[len].staffExp_address
				+ '</td>';
				str1 += '<td>' + staff_Exp[len].staffExp_startTime
						+ '</td>';
				str1 += '<td>' + staff_Exp[len].staffExp_overTime
						+ '</td>';
				str1 += '<td>' + staff_Exp[len].staffExp_remark
						+ '</td>';
				str1 += '<td> <button class="btn btn-default btn-xs" data-toggle="modal" data-target="#updataStaffExp_Modal" onclick="show_staffexp(this)" type="button" ><i class="fa fa-pencil"></i></button><button class="btn btn-default btn-xs" onclick="delete_exp(this)" type="button" ><i class="fa fa-trash"></i></button></td>';

				str1 += '</tr>';
			}
			$('#staffExperience_table tbody').html(str1);
			}
		}
	}
	staffExp_xmlHttp.open("POST","/rlzyos/staff/staffExp_getStaffExpsByStaffId?staffExp.staffExp_staff="
			+ staff_id, true);
	staffExp_xmlHttp.send();
}
//显示合同信息
function show_staffAgreeAjax(staff_id) {
	console.log("合同信息");
	var staffAgree_xmlHttp;
	if (window.XMLHttpRequest) {
		staffAgree_xmlHttp=new XMLHttpRequest();
	} else {
		// IE6, IE5 浏览器执行代码
		staffAgree_xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	staffAgree_xmlHttp.onreadystatechange = function() {
		if (staffAgree_xmlHttp.readyState == 4 && staffAgree_xmlHttp.status == 200) {
			var staff_Agree = staffAgree_xmlHttp.responseText;
			if(staff_Agree=="null"){
				$('#staffAgreement_table tbody').html("");
			}else{
				console.log(staff_Agree);
				staff_Agree = JSON.parse(staff_Agree);
			var table_elements=$("#staffAgreement_table tbody");
			for(var i=1;i<table_elements.length;i++){
				table_elements.removeChild(table_elements.element[i]);
			}
			var str1 = '';
			for (var len = 0; len < staff_Agree.length; len++) {
				var rlzy_agreement_id = staff_Agree[len].rlzy_agreement_id;
				str1 += '<tr>';
				str1 += '<input type="hidden" class="rlzy_agreement_id" id="'
						+ rlzy_agreement_id + '">';
				str1 += '<td>' + staff_Agree[len].agreement_startTime
				+ '</td>';
				str1 += '<td>' + staff_Agree[len].agreement_overtTime
						+ '</td>';
				str1 += '<td>' + staff_Agree[len].agreement_content
						+ '</td>';
				str1 += '<td>' + staff_Agree[len].agreement_remark
						+ '</td>';
				str1 += '<td> <button class="btn btn-default btn-xs" data-toggle="modal" data-target="#updataAgreement_Modal" onclick="show_staffagreement(this)" type="button" ><i class="fa fa-pencil"></i></button><button class="btn btn-default btn-xs" onclick="delete_agreement(this)" type="button" ><i class="fa fa-trash"></i></button></td>';

				str1 += '</tr>';
			}
			$('#staffAgreement_table tbody').html(str1);
			}
		}
	}
	staffAgree_xmlHttp.open("POST","/rlzyos/staff/staffAgreement_getStaffAgreementByStaffId?agreement.agreement_staff="
			+ staff_id, true);
	staffAgree_xmlHttp.send();
}
//显示奖金信息
function show_staffAwardAjax(staff_id) {
	console.log("奖金信息");
	var staffAward_xmlHttp;
	if (window.XMLHttpRequest) {
		staffAward_xmlHttp=new XMLHttpRequest();
	} else {
		// IE6, IE5 浏览器执行代码
		staffAward_xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	staffAward_xmlHttp.onreadystatechange = function() {
		if (staffAward_xmlHttp.readyState == 4 && staffAward_xmlHttp.status == 200) {
			var staff_Award = staffAward_xmlHttp.responseText;
			if(staff_Award=="null"){
				$('#staffAward_table tbody').html("");
			}else{
				console.log(staff_Award);
				staff_Award = JSON.parse(staff_Award);
			var table_elements=$("#staffAward_table tbody");
			for(var i=1;i<table_elements.length;i++){
				table_elements.removeChild(table_elements.element[i]);
			}
			var str1 = '';
			for (var len = 0; len < staff_Award.length; len++) {
				var rlzy_staffAward_id = staff_Award[len].rlzy_staffAward_id;
				str1 += '<tr>';
				str1 += '<input type="hidden" class="rlzy_staffAward_id" id="'
						+ rlzy_staffAward_id + '">';
				str1 += '<td>' + staff_Award[len].award_amount
				+ '</td>';
				str1 += '<td>' + staff_Award[len].award_provideTime
						+ '</td>';
				str1 += '<td>' + staff_Award[len].award_provideReason
						+ '</td>';
				str1 += '<td>' + staff_Award[len].award_provideDepartment
						+ '</td>';
				str1 += '<td> <button class="btn btn-default btn-xs" data-toggle="modal" data-target="#updataAward_Modal" onclick="show_staffaward(this)" type="button" ><i class="fa fa-pencil"></i></button><button class="btn btn-default btn-xs" onclick="delete_award(this)" type="button" ><i class="fa fa-trash"></i></button></td>';

				str1 += '</tr>';
			}
			$('#staffAward_table tbody').html(str1);
			}
		}
	}
	staffAward_xmlHttp.open("POST","/rlzyos/staff/staffAward_getStaffAwardByStaffId?staffAward.award_staff="
			+ staff_id, true);
	staffAward_xmlHttp.send();
}

// staffDetail.jsp中的修改人员
function staff_updata() {
	$.confirm({
				title : '修改!',
				content : '确定修改吗!',
				buttons : {
					取消 : function() {
					},
					确定 : {
						action : function() {
							loadstaffDetail_staff_relive();
						}
					}
				}
			});
}

// 执行修改按钮
function loadstaffDetail_staff_relive() {
	console.log("b2");
	getXmlHttp();
	var staffData = document.getElementById("staffDetails");
	var formData = new FormData(staffData);
	xmlHttp.open("post","/rlzyos/staff/staff_updataStaff?rlzy_staff_id="
			+ staff_id, true);
//	formData.append(staffDetails);
//	formData.append()
//	formData.append(staff_id);
	console.log(staffData.value);
	xmlHttp.send(formData);
	xmlHttp.onreadystatechange = function() {
		console.log("c2");
		if (isBack()) {
			var result = xmlHttp.responseText;
		/*	alert(result);*/
			console.log(result);
			switch (result) {
			case "":
				toastr.warning("不好，修改失败了！！");
				break;
			case "updataStaffSuccess":
				toastr.warning("修改成功,返回信息列表");
			//刷新页面
			get_staffDetails();
		}
		};
	}
}

//检查员工状态的内容新增内容
function checkIt(value) {
	/*alert(value);*/
	if (value == "离职") {
		// 离职显示离职时间和
		document.querySelector(".staff_leaveTime_label").style.display = "";
		document.querySelector(".staff_leaveTime").style.display = "";
		
		document.querySelector(".staff_leaveReason_label").style.display = "";
		document.querySelector(".staff_leaveReason").style.display = "";

	} else if (value == "在职") {
		// 清空其他内容
		document.querySelector(".staff_leaveTime_label").style.display = "none";
		document.querySelector(".staff_leaveTime").style.display = "none";
		document.querySelector(".staff_leaveReason_label").style.display = "none";
		document.querySelector(".staff_leaveReason").style.display = "none";
//	} else {
//		document.querySelector(".staff_leaveTime_label").style.display = "none";
//		document.querySelector(".staff_leaveTime").style.display = "none";
//		document.querySelector(".staff_leaveReason_label").style.display = "none";
//		document.querySelector(".staff_leaveReason").style.display = "none";
	}
}



function isBack() {
	if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
		return true;
	} else {
		return false;
	}
}
