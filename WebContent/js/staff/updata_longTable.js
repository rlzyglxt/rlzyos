
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
	//字符验证
	var time = /[^0-9]/ig;
	var str1 = staffExp_startTime.replace(time,"");
	var str2 = staffExp_overTime.replace(time,"");
	if(staffExp_address == ""|| staffExp_startTime ==""|| staffExp_overTime==""){
		 toastr.error("请把空项填写完整");
	}else if(staffExp_address.length>10){ 
		 toastr.error("请输入20个字以内的地址");
		 $(".updatastaffExp_address").val("");
		 return false;
	}else if (str1 >= str2){//判断起始时间不能大于结束时间
		toastr.error("请输入时间顺序有误");
		$(".updatastaffExp_startTime").val("");
		$(".updatastaffExp_overTime").val("");
		return false;
	}else if (staffExp_remark.length > 20){
		toastr.error("备注不可超过20字");
		return false;
	}else{
		$('#updataStaffExp_Modal').modal('hide');
	
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
					toastr.success('修改履历成功！');
					$(".updatastaffExp_address").val("");
					$(".updatastaffExp_startTime").val("");
					$(".updatastaffExp_overTime").val("");
					$(".updatastaffExp_remark").val("");
					show_staffExpAjax(staff_id);
				},
			});
	}
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
	//js验证
	var time = /[^0-9]/ig;
	var str1 = agreement_startTime.replace(time,"");
	var str2 = agreement_overtTime.replace(time,"");
	if(agreement_startTime == ""|| agreement_overtTime == "" || agreement_content==""){
		toastr.error("当前表不能有空");
		return false;
	}else if(agreement_content.length>30){ 
		 toastr.error("请输入30个字以内的内容");
		 $(".updataagreement_content").val("");
		 return false;
	}else if (str1 > str2){//判断起始时间不能大于结束时间
		$(".updataagreement_startTime").val("");
		 $(".updataagreement_overtTime").val("");
		toastr.error("请输入时间顺序有误");
		return false;
	}else if (agreement_remark.length > 20){
		$(".updataagreement_remark").val("");
		toastr.error("备注不可超过20字");
		return false;
	}else {
	$('#updataAgreement_Modal').modal('hide');
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
					toastr.success('修改合同成功！');
					$(".updataagreement_startTime").val("");
					$(".updataagreement_overtTime").val("");
					$(".updataagreement_content").val("");
					$(".updataagreement_remark").val("");
					show_staffAgreeAjax(staff_id);
				},
			});
	}
}

//显示当前员工奖金在模态框中
function show_staffaward(updata_button) {
	 console.log("回显奖金");
	 var this_tr=updata_button.parentNode.parentNode;
	 console.log(this_tr.children[1].innerHTML);
	 this_trId=this_tr.querySelector(".rlzy_staffAward_id").getAttribute("id");
	 document.querySelector(".updataaward_amount").value=this_tr.children[1].innerHTML;
	 document.querySelector(".updataaward_provideTime").value=this_tr.children[2].innerHTML;
	 document.querySelector(".updataaward_provideReason").value=this_tr.children[3].innerHTML;
	 document.querySelector(".updataaward_provideDepartment").value=this_tr.children[4].innerHTML;

}
//修改员工奖金
function updata_Award(){
	console.log("奖金修改");
	// 修改一条数据
	var award_amount=$(".updataaward_amount").val();
	var award_provideTime=$(".updataaward_provideTime").val();
	var award_provideDepartment=$(".updataaward_provideDepartment").val();
	var award_provideReason=$(".updataaward_provideReason").val();
	//js校验
	var reg = new RegExp("^[0-9]*$");
	if(award_amount == ""|| award_provideTime ==""|| award_provideDepartment==""){
		 toastr.error("请把空项填写完整");
	}else if(!reg.test(award_amount) || award_amount.length>5){ 
		$("#updataaward_amount").val("");
		 toastr.error("金额请输入5位以内的数字！");
		 $(".updataaward_amount").val("");
		 return false;
	 }else if(award_provideReason.length > 25){
		 $(".updataaward_provideReason").val("");
		 toastr.error("输入的字数不可大于25个");
		 return false;
	 }else {
		 $('#updataAward_Modal').modal('hide');
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
					$(".updataaward_amount").val("");
					$(".updataaward_provideTime").val("");
					$(".updataaward_provideDepartment").val("");
					$(".updataaward_provideReason").val("");
					show_staffAwardAjax(staff_id);
				},
			});
	 }
}

