<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="/struts-tags" prefix="s"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>员工调配</title>
<style type="text/css">
#bottomPage:hover {
	cursor: pointer;
}
</style>
</head>
<script type="text/javascript" src="<%=basePath%>js/staff/staffMove.js"></script>
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
				<h3 class="panel-title">员工调配</h3>
			</div>
			<div class="panel-body">
				<div class="operation" style="margin: 0 0 6px 50px;">
					<button style="margin-left: 15px; margin-right: 15px;" type="button"
					 class="btn btn-default" data-toggle='modal' data-target='#addStaffMove'>
						<i class="fa fa-plus-square"></i>新增调配
					</button>
					<!-- <input type="text" id="searchInput" class="form-control"
						style="width: 250px; display: inline-block; float: right;"
						oninput="changeName(this)" placeholder="请输入搜索内容"/> -->
				</div>
				<div class="col-md-12">
					<div id="loadingLayer" style="margin: 0 auto; width: 45px;">
						<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
					</div>
					<div class="panel" id="mainPanel" style="display: none;">
						<div class="panel-heading">
							<h3 class="panel-title staff_title"></h3>
						</div>
						<div class="panel-body">
							<table class="table table-hover table-condensed staff_table_info">
								<thead>
									<tr>
										<th>员工工号</th>
										<th>姓名</th>
										<th>原部门</th>
										<th>原职务</th>
										<th>调入部门</th>
										<th>调入职务</th>
										<th><select id="staffMove_time" onchange="changeTime(this)" class="form-control">
												<option value="desc">调动时间（降序）</option>
												<option value="asc">调动时间（升序）</option>
										</select></th>
										<th>操作</th>
									</tr>
								</thead>
								<tbody>
									 <tr v-for="staffMove in staffMoves" style="text-align: center;"> 
										<td>
										<a :id="staffMove.rlzy_staffMove_id" onclick="skipToDetails(this)">
										<span v-html="staffMove.staff_number"></span></a>
										</td>
										<td>{{ staffMove.staff_name }}</td>
										<td>{{ staffMove.staffMove_bfdepartment }}</td>
										<td>{{ staffMove.staffMove_bfduty }}</td>
										<td>{{ staffMove.staffMove_nowdepartment }}</td>
										<td>{{ staffMove.staffMove_nowduty }}</td>
										<td>{{ staffMove.staffMove_time }}</td>
										<td><button onclick="createConfirmDeleteMove(this)"
												:id="staffMove.rlzy_staffMove_id" class="btn btn-danger"><i class="fa fa-trash-o"></i>删除</button></td>
								</tbody>
							</table>
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
</div>	



<!-----------------------------------------------------------------增加工作调动框----------------------------------------------------  -->
	<div class="modal fade" id="addStaffMove" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		<div class="modal-dialog" role="document" style="width: 900px;">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">员工调配</h4>
				</div>
				<div class="modal-body">
 					<%-- <div id="updateLoadingDiv" class="hideDiv" 
						style="width: 319px; margin: 0 auto;"> 
						<img alt="" src="<%=basePath%>img/loading.gif">
				</div>  --%>
					<div id="addContent">
						<form id="addstaffMoveForm" name="addstaffMoveForm">
							<table class="table" style="margin: 0 auto;">
								<tr>
									<td><label>工号：</label></td>
									<td><input id="staffMove_staff" name="staffMove.staffMove_staff" oninput="getValue(this)" 
									placeholder="请输入工号" type="text" class="form-control"></td>
									<td><label>姓名：</label></td>
									<td><input  readonly="readonly" id="staff_addname" name="staffMove.staff_addname" type="text" value="没有该员工" class="form-control"></td>
								</tr>
								<tr><td><label>现部门：</label></td>
									<td><input readonly="readonly" id="staffMove_bfdepartment" name="staffMove.staffMove_bfdepartment"
										type="text" class="staff_OverTime form-control" placeholder="请输入现部门"></td>
									<td><label>现职务：</label></td>
									<td><input readonly="readonly" id="staffMove_bfduty" name="staffMove.staffMove_bfduty"
										type="text" class="form-control" placeholder="请输入现职务"></td>
								</tr>
								<tr><td><label>调入部门：</label></td>
									<td><select class="form-control" id="staffMove_nowdepartment" 
									name="staffMove.staffMove_nowdepartment">
										</select></td>
									<td><label>调入职务：</label></td>
									<td><select class="form-control" name="staffMove.staffMove_nowduty" id="staffMove_nowduty">
										<option value="管理员">管理员</option>
										<option value="经理">经理</option>
										<option value="员工">员工</option>
										</select></td>
								</tr>
								<tr>
									<td><label>调动时间：</label></td>
									<td><input id="staffMove_timee" name="staffMove.staffMove_time"
										type="text" class="form-control Time" placeholder="请输入调动时间"></td>
									<td><label>备注：</label></td>
									<td><input id="staffMove_remark" name="staffMove.staffMove_remark"
										type="text" class="form-control" placeholder="请输入备注"></td>
								</tr>
							</table>
						</form>
					</div>
				</div>
				<div class="modal-footer">
					<button onclick="loadData()" type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					<button id="addStaffMoveBtn" onclick="addStaffMove()"  type="button" class="btn btn-primary">添加</button>
				</div>
			</div>
			<!-- /.modal-content id="updateBtn" -->
		</div>
		<!-- /.modal-dialog -->
	</div>
	<!-- 时间javescript -->
	<script type="text/javascript">
		$.datetimepicker.setLocale('ch');
		$('.Time').datetimepicker({
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