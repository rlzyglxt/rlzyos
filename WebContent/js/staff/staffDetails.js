var staffVue;
window.onload = function() {
	staffVue = new Vue({
		el:'.panel',
		data:{
			returnData:'',
			exps:'',
			agreements:"",
			awards:""			
		}
	})
	var url = window.location.href;
	staff_id = url.substring(url.indexOf("=") + 1);
	console.log(staff_id);
	get_staffDetails(staff_id);
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
			staffVue.familys=staff_award;

			}
		}
	}
	xmlhttp_award.open("POST",
			"/rlzyos/staff/staffAward_getStaffAwardByStaffId?staffAward.award_staff="
			+ staff_id, true);
	xmlhttp_award.send();
}