//显示当前员工调配在模态框中
function show_staffmove(updata_button) {
	 console.log("回显调配");
	 var this_tr=updata_button.parentNode.parentNode;
	 console.log(this_tr.children[1].innerHTML);
	 this_trId=this_tr.querySelector(".rlzy_staffMove_id").getAttribute("id");
	 document.querySelector(".updatastaffMove_nowdepartment").value=this_tr.children[1].innerHTML;
	 document.querySelector(".updatastaffMove_nowduty").value=this_tr.children[2].innerHTML;
	 document.querySelector(".updatastaffMove_time").value=this_tr.children[3].innerHTML;
	 document.querySelector(".updatastaffMove_remark").value=this_tr.children[4].innerHTML;

}
//修改员工调配
function updata_Move(){
	console.log("调配修改");
	// 修改一条数据
	var staffMove_nowdepartment=$(".updatastaffMove_nowdepartment").val();
	var staffMove_nowduty=$(".updatastaffMove_nowduty").val();
	var staffMove_time=$(".updatastaffMove_time").val();
	var staffMove_remark=$(".updatastaffMove_remark").val();
	var staffMove_bfdepartment = $(".staff_depaterment").val();
	var staffMove_bfduty = $(".staff_duty").val();
	//js校验
	if(staffMove_nowdepartment == ""|| staffMove_nowduty ==""|| staffMove_time==""){
		 toastr.error("请把空项填写完整");
	}else if(staffMove_remark.length > 25){
		$(".updatastaffMove_remark").val("");
		 toastr.error("输入的字数不可大于25个");
		 return false;
	}else if(staffMove_nowdepartment==staffMove_bfdepartment){
		if(staffMove_nowduty==staffMove_bfduty){
			toastr.error("调动无效,请检查前后部门与职位是否变化");
			$(".updatastaffMove_nowdepartment").val("");
			$(".updatastaffMove_nowduty").val("");
			return false;	
	}else if(staffMove_nowduty!=staffMove_bfduty){
		
	$('#updataMove_Modal').modal('hide');
	$.ajax({
				type : "POST",
				url : '/rlzyos/staff/staffMove_updataStaffMove?staffmove.rlzy_staffMove_id='+this_trId,
				data :{
					"staffmove.staffMove_nowdepartment":staffMove_nowdepartment,
					"staffmove.staffMove_nowduty":staffMove_nowduty,
					"staffmove.staffMove_time":staffMove_time,
					"staffmove.staffMove_remark":staffMove_remark,
					"staffmove.staffMove_bfdepartment":staffMove_bfdepartment,
					"staffmove.staffMove_bfduty":staffMove_bfduty,
				},
				success:function(data){
					toastr.success('修改调配记录成功！');
					$(".updatastaffMove_nowdepartment").val("");
					$(".updatastaffMove_nowduty").val("");
					$(".updatastaffMove_time").val("");
					show_staffMoveAjax(staff_id);
				},
			});
	}
	}
}

//显示当前员工培训在模态框中
function show_stafftrain(updata_button) {
	 console.log("回显培训");
	 var this_tr=updata_button.parentNode.parentNode;
	 console.log(this_tr.children[1].innerHTML);
	 this_trId=this_tr.querySelector(".rlzy_stafftrain_id").getAttribute("id");
	 document.querySelector(".updatastafftrain_train").value=this_tr.children[1].innerHTML;
	 document.querySelector(".updatastafftrain_score").value=this_tr.children[2].innerHTML;
	 document.querySelector(".updatastafftrain_certificate").value=this_tr.children[3].innerHTML;

}
//修改员工培训
function updata_Train(){
	console.log("培训修改");
	// 修改一条数据
	var stafftrain_train=$(".updatastafftrain_train").val();
	var stafftrain_score=$(".updatastafftrain_score").val();
	var stafftrain_certificate=$(".updatastafftrain_certificate").val();
	
	var reg = new RegExp("^[0-9]*$");
	if(stafftrain_train == ""|| stafftrain_score ==""|| stafftrain_certificate==""){
		 toastr.error("请把空项填写完整");
	}else if(!reg.test(stafftrain_score) || stafftrain_score>100 || stafftrain_score<0){ 
		 $(".updatastafftrain_score").val("");
		 toastr.error("请输入100以内的数字！");
		return false; 
	}else if(stafftrain_certificate.length>8){
		$(".updatastafftrain_certificate").val("");
		toastr.error("请输入8个字以内！");
	}else {
		$('#updataTrain_Modal').modal('hide');
	$.ajax({
				type : "POST",
				url : '/rlzyos/staff/staffTrain_updateStaffTrain?rlzy_stafftrain_id='+this_trId,
				data :{
					"stafftrain_train":stafftrain_train,
					"stafftrain_score":stafftrain_score,
					"stafftrain_certificate":stafftrain_certificate,
//					"staffAward.award_provideReason":award_provideReason,
				},
				success:function(data){
					toastr.success('修改培训记录成功！');
					$(".updatastafftrain_train").val();
					$(".updatastafftrain_score").val();
					$(".updatastafftrain_certificate").val();
					show_staffTrainAjax(staff_id);
				},
			});
	}
}
