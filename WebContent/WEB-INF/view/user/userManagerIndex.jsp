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
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
<link rel="stylesheet" href="<%=basePath%>css/user/userIndex.css">
<script type="text/javascript" src="<%=basePath%>js/user/getData.js"></script>
<title>用户管理界面</title>
</head>
<body>
	<!----------------------------------------------- 隐藏信息开始 --------------------------------------------------->
	<input id="hideQueryString" type="text" class="hideDiv" />
	<input id="hideCurrPage" type="text" class="hideDiv" />

	<!-----------------------------------------引入导航条 ------------------------------------------------------>
		<s:action name="user_implements_navbar" namespace="/user" executeResult="true" />

	<!----------------------------------------主体内容 -------------------------------------------------------- -->

	<div style="margin: 80px 0 0 0; float: left; width: 100%;">
		<!---------------------------------------------------------------------------------------------------->
		<!---------------------------------------------------------------------------------------------------->
		<div class="panel" style="width: 95%; margin: 20px auto;">
			<div id="" style="height: 80px; padding: 20px;">
				<div class="managerClass" style="float: right; margin-left: 10px;">
					<button onclick="cleanInput" data-toggle="modal"
						data-target="#addUser" class="btn btn-success">
						<span style="" class="glyphicon glyphicon-plus"></span>新增用户
					</button>
				</div>
				<div class="input-group" style="float: right; width: 300px;">
					<input id="queryString" type="text" class="form-control"
						placeholder="请输入搜索内容"> <span class="input-group-btn">
						<button onclick="queryUser()" class="btn btn-default"
							type="button">搜索</button>
					</span>
				</div>
			</div>
<!-- 			<div id="loadingDiv" style="width: 319px; margin: 0 auto;"> -->
<%-- 				<img alt="" src="<%=basePath%>img/loading.gif"> --%>
<!-- 			</div> -->
			<div id="tableDiv" class="hideDiv">
				<table class="table table-bordered" style="text-align: center;">
					<tbody id="userTable">
						<tr style="background-color: grey; color: white;">
							<td>账号</td>
							<td>姓名</td>
							<td>电话号码</td>
							<td>注册时间</td>
							<td>操作</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div id="bottomPage" style="padding: 20px;">
				<span>当前页数:<span id="currPage">1</span></span> <span>共:<span
					id="totalPage">2</span>页
				</span> <span onclick="skipToIndexPage()" id="indexPage"
					class="pageOperation">首页</span> <span onclick="skipToPrimaryPage()"
					id="previousPage" class="pageOperation">上一页</span> <span
					onclick="skipToNextPage()" id="nextPage" class="pageOperation">下一页</span>
				<span onclick="skipToLastPage()" id="lastPage" class="pageOperation">末页</span>
				<span> <input id="skipPage" type="text"
					style="text-align: center; width: 60px; height: 30px;"
					class="queryInput">
					<button onclick="skipToArbitrarilyPage()" class="btn btn-default"
						style="height: 30px; margin-bottom: 10px;">跳转</button>
				</span>
			</div>
		</div>
		<!---------------------------------------------------------------------------------------------------->
		<!---------------------------------------------------------------------------------------------------->
	</div>
	<!-----------------------------------------------------------------新增模态框---------------------------------------------------  -->
	<div class="modal fade" id="addUser" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel">
		<div class="modal-dialog" role="document" style="width: 700px;">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">增加用户</h4>
				</div>
				<div class="modal-body">
