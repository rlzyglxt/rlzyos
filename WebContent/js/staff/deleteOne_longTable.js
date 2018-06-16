//删除员工履历一条
function delete_exp(delete_button) {
	//把td送页面上删
	  var this_trId=delete_button.parentNode.parentNode.querySelector(".rlzy_staffExp_id").getAttribute("id");
	  console.log("本行的id"+this_trId);
		//把这行td的数据数据库中删除
		$.ajax({
			url : '/rlzyos/staff/staffExp_deleteStaffExp?staffExp.rlzy_staffExp_id='+this_trId,
			type : 'POST',
			success:function(data){
				toastr.success('删除员工履历成功！');
				show_staffExpAjax(staff_id);
			},
		});
}

//删除员工合同一条
function delete_agreement(delete_button) {
		//把td送页面上删
	  var this_trId=delete_button.parentNode.parentNode.querySelector(".rlzy_agreement_id").getAttribute("id");
	  console.log("本行的id"+this_trId);
		//把这行td的数据数据库中删除
		$.ajax({
			url : '/rlzyos/staff/staffAgreement_deleteStaffAgreement?agreement.rlzy_agreement_id='+this_trId,
			type : 'POST',
			success:function(data){
				toastr.success('删除合同成功！');
				show_staffAgreeAjax(staff_id);
			},
		});	
}

//删除员工奖金一条
function delete_award(delete_button) {
		//把td送页面上删
	  var this_trId=delete_button.parentNode.parentNode.querySelector(".rlzy_staffAward_id").getAttribute("id");
	  console.log("本行的id"+this_trId);
		//把这行td的数据数据库中删除
		$.ajax({
			url : '/rlzyos/staff/staffAward_deleteStaffAward?staffAward.rlzy_staffAward_id='+this_trId,
			type : 'POST',
			success:function(data){
				toastr.success('删除合同成功！');
				show_staffAwardAjax(staff_id);
			},
		});	
}