<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="/struts-tags" prefix="s"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">
<title>部门表</title>
<%-- <link rel="stylesheet" href="<%=basePath%>css/Staff/Staff.css"> --%>
<%-- <link rel="stylesheet" href="<%=basePath%>css/user/userIndex.css"> --%>
<script type="text/javascript" src="<%=basePath%>js/depaterment/depaterment.js"></script>
<script src="<%=basePath%>js/jquery-3.1.1.min.js"></script>
<style type="text/css">
#bottomPage:hover {
	cursor: pointer;
}
</style>
</head>
<body>
<div id="wrapper">
	<s:action name="user_implements_navbar" namespace="/user" executeResult="true" />
	<s:action name="user_LeftIndex" namespace="/user" executeResult="true" />
<!----------------------------------------------- 隐藏信息开始 --------------------------------------------------->
	<input id="hideQueryString" type="text" class="hideDiv" />
	<input id="hideCurrPage" type="text" class="hideDiv" />
	
	<div style="margin: 80px 0 0 0; float: right; width: 82%;">
		<div class="panel" style="width: 95%; margin: 20px auto;" id="allPage">
			<!--  -->
			<div class="panel-heading">
				<h3 class="panel-title">部门表</h3>
			</div>
			<div class="panel-body">
				<div class="operation" style="margin: 0 0 6px 50px;">
					<button style="margin-left: 15px;float: right;" type="button" class="btn btn-success" data-toggle='modal' data-target='#addDepaterment'>
						<i class="fa fa-plus-square"></i>新增部门
					</button>
					<input type="text" id="searchInput" class="form-control"
						style="width: 250px; display: inline-block; float: right;"
						oninput="changeName(this)" placeholder="请输入部门名称"/>
				</div>
				<div class="col-md-12">
					<div id="loadingLayer" style="margin: 0 auto; width: 45px;">
						<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
					</div>
					<div class="panel" id="mainPanel" style="display: none;">
						<div class="panel-body">
							<table class="table table-hover table-condensed staff_table_info"  style="text-align: center;">
								<thead>
									<tr style="background-color: grey; color: white;">
										<td>部门名称</td>
										<td>部门简介</td>
										<td>部门电话</td>
										<td>部门人数</td>
										<td>操作</td>
									</tr>
								</thead>
								<tbody>
									 <tr v-for="depaterment in list" style="text-align: center;"> 
										<td>{{ depaterment.staffdepartment_name }}</td>
										<td>{{ depaterment.staffdepartment_introduct }}</td>
										<td>{{ depaterment.staffdepartment_tel }}</td>
										<td>{{ depaterment.staffdepartment_amount }}</td>
										<td><button onclick="createConfirmUpdata(this)" 
												:id="depaterment.rlzy_staffdepartment_id" data-toggle='modal' data-target='#updateDepaterment' class='btn btn-primary'><i class="fa fa-pencil-square-o"></i>修改</button>
											<button onclick="createConfirmDelete(this)"
												:id="depaterment.rlzy_staffdepartment_id" class="btn btn-danger"><i class="fa fa-trash-o"></i>删除</button></td>
										</td>
									</tr>
								</tbody>
							</table>
							</div>
							<div id="bottomPage" style="padding: 20px;">
								<span>当前页数:<span id="currPage">{{ currPage }}</span></span> <span>共:<span
									id="totalPage">{{ totalPage }}</span>页<span>共:<span
									id="totalCount">{{ totalCount }}</span>条记录数
								</span> <span onclick="firstPage()" id="indexPage"
									class="pageOperation">首页</span> <span onclick="prePage()"
									id="previousPage" class="pageOperation">上一页</span> <span
									onclick="nextPage()" id="nextPage" class="pageOperation">下一页</span>
								<span onclick="endPage()" id="lastPage" class="pageOperation">末页</span>
								<span> <input id="skipPage" class="form-control"
									type="text"
									style="display: inline-block; text-align: center; width: 60px; height: 30px;"
									class="queryInput">
									<button onclick="jumpPage()" class="btn btn-default"
										style="height: 30px;">跳转</button>
								</span>
							</div>
						
					</div>
				</div>
			</div>
			</div>
		</div>
