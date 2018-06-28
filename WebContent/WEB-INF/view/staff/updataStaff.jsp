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

<title>人员详情信息</title>
</head>
<script type="text/javascript" src="<%=basePath%>js/staff/addStaff.js"></script>
<script type="text/javascript" src="<%=basePath%>js/staff/updataStaff.js"></script>
<script type="text/javascript" src="<%=basePath%>js/staff/addOne_longTable.js"></script>
<script type="text/javascript" src="<%=basePath%>js/staff/updata_longTable.js"></script>
<script type="text/javascript" src="<%=basePath%>js/staff/deleteOne_longTable.js"></script>
<body>
<div id="wrapper">
	<s:action name="user_implements_navbar" namespace="/user" executeResult="true" />
	<s:action name="user_LeftIndex" namespace="/user" executeResult="true" />
	<!---------------------------------------------------------------------------------------------------->
	<div style="margin: 80px 0 0 0; float: right; width: 81%; overflow: hidden;">
		<div class="panel" style="width: 1080px; margin: 20px auto; overflow: inherit; position: relative;">
			<!--  -->
			<div class="panel-heading">
				<h3 class="panel-title">修改基本人员信息</h3>
			</div>
			<div style="margin-left: 4.5%;">
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
								<td><input class="form-control" id="staff_number" name="staff.staff_number"  type="text" readonly="readonly"></td>
								
								<td><label class="staff_info_label">姓名</label></td>
								<td><input class="form-control" id="staff_name" name="staff.staff_name"  type="text"></td>
								
							</tr>
						<%-- 	<tr>
								<td><label class="staff_info_label">性别</label></td>
								<td><select class="form-control" id="staff_sex" onchange="changeSex(this)"
											 name="staff.staff_sex">
												<option value=""></option>
												<option value="男">男</option>
												<option value="女">女</option></select></td>
							
								<td><label class="staff_info_label">出生年月</label></td>
								<td><input name="staff.staff_birth" id="staff_birthTime"
									class="form-control staff_birthTime"  type="text"></td>
								
							</tr>  --%>
							<tr>
							
								<td><label class="staff_info_label">身份证</label></td>
								<td><input name="staff.staff_cardid" id="idNumber" onblur="getAge()"
									class=" form-control" type="text"></td>
								<td><label class="staff_info_label">性别</label></td>
								<td><label style="float: left; width: 50px;"
									class="fancy-radio person_radio"> <input
										name="sex_content" onclick=changeSex_man(this) type="radio" value="男">
										<span> <i></i>男
									</span>
								</label> <label style="float: left; width: 50px; margin-left: 10px;"
									class="fancy-radio "> <input
										name="sex_content" onclick=changeSex_woman(this) type="radio" value="女">
										<span><i></i>女</span>
								</label><input type="hidden" name="staff.staff_sex" id="sex"></td>
							</tr>
							<tr>
								<td><label class="staff_info_label">年龄</label></td>
								<td><input name="staff.staff_age" class="form-control" type="text"></td>
								<td><label class="staff_info_label">出生年月</label></td>
								<td><input name="staff.staff_birth"	class="staff_birth form-control" type="text"></td>
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
										<option value="硕士">硕士</option>
										<option value="本科">本科</option>
										<option value="专科">专科</option>
										<option value="高中">高中</option>
										<option value="初中">初中</option>
										<option value="小学">小学</option></select>
								</select></td>
							
								<td><label class="staff_info_label">部门</label></td>
								<td><select class="form-control staff_depaterment" id="staff_depaterment"
									name="staff.staff_depaterment">
										<!-- <option></option> -->
										<!-- <option value="一部门">一部门</option>
										<option value="二部门">二部门</option> -->
								</select></td>
								
							</tr>	
								
							<tr>
								<td><label class="staff_info_label">员工状态</label></td>
								<td><select class="form-control" id="staff_status"
									name="staff.staff_status" onchange="checkIt(this.value)">
										<option></option>
										<option>在职</option>
										<option>离职</option>
								</select></td>
							
								<td><label class="staff_info_label">职务</label></td>
								
								<td><select class="form-control staff_duty" name="staff.staff_duty" id="staff_duty" type="text">
										<option></option>
										<option value="管理员">管理员</option>
										<option value="经理">经理</option>
										<option value="员工">员工</option>
									</select>
								</td>
								
							</tr>
							<tr>
								<td class="staff_leaveTime_label" style="display: none;">
									<label class="staff_info_label">离职时间</label></td>
								<td class="staff_leaveTime" style="display: none;">
									<input placeholder="请填写离职时间" name="staff.staff_leaveTime"	class="staff_Time form-control " type="text">
								</td>
								<td class="staff_leaveReason_label" style="display: none;">
									<label class="staff_info_label">离职原因</label></td>
								<td class="staff_leaveReason" style="display: none;">
									<input placeholder="请填写离职原因" name="staff.staff_leaveReason" class="staff_leaveReason form-control" type="text">
								</td>
							</tr>
							<tr style="height: 30px"></tr>
						</table>
					</form>
				</div></div>
				<!-- 长表格 -->
				<div style="background: #e7e6e6; width: 1000px; height: 5px;"></div>
				<div class="longBoxs">
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
					<div style="background: #e7e6e6; width: 1000px; height: 1px;"></div>
						<div class="long_tableBox">
							<span class="staff_info_title">员工调配</span>
						<button style="margin-left: 10px;" class="btn btn-default btn-xs"
							type="button" data-toggle="modal" data-target="#addMove_Modal"
							onclick="">
							<i class="fa fa-plus-square"></i>新增调配
						</button>
						<form id="staff_Move">
							<div class="long_tb">
								<table>
									<tbody>
										<tr class="long_table">
											<th>调入部门</th>
											<th>调入职务</th>
											<th>调动时间</th>
											<th>备注</th>
											<th>操作</th>
										</tr>
									</tbody>
								</table>
								<table id="staffMove_table">
									<tbody>

									</tbody>
								</table>
							</div>
						</form>
					</div>		
					<div style="background: #e7e6e6; width: 1000px; height: 1px;"></div>
						<div class="long_tableBox">
							<span class="staff_info_title">培训记录</span>
						<button style="margin-left: 10px;" class="btn btn-default btn-xs"
							type="button" data-toggle="modal" data-target="#addTrain_Modal"
							onclick="">
							<i class="fa fa-plus-square"></i>员工培训
						</button>
						<form id="staff_Train">
							<div class="long_tb">
								<table>
									<tbody>
										<tr class="long_table">
											<th>培训名称</th>
											<th>培训成绩</th>
											<th>培训证书</th>
											<th>操作</th>
										</tr>
									</tbody>
								</table>
								<table id="staffTrain_table">
									<tbody>

									</tbody>
								</table>
							</div>
						</form>
					</div>				
					<button type="button" style="float: right;" class="btn btn-default button button_change" onclick="staff_updata()">
					<i class="fa fa-pencil"></i>保存</button>
			</div>
		</div>
	</div>
