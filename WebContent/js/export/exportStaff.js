//var selectAllbox = function(event) {
//	if (event.checked) {
//		console.log("选中了");
//		var che = document.getElementsByName("chooseCheckBox");
//		for (var int = 0; int < che.length; int++) {
//			che[int].checked = true;
//		}
//	} else {
//		console.log("没选中");
//		var che = document.getElementsByName("chooseCheckBox");
//		for (var int = 0; int < che.length; int++) {
//			che[int].checked = false;
//		}
//	}
//}
//var exportCurrPage = function() {
//	alert(queryConditionTemp.staffName);
//	window.location.href = "/rlzyos/staff/staff_exportStaff?" +
//			"staffVO.currPage="
//			+ queryConditionTemp.currPage
//			+ "&staffVO.staff_name="
//			+ queryConditionTemp.staffName
//			+ "&staffVO.staff_sex="
//			+ queryConditionTemp.staffSex
//			+ "&staffVO.staff_status="
//			+ queryConditionTemp.staffStatus
//			+ "&staffVO.staff_record="
//			+ queryConditionTemp.staffRecord
//			+ "&staffVO.staff_status="
//			+ queryConditionTemp.staffInTime;
//}