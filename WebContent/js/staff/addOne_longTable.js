//长表格员工履历添加一条
function add_oneStaffExp() {
	console.log("修改员工页面履历添加");
	console.log(staff_id);
	// 添加一条数据
	var staffExp_address = $(".staffExp_address").val();
	var staffExp_startTime = $(".staffExp_startTime").val();
	var staffExp_overTime = $(".staffExp_overTime").val();
	var staffExp_remark = $(".staffExp_remark").val();
	
	$.ajax({
				type : "POST",
				url : "/rlzyos/staff/staffExp_addStaffExp?staffExps.staffExp_staff="
						+ staff_id,
				data : {
					"staffExps[0].staffExp_address" : staffExp_address,
					"staffExps[0].staffExp_startTime" : staffExp_startTime,
					"staffExps[0].staffExp_overTime" : staffExp_overTime,
					"staffExps[0].staffExp_remark" : staffExp_remark,
				},
				success : function(data) {
					alert("一条履历添加成功");
					toastr.success('添加学习成功！');
					show_staffExpAjax(staff_id);
				}
			});
}
//长表格添加员工合同一条
function add_oneStaffAgreement() {
	console.log("员工履历添加");
	console.log(staff_id);
	// 添加一条数据
	var agreement_startTime = $(".agreement_startTime").val();
	var agreement_overtTime = $(".agreement_overtTime").val();
	var agreement_content = $(".agreement_content").val();
	var agreement_remark = $(".agreement_remark").val();
	$.ajax({
				type : "POST",
				url : "/rlzyos/staff/staffAgreement_addStaffAgreement?staffagreements.agreement_staff="
						+ staff_id,
				data : {
					"staffagreements[0].agreement_startTime" : agreement_startTime,
					"staffagreements[0].agreement_overtTime" : agreement_overtTime,
					"staffagreements[0].agreement_content" : agreement_content,
					"staffagreements[0].agreement_remark" : agreement_remark,
				},
				success : function(data) {
					toastr.success('合同添加成功！');
					show_staffAgreeAjax(staff_id);
				}
			});
}
//长表格添加员工奖金记录一条
function add_oneStaffAward() {
	console.log("员工奖金添加");
	console.log(staff_id);
	// 添加一条数据
	var award_amount = $(".award_amount").val();
	var award_provideTime = $(".award_provideTime").val();
	var award_provideDepartment = $(".award_provideDepartment").val();
	var award_provideReason = $(".award_provideReason").val();
	$.ajax({
				type : "POST",
				url : "/rlzyos/staff/staffAward_addStaffAward?staffAwards.award_staff="
						+ staff_id,
				data : {
					"staffAwards[0].award_amount" : award_amount,
					"staffAwards[0].award_provideTime" : award_provideTime,
					"staffAwards[0].award_provideDepartment" : award_provideDepartment,
					"staffAwards[0].award_provideReason" : award_provideReason,
				},
				success : function(data) {
					toastr.success('奖金发放成功！');
					show_staffAwardAjax(staff_id);
				}
			});
}