</div>
<!--添加员工履历模态框 start  -->
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
									<td><input type="text" style="font-size: 12px;" id="staffExp_address"
										class="staffExp_address" ></td></td>
								</tr>
								<tr>
									<td><label class="staff_info_label">开始时间</label></td>
									<td><input type="text" style="font-size: 12px;" id="staffExp_startTime"
										class="staffExp_startTime staff_Time" ></td>
								</tr>
								<tr>
									<td><label class="staff_info_label">结束时间</label></td>
									<td><input style="font-size: 12px;" type="text" id="staffExp_overTime"
										class=" staffExp_overTime staff_Time"></td>
								</tr>
								<tr>
									<td><label class="staff_info_label">备注</label></td>
									<td colspan="6"><textarea id="staffExp_remark" id="staffExp_remark"
											class="staffExp_remark"
											style="width: 480px; border: 1px solid #ccc; text-indent: 30px; margin-top: 10px;"
											rows="3" cols="62"></textarea></td>
								</tr>
							</tbody>
						</table>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default"
						onclick="clear_iquery1()" >清空</button><!-- data-dismiss="modal" -->
					<button type="button" class="btn btn-primary"
						onclick="add_oneStaffExp()">添加</button>
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
									id="agreement_startTime"	type="text"></td>
								</tr>
								<tr>
									<td><label class="staff_info_label">合同结束时间</label></td>
									<td><input style="font-size: 12px;" id="agreement_overtTime"
										class="agreement_overtTime staff_Time"></td>
								</tr>
								<tr>
									<td><label class="staff_info_label">合同内容</label></td>
									<td><input type="text" class="agreement_content time"  id="agreement_content"/></td>
								</tr>

								<tr>
									<td><label class="staff_info_label">备注</label></td>
									<td colspan="6"><textarea id="staff_contactsRemark" id="agreement_remark"
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
						onclick="clear_iquery2()">清空</button>
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
									<td><select class="form-control award_provideDepartment" id="staff_modeldepaterment">
										</select></td>
									<!-- 		<td><input style="font-size: 12px;" id="award_provideDepartment"
										class="award_provideDepartment"></td>    -->
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
						onclick="clear_iquery3()">清空</button>
					<button type="button" class="btn btn-primary"
						onclick="add_oneStaffAward()" data-dismiss='modal'>添加</button>
				</div>
			</div>
		</div>
	</div>
	<!--添加添加奖金模态框 end  -->
		<!--添加添加调动模态框 start  -->
	<div class="modal fade" id="addMove_Modal" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title" id="myModalLabel">调动员工</h4>
				</div>
				<div class="modal-body">
					<form action="" id="studyMove_form" accept-charset="utf-8">
						<table>
							<tbody>
								<tr>
									<td><label class="staff_info_label">调入部门</label></td>
									<td><select class="form-control staffMove_nowdepartment" id="staff_nowdepaterment">
										</select></td>
								<!-- 	<td><input style="font-size: 12px;" id="staffMove_nowdepartment"
										class="staffMove_nowdepartment" type="text"></td>   -->
								</tr>
								<tr>
									<td><label class="staff_info_label">调动职务</label></td>
									<td><select class="form-control staffMove_nowduty" id="staffMove_nowduty">
										<option value="管理员">管理员</option>
										<option value="经理">经理</option>
										<option value="员工">员工</option>
									</select>
								</td>
									<!-- <td><input style="font-size: 12px;" id="staffMove_nowduty" 
										class="staffMove_nowduty"></td>   -->
								</tr>
								<tr>
									<td><label class="staff_info_label">调入时间</label></td>
									<td><input style="font-size: 12px;" id="staffMove_time"
										class="staffMove_time staff_Time"></td>
								</tr>
								<tr>
									<td><label class="staff_info_label">备注</label></td>
										<td colspan="6"><textarea id="staffMove_remark"
											class="staffMove_remark"
											style="width: 480px; border: 1px solid #ccc; text-indent: 30px; margin-top: 10px;"
											rows="3" cols="62"></textarea></td>
								</tr>
								
							</tbody>
						</table>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default "
						onclick="clear_iquery4()">清空</button>
					<button type="button" class="btn btn-primary"
						onclick="add_oneStaffMove()" data-dismiss='modal'>添加</button>
				</div>
			</div>
		</div>
	</div>
	<!--添加添加调动记录模态框 end  -->
	
	<!--添加添加培训记录模态框 start  -->
	<div class="modal fade" id="addTrain_Modal" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title" id="myModalLabel">培训记录</h4>
				</div>
				<div class="modal-body">
					<form action="" id="studyTrain_form" accept-charset="utf-8">
						<table>
							<tbody>
								<tr>
									<td><label class="staff_info_label">培训名称</label></td>
									<td><select class="form-control stafftrain_train" id="stafftrain_train">
										</select></td>
								<!-- 	<td><input style="font-size: 12px;" id="stafftrain_train"
										class="stafftrain_train" type="text"></td>   -->
								</tr>
								<tr>
									<td><label class="staff_info_label">培训成绩</label></td>
									<td><input style="font-size: 12px;" id="stafftrain_score"
										class="stafftrain_score"></td>
								</tr>
								<tr>
									<td><label class="staff_info_label">培训证书</label></td>
									<td><input style="font-size: 12px;" id="stafftrain_certificate"
										class="stafftrain_certificate"></td>
								</tr>								
							</tbody>
						</table>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default "
						onclick="clear_iquery5()">清空</button>
					<button type="button" class="btn btn-primary"
						onclick="add_oneStaffTrain()" data-dismiss='modal'>添加</button>
				</div>
			</div>
		</div>
	</div>
	<!--添加添加培训记录模态框 end  -->
	
	
	
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
						onclick="clear_iquery6()">清空</button>
					<button type="button" class="btn btn-primary"
						onclick="updata_Exp()">修改</button>
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
									<td><label class="staff_info_label">备注</label></td>
									<td><input type="text" class="updataagreement_remark " /></td>

								</tr>
							</tbody>
						</table>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default "
						onclick="clear_iquery7()">清空</button>
					<button type="button" class="btn btn-primary"
						onclick="updata_Agreement()">修改</button>
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
									<td><select class="form-control updataaward_provideDepartment" id="staff_noedepaterment">
									</select></td>
								<!-- 	<td><input style="font-size: 12px;" id="updataaward_provideDepartment"
										class="updataaward_provideDepartment _Time"></td>     -->
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
						onclick="clear_iquery8()">清空</button>
					<button type="button" class="btn btn-primary"
						onclick="updata_Award()" >添加</button>
				</div>
			</div>
		</div>
	</div>
	<!--修改奖金模态框 end  -->
	<!--修改调动模态框 start  -->
	<div class="modal fade" id="updataMove_Modal" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title" id="myModalLabel">调动员工</h4>
				</div>
				<div class="modal-body">
					<form action="" id="studyMove_form" accept-charset="utf-8">
						<table>
							<tbody>
								<tr>
									<td><label class="staff_info_label">调入部门</label></td>
									<td><select class="form-control updatastaffMove_nowdepartment" id="staff_nordepaterment">
										</select></td>
								<!-- 	<td><input style="font-size: 12px;" id="updatastaffMove_nowdepartment"
										class="updatastaffMove_nowdepartment" type="text"></td>   -->
								</tr>
								<tr>
									<td><label class="staff_info_label">调动职务</label></td>
									 <td><select id="updatastaffMove_nowduty" class="form-control updatastaffMove_nowduty">
										 <option value="管理员">管理员</option>
										 <option value="经理">经理</option>
										 <option value="员工">员工</option>
									 </select></td>
								<!-- 	<td><input style="font-size: 12px;" id="updatastaffMove_nowduty"
										class="updatastaffMove_nowduty"></td>   -->
								</tr>
								<tr>
									<td><label class="staff_info_label">调入时间</label></td>
									<td><input style="font-size: 12px;" id="updatastaffMove_time"
										class="updatastaffMove_time staff_Time"></td>
								</tr>
								<tr>
									<td><label class="staff_info_label">备注</label></td>
										<td colspan="6"><textarea id="updatastaffMove_remark"
											class="updatastaffMove_remark"
											style="width: 480px; border: 1px solid #ccc; text-indent: 30px; margin-top: 10px;"
											rows="3" cols="62"></textarea></td>
								</tr>
								
							</tbody>
						</table>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default "
						onclick="clear_iquery9()">清空</button>
					<button type="button" class="btn btn-primary"
						onclick="updata_Move()">添加</button>
				</div>
			</div>
		</div>
	</div>
	<!--修改调动记录模态框 end  -->
	
	<!--修改培训记录模态框 start  -->
	<div class="modal fade" id="updataTrain_Modal" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title" id="myModalLabel">培训记录</h4>
				</div>
				<div class="modal-body">
					<form action="" id="studyTrain_form" accept-charset="utf-8">
						<table>
							<tbody>
								<tr>
									<td><label class="staff_info_label">培训名称</label></td>
									<td><select class="form-control updatastafftrain_train" id="staff_train">
										</select></td>
								<!-- 	<td><input style="font-size: 12px;" id="updatastafftrain_train"
										class="updatastafftrain_train" type="text"></td>   -->
								</tr>
								<tr>
									<td><label class="staff_info_label">培训成绩</label></td>
									<td><input style="font-size: 12px;" id="updatastafftrain_score"
										class="updatastafftrain_score"></td>
								</tr>
								<tr>
									<td><label class="staff_info_label">培训证书</label></td>
									<td><input style="font-size: 12px;" id="updatastafftrain_certificate"
										class="updatastafftrain_certificate"></td>
								</tr>								
							</tbody>
						</table>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default "
						onclick="clear_iquery10()">清空</button>
					<button type="button" class="btn btn-primary"
						onclick="updata_Train()">添加</button>
				</div>
			</div>
		</div>
	</div>
	<!--修改培训记录模态框 end  -->
	
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