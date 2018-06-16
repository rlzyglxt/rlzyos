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
<link rel="stylesheet" href="<%=basePath%>css/Staff/Staff.css">
<script type="text/javascript" src="<%=basePath%>js/staff/updataStaff.js"></script>
<script type="text/javascript" src="<%=basePath%>js/staff/addOne_longTable.js"></script>
<script type="text/javascript" src="<%=basePath%>js/staff/updata_longTable.js"></script>
<script type="text/javascript" src="<%=basePath%>js/staff/deleteOne_longTable.js"></script>
<title>人员详情信息</title>
</head>

<body>
<div id="wrapper">
	<s:action name="user_implements_navbar" namespace="/user" executeResult="true" />
	<s:action name="user_LeftIndex" namespace="/user" executeResult="true" />
	<!---------------------------------------------------------------------------------------------------->
	<div style="margin: 80px 0 0 0; float: right; width: 82%; overflow: hidden;">
		<div class="panel" style="width: auto; margin: 20px auto; overflow: inherit; position: relative;">
			<!--  -->
			<div class="panel-heading">
				<h3 class="panel-title">修改基本人员信息</h3>
			</div>
			<div style="margin-left: 5%;">
				<button onclick="javascript:history.go(-1)" type="button"
					class="btn btn-default button button_return ">
					<i class="fa fa-reply"></i> 返回列表
				</button>
				<button type="button" class="btn btn-default button button_change" onclick="staff_updata()">
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
								<td><input class="form-control" id="staff_number" name="staff.staff_number"  type="text"></td>
								
								<td><label class="staff_info_label">姓名</label></td>
								<td><input class="form-control" id="staff_name" name="staff.staff_name"  type="text"></td>
								
							</tr>
							<tr>
								<td><label class="staff_info_label">性别</label></td>
								<td><select class="form-control" id="staff_sex" onchange="changeSex(this)"
											 name="staff.staff_sex">
												<option value=""></option>
												<option value="男">男</option>
												<option value="女">女</option></select></td>
							
								<td><label class="staff_info_label">出生年月</label></td>
								<td><input name="staff.staff_birth" id="staff_birthTime"
									class="form-control staff_birthTime"  type="text"></td>
								
							</tr>
							<tr>
								<td><label class="staff_info_label">联系方式</label></td>
								<td><input id="staff_tel" name="staff.staff_tel" class="form-control" type="text"></td>
								
								<td><label class="staff_info_label">家庭住址</label></td>
								<td><input name="staff.staff_address" id="staff_address" class="form-control" type="text"></td>
								
							</tr>
							<tr>
								<td><label class="staff_info_label">学历</label></td>
								<td><select class="form-control" id="staff_record"
									name="staff.staff_record" type="text">
										<option></option>
										<option>初中</option>
										<option>高中</option>
										<option>专科</option>
										<option>本科</option>
										<option>研究生</option>
								</select></td>
							
								<td><label class="staff_info_label">部门</label></td>
								<td><select class="form-control" id="staff_depaterment"
									name="staff.staff_depaterment">
										<!-- <option></option> -->
										<!-- <option value="一部门">一部门</option>
										<option value="二部门">二部门</option> -->
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
				</div></div>
				<!-- 长表格 -->
				<div style="background: #e7e6e6; width: auto; height: 10px;"></div>
				<div class="longBoxs">
					<div class="long_tableBox">
						<span class="staff_info_title">员工履历表</span>
						<button style="margin-left: 10px;" class="btn btn-default btn-xs"
							type="button" data-toggle="modal" data-target="#addStaffExp_Modal"
							onclick="">
							<i class="fa fa-plus-square"></i>添加履历信息
						</button>

						<form id="staff_exp">
							<div class="long_tb">
								<table>
									<tbody>
										<tr class="long_table">
											<th>工作地址</th>
											<th>开始时间</th>
											<th>结束时间</th>
											<th>备注</th>
											<th>操作</th>
										</tr>

									</tbody>
								</table>
								<table id="staffExperience_table">
									<tbody>
									</tbody>
								</table>

							</div>
						</form>
					</div>
 				<div style="background: #e7e6e6; width: 1000px; height: 1px;"></div>
					<div class="long_tableBox">
						<span class="staff_info_title">员工合同表</span>
						<button style="margin-left: 10px;" class="btn btn-default btn-xs"
							type="button" data-toggle="modal" data-target="#addAgreement_Modal"
							onclick="">
							<i class="fa fa-plus-square"></i> 添加合同信息
						</button>
						<form id="staff_agr">
							<div class="long_tb">
								<table>
									<tbody>
										<tr class="long_table">
											<th>合同开始时间</th>
											<th>合同结束时间</th>
											<th>合同内容</th>
											<th>备注</th>
											<th>操作</th>
										</tr>
									</tbody>
								</table>
								<table id="staffAgreement_table">
									<tbody>

									</tbody>
								</table>
							</div>
						</form>
					</div>
					<div style="background: #e7e6e6; width: 1000px; height: 1px;"></div>
						<div class="long_tableBox">
							<span class="staff_info_title">员工奖金表</span>
						<button style="margin-left: 10px;" class="btn btn-default btn-xs"
							type="button" data-toggle="modal" data-target="#addAward_Modal"
							onclick="">
							<i class="fa fa-plus-square"></i>发放奖金
						</button>
						<form id="staff_agreement">
							<div class="long_tb">
								<table>
									<tbody>
										<tr class="long_table">
											<th>发放金额</th>
											<th>发放时间</th>
											<th>发放原因</th>
											<th>发放部门</th>
											<th>操作</th>
										</tr>
									</tbody>
								</table>
								<table id="staffAward_table">
									<tbody>

									</tbody>
								</table>
							</div>
						</form>
					</div>	
			</div>
		</div>
	</div>
