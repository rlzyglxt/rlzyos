var xmlHttp;
//载入界面
window.onload = function() {
	var url = window.location.href;
	staff_id = url.substring(url.indexOf("=") + 1);
	console.log(staff_id);
	get_staffDetails(staff_id);
	
}
//通过id获取员工。并且显示该员工信息
function get_staffDetails(staff_id) {
	alert("通过id得到信息并修改");
	alert(staff_id);
	var url = "/rlzyos/staff/staff_getStaffById?rlzy_staff_id="
			+ staff_id;
	get_staffDetails_Ajax(url, staff_id);
}

function get_staffDetails_Ajax(url, staff_id) {
	getXmlHttp();
	xmlHttp.open("post", url, true);
	xmlHttp.send();
	xmlHttp.onreadystatechange = function() {
		if (isBack()) {
			//传回信息，加载到数据框中
			var staff_info = xmlHttp.responseText;
			staff_info = JSON.parse(staff_info);
			console.log(staff_info);
			$('#staff_number').val(staff_info.staff_number);
			$('#staff_name').val(staff_info.staff_name);
			$('#staff_sex').val(staff_info.staff_sex);
			$('#staff_birthTime').val(staff_info.staff_birth);
			$('#staff_tel').val(staff_info.staff_tel);
			$('#staff_address').val(staff_info.staff_address);
			$('#staff_record').val(staff_info.staff_record);
			$('#staff_duty').val(staff_info.staff_duty);
			$('#staff_status').val(staff_info.staff_status);
			$('#staff_depaterment').val(staff_info.staff_depaterment);
		}
	}
}

// staffDetail.jsp中的修改人员
function staff_relive() {
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
	var staffData = document.getElementById("staffData");
	var formData = new FormData(staffData);
	xmlHttp.open("post","/rlzyos/staff/staff_updataStaff?rlzy_staff_id="
			+ staff_id, true);
//	
//	formData.append(staffDetails);
//	formData.append()
//	formData.append(staff_id);
	console.log(staffData.value);
	xmlHttp.send(formData);
	xmlHttp.onreadystatechange = function() {
		console.log("c2");
		if (isBack()) {
			var result = xmlHttp.responseText;
			alert(result);
			console.log(result);
			switch (result) {
			case "":
				toastr.warning("不好，修改失败了！！");
				break;
			case "updataSuccess":
				toastr.warning("修改成功,返回信息列表");
			//刷新页面
			//get_staffDetails();
		}
		};
	}
}
function getXmlHttp() {
	if (window.XMLHttpRequest) {
		xmlHttp=new XMLHttpRequest();
	} else {
		// IE6, IE5 浏览器执行代码
		xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
}
function isBack() {
	if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
		return true;
	} else {
		return false;
	}
}
