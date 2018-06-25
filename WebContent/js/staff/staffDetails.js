var staffVue;
window.onload = function() {
	staffVue = new Vue({
		el:'.panel',
		data:{
			returnData:'',
			exps:'',
			agreements:"",
			awards:"",
			moves:"",
			trains:""
		}
	})
	var url = window.location.href;
	staff_id = url.substring(url.indexOf("=") + 1);
	console.log(staff_id);
	get_staffDetails(staff_id);
	$.ajax({
		url : '/rlzyos/staff/staffTrain_getTrainName',
		type : 'post',
		success : function(data) {
			var result = JSON.parse(data);
			console.log(result);
			console.log(result.length);
			for (var i = 0; i < result.length; i++) {
				document.getElementById("train_name").innerHTML = document
						.getElementById("train_name").innerHTML
						+ "<option value='"
						+ result[i].train_name
						+ "'>"
						+ result[i].train_name
						+ "</option>";
			}
		}
	});
}

function get_staffDetails(staff_id) {
	console.log("b1");
	var url = "/rlzyos/staff/staff_getStaffById?rlzy_staff_id="
			+ staff_id;;
	get_staffDetails_Ajax(url, staff_id);
}
function get_staffDetails_Ajax(url, staff_id) {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		// IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
		xmlhttp = new XMLHttpRequest();
	} else {
		// IE6, IE5 浏览器执行代码
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var staff_info = xmlhttp.responseText;
			staff_info = JSON.parse(staff_info);
			staffVue.returnData  = staff_info;
			console.log(staff_info);
			
			
			show_agreementAjax(staff_id);
			show_ExpAjax(staff_id);
			show_awardAjax(staff_id);
			show_trainAjax(staff_id);
		}
	}
	xmlhttp.open("post", url, true);
	xmlhttp.send();
}
// 显示工作经历
function show_ExpAjax(staff_id) {
	console.log("study发生发生地方");
	var xmlhttp_Exp;
	if (window.XMLHttpRequest) {
		xmlhttp_Exp = new XMLHttpRequest();
	} else {
		xmlhttp_Exp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp_Exp.onreadystatechange = function() {
		if (xmlhttp_Exp.readyState == 4 && xmlhttp_Exp.status == 200) {
			var staff_Exp = xmlhttp_Exp.responseText;
			if(staff_Exp=="staffExpIsNull"){
				$('#staffExperience_table tbody ').html("");
			}else{
			console.log("staff_Exp" + staff_Exp);
			staff_Exp = JSON.parse(staff_Exp);
			staffVue.exps = staff_Exp;
			}
		}
	}
	xmlhttp_Exp.open("POST",
			"/rlzyos/staff/staffExp_getStaffExpsByStaffId?staffExp.staffExp_staff="
			+ staff_id, true);
	xmlhttp_Exp.send();
}
// 显示合同
function show_agreementAjax(staff_id) {
	var xmlhttp_agreement;
	if (window.XMLHttpRequest) {
		xmlhttp_agreement = new XMLHttpRequest();
	} else {
		xmlhttp_agreement = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp_agreement.onreadystatechange = function() {
		if (xmlhttp_agreement.readyState == 4 && xmlhttp_agreement.status == 200) {
			var staff_agreement = xmlhttp_agreement.responseText;
			if(staff_agreement=="null"){
				$('#staffAgreement_table tbody').html("");
			}else{
			console.log(staff_agreement);
			staff_agreement = JSON.parse(staff_agreement);
			staffVue.agreements=staff_agreement;
			}
		}
	}
	xmlhttp_agreement.open("POST",
			"/rlzyos/staff/staffAgreement_getStaffAgreementByStaffId?agreement.agreement_staff="
			+ staff_id, true);
	xmlhttp_agreement.send();
}
// 显示奖金
function show_awardAjax(staff_id) {
	var xmlhttp_award;
	if (window.XMLHttpRequest) {
		xmlhttp_award = new XMLHttpRequest();
	} else {
		xmlhttp_award = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp_award.onreadystatechange = function() {
		if (xmlhttp_award.readyState == 4 && xmlhttp_award.status == 200) {
			var staff_award = xmlhttp_award.responseText;
			if(staff_award=="null"){
				$('#staffAward_table tbody').html("");
			}else{
			console.log(staff_award);
			staff_award = JSON.parse(staff_award);
			staffVue.awards=staff_award;

			}
		}
	}
	xmlhttp_award.open("POST",
			"/rlzyos/staff/staffAward_getStaffAwardByStaffId?staffAward.award_staff="
			+ staff_id, true);
	xmlhttp_award.send();
}
//显示调配
function show_moveAjax(staff_id) {
	var xmlhttp_move;
	if (window.XMLHttpRequest) {
		xmlhttp_move = new XMLHttpRequest();
	} else {
		xmlhttp_move = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp_move.onreadystatechange = function() {
		if (xmlhttp_move.readyState == 4 && xmlhttp_move.status == 200) {
			var staff_move = xmlhttp_award.responseText;
			if(staff_move=="null"){
				$('#staffAward_table tbody').html("");
			}else{
			console.log(staff_move);
			staff_move = JSON.parse(staff_move);
			staffVue.moves=staff_move;

			}
		}
	}
	xmlhttp_move.open("POST",
			"/rlzyos/staff/staffAward_getStaffAwardByStaffId?staffAward.award_staff="
			+ staff_id, true);
	xmlhttp_move.send();
}
//显示培训
function show_trainAjax(staff_id) {
	var xmlhttp_train;
	if (window.XMLHttpRequest) {
		xmlhttp_train = new XMLHttpRequest();
	} else {
		xmlhttp_train = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp_train.onreadystatechange = function() {
		if (xmlhttp_train.readyState == 4 && xmlhttp_train.status == 200) {
			var staff_train = xmlhttp_train.responseText;
			if(staff_train=="staffTriansIsNull"){
				$('#staffTrain_table tbody').html("");
			}else{
			console.log(staff_train);
			staff_train = JSON.parse(staff_train);
			staffVue.trains=staff_train;

			}
		}
	}
	xmlhttp_train.open("POST",
			"/rlzyos/staff/staffTrain_getStaffTrainsByStaffId?stafftrain.stafftrain_staff="
			+ staff_id, true);
	xmlhttp_train.send();
}