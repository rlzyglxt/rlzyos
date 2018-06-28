//载入界面
window.onload = function() {
	var url = window.location.href;
	staff_id = url.substring(url.indexOf("=") + 1);
	console.log(staff_id);
//	alert(staff_id);
	get_staffDetails(staff_id);
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
				document.getElementById("staff_modeldepaterment").innerHTML = document
						.getElementById("staff_modeldepaterment").innerHTML
						+ "<option value='"
						+ result[i].staffdepartment_name
						+ "'>"
						+ result[i].staffdepartment_name
						+ "</option>";
			}
		}
	});
}

//改变性别方法
function changeSex_man(even) {
	var sex = document.getElementById("sex");
	sex.value = even.value;
	return sex.value;
}
function changeSex_woman(even) {
	var sex = document.getElementById("sex");
	sex.value = even.value;
	return sex.value;
}
//更新年龄的ajax
function get_ageAjax(){
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXOBject("Microsoft.XMLHTTP");
	}
	var staffDetails = document.getElementById("staffDetails");
	var formData = new FormData(staffDetails);
	xmlhttp.open("post","/rlzyos/staff/staff_updataStaff?staff.rlzy_staff_id="
					+ staff_id, true);
	xmlhttp.send(formData);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (result == 'updateSuccess') {
				console.log('更新年龄成功！');
			} else {
				console.log('更新年龄成功！');
			}
		}
	};
	
}
//从身份证自动获取年龄  和判断身份证 格式
function relive_getAge(){
	var ID=document.getElementsByName("staff.staff_cardid")[0].value;
	var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  
	if(reg.test(ID)==false){
		toastr.error('身份证格式错误,请输入有效身份证！');
		var idNumber=document.getElementById("idNumber");
		idNumber.value="";
		idNumber.focus();
	}
	var myDate = new Date(); 
	var month = myDate.getMonth() + 1; 
	var day = myDate.getDate(); 
	var age = myDate.getFullYear()-ID.substring(6, 10) - 1; 
	if (ID.substring(10,12)<month||ID.substring(10,12)==month&&ID.substring(12,14)<=day) 
	{ 
	age++; 
	}	
    var xsjsglxt_age=document.getElementsByName("staff.staff_age")[0];
	xsjsglxt_age.value=age;
	console.log("年龄更新"+age);
	return age;
}

