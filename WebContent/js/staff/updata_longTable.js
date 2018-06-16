//显示当前员工履历在模态框中
function show_staffexp(updata_button) {
	 console.log("回显履历");
	 var this_tr=updata_button.parentNode.parentNode;
	 console.log(this_tr.children[1].innerHTML);
	 this_trId=this_tr.querySelector(".rlzy_staffExp_id").getAttribute("id");
	 document.querySelector(".updatastaffExp_address").value=this_tr.children[1].innerHTML;
	 document.querySelector(".updatastaffExp_startTime").value=this_tr.children[2].innerHTML;
	 document.querySelector(".updatastaffExp_overTime").value=this_tr.children[3].innerHTML;
	 document.querySelector(".updatastaffExp_remark").value=this_tr.children[4].innerHTML;

}
//修改员工履历
function updata_Exp(){
	console.log("员工履历修改");
	// 修改一条数据
	var staffExp_address=$(".updatastaffExp_address").val();
	var staffExp_startTime=$(".updatastaffExp_startTime").val();
	var staffExp_overTime=$(".updatastaffExp_overTime").val();
	var staffExp_remark=$(".updatastaffExp_remark").val();
	$.ajax({
				type : "POST",
				url : '/rlzyos/staff/staffExp_updataStaffExp?staffExp.rlzy_staffExp_id='+this_trId,
				data :{
					"staffExp.staffExp_address":staffExp_address,
					"staffExp.staffExp_startTime":staffExp_startTime,
					"staffExp.staffExp_overTime":staffExp_overTime,
					"staffExp.staffExp_remark":staffExp_remark,
				},
				success:function(data){
					toastr.success('修改学习经历成功！');
					show_staffExpAjax(staff_id);
				},
			});
}

//显示当前员工合同在模态框中
function show_staffagreement(updata_button) {
	 console.log("回显合同");
	 var this_tr=updata_button.parentNode.parentNode;
	 console.log(this_tr.children[1].innerHTML);
	 this_trId=this_tr.querySelector(".rlzy_agreement_id").getAttribute("id");
	 document.querySelector(".updataagreement_startTime").value=this_tr.children[1].innerHTML;
	 document.querySelector(".updataagreement_overtTime").value=this_tr.children[2].innerHTML;
	 document.querySelector(".updataagreement_content").value=this_tr.children[3].innerHTML;
	 document.querySelector(".updataagreement_remark").value=this_tr.children[4].innerHTML;

}
//修改员工履历
function updata_Agreement(){
	console.log("合同修改");
	// 修改一条数据
	var agreement_startTime=$(".updataagreement_startTime").val();
	var agreement_overtTime=$(".updataagreement_overtTime").val();
	var agreement_content=$(".updataagreement_content").val();
	var agreement_remark=$(".updataagreement_remark").val();
	$.ajax({
				type : "POST",
				url : '/rlzyos/staff/staffAgreement_updataStaffAgreement?agreement.rlzy_agreement_id='+this_trId,
				data :{
					"agreement.agreement_startTime":agreement_startTime,
					"agreement.agreement_overtTime":agreement_overtTime,
					"agreement.agreement_content":agreement_content,
					"agreement.agreement_remark":agreement_remark,
				},
				success:function(data){
					toastr.success('修改学习经历成功！');
					show_staffAgreeAjax(staff_id);
				},
			});
}

//显示当前员工奖金在模态框中
function show_staffaward(updata_button) {
	 console.log("回显奖金");
	 var this_tr=updata_button.parentNode.parentNode;
	 console.log(this_tr.children[1].innerHTML);
	 this_trId=this_tr.querySelector(".rlzy_staffAward_id").getAttribute("id");
	 document.querySelector(".updataaward_amount").value=this_tr.children[1].innerHTML;
	 document.querySelector(".updataaward_provideTime").value=this_tr.children[2].innerHTML;
	 document.querySelector(".updataaward_provideDepartment").value=this_tr.children[3].innerHTML;
	 document.querySelector(".updataaward_provideReason").value=this_tr.children[4].innerHTML;

}
//修改员工奖金
function updata_Award(){
	console.log("奖金修改");
	// 修改一条数据
	var award_amount=$(".updataaward_amount").val();
	var award_provideTime=$(".updataaward_provideTime").val();
	var award_provideDepartment=$(".updataaward_provideDepartment").val();
	var award_provideReason=$(".updataaward_provideReason").val();
	$.ajax({
				type : "POST",
				url : '/rlzyos/staff/staffAward_updataStaffAward?staffAward.rlzy_staffAward_id='+this_trId,
				data :{
					"staffAward.award_amount":award_amount,
					"staffAward.award_provideTime":award_provideTime,
					"staffAward.award_provideDepartment":award_provideDepartment,
					"staffAward.award_provideReason":award_provideReason,
				},
				success:function(data){
					toastr.success('修改奖金记录成功！');
					show_staffAwardAjax(staff_id);
				},
			});
}