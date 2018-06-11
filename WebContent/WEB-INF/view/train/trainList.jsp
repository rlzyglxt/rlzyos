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
<link rel="stylesheet" href="<%=basePath%>css/User/userIndex.css">
<script type="text/javascript" src="<%=basePath%>js/train/getTrainData.js"></script>
<title>培训管理界面</title>
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
						data-target="#addTrain" class="btn btn-success">
						<span style="" class="glyphicon glyphicon-plus"></span>新增培训
					</button>
				</div>
				<div class="input-group" style="float: right; width: 300px;">
					<input id="queryString" type="text" class="form-control"
						placeholder="请输入搜索内容"> <span class="input-group-btn">
						<button onclick="queryTrain()" class="btn btn-default"
							type="button">搜索</button>
					</span>
				</div>
			</div>
<!-- 			<div id="loadingDiv" style="width: 319px; margin: 0 auto;"> -->
<%-- 				<img alt="" src="<%=basePath%>img/loading.gif"> --%>
<!-- 			</div> -->
			<div id="tableDiv" class="hideDiv">
				<table class="table table-bordered" style="text-align: center;">
					<tbody id="trainTable">
						<tr style="background-color: grey; color: white;">
							<td>培训名称</td>
							<td>开始时间</td>
							<td>结束时间</td>
							<td>培训费用</td>
							<td>培训介绍</td>
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
	<div class="modal fade" id="addTrain" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel">
		<div class="modal-dialog" role="document" style="width: 700px;">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">增加培训</h4>
				</div>
				<div class="modal-body">
<!-- 					<div id="addLoadingDiv" class="hideDiv" -->
<!-- 						style="width: 319px; margin: 0 auto;"> -->
<%-- 						<img alt="" src="<%=basePath%>img/loading.gif"> --%>
<!-- 					</div> -->
					<div id="addContent">
						<form id="addTrainForm" name="addTrainForm">
							<table class="table" style="margin: 0 auto;">
								<tr>
									<td><label>培训名称：</label></td>
									<td><input id="train_name" name="train_name"
										type="text" class="form-control" placeholder="请输入培训名称">
									</td>
									<td><label>开始时间：</label></td>
									<td><input id="train_begintime" name="train_begintime"
										type="text" class="time" placeholder="请输入开始时间"></td>
								</tr>
								<tr>
									<td><label>培训费用：</label></td>
									<td><input id="train_cost" name="train_cost" type="text"
										class="form-control" placeholder="请输入培训费用"></td>
									<td><label>结束时间：</label></td>
									<td><input id="train_endtime" name="train_endtime" type="text"
										class="time" placeholder="请输入结束时间"></td>
								</tr>
								<tr>
									<td><label>培训介绍：</label></td>
									<td><input id="train_content" name="train_content" type="text"
										class="form-control" placeholder="请输入培训介绍"></td>
								</tr>
							</table>
						</form>
					</div>
				</div>
				<div class="modal-footer">
					<button onclick="reLoadTrain()" type="button"
						class="btn btn-default" data-dismiss="modal">关闭</button>
					<button onclick="addTrain()" type="button" class="btn btn-primary">上传</button>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal-dialog -->
		
	</div>

	<!-----------------------------------------------------------------修改模态框----------------------------------------------------  -->
	<div class="modal fade" id="updateTrain" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel">
		<div class="modal-dialog" role="document" style="width: 700px;">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">修改培训</h4>
				</div>
				<div class="modal-body">
<!-- 					<div id="updateLoadingDiv" class="hideDiv" -->
<!-- 						style="width: 319px; margin: 0 auto;"> -->
<%-- 						<img alt="" src="<%=basePath%>img/loading.gif"> --%>
<!-- 					</div> -->
					<div id="updateContent">
						<form id="updateTrainForm">
							<table class="table" style="margin: 0 auto;">
								<tr>
									<td><label>培训名称：</label></td>
									<td><input id="train_name_update" name="train_name"
										type="text" class="form-control" placeholder="请输入培训名称"></td>
									<td><label>开始时间：</label></td>
									<td><input id="train_begintime_update" name="train_begintime"
										type="text" class="time" placeholder="请输入开始时间"></td>
								</tr>
								<tr>
									<td><label>培训费用：</label></td>
									<td><input id="train_cost_update" name="train_cost"
										type="text" class="form-control" placeholder="请输入培训费用"></td>
									<td><label>结束时间：</label></td>
									<td><input id="train_endtime_update" name="train_endtime"
										type="text" class="time" placeholder="请输入结束时间"></td>
								</tr>
								<tr>
									<td><label>培训介绍：</label></td>
									<td><input id="train_content_update" name="train_content"
										type="text" class="form-control" placeholder="请输入培训介绍"></td>
								</tr>
							</table>
						</form>
					</div>
				</div>
				<div class="modal-footer">
					<button onclick="reLoadTrain()" type="button"
						class="btn btn-default" data-dismiss="modal">关闭</button>
					<button id="updateBtn" onclick="updateTrain(this)" type="button"
						class="btn btn-primary">修改</button>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal-dialog -->
	</div>
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