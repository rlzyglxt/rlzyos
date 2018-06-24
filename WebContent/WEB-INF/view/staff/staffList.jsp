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
<title>人员档案管理</title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<link rel="stylesheet" href="<%=basePath%>css/Staff/Staff.css"> 
<%-- <link rel="stylesheet" href="<%=basePath%>css/user/userIndex.css"> --%>
<script type="text/javascript" src="<%=basePath%>js/staff/showStaffInfor.js"></script>
<style type="text/css">
#bottomPage:hover {
	cursor: pointer;
}
</style>
</head>
<body>
	<input id="hideQueryString" type="text" class="hideDiv" />
	<input id="hideCurrPage" type="text" class="hideDiv" />
<div id="wrapper">
	<s:action name="user_implements_navbar" namespace="/user" executeResult="true" />
	
	<s:action name="user_LeftIndex" namespace="/user" executeResult="true" />
	<div style="margin: 80px 0 0 20px; float: right; width: 82%;">
		<div class="panel" style="width: 95%; margin: 20px auto;" id="allPage">
			<!--  -->
			<div class="panel-heading">
				<h3 class="panel-title">人员管理</h3>
			</div>
			<div class="panel-body">
				<div class="operation" style="margin: 0 0 6px 50px;">
					<button style="margin-left: 15px;" type="button"
						class="btn btn-default"
						onclick="javascript:location.href='/rlzyos/staff/staff_page_AddStaff'">
						<i class="fa fa-plus-square"></i> 新建人员
					</button>
					<input type="text" id="searchInput" class="form-control"
						style="width: 250px; display: inline-block; float: right;"
						oninput="changeName(this)" placeholder="请输入搜索内容">
				</div>
				<div class="col-md-12">
					<div id="loadingLayer" style="margin: 0 auto; width: 45px;">
						<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
					</div>
					<div class="panel" id="mainPanel" style="display: none;">
						<div class="panel-heading">
							<h3 class="panel-title staff_title">人员列表</h3>
						</div>
						<div class="panel-body">
							<table class="table table-hover table-condensed staff_table_info">
								<thead>
									<tr>
										<th>姓名</th>
										<th><select id="staff_sex" onchange="changeSex(this)"
											class="form-control">
												<option value="">性别</option>
												<option value="男">男</option>
												<option value="女">女</option></select>
										</th>
										<th>部门</th>
										<th>出生年月</th>
										<th><select id="staff_status" onchange="changeStatus(this)"
											class="form-control">
												<option value="">职业状态</option>
												<option value="在职">在职</option>
												<option value="离职">离职</option></select>
										</th>
										<th><select id="staff_record" onchange="changeRecord(this)"
											class="form-control">
												<option value="">学历</option>
												<option value="硕士">硕士</option>
												<option value="本科">本科</option>
												<option value="专科">专科</option>
												<option value="高中">高中</option>
												<option value="初中">初中</option>
												<option value="小学">小学</option></select>
										</th>
										<th>电话号码</th>
										<th>家庭住址</th>
										<th>操作</th>
									</tr>
								</thead>
								<tbody>
									 <tr v-for="staff in staffs" style="text-align: center;"> 
										<td>
										<a :id="staff.rlzy_staff_id" onclick="skipToDetail(this)">
										<span v-html="staff.staff_name"></span></a>
										</td>
										<td>{{ staff.staff_sex }}</td>
										<td>{{ staff.staff_depaterment }}</td>
										<td>{{ staff.staff_birth }}</td>
										<td>{{ staff.staff_status }}</td><!-- 员工状态-->
										<td>{{ staff.staff_record }}</td>
										<td>{{ staff.staff_tel }}</td>
										<td>{{ staff.staff_address }}</td>
										<!-- <td>{{ staff.staff_theStaffTime }}</td>入职时间 -->
										<td><button onclick="createConfirmUpdata(this)"
												:id="staff.rlzy_staff_id" class="btn btn-default"><i class="fa fa-pencil-square-o"></i>修改</button>
											<button onclick="createConfirmDelete(this)"
												:id="staff.rlzy_staff_id" class="btn btn-danger"><i class="fa fa-trash-o"></i>删除</button></td>
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
									class="jumpInput">
									<button onclick="jumpPage()" class="btn btn-default"
										style="height: 30px;">跳转</button>
								</span>
								<%-- &nbsp;&nbsp;&nbsp;&nbsp; <a onclick="firstPage()"><i
										class="fa fa-angle-double-left">首页</i></a>&nbsp;&nbsp;&nbsp;&nbsp;
									<a onclick="prePage()"><i class="fa fa-angle-left"></i>上一页</a>&nbsp;&nbsp;&nbsp;&nbsp;
									<a onclick="nextPage()">下一页<i class="fa fa-angle-right"></i></a>&nbsp;&nbsp;&nbsp;&nbsp;
									<a onclick="endPage()">尾页<i
										class="fa fa-angle-double-right"></i></a>&nbsp;&nbsp;&nbsp;&nbsp;
									<input type="text" class="page-go" id="jumpInput"/>&nbsp;&nbsp;&nbsp;&nbsp;
									 <a onclick="jumpPage()">GO</a></div>
								<div style="width: 100px;height: 100px; margin: 0 auto;">
									<span>当前第{{ currPage }}页</span><br>
									<span>共{{ totalPage }}页</span><br>
									<span>共{{ totalCount }}条记录</span><br>
								</div>
								<p class='page-infomation'></p> --%>
							</div>
							<!-- END TABLE HOVER -->
						</div>
					</div>
				</div>
			</div>
			</div>
		</div>
</div>
</body>
</html>