<!-- 					<div id="addLoadingDiv" class="hideDiv" -->
<!-- 						style="width: 319px; margin: 0 auto;"> -->
<%-- 						<img alt="" src="<%=basePath%>img/loading.gif"> --%>
<!-- 					</div> -->
					<div id="addContent">
						<form id="addUserForm" name="addUserForm">
							<table class="table" style="margin: 0 auto;">
								<tr>
									<td><label>账号：</label></td>
									<td><input id="user_username" name="user_username"
										type="text" class="form-control" placeholder="请输入账号">
									</td>
									<td><label>密码：</label></td>
									<td><input id="user_password" name="user_password"
										type="password" class="form-control" placeholder="请输入密码"></td>
								</tr>
								<tr>
									<td><label>姓名：</label></td>
									<td><input id="user_name" name="user_name" type="text"
										class="form-control" placeholder="请输入用户姓名"></td>
									<td><label>电话：</label></td>
									<td><input id="user_telphone" name="user_telphone" type="text"
										class="form-control" placeholder="请输入用户电话"></td>
								</tr>
								<%-- <tr>
									<td><label>用户权限：</label></td>
									<td><select name="user_userRight"
										class="form-control">
											<option value="jurisdiction_none">无权限</option>
											<option value="jurisdiction_admin">管理员</option>
											<option value="jurisdiction_user">普通用户</option>
									</select></td>
									<td><label>导出权限：</label></td>
									<td><select name="user_exportRight" class="form-control">
											<option value="jurisdiction_none">无权限</option>
											<option value="jurisdiction_use">可导出</option>
									</select></td>
								</tr>
								<tr>
									<td><label>管理权限：</label></td>
									<td><select name="user_manageRight"
										class="form-control">
											<option value="jurisdiction_none">无权限</option>
											<option value="jurisdiction_admin">管理权限</option>
									</select></td>
									<td></td>
									<td></td>
								</tr> --%>
							</table>
						</form>
					</div>
				</div>
				<div class="modal-footer">
					<button onclick="reLoadUser()" type="button"
						class="btn btn-default" data-dismiss="modal">关闭</button>
					<button onclick="addUser()" type="button" class="btn btn-primary">上传</button>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal-dialog -->
	</div>

	<!-----------------------------------------------------------------修改模态框----------------------------------------------------  -->
	<div class="modal fade" id="updateUser" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel">
		<div class="modal-dialog" role="document" style="width: 700px;">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">修改用户</h4>
				</div>
				<div class="modal-body">
<!-- 					<div id="updateLoadingDiv" class="hideDiv" -->
<!-- 						style="width: 319px; margin: 0 auto;"> -->
<%-- 						<img alt="" src="<%=basePath%>img/loading.gif"> --%>
<!-- 					</div> -->
					<div id="updateContent">
						<form id="updateUserForm">
							<table class="table" style="margin: 0 auto;">
								<tr>
									<td><label>账号：</label></td>
									<td><input id="user_username_update" name="user_username"
										type="text" class="form-control" placeholder="请输入账号"></td>
									<td><label>密码：</label></td>
									<td><input id="user_password_update" name="user_password"
										type="password" class="form-control" placeholder="请输入密码"></td>
								</tr>
								<tr>
									<td><label>姓名：</label></td>
									<td><input id="user_name_update" name="user_name"
										type="text" class="form-control" placeholder="请输入用户姓名"></td>
									<td><label>电话：</label></td>
									<td><input id="user_telphone_update" name="user_telphone"
										type="text" class="form-control" placeholder="请输入用户代码"></td>
								</tr>
									<!-- <input id="user_duty_update" name="user_duty"
								type="text" class="form-control" placeholder="请输入用户职位"> -->
								<%-- <tr>
									<td><label>用户权限：</label></td>
									<td><select id="user_userRight_update"
										name="user_userRight" class="form-control">
											<option value="jurisdiction_none">无权限</option>
											<option value="jurisdiction_admin">管理员</option>
											<option value="jurisdiction_user">普通用户</option>
									</select></td>
									<td><label>导出权限：</label></td>
									<td><select id="user_export_Right_update"
										name="user_export_Right" class="form-control">
										<option value="jurisdiction_none">无权限</option>
											<option value="jurisdiction_use">可导出</option>
									</select></td>
								</tr>
								<tr>
									<td><label>用户管理权限：</label></td>
									<td><select id="user_manage_Right_update"
										name="user_manage_Right" class="form-control">
											<option value="jurisdiction_none">无权限</option>
											<option value="jurisdiction_admin">管理权限</option>
									</select></td>
								</tr> --%>
							</table>
						</form>
					</div>
				</div>
				<div class="modal-footer">
					<button onclick="reLoadUser()" type="button"
						class="btn btn-default" data-dismiss="modal">关闭</button>
					<button id="updateBtn" onclick="updateUser(this)" type="button"
						class="btn btn-primary">修改</button>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal-dialog -->
	</div>
</body>
</html>