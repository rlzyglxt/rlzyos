
//长表格员工履历添加一条
function add_oneStaffExp() {
	console.log("修改员工页面履历添加");
	console.log(staff_id);
	// 添加一条数据
	var staffExp_address = $(".staffExp_address").val();
	var staffExp_startTime = $(".staffExp_startTime").val();
	var staffExp_overTime = $(".staffExp_overTime").val();
	var staffExp_remark = $(".staffExp_remark").val();
	//字符验证
	var time = /[^0-9]/ig;
	var str1 = staffExp_startTime.replace(time,"");
	var str2 = staffExp_overTime.replace(time,"");
	if(staffExp_address==""|| staffExp_startTime==""||staffExp_overTime==""){
		 toastr.error("当前表单的必填项为空");
	}else if(staffExp_address.length>10){ 
		 toastr.error("请输入20个字以内的地址");
		 $(".staffExp_address").val("");
		 return false;
	}else if (str1 >= str2){//判断起始时间不能大于结束时间
		toastr.error("请输入时间顺序有误");
		 $(".staffExp_startTime").val("");
		 $(".staffExp_overTime").val("");
		return false;
	}else if (staffExp_remark.length > 20){
		toastr.error("备注不可超过20字");
		$(".staffExp_remark").val("");
		return false;
	}else{
		$('#addStaffExp_Modal').modal('hide');
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
					/*alert("一条履历添加成功");*/
					toastr.success('添加学习成功！');
					$(".staffExp_address").val("");
					$(".staffExp_startTime").val("");
					$(".staffExp_overTime").val("");
					$(".staffExp_remark").val("");
					show_staffExpAjax(staff_id);
				}
			});
	}
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
	//js验证
	var time = /[^0-9]/ig;
	var str1 = agreement_startTime.replace(time,"");
	var str2 = agreement_overtTime.replace(time,"");
	if(agreement_startTime == ""|| agreement_overtTime == "" || agreement_content==""){
		toastr.error("当前表不能有空");
	}else if(agreement_content.length>30){ 
		 toastr.error("请输入30个字以内的内容");
		 $(".agreement_content").val("");
		 return false;
	}else if (str1 >= str2){//判断起始时间不能大于结束时间
		$(".agreement_startTime").val("");
		$(".agreement_overtTime").val("");
		toastr.error("请输入时间顺序有误");
		
		return false;
	}else if (agreement_remark.length > 20){
		$(".agreement_remark").val("");
		toastr.error("备注不可超过20字");
		return false;
	}else {
	$('#addAgreement_Modal').modal('hide');
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
					$(".agreement_startTime").val("");
					$(".agreement_overtTime").val("");
					$(".agreement_content").val("");
					$(".agreement_remark").val("");
					show_staffAgreeAjax(staff_id);
				}
			});
}
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
	//js校验
	var reg = new RegExp("^[0-9]*$");
	if(award_amount==""|| award_provideTime==""||award_provideDepartment==""){
		 toastr.error("当前表单的必填项为空");
	}else if(!reg.test(award_amount) || award_amount.length>5){ 
		 $(".award_amount").val("");
		 toastr.error("请输入5位以内的数字！");
		 return false;
	 }else if(award_provideReason.length > 25){
		 $(".award_provideReason").val("");
		 toastr.error("输入的字数不可大于25个");
		 return false;
	 }else {
		 $('#addAward_Modal').modal('hide');
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
					 $(".award_amount").val("");
					$(".award_provideTime").val("");
					$(".award_provideDepartment").val("");
					$(".award_provideReason").val("");
					show_staffAwardAjax(staff_id);
				}
			});
	 }
}

