<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="/struts-tags" prefix="s"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<!---------------------------------------------------------------------------------------------------->
<!---------------------------------------------------------------------------------------------------->
<title>人员详情信息</title>
<link rel="stylesheet" href="<%=basePath%>css/Staff/Staff.css">
</head>
	<script type="text/javascript" src="<%=basePath%>js/staff/updataStaff.js"></script>
<body>
<div id="wrapper">
	<s:action name="user_implements_navbar" namespace="/user" executeResult="true" />
	<s:action name="user_LeftIndex" namespace="/user" executeResult="true" />
	<!---------------------------------------------------------------------------------------------------->
	<div style="margin: 80px 0 0 0; float: right; width: 82%; overflow: hidden;">
		<div class="panel" style="width: 1100px; margin: 20px auto; overflow: inherit; position: relative;">
			<!--  -->
			<div class="panel-heading">
				<h3 class="panel-title">修改基本人员信息</h3>
			</div>
			<div style="margin-left: 5%;">
				<button onclick="javascript:history.go(-1)" type="button"
					class="btn btn-default button button_return ">
					<i class="fa fa-reply"></i> 返回列表
				</button>
				<button type="button" class="btn btn-default button button_change" onclick="Add_Staff()">
					<i class="fa fa-pencil"></i>保存</button>
			</div>
			<div class="panel-body staff_body">
				<div style="width: 1000px; margin: 0 auto;">
					<form id="staffDetails" enctype="multipart/form-data"
						accept-charset="utf-8">
						<table style="width: 100%;">
							<tr>
								<td colspan="6" class="staff_info_title">基本信息</td>
							</tr>
							<tr style="height: 20px"></tr>
							<tr>
								<td><label class="staff_info_label">员工工号</label></td>
								<td><input id="staff_number" name="staff.staff_number" class="form-control" type="text"></td>
								
								<td><label class="staff_info_label">姓名</label></td>
								<td><input id="staff_name" name="staff.staff_name" class="form-control" type="text"></td>
								
							</tr>
							<tr>
								<%-- <label style="float: left; width: 50px;"
									class="fancy-radio person_radio"> <input
										name="staff.staff_sex" type="radio" value="男">
										<span> <i></i>男
									</span>
								</label> <label style="float: left; width: 50px; margin-left: 10px;"
									class="fancy-radio "> <input
										name="staff.staff_sex" type="radio" value="女">
										<span><i></i>女</span>
								</label> --%>
								<td><label class="staff_info_label">性别</label></td>
								<td>
									<select id="staff_sex" onchange="changeSex(this)"
											class="form-control" name="staff.staff_sex">
												<option value=""></option>
												<option value="男">男</option>
												<option value="女">女</option></select></td>
								
								<td><label class="staff_info_label">出生年月</label></td>
								<td><input name="staff.staff_birth" id="staff_birthTime"
									class="form-control"  type="text"></td>
								
							</tr>
							<tr>
								<td><label class="staff_info_label">联系方式</label></td>
								<td><input style="font-size: 12px;" id="staff_tel"
									name="staff.staff_tel" class="form-control" type="text"></td>
								
								<td><label class="staff_info_label">家庭住址</label></td>
								<td><input name="staff.staff_address" id="staff_address" class="form-control" type="text"></td>
								
							</tr>
							<tr>
								<td><label class="staff_info_label">学历</label></td>
								<td><select class="form-control" id="staff_record"
									name="staff.staff_record">
										<option></option>
										<option value="初中">初中</option>
										<option value="高中">高中</option>
										<option value="专科">专科</option>
										<option value="本科">本科</option>
										<option value="研究生">研究生</option>
								</select></td>
								
								<td><label class="staff_info_label">部门</label></td>
								<td><select class="form-control" id="staff_depaterment"
									name="staff.staff_depaterment">
										<option></option>
										<option value="一部门">一部门</option>
										<option value="二部门">二部门</option>
								</select></td>
							</tr>	
								
							<tr>
								<td><label class="staff_info_label">员工状态</label></td>
								<td><select class="form-control" id="staff_status"
									name="staff.staff_status">
										<option></option>
										<option value="在职">在职</option>
										<option value="离职">离职</option>
								</select></td>
								
								<td><label class="staff_info_label">职务</label></td>
								
								<td><select class="form-control" name="staff.staff_duty" id="staff_duty">
										<option></option>
										<option value="管理员">管理员</option>
										<option value="经理">经理</option>
										<option value="员工">员工</option>
									</select>
								</td>
							</tr>
						</table>
					</form>
				</div>
			</div>
		</div>	
	</div>	
</div>
<!-- 时间javescript -->
	<script type="text/javascript">
		$.datetimepicker.setLocale('ch');
		$('.staff_birthTime').datetimepicker({
			yearStart : 1900, // 设置最小年份
			yearEnd : 2100, // 设置最大年份
			yearOffset : 0, // 年偏差
			timepicker : false, // 关闭时间选项
			format : 'Y-m-d', // 格式化日期年-月-日
			minDate : '1900/01/01', // 设置最小日期
			maxDate : '2100/01/01', // 设置最大日期
		});
	</script>
</body>
</html>