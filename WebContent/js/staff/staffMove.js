//通过工号得到员工id,员工姓名，员工部门员工职务
function getValue(event){
	$.ajax({
		type : "POST",
		url : "/rlzyos/staff/staffMove_getValueByNumber",
		data : {
			"staff_number": event.value,
		},
		success : function(data) {
			var result = JSON.parse(data);
			console.log(result.size());
			
			var staff_name = $("#staff_addname");
			var staff_depaterment = $("#staffMove_bfdepartment"); 
			var staff_duty = $("#staffMove_bfduty"); 
			console.log("姓名为"+result.staff_name);
			staff_name.val(result.staff_name);
			staff_depaterment.val(result.staff_depaterment);
			staff_duty.val(result.staff_duty);
		}
	});
}


//一个员工工作调动
function add_StaffMove() {
	console.log("工作调动添加");
	// 添加一条数据
	var staffWork_address_val = $(".staffWork_address").val();
	var staffWork_duty_val = $(".staffWork_duty").val();
	var staffWork_startTime_val = $(".staffWork_startTime").val();
	var staffWork_stopTime_val = $(".staffWork_stopTime").val();
	var staffWork_remarks_val = $(".staffWork_remarks").val();
	
	$.ajax({
		type : "POST",
		url : "/xsjsglxt/team/StaffWork_saveWorks?works.staffWork_staff="
				+ staff_id,
		data : {
			"works[0].staffWork_address" : staffWork_address_val,
			"works[0].staffWork_duty" : staffWork_duty_val,
			"works[0].staffWork_startTime" : staffWork_startTime_val,
			"works[0].staffWork_stopTime" : staffWork_stopTime_val,
			"works[0].staffWork_remarks" : staffWork_remarks_val,
		},
		success : function(data) {
			toastr.success('添加工作成功！');
			show_workAjax(staff_id);
		}
	});
}