//长表格添加员工调动记录一条
function add_oneStaffMove() {
	console.log("员工调动记录添加");
	console.log(staff_id);
	// 添加一条数据
	var staffMove_nowdepartment = $(".staffMove_nowdepartment").val();
	var staffMove_nowduty = $(".staffMove_nowduty").val();
	var staffMove_time = $(".staffMove_time").val();
	var staffMove_remark = $(".staffMove_remark").val();
	var staffMove_bfdepartment = $(".staff_depaterment").val();
	var staffMove_bfduty = $(".staff_duty").val();
	//js校验
	if(staffMove_nowdepartment==""|| staffMove_nowduty==""||staffMove_time==""){
		 toastr.error("当前表单的必填项为空");
	}else if(staffMove_remark.length > 25){
		$(".staffMove_remark").val("");
		 toastr.error("输入的字数不可大于25个");
		 return false;
	}else if(staffMove_nowdepartment==staffMove_bfdepartment && staffMove_nowduty==staffMove_bfduty){
		/*if(staffMove_nowduty==staffMove_bfduty){*/
			toastr.error("调动无效,请检查前后部门与职位是否变化");
			$(".staffMove_nowdepartment").val("");
			$(".staffMove_nowduty").val("");
			return false;	
	}else /*if(staffMove_nowduty!=staffMove_bfduty)*/{
		$('#addMove_Modal').modal('hide');
	$.ajax({
				type : "POST",
				url : "/rlzyos/staff/staffMove_addStaffMove?staffMoves.staffMove_staff="
						+ staff_id,
				data : {
					"staffMoves[0].staffMove_nowdepartment" : staffMove_nowdepartment,
					"staffMoves[0].staffMove_nowduty" : staffMove_nowduty,
					"staffMoves[0].staffMove_time" : staffMove_time,
					"staffMoves[0].staffMove_remark" : staffMove_remark,
					"staffMoves[0].staffMove_bfdepartment" : staffMove_bfdepartment,
					"staffMoves[0].staffMove_bfduty" : staffMove_bfduty,
					"staffMove_nowdepartment" : staffMove_nowdepartment,
					"staffMove_nowduty" : staffMove_nowduty,
					"staffmove.staffMove_staff" : staff_id,
					
				},
				success : function(data) {
					toastr.success('调动记录成功！');
					$(".staffMove_nowdepartment").val("");
					$(".staffMove_nowduty").val("");
					$(".staffMove_time").val("");
					$(".staffMove_remark").val("");
					show_staffMoveAjax(staff_id);
				}
			});
	}
	}

//长表格添加员工培训记录一条
function add_oneStaffTrain() {
	console.log("员工培训记录添加");
	console.log(staff_id);
	// 添加一条数据
	var stafftrain_train = $(".stafftrain_train").val();
	var stafftrain_score = $(".stafftrain_score").val();
	var stafftrain_certificate = $(".stafftrain_certificate").val();

	var reg = new RegExp("^[0-9]*$");
	if(stafftrain_train==""|| stafftrain_score==""||stafftrain_certificate==""){
		 toastr.error("当前表单的必填项为空");
	}else if(!reg.test(stafftrain_score) || stafftrain_score>100 || stafftrain_score<0){ 
		 $(".stafftrain_score").val("");
		 toastr.error("请输入100以内的数字！");
		return false; 
	}else if(stafftrain_certificate.length>8){
		$(".stafftrain_certificate").val("");
		toastr.error("请输入8个字以内！");
	}else {
		$('#updataStaffExp_Modal').modal('hide');
	$.ajax({
				type : "POST",
				url : "/rlzyos/staff/staffTrain_addStaffTrain?stafftrains.stafftrain_staff="
						+ staff_id,
				data : {
					"stafftrains[0].stafftrain_train" : stafftrain_train,
					"stafftrains[0].stafftrain_score" : stafftrain_score,
					"stafftrains[0].stafftrain_certificate" : stafftrain_certificate,
				},
				success : function(data) {
					toastr.success('培训记录添加成功！');
					$(".stafftrain_train").val("");
					$(".stafftrain_score").val("");
					$(".stafftrain_certificate").val("");
					show_staffTrainAjax(staff_id);
				}
			});
	}
}