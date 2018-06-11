var xmlHttp;
// addStaff新建人员
function Add_Staff() {
	var url= "/rlzyos/staff/staff_addStaff";
	$.confirm({
			title : '新建!',
			content : '确定新建!',
			buttons : {
				取消 : function() {
					// here the button key 'hey' will be used as the text.
				},
				确定 : {
					action : function() {
						// 判断身份证是否为空
						var number = document.getElementsByName("staff.staff_number")[0].value;
						var name = document.getElementsByName("staff.staff_name")[0].value;
						var duty = document.getElementsByName("staff.staff_duty")[0].value;
						if (number == "" || name == "" || duty == "") {
							toastr.error('工号、姓名、职务不能为空！');
							return false;
						}
						addStaff_Info(url);
					}
					}
				}
			});
}
// 员工基本信息表
function addStaff_Info(url) {
	alert("staffInfo")
	getXmlHttp();
	var staffDetails = document.getElementById("staffDetails");
	alert(staffDetails.data)
	var formData = new FormData(staffDetails);
	xmlHttp.open("post", url, true);
	xmlHttp.send(formData);
	xmlHttp.onreadystatechange = function() {
		console.log("c2");
		if (isBack()) {
			console.log(xmlHttp.responseText);
			var id = xmlHttp.responseText;
			switch (id) {
			case "addSuccess":
				toastr.success("新建成功");
			//返回修改页面(未做)	
			window.location.href = '/rlzyos/staff/staff_page_StaffInfo';
		}
	}
	
}
}
// 改变性别方法
function changeSex(even) {
	var sex = document.getElementById("staff_sex");
	sex.value = even.value;
	return sex.value;
}

// 长表格每行的删除
function delete_long() {
	console.log("删除方法执行");
	var this_tbody = this.parentNode.parentNode.parentNode;
	this_tbody.removeChild(this.parentNode.parentNode);
}

if (window.File && window.FileList && window.FileReader && window.Blob) {
	document.querySelector(".photo-file").addEventListener('change',
			photo_preview, false);
} else {
	document.write('您的浏览器不支持File Api');
}
function stopPropagation(e) {
	if (e.stopPropagation)
		e.stopPropagation();
	else
		e.cancelBubble = true;
}

function clear_iquery() {
	console.log("这是清空");
	$(" input[ type='text' ]").val('');
	$(" textarea").val('');
}


function getXmlHttp() {
	if (window.XMLHttpRequest) {
		xmlHttp=new XMLHttpRequest();
	} else {
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