//通过id获取员工。并且显示该员工信息
function get_staffDetails(staff_id) {
	$.ajax({
		url : '/rlzyos/depaterment/depaterment_getAllDepaterment',
		type : 'post',
		success : function(data) {
			var result = JSON.parse(data);
			console.log(result);
			console.log(result.length);
			for (var i = 0; i < result.length; i++) {
				document.getElementById("staff_nowdepaterment").innerHTML = document
						.getElementById("staff_nowdepaterment").innerHTML
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
				document.getElementById("staff_noedepaterment").innerHTML = document
						.getElementById("staff_noedepaterment").innerHTML
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
				document.getElementById("staff_nordepaterment").innerHTML = document
						.getElementById("staff_nordepaterment").innerHTML
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
	$.ajax({
		url : '/rlzyos/staff/staffTrain_getTrainName',
		type : 'post',
		success : function(data) {
			var result = JSON.parse(data);
			console.log(result);
			console.log(result.length);
			for (var i = 0; i < result.length; i++) {
				document.getElementById("staff_train").innerHTML = document
						.getElementById("staff_train").innerHTML
						+ "<option value='"
						+ result[i].train_name
						+ "'>"
						+ result[i].train_name
						+ "</option>";
			}
		}
	});
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
			var staff_sex = document.getElementsByName("sex_content");
			var sex_man = staff_sex[0];
			var sex_woman = staff_sex[1];
			// 遍历并插入input的value
			$.each(staff, function(key, value) {
				if(key=="staff_sex"){
					if (value == "男") {
						sex_man.checked = true;
					} else {
						sex_woman.checked = true;
					}
				}else if(key=="staff_status"){
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
			relive_getAge();
			get_ageAjax();
			
			
			show_staffExpAjax(staff_id);
			show_staffAgreeAjax(staff_id);
			show_staffAwardAjax(staff_id);
			show_staffMoveAjax(staff_id);
			show_staffTrainAjax(staff_id);
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
//显示调动信息
function show_staffMoveAjax(staff_id) {
	console.log("调动信息");
	var staffMove_xmlHttp;
	if (window.XMLHttpRequest) {
		staffMove_xmlHttp=new XMLHttpRequest();
	} else {
		// IE6, IE5 浏览器执行代码
		staffMove_xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	staffMove_xmlHttp.onreadystatechange = function() {
		if (staffMove_xmlHttp.readyState == 4 && staffMove_xmlHttp.status == 200) {
			var staff_Move = staffMove_xmlHttp.responseText;
			if(staff_Move=="staffMoveIsNull"){
				$('#staffMove_table tbody').html("");
			}else{
				console.log(staff_Move);
				staff_Move = JSON.parse(staff_Move);
			var table_elements=$('#staffMove_table tbody');
			for(var i=1;i<table_elements.length;i++){
				table_elements.removeChild(table_elements.element[i]);
			}
			var str1 = '';
			for (var len = 0; len < staff_Move.length; len++) {
				var rlzy_staffMove_id = staff_Move[len].rlzy_staffMove_id;
				str1 += '<tr>';
				str1 += '<input type="hidden" class="rlzy_staffMove_id" id="'
						+ rlzy_staffMove_id + '">';
				str1 += '<td>' + staff_Move[len].staffMove_nowdepartment
				+ '</td>';
				str1 += '<td>' + staff_Move[len].staffMove_nowduty
						+ '</td>';
				str1 += '<td>' + staff_Move[len].staffMove_time
						+ '</td>';
				str1 += '<td>' + staff_Move[len].staffMove_remark
						+ '</td>';
				str1 += '<td> <button class="btn btn-default btn-xs" data-toggle="modal" data-target="#updataMove_Modal" onclick="show_staffmove(this)" type="button" ><i class="fa fa-pencil"></i></button><button class="btn btn-default btn-xs" onclick="delete_move(this)" type="button" ><i class="fa fa-trash"></i></button></td>';

				str1 += '</tr>';
			}
			$('#staffMove_table tbody').html(str1);
			}
		}
	}
	staffMove_xmlHttp.open("POST","/rlzyos/staff/staffMove_getStaffMoveByStaffId?staffmove.staffMove_staff="
			+ staff_id, true);
	staffMove_xmlHttp.send();
}
//显示培训信息
function show_staffTrainAjax(staff_id) {
	console.log("培训信息");
	var staffTrain_xmlHttp;
	if (window.XMLHttpRequest) {
		staffTrain_xmlHttp=new XMLHttpRequest();
	} else {
		// IE6, IE5 浏览器执行代码
		staffTrain_xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	staffTrain_xmlHttp.onreadystatechange = function() {
		if (staffTrain_xmlHttp.readyState == 4 && staffTrain_xmlHttp.status == 200) {
			var staff_Train = staffTrain_xmlHttp.responseText;
			if(staff_Train=="staffTriansIsNull"){
				$('#staffTrain_table tbody').html("");
			}else{
				console.log(staff_Train);
				staff_Train = JSON.parse(staff_Train);
			var table_elements=$("#staffTrain_table tbody");
			for(var i=1;i<table_elements.length;i++){
				table_elements.removeChild(table_elements.element[i]);
			}
			var str1 = '';
			for (var len = 0; len < staff_Train.length; len++) {
				var rlzy_stafftrain_id = staff_Train[len].rlzy_stafftrain_id;
				str1 += '<tr>';
				str1 += '<input type="hidden" class="rlzy_stafftrain_id" id="'
						+ rlzy_stafftrain_id + '">';
				str1 += '<td>' + staff_Train[len].stafftrain_train
				+ '</td>';
				str1 += '<td>' + staff_Train[len].stafftrain_score
						+ '</td>';
				str1 += '<td>' + staff_Train[len].stafftrain_certificate
						+ '</td>';
//				str1 += '<td>' + staff_Train[len].staffMove_remark
//						+ '</td>';
				str1 += '<td> <button class="btn btn-default btn-xs" data-toggle="modal" data-target="#updataTrain_Modal" onclick="show_stafftrain(this)" type="button" ><i class="fa fa-pencil"></i></button><button class="btn btn-default btn-xs" onclick="delete_train(this)" type="button" ><i class="fa fa-trash"></i></button></td>';

				str1 += '</tr>';
			}
			$('#staffTrain_table tbody').html(str1);
			}
		}
	}

	staffTrain_xmlHttp.open("POST","/rlzyos/staff/staffTrain_getStaffTrainsByStaffId?stafftrain.stafftrain_staff="
			+ staff_id, true);
	staffTrain_xmlHttp.send();
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
			get_staffDetails(staff_id);
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


/*function clear_iquery() {
	console.log("这是清空");
	$(" input[ type='text' ]").val('');
	$(" textarea").val('');
	get_staffDetails(staff_id);
}*/

function isBack() {
	if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
		return true;
	} else {
		return false;
	}
}
function clear_iquery1() {
	console.log("这是清空1");
	 $("#staffExp_address").val("");
	 $("#staffExp_startTime").val("");
	 $("#staffExp_remark").val("");
	 $("#staffExp_overTime").val("");
}
function clear_iquery2() {
	console.log("这是清空2");
	 $("#agreement_startTime").val("");
	 $("#agreement_overtTime").val("");
	 $("#agreement_content").val("");	
	 $("#agreement_remark").val("");
	 $(" textarea").val('');
	/* $(" textarea").val('');*/
}
function clear_iquery3() {
	console.log("这是清空3");
	$("#award_amount").val("");
	 $("#award_provideTime").val("");
	 $("#award_provideDepartment").val("");	
	 $("#award_provideReason").val("");
}
function clear_iquery4() {
	console.log("这是清空4");
	$("#staff_wdepaterment").val("");
	$("#staffMove_nowduty").val("");
	$("#staffMove_time").val("");
	$("#staffMove_remark").val("");
}
function clear_iquery5() {
console.log("这是清空5");
	console.log("这是清空6");
	$(" textarea").val('');
	$("#stafftrain_train").val("");
	$("#stafftrain_score").val("");
	$("#stafftrain_certificate").val("");
}
function clear_iquery6() {
	console.log("这是清空6");
/*	$(" input[ type='text' ]").val('');
	$(" textarea").val('');*/
	$("#updatastaffExp_address").val("");
	$("#updatastaffExp_startTime").val("");
	$("#updatastaffExp_overTime").val("");
	$("#updatastaffExp_remark").val("");
}
function clear_iquery7() {
	console.log("这是清空7");
/*	$(" input[ type='text' ]").val('');
	$(" textarea").val('');*/
	$("#updataagreement_startTime").val("");
	$("#updataagreement_overtTime").val("");
	$("#updataagreement_content").val("");
	$("#updataagreement_remark").val("");
	
}
function clear_iquery8() {
	console.log("这是清空8");
/*	$(" input[ type='text' ]").val('');
	$(" textarea").val('');*/
	$("#updataaward_amount").val("");
	$("#updataaward_provideTime").val("");
	$("#updataaward_provideDepartment").val("");
	$("#updataaward_provideReason").val("");
}
function clear_iquery9() {
	console.log("这是清空9");
/*	$(" input[ type='text' ]").val('');
	$(" textarea").val('');*/
	$("#updatastaffMove_nowdepartment").val("");
	$("#updatastaffMove_nowduty").val("");
	$("#updatastaffMove_time").val("");
	$("#updatastaffMove_remark").val("");
}
function clear_iquery10() {
	console.log("这是清空5");
/*	$(" input[ type='text' ]").val('');
	$(" textarea").val('');*/
	$("#updatastafftrain_train").val("");
	$("#updatastafftrain_score").val("");
	$("#updatastafftrain_certificate").val("");
}

