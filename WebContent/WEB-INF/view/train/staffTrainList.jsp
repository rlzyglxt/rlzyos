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
<title>培训记录表</title>
<%-- <link rel="stylesheet" href="<%=basePath%>css/Staff/Staff.css"> --%>
<%-- <link rel="stylesheet" href="<%=basePath%>css/user/userIndex.css"> --%>
<script type="text/javascript" src="<%=basePath%>js/train/stafftrain.js"></script>
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
	
<!----------------------------------------------- 隐藏信息开始 --------------------------------------------------->
	<input id="hideQueryString" type="text" class="hideDiv" />
	<input id="hideCurrPage" type="text" class="hideDiv" />
	<s:action name="user_LeftIndex" namespace="/user" executeResult="true" />
	<div style="margin: 80px 0 0 0; float: right; width: 82%;">
		<div class="panel" style="width: 95%; margin: 20px auto;" id="allPage">
			<!--  -->
			<div class="panel-heading">
				<h3 class="panel-title">培训记录表</h3>
			</div>
			<div class="panel-body">
				<div class="operation" style="margin: 0 0 6px 50px;">
					<button style="margin-left: 15px;" type="button" class="btn btn-default" data-toggle='modal' data-target='#addStaffTrain'>
						<i class="fa fa-plus-square"></i>新增记录
					</button>
					<input type="text" id="searchInput" class="form-control"
						style="width: 250px; display: inline-block; float: right;"
						oninput="changeName(this)" placeholder="请输入员工工号"/>
				</div>
				<div class="col-md-12">
					<div id="loadingLayer" style="margin: 0 auto; width: 45px;">
						<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
					</div>
					<div class="panel" id="mainPanel" style="display: none;">
						<div class="panel-heading">
							<h3 class="panel-title staff_title">培训记录表</h3>
						</div>
						<div class="panel-body">
							<table class="table table-hover table-condensed staff_table_info">
								<thead>
									<tr>
										<th>员工工号</th>
										<th>员工姓名</th>
										<th>培训名称</th>
										<th>培训成绩</th>
										<th>证书名称</th>
										<th>创建时间</th>
										<th>修改时间</th>
										<th>操作</th>
									</tr>
								</thead>
								<tbody>
									 <tr v-for="staffTrain in staffTrains" style="text-align: center;"> 
										<td>{{ staffTrain.staff_number }}</td>
										<td>{{ staffTrain.staff_name }}</td>
										<td>{{ staffTrain.train_name }}</td>
										<td>{{ staffTrain.record_grade }}</td>
										<td>{{ staffTrain.paper_name }}</td>
										<td>{{ staffTrain.staffTrain_gmt_create }}</td>
										<td>{{ staffTrain.staffTrain_gmt_modified }}</td>
										<td><button onclick="createConfirmUpdata(this)" 
												:id="staffTrain.rlzy_stafftrain_id" data-toggle='modal' data-target='#updateStaffTrain' class='btn btn-primary'><i class="fa fa-pencil-square-o"></i>修改</button>
											<button onclick="createConfirmDelete(this)"
												:id="staffTrain.rlzy_stafftrain_id" class="btn btn-danger"><i class="fa fa-trash-o"></i>删除</button></td>
									</tr>
								</tbody>
							</table>
							<div id="bottomPage" style="padding: 20px;">
								<span>当前页数:<span id="currPage">{{ currPage }}</span></span> <span>共:<span
									id="totalPage">{{ totalPage }}</span>页<span>共:<span
									id="totalPage">{{ totalCount }}</span>条记录数
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
</div>	
<!---------------------update--------------------------------------------修改模态框----------------------------------------------------  -->
	<div class="modal fade" id="updateStaffTrain" tabindex="-1" role="dialog"	aria-labelledby="myModalLabel">
		<div class="modal-dialog" role="document" style="width: 900px;">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">修改培训记录</h4>
				</div>
				<div class="modal-body">
					<div id="updateContent">
						<form id="updatestafftrainForm" name="updatestafftrainForm">
							<table class="table" style="margin: 0 auto;">
								<tr>
									<td><label>员工工号：</label></td>
									<td><input id="stafftrain_staff" name="stafftrain_staff"
										type="text" class="form-control" readonly="readonly"></td>
									<td><label>培训名称：</label></td>
									<td><select id="stafftrain_train" name="stafftrain_train" class="form-control">
										<option></option>
										</select></td>
								</tr>
								<tr>
									<td><label>培训成绩：</label></td>
									<td><input id="stafftrain_score" name="stafftrain_score"
										type="text" class="form-control" placeholder="请输入培训成绩"></td>
									<td><label>证书名称：</label></td>
									<td><input id="stafftrain_certificate" name="stafftrain_certificate"
										type="text" class="form-control" placeholder="请输入证书名称"></td>
								</tr>
							</table>
						</form>
					</div>
				</div>
				<div class="modal-footer">
					<button onclick="loadData()" type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					<button id="updateStaffTrainBtn" onclick="updateStaffTrain(this)"  type="button" class="btn btn-primary">修改</button>
				</div>
			</div>
			<!-- /.modal-content id="updateBtn" -->
		</div>
		<!-- /.modal-dialog -->
	</div>
	
	<!-----------------------------------------------------------------增加模态框----------------------------------------------------  -->
	<div class="modal fade" id="addStaffTrain" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		<div class="modal-dialog" role="document" style="width: 900px;">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">新增培训记录</h4>
				</div>
				<div class="modal-body">
					<div id="addContent">
						<form id="addstafftrainForm" name="addstafftrainForm">
							<table class="table" style="margin: 0 auto;">
								<tr>
									<td><label>员工工号：</label></td>
									<td><input id="stafftrain_staff" name="stafftrain_staff" oninput="getName(this)"
										type="text" class="form-control"></td>
									<td><label>员工姓名：</label></td>
									<td><input id="staff_addname" name="staff_addname"
										type="text" class="form-control" readonly="readonly"></td>
								</tr>
								<tr>
									<td><label>培训名称：</label></td>
									<td><select id="stafftrain_train" name="stafftrain_train" class="form-control">
										<option></option>
										</select></td>
									<td><label>培训成绩：</label></td>
									<td><input id="stafftrain_score" name="stafftrain_score"
										type="text" class="form-control" placeholder="请输入培训成绩"></td>
								</tr>
								<tr><td><label>证书名称：</label></td>
									<td><input id="stafftrain_certificate" name="stafftrain_certificate"
										type="text" class="form-control" placeholder="请输入证书名称"></td>
								</tr>
							</table>
						</form>
					</div>
				</div>
				<div class="modal-footer">
					<button onclick="loadData()" type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					<button id="addStaffTrainBtn" onclick="addStaffTrain()"  type="button" class="btn btn-primary">添加</button>
				</div>
			</div>
			<!-- /.modal-content id="updateBtn" -->
		</div>
		<!-- /.modal-dialog -->
	</div>
</body>
</html>