</div>	
<!---------------------update--------------------------------------------修改模态框----------------------------------------------------  -->
	<div class="modal fade" id="updateDepaterment" tabindex="-1" role="dialog"	aria-labelledby="myModalLabel">
		<div class="modal-dialog" role="document" style="width: 900px;">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">修改部门信息</h4>
				</div>
				<div class="modal-body">
					<div id="updateContent">
						<form id="updatedepatermentForm">
							<table class="table" style="margin: 0 auto;">
								<tr>
									<td><label>部门名称：</label></td>
									<td><input id="updatastaffdepartment_name" name="staffdepartment_name" 
										type="text" class="form-control" placeholder="请输入部门名称"></td>
									<td><label>部门电话：</label></td>
									<td><input id="updatastaffdepartment_tel" name="staffdepartment_tel"
										type="text" class="form-control" placeholder="请输入部门电话"></td>
								</tr>
								<tr>
									<td><label>部门人数：</label></td>
									<td><input id="updatastaffdepartment_amount" name="staffdepartment_amount"
										type="text" class="form-control" placeholder="请输入部门人数"></td>
									<td><label>部门简介：</label></td>
									<td colspan="6"><textarea id="updatastaffdepartment_introduct"
											class="form-control"  name="staffdepartment_introduct"
											style="width: 465px; border: 1px solid #ccc;"
											rows="3" cols="62" placeholder="请输入部门简介"></textarea></td>
								</tr>
							</table>
						</form>
					</div>
				</div>
				<div class="modal-footer">
					<button onclick="loadData()" type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					<button id="updateDepatermentBtn" onclick="updateDepaterment(this)"  type="button" class="btn btn-primary">修改</button>
				</div>
			</div>
			<!-- /.modal-content id="updateBtn" -->
		</div>
		<!-- /.modal-dialog -->
	</div>
	
	<!-----------------------------------------------------------------增加模态框----------------------------------------------------  -->
	<div class="modal fade" id="addDepaterment" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		<div class="modal-dialog" role="document" style="width: 900px;">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">新增部门</h4>
				</div>
				<div class="modal-body">
					<div id="addContent">
						<form id="adddepatermentForm" name="adddepatermentForm">
							<table class="table" style="margin: 0 auto;">
								<tr>
									<td><label>部门名称：</label></td>
									<td><input  id="staffdepartment_name" name="staffdepartment_name" 
										type="text" class="form-control" placeholder="请输入部门名称"></td>
									<td><label>部门电话：</label></td>
									<td><input id="staffdepartment_tel" name="staffdepartment_tel"
										type="text" class="tel form-control" placeholder="请输入部门电话"></td>
								</tr>
								<tr>
									<td><label>部门人数：</label></td>
									<td><input id="staffdepartment_amount" name="staffdepartment_amount"
										type="text" class="form-control" placeholder="请输入部门人数"></td>
									<td><label>部门简介：</label></td>
									<td colspan="6"><textarea id="staffdepartment_introduct"
											class="form-control"  name="staffdepartment_introduct"
											style="width: 465px; border: 1px solid #ccc;"
											rows="3" cols="62" placeholder="请输入部门简介"></textarea></td>
								</tr>
							</table>
						</form>
					</div>
				</div>
				<div class="modal-footer">
					<button onclick="loadData()" type="button" class="btn btn-default" data-dismiss="modal">关闭</button>

					<button onclick="SubmitCk()"  type="button" class="btn btn-primary">添加</button>

				</div>
			</div>
			<!-- /.modal-content id="updateBtn" -->
		</div>
		<!-- /.modal-dialog -->
	</div>
</body>
</html>