</div>
<!--添加添加员工履历模态框 start  -->
	<div class="modal fade" id="addStaffExp_Modal" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title" id="myModalLabel">添加履历</h4>
				</div>
				<div class="modal-body">

					<form action="" id="staffExp_form" accept-charset="utf-8">

						<table>
							<tbody>
								<tr>
									<td><label class="staff_info_label">工作地址</label></td>
									<td><input style="font-size: 12px;"
										class="staffExp_address" type="text"></td></td>
								</tr>
								<tr>
									<td><label class="staff_info_label">开始时间</label></td>
									<td><input style="font-size: 12px;"
										class="staffExp_startTime staff_Time" type="text"></td>
								</tr>
								<tr>
									<td><label class="staff_info_label">结束时间</label></td>
									<td><input style="font-size: 12px;"
										class=" staffExp_overTime staff_Time"></td>
								</tr>
								<tr>
									<td><label class="staff_info_label">备注</label></td>
									<td colspan="6"><textarea id="staffExp_remark"
											class="staffExp_remark"
											style="width: 480px; border: 1px solid #ccc; text-indent: 30px; margin-top: 10px;"
											rows="3" cols="62"></textarea></td>
								</tr>
							</tbody>
						</table>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default "
						onclick="clear_iquery()" data-dismiss="modal">清空</button>
					<button type="button" class="btn btn-primary"
						onclick="add_oneStaffExp()" data-dismiss='modal'>添加</button>
				</div>
			</div>
		</div>
	</div>
	<!--添加添加员工履历模态框 end  -->

	<!--添加添加合同模态框 start  -->
	<div class="modal fade" id="addAgreement_Modal" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title" id="myModalLabel">添加合同</h4>
				</div>
				<div class="modal-body">

					<form action="" id="addAgreement_form" accept-charset="utf-8">
						<table>
							<tbody>
								<tr>
									<td><label class="staff_info_label">合同开始时间</label></td>
									<td><input style="font-size: 12px;" class="agreement_startTime staff_Time"
										type="text"></td>
								</tr>
								<tr>
									<td><label class="staff_info_label">合同结束时间</label></td>
									<td><input style="font-size: 12px;"
										class="agreement_overtTime staff_Time"></td>
								</tr>
								<tr>
									<td><label class="staff_info_label">合同内容</label></td>
									<td><input type="text" class="agreement_content time" /></td>
								</tr>

								<tr>
									<td><label class="staff_info_label">备注</label></td>
									<td colspan="6"><textarea id="staff_contactsRemark"
											class="agreement_remark"
											style="width: 480px; border: 1px solid #ccc; text-indent: 30px; margin-top: 10px;"
											rows="3" cols="62"></textarea></td>


								</tr>
							</tbody>
						</table>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default "
						onclick="clear_iquery()" data-dismiss="modal">清空</button>
					<button type="button" class="btn btn-primary"
						onclick="add_oneStaffAgreement()" data-dismiss='modal'>添加</button>
				</div>
			</div>
		</div>
	</div>
	<!--添加合同模态框 end  -->
	<!--添加添加奖金模态框 start  -->
	<div class="modal fade" id="addAward_Modal" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title" id="myModalLabel">发放奖金</h4>
				</div>
				<div class="modal-body">
					<form action="" id="studyExp_form" accept-charset="utf-8">
						<table>
							<tbody>
								<tr>
									<td><label class="staff_info_label">发放金额</label></td>
									<td><input style="font-size: 12px;" id="award_amount"
										class="award_amount" type="text"></td>
								</tr>
								<tr>
									<td><label class="staff_info_label">发放时间</label></td>
									<td><input style="font-size: 12px;" id="award_provideTime"
										class="award_provideTime staff_Time"></td>
								</tr>
								<tr>
									<td><label class="staff_info_label">发放部门</label></td>
											<td><input style="font-size: 12px;" id="award_provideDepartment"
										class="award_provideDepartments"></td>
								</tr>
								<tr>
									<td><label class="staff_info_label">发放原因</label></td>
										<td colspan="6"><textarea id="award_provideReason"
											class="award_provideReason"
											style="width: 480px; border: 1px solid #ccc; text-indent: 30px; margin-top: 10px;"
											rows="3" cols="62"></textarea></td>
								</tr>
								
							</tbody>
						</table>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default "
						onclick="clear_iquery()" data-dismiss="modal">清空</button>
					<button type="button" class="btn btn-primary"
						onclick="add_oneStaffAward()" data-dismiss='modal'>添加</button>
				</div>
			</div>
		</div>
	</div>
	<!--添加添加奖金模态框 end  -->
	
	
	
	
