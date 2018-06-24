<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
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
<link rel="stylesheet" href="<%=basePath%>css/Staff/detail.css">

</head>
<body> 
<div id="wrapper">
	<s:action name="user_implements_navbar" namespace="/user" executeResult="true" />
	<s:action name="user_LeftIndex" namespace="/user" executeResult="true" />
	<!---------------------------------------------------------------------------------------------------->
	<!---------------------------------------------------------------------------------------------------->
	<!---------------------------------------------------------------------------------------------------->
	<div
		style="margin: 80px 0 0 0; float: right; width: 81%; overflow: hidden;">
		<div class="panel"
			style="width: 1138px; margin: 20px auto; overflow: inherit; position: relative;">
			<!--  -->
			<div class="panel-heading">
				<h3 class="panel-title">人员详情</h3>
			</div>
			<div style="margin-left: 4.5%;">
				<button onclick="javascript:history.go(-1)" type="button"
					class="btn btn-default button button_return ">
					<i class="fa fa-reply"></i> 返回列表
				</button>
			</div>
			<div class="panel-body staff_body">
				<div style="width: 1000px; margin: 0 auto;">
					<form id="staffDetails" enctype="multipart/form-data"
						accept-charset="utf-8">
						<table style="width: 100%;">
							<tr>
								<td colspan="6" style="text-indent: 30px;">基本信息</td>
							</tr>
							<tr>
								<td class="odd"><label class="staff_info_label">姓名</label></td>
								<td class="even">{{ returnData.staff_name }}</td>

								<td class="odd"><label class="staff_info_label">工号</label></td>
								<td class="even">{{ returnData.staff_number }}</td>

							</tr>
							<tr>
								<td class="odd"><label class="staff_info_label">身份证</label></td>
								<td class="even">{{ returnData.staff_cardid }}</td>
								
								<td class="odd"><label class="staff_info_label">性别</label></td>
								<td class="even">{{ returnData.staff_sex }}</td>
							</tr>
							<tr>
								<td class="odd"><label class="staff_info_label">出生年月</label></td>
								<td class="even">{{ returnData.staff_birth }}</td>
								
								<td class="odd"><label class="staff_info_label">年龄</label></td>
								<td class="even">{{ returnData.staff_age }}</td>
							</tr>
							<tr>

								<td class="odd"><label class="staff_info_label">联系方式</label></td>
								<td class="even">{{ returnData.staff_tel }}</td>
								<td class="odd"><label class="staff_info_label">家庭住址</label></td>
								<td class="even">{{ returnData.staff_address }}</td>

							</tr>

							<tr>

								<td class="odd"><label class="staff_info_label">学历</label></td>
								<td class="even">{{ returnData.staff_record }}</td>
								<td class="odd"><label class="staff_info_label">部门</label></td>
								<td class="even">{{ returnData.staff_depaterment }}</td>


							</tr>
							<tr>

								<td class="odd"><label class="staff_info_label">员工状态</label></td>
								<td class="even">{{ returnData.staff_status }}</td>
								<td class="odd"><label class="staff_info_label">职务</label></td>
								<td class="even">{{ returnData.staff_duty }}</td>

							</tr>
							<tr>
								<template v-if="returnData.staff_status === '离职'">
								<td class="odd"><label class="staff_info_label">离职时间</label></td>
								<td class="even">{{ returnData.staff_leaveTime }}</td>
								<td class="odd"><label class="staff_info_label">离职原因</label></td>
								<td class="even">{{ returnData.staff_leaveReason }}</td>
								</template>
							</tr>
						</table>
					</form>
				</div>
				<div style="background: #e7e6e6; width: 1000px; height: 1px;"></div>
				<div class="longBoxs">
					<div class="long_tableBox">
						<span class="staff_info_title">员工合同</span>

						<form id="study_exp">
							<div class="long_tb">

								<table id="staffAgreement_table">
									<tbody>
										<tr class="long_table">
											<th>合同开始时间</th>
											<th>合同结束时间</th>
											<th>合同内容</th>
											<th>备注</th>
										</tr>
										<template v-for="agreement in agreements">
										<tr>
											<td>{{ agreement.agreement_startTime }}</td>
											<td>{{ agreement.agreement_overtTime }}</td>
											<td>{{ agreement.agreement_content }}</td>
											<td>{{ agreement.agreement_remark }}</td>
										</tr>
										</template>
									</tbody>
								</table>

							</div>
						</form>
					</div>
					<div style="background: #e7e6e6; width: 1000px; height: 1px;"></div>
					<div class="longBoxs">
					<div class="long_tableBox">
						<span class="staff_info_title">工作经历</span>

						<form id="work_exp">
							<div class="long_tb">

								<table id="staffExperience_table">
									<tbody>
										<tr class="long_table">
											<th>工作地址</th>
											<th>开始时间</th>
											<th>结束时间</th>
											<th>备注</th>
										</tr>
										<template v-for="exp in exps">
										<tr>
											<td>{{ exp.staffExp_address }}</td>
											<td>{{ exp.staffExp_startTime}}</td>
											<td>{{ exp.staffExp_overTime }}</td>
											<td>{{ exp.staffExp_remark }}</td>
										</tr>
										</template>
									</tbody>
								</table>

							</div>
						</form>
					</div>
					<div style="background: #e7e6e6; width: 1000px; height: 1px;"></div>
					<div class="long_tableBox">
						<span class="staff_info_title">奖金发放记录</span>

						<div class="long_tb">

							<table id="staffAward_table">

								<tbody>
									<tr class="long_table">
										<th>发放金额</th>
										<th>发放时间</th>
										<th>发放原因</th>
										<th>发放部门</th>

									</tr>
									<template v-for="award in awards">
									<tr>
										<td>{{ award.award_amount }}</td>
										<td>{{ award.award_provideTime }}</td>
										<td>{{ award.award_provideReason }}</td>
										<td>{{ award.award_provideDepartment }}</td>
									</tr>
									</template>
								</tbody>

							</table>
						</div>
					</div>
						<div style="background: #e7e6e6; width: 1000px; height: 1px;"></div>
					<div class="long_tableBox">
						<span class="staff_info_title">培训记录</span>

						<div class="long_tb">

							<table id="staffTrain_table">

								<tbody>
									<tr class="long_table">
										<th>培训名称</th>
										<th>培训成绩</th>
										<th>培训证书</th>
									</tr>
									<template v-for="train in trains">
									<tr>
										<td>{{ train.stafftrain_train }}</td>
										<td>{{ train.stafftrain_score }}</td>
										<td>{{ train.stafftrain_certificate }}</td>
										
									</tr>
									</template>
								</tbody>

							</table>
						</div>
					</div>
					</div>
			</div>
		</div>
	</div>
	</div>
	<script type="text/javascript"
		src="<%=basePath%>js/staff/staffDetails.js"></script>
	<script type="text/javascript"
		src="<%=basePath%>js/staff/addOne_longTable.js"></script>
	<script type="text/javascript"
		src="<%=basePath%>js/staff/updata_longTable.js"></script>
	<script type="text/javascript"
		src="<%=basePath%>js/staff/deleteOne_longTable.js"></script>
	<script type="text/javascript">
		$('.time').datetimepicker({
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