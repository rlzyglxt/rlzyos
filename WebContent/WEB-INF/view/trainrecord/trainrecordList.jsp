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
<title>培训记录信息表</title>
<%-- <link rel="stylesheet" href="<%=basePath%>css/Staff/Staff.css"> --%>
<%-- <link rel="stylesheet" href="<%=basePath%>css/user/userIndex.css"> --%>
<script type="text/javascript" src="<%=basePath%>js/trainrecord/trainrecord.js"></script>
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
					<button style="margin-left: 15px;" type="button" class="btn btn-default" data-toggle='modal' data-target='#addTrainrecord'>
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
										<th>成        绩</th>
										<th>培训名称</th>
										<th>证书名称</th>
										<th>创建时间</th>
										<th>修改时间</th>
										<th>操作</th>
									</tr>
								</thead>
								<tbody>
									 <tr v-for="trainrecord in list" style="text-align: center;"> 
										<td>{{ trainrecord.staff_number }}</td>
										<td>{{ trainrecord.staff_name }}</td>
										<td>{{ trainrecord.record_grade }}</td>
										<td>{{ trainrecord.train_name }}</td>
										<td>{{ trainrecord.paper_name }}</td>
										<td>{{ trainrecord.staffTrain_gmt_create }}</td>
										<td>{{ trainrecord.staffTrain_gmt_modified }}</td>
										<td><button onclick="createConfirmUpdata(this)" 
												:id="trainrecord.rlzy_record_id" data-toggle='modal' data-target='#updateTrainrecord' class='btn btn-primary'><i class="fa fa-pencil-square-o"></i>修改</button>
											<button onclick="createConfirmDelete(this)"
												:id="trainrecord.rlzy_record_id" class="btn btn-danger"><i class="fa fa-trash-o"></i>删除</button></td>
										</td>
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
<!---------------------updateStaffExp--------------------------------------------修改模态框----------------------------------------------------  -->
	<div class="modal fade" id="updateTrainrecord" tabindex="-1" role="dialog"	aria-labelledby="myModalLabel">
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
 					<%-- <div id="updateLoadingDiv" class="hideDiv" 
						style="width: 319px; margin: 0 auto;"> 
						<img alt="" src="<%=basePath%>img/loading.gif">
				</div>  --%>
					<div id="updateContent">
						<form id="updatetrainrecordForm">
							<table class="table" style="margin: 0 auto;">
								<tr>
									<td><label>员工工号：</label></td>
									<td><input id="staff_number" name="staff_number" 
										type="text" class="form-control" readonly="readonly"></td>
									<td><label>员工姓名：</label></td>
									<td><input id="staff_name" name="staff_name"
										type="text" class="form-control" readonly="readonly"></td>
								</tr>
								<tr>
									<td><label>成        绩：</label></td>
									<td><input id="record_grade" name="record_grade"
										type="text" class="form-control" placeholder="请输入成绩"></td>
									<td><label>培训名称：</label></td>
									<td><input id="train_name" name="train_name"
										type="text" class="form-control" placeholder="请输入培训名称"></td>
								</tr>
								<tr><td><label>证书名称：</label></td>
									<td><input id="paper_name" name="paper_name"
										type="text" class="form-control" placeholder="请输入证书名称"></td>
								</tr>
							</table>
						</form>
					</div>
				</div>
				<div class="modal-footer">
					<button onclick="loadData()" type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					<button id="updateTrainrecordBtn" onclick="updateTrainrecord(this)"  type="button" class="btn btn-primary">修改</button>
				</div>
			</div>
			<!-- /.modal-content id="updateBtn" -->
		</div>
		<!-- /.modal-dialog -->
	</div>
	
	<!-----------------------------------------------------------------增加模态框----------------------------------------------------  -->
	<div class="modal fade" id="addTrainrecord" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
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
 					<%-- <div id="updateLoadingDiv" class="hideDiv" 
						style="width: 319px; margin: 0 auto;"> 
						<img alt="" src="<%=basePath%>img/loading.gif">
				</div>  --%>
					<div id="addContent">
						<form id="addtrainrecordForm" name="addtrainrecordForm">
							<table class="table" style="margin: 0 auto;">
								<tr>
									<td><label>员工工号：</label></td>
									<td><input id="staff_number" name="staff_number" oninput="getName(this)" 
									placeholder="请输入员工工号" type="text" class="form-control"></td>
									<td><label>员工姓名：</label></td>
									<td><input id="staff_addname" name="staff_addname" type="text" class="form-control"></td>
								</tr>
								<tr>
									<td><label>成        绩：</label></td>
									<td><input id="record_grade" name="record_grade"
										type="text" class="form-control" placeholder="请输入成绩"></td>
									<td><label>培训名称：</label></td>
									<td><input id="train_name" name="train_name"
										type="text" class="form-control" placeholder="请输入培训名称"></td>
								</tr>
								<tr><td><label>证书名称：</label></td>
									<td><input id="paper_name" name="paper_name"
										type="text" class="form-control" placeholder="请输入证书名称"></td>
								</tr>
							</table>
						</form>
					</div>
				</div>
				<div class="modal-footer">
					<button onclick="loadData()" type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					<button onclick="addTrainrecord()"  type="button" class="btn btn-primary">添加</button>
				</div>
			</div>
			<!-- /.modal-content id="updateBtn" -->
		</div>
		<!-- /.modal-dialog -->
	</div>
</body>
</html>