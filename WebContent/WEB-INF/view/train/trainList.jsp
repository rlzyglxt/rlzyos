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
<title>教育培训表</title>
<script type="text/javascript" src="<%=basePath%>js/staff/train.js"></script>
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
				<h3 class="panel-title">教育培训表</h3>
			</div>
			<div class="panel-body">
				<div class="operation" style="margin: 0 0 6px 50px;">
					<button style="margin-left: 15px;" type="button" class="btn btn-default" data-toggle='modal' data-target='#addTrain'>
						<i class="fa fa-plus-square"></i>新增培训
					</button>
					<input type="text" id="searchInput" class="form-control"
						style="width: 250px; display: inline-block; float: right; margin-right:15px;"
						oninput="changeName(this)" placeholder="请输入搜索内容"/>
				</div>
				<div class="col-md-12">
					<div id="loadingLayer" style="margin: 0 auto; width: 45px;">
						<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
					</div>
					<div class="panel" id="mainPanel" style="display: none;">
						<div class="panel-heading">
							<h3 class="panel-title staff_title">培训表</h3>
						</div>
						<div class="panel-body">
							<table class="table table-hover table-condensed staff_table_info">
								<thead>
									<tr>
										<th>培训名称</th>
										<th>开始时间</th>
										<th>结束时间</th>
										<th>培训费用</th>
										<th>培训介绍</th>
										<th>创建时间</th>
										<th>操作</th>
									</tr>
								</thead>
								<tbody>
									 <tr v-for="train in trains" style="text-align: center;"> 
										<td>{{ train.train_name }}</td>
										<td>{{ train.train_startTime }}</td>
										<td>{{ train.train_overTime }}</td>
										<td>{{ train.train_pay }}</td>
										<td>{{ train.train_content }}</td>
										<td>{{ train.train_gmt_create }}</td>
										<td><button onclick="createConfirmUpdata(this)" 
												:id="train.rlzy_train_id" data-toggle='modal' data-target='#updateTrain' class='btn btn-primary'><i class="fa fa-pencil-square-o"></i>修改</button>
											<button onclick="createConfirmDelete(this)"
												:id="train.rlzy_train_id" class="btn btn-danger"><i class="fa fa-trash-o"></i>删除</button></td>
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
	<div class="modal fade" id="updateTrain" tabindex="-1" role="dialog"	aria-labelledby="myModalLabel">
		<div class="modal-dialog" role="document" style="width: 900px;">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">修改教育培训</h4>
				</div>
				<div class="modal-body">
					<div id="updateContent">
						<form id="updatetrainForm">
							<table class="table" style="margin: 0 auto;">
								<tr>
									<td><label>培训名称：</label></td>
									<td><input id="train_name" name="train_name"
										type="text" class="form-control" placeholder="请输入培训名称"></td>
									<td><label>开始时间：</label></td>
									<td><input id="train_startTime" name="train_startTime"
										type="text" class="staff_StartTime form-control" placeholder="请输入开始时间"></td>
								</tr>
								<tr>
									<td><label>培训费用：</label></td>
									<td><input id="train_pay" name="train_pay"
										type="text" class="form-control" placeholder="请输入培训费用"></td>
									<td><label>结束时间：</label></td>
									<td><input id="train_overTime" name="train_overTime"
										type="text" class="staff_OverTime form-control" placeholder="请输入结束时间"></td>
								</tr>
								<tr><td><label>培训介绍：</label></td>
								<td colspan="6"><textarea id="train_content"
											class="form-control"  name="train_content"
											style="width: 273px; border: 1px solid #ccc;"
											rows="3" cols="62" placeholder="请输入培训介绍"></textarea></td>
								</tr>
							</table>
						</form>
					</div>
				</div>
				<div class="modal-footer">
					<button onclick="loadData()" type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					<button id="updateTrainBtn" onclick="updateTrain(this)"  type="button" class="btn btn-primary">修改</button>
				</div>
			</div>
			<!-- /.modal-content id="updateBtn" -->
		</div>
		<!-- /.modal-dialog -->
	</div>
	
	<!-----------------------------------------------------------------增加模态框----------------------------------------------------  -->
	<div class="modal fade" id="addTrain" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		<div class="modal-dialog" role="document" style="width: 900px;">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">新增教育培训</h4>
				</div>
				<div class="modal-body">
					<div id="addContent">
						<form id="addtrainForm" name="addtrainForm">
							<table class="table" style="margin: 0 auto;">
								<tr>
									<td><label>培训名称：</label></td>
									<td><input id="addtrain_name" name="train_name"
										type="text" class="form-control" placeholder="请输入培训名称"></td>
									<td><label>开始时间：</label></td>
									<td><input id="addtrain_startTime" name="train_startTime"
										type="text" class="staff_StartTime form-control" placeholder="请输入开始时间"></td>
								</tr>
								<tr>
									<td><label>培训费用：</label></td>
									<td><input id="addtrain_pay" name="train_pay"
										type="text" class="form-control" placeholder="请输入培训费用"></td>
									<td><label>结束时间：</label></td>
									<td><input id="addtrain_overTime" name="train_overTime"
										type="text" class="staff_OverTime form-control" placeholder="请输入结束时间"></td>
								</tr>
								<tr><td><label>培训介绍：</label></td>
									<td colspan="6"><textarea id="addtrain_content"
											class="form-control"  name="train_content"
											style="width: 273px; border: 1px solid #ccc;"
											rows="3" cols="62" placeholder="请输入培训介绍"></textarea></td>
								</tr>
							</table>
						</form>
					</div>
				</div>
				<div class="modal-footer">
					<button onclick="loadData()" type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					<button onclick="addTrain()"  type="button" class="btn btn-primary">添加</button>
				</div>
			</div>
			<!-- /.modal-content id="updateBtn" -->
		</div>
		<!-- /.modal-dialog -->
	</div>
<!-- 时间javescript -->
	<script type="text/javascript">
		$.datetimepicker.setLocale('ch');
		$('.staff_StartTime').datetimepicker({
			yearStart : 1900, // 设置最小年份
			yearEnd : 2100, // 设置最大年份
			yearOffset : 0, // 年偏差
			timepicker : false, // 关闭时间选项
			format : 'Y-m-d', // 格式化日期年-月-日
			minDate : '1900/01/01', // 设置最小日期
			maxDate : '2100/01/01', // 设置最大日期
		});
	</script>
	<script type="text/javascript">
		$.datetimepicker.setLocale('ch');
		$('.staff_OverTime').datetimepicker({
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