<!--修改员工履历模态框 start  -->
	<div class="modal fade" id="updataStaffExp_Modal" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title" id="myModalLabel">履历</h4>
				</div>
				<div class="modal-body">

					<form action="" id="staffExp_form" accept-charset="utf-8">

						<table>
							<tbody>
								<tr>
									<td><label class="staff_info_label">工作地址</label></td>
									<td><input style="font-size: 12px;"
										class="updatastaffExp_address" type="text"></td></td>
								</tr>
								<tr>
									<td><label class="staff_info_label">开始时间</label></td>
									<td><input style="font-size: 12px;"
										class="updatastaffExp_startTime staff_Time" type="text"></td>
								</tr>
								<tr>
									<td><label class="staff_info_label">结束时间</label></td>
									<td><input style="font-size: 12px;"
										class="updatastaffExp_overTime staff_Time"></td>
								</tr>
								<tr>
									<td><label class="staff_info_label">备注</label></td>
									<td colspan="6"><textarea id="staffExp_remark"
											class="updatastaffExp_remark"
											style="width: 480px; border: 1px solid #ccc; text-indent: 30px; margin-top: 10px;"
											rows="3" cols="62"></textarea></td>
								</tr>
							</tbody>
						</table>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default "
						onclick="clear_iquery()" data-dismiss="modal">清空</button>
					<button type="button" class="btn btn-primary"
						onclick="updata_Exp()" data-dismiss='modal'>修改</button>
				</div>
			</div>
		</div>
	</div>
	<!--修改员工履历模态框 end  -->

	<!--修改合同模态框 start  -->
	<div class="modal fade" id="updataAgreement_Modal" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title" id="myModalLabel">添加合同</h4>
				</div>
				<div class="modal-body">

					<form action="" id="addAgreement_form" accept-charset="utf-8">
						<table>
							<tbody>
								<tr>
									<td><label class="staff_info_label">合同开始时间</label></td>
									<td><input style="font-size: 12px;" class="updataagreement_startTime staff_Time"
										type="text"></td>
								</tr>
								<tr>
									<td><label class="staff_info_label">合同结束时间</label></td>
									<td><input style="font-size: 12px;"
										class="updataagreement_overtTime staff_Time"></td>
								</tr>
								<tr>
								<td><label class="staff_info_label">合同内容</label></td>
									<td colspan="6"><textarea id="updataagreement_content "
											class="updataagreement_content"
											style="width: 480px; border: 1px solid #ccc; text-indent: 30px; margin-top: 10px;"
											rows="3" cols="62"></textarea></td>
								
									
								</tr>

								<tr>
									<td><label class="staff_info_label">合同内容</label></td>
									<td><input type="text" class="updataagreement_remark " /></td>

								</tr>
							</tbody>
						</table>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default "
						onclick="clear_iquery()" data-dismiss="modal">清空</button>
					<button type="button" class="btn btn-primary"
						onclick="updata_Agreement()" data-dismiss='modal'>修改</button>
				</div>
			</div>
		</div>
	</div>
	<!--修改合同模态框 end  -->
	<!--修改奖金模态框 start  -->
	<div class="modal fade" id="updataAward_Modal" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title" id="myModalLabel">发放奖金</h4>
				</div>
				<div class="modal-body">
					<form action="" id="studyExp_form" accept-charset="utf-8">
						<table>
							<tbody>
								<tr>
									<td><label class="staff_info_label">发放金额</label></td>
									<td><input style="font-size: 12px;" id="updataaward_amount"
										class="updataaward_amount" type="text"></td>
								</tr>
								<tr>
									<td><label class="staff_info_label">发放时间</label></td>
									<td><input style="font-size: 12px;" id="updataaward_provideTime"
										class="updataaward_provideTime staff_Time"></td>
								</tr>
								<tr>
									<td><label class="staff_info_label">发放部门</label></td>
									<td><input style="font-size: 12px;" id="updataaward_provideDepartment"
										class="updataaward_provideDepartment _Time"></td>
								</tr>
								<tr>
									<td><label class="staff_info_label">发放原因</label></td>
										<td colspan="6"><textarea id="updataaward_provideReason"
											class="updataaward_provideReason"
											style="width: 480px; border: 1px solid #ccc; text-indent: 30px; margin-top: 10px;"
											rows="3" cols="62"></textarea></td>
								</tr>
								
							</tbody>
						</table>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default "
						onclick="clear_iquery()" data-dismiss="modal">清空</button>
					<button type="button" class="btn btn-primary"
						onclick="updata_Award()" data-dismiss='modal'>添加</button>
				</div>
			</div>
		</div>
	</div>
	<!--修改奖金模态框 end  -->
<!-- 时间javescript -->
	<script type="text/javascript">
		$.datetimepicker.setLocale('ch');
		$('.staff_Time').datetimepicker({
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