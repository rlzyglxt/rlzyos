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
<title>人员信息导出</title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<link rel="stylesheet" href="<%=basePath%>css/Staff/Staff.css"> 
<%-- <link rel="stylesheet" href="<%=basePath%>css/user/userIndex.css"> --%>
<script type="text/javascript" src="<%=basePath%>/js/export/exportStaff.js"></script>
<script type="text/javascript" src="<%=basePath%>js/export/showExportStaff.js"></script>

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
	
	<%-- <s:action name="user_LeftIndex" namespace="/user" executeResult="true" /> --%>
	<div style="margin: 80px 0 0 0; width: 100%;">
		<div class="panel" style="width: 100%; margin: 20px auto;float: right;" id="allPage"  >
			<!--  -->
			<div class="panel-heading">
				<h3 class="panel-title">人员信息</h3>
			</div>
			<div class="panel-body" style="width: 100%;">
				<div class="operation" style="margin: 0 0 6px 50px;">
					<button onclick="javascript:history.go(-1)" type="button"
						class="btn btn-default button button_return ">
						<i class="fa fa-reply"></i> 返回
					</button>
					<button class="btn btn-primary managerRole"
						onclick="exportCurrPage()">
						<i class="fa fa-print"></i>导出员工表
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
						<!-- <div class="panel-heading">
							<h3 class="panel-title staff_title">人员列表</h3>
						</div> -->
						<div class="panel-body">
							<table class="table table-hover table-condensed staff_table_info">
								<thead>
									<tr>
										<!-- <th><label>
												<input onclick="selectAllbox(this)" type="checkbox"> 全选
											</label>
										</th> -->
										<th>工号</th>
										<th>姓名</th>
										<th><select id="staff_sex" onchange="changeSex(this)"
											class="form-control">
												<option value="">性别</option>
												<option value="男">男</option>
												<option value="女">女</option></select>
										</th>
										<th>年龄</th>
										<th>身份证</th>
										<th>出生年月</th>
										<th>联系方式</th>
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
										<th>部门</th>
										<th>职务</th>
										<th><select id="staff_status" onchange="changeStatus(this)"
											class="form-control">
												<option value="">职业状态</option>
												<option value="在职">在职</option>
												<option value="离职">离职</option></select>
										</th>
										<th>家庭住址</th>										
										<th>操作</th>
									</tr>
								</thead>
								<tbody>
									 <tr v-for="staffListDTO in staffs.staffs" style="text-align: center;"> 
									 	<%-- <td><label><input type="checkbox" name="chooseCheckBox"
									:value="staffListDTO.rlzy_staff_id"><span></span></label></td> --%>
										<td>
										<a :id="staffListDTO.rlzy_staff_id" onclick="skipToDetail(this)">
										<span v-html="staffListDTO.staff_number"></span></a>
										</td>
										<td>
										<a :id="staffListDTO.rlzy_staff_id" onclick="skipToDetail(this)">
										<span v-html="staffListDTO.staff_name"></span></a>
										</td>
										<td>{{ staffListDTO.staff_sex }}</td>
										<td>{{ staffListDTO.staff_age }}</td>
										<td>{{ staffListDTO.staff_cardid }}</td>
										<td>{{ staffListDTO.staff_birth }}</td>
										<td>{{ staffListDTO.staff_tel }}</td>
										<td>{{ staffListDTO.staff_record }}</td>
										<td>{{ staffListDTO.staff_depaterment }}</td><!-- 员工状态-->
										<td>{{ staffListDTO.staff_duty }}</td>
										<td>{{ staffListDTO.staff_status }}</td>
										<td>{{ staffListDTO.staff_address }}</td>
										
										
										<!-- <td>{{ staff.staff_theStaffTime }}</td>入职时间 -->
										<td><button onclick="createConfirmUpdata(this)"
												:id="staffListDTO.rlzy_staff_id" class="btn btn-info"><i class="fa fa-pencil-square-o"></i>修改</button>
											<!-- <button onclick="exportCurrPage()"
												:id="staffListDTO.rlzy_staff_id" class="btn btn-success"><i class="fa fa-code"></i>导出</button></td> -->
									</tr>
								</tbody>
							</table>
							<div id="bottomPage" style="padding: 20px;">
							共:<span	id="totalCount">{{ totalCount }}</span>条记录数
							</div>
							<%-- <div id="bottomPage" style="padding: 20px;">
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
							</div> --%>
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