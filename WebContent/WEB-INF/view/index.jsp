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
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>首页</title>
<style type="text/css">
.nav li {
	cursor: pointer;
}

.message {
	padding: 0;
	margin: 0;
}

.message li {
	list-style-type: none;
	color: black;
	font-size: 18px;
	padding:5px;
}

.message li:nth-child(even) {
	background-color: #baefff;
}

.message li:nth-child(odd) {
	background-color: #9ae7fe;
}

.mesaageDIV {
	overflow-y: auto;
}
</style>
</head>
<body>
	<div id="wrapper">
		<div class="slimScrollDiv" id="slimScrollDiv" position: relative; overflow: hidden; width: auto; height: 100%;">
		<!-- LEFT SIDEBAR -->
		<div id="sidebar-nav" class="sidebar"
			style="width: 200px; height: 100% !important; background-color: #13599d;">
			<div class="sidebar-scroll" style="height: 100% !important;">
				<nav>
				<ul class="nav">
					<li><a class=""><i class="lnr lnr-file-add"></i> <span>人员档案</span></a>
						<ul class="nav" style="background-color: #13599d;">
							<li><a href="<%=basePath%>staff/staff_page_StaffInfo"><span>人员基本信息</span></a></li>
							<li><a href="<%=basePath%>case/Case_page_CaseMergerList"><span>员工履历</span></a></li>
							<li><a href="<%=basePath%>case/BreakeCase_page_BreakCaseList"><span>员工合同</span></a></li>
							</template>
						</ul>
					</li>
					<li><a class=""><i class="lnr lnr-users"></i> <span>**</span></a>
						<ul class="nav" style="background-color: #13599d;">
							<template v-if="user_army_manager_power">
							<li><a href="<%=basePath%>team/Staff_page_staffList"><span></span></a></li>
							</template>
							<template v-if="user_army_manager_power">
							<li><a href="<%=basePath%>scheduling/Scheduling_page_list"><span>**</span></a></li>
							</template>
							<template v-if="user_army_manager_power">
							<li><a href="<%=basePath%>user/Meeting_skipToMeetRecords"><span>***</span></a></li>
							</template>
							<template v-if="user_army_manager_power">
							<li><a
								href="<%=basePath%>user/Memorabilia_skipToMemorabilia"><span>***</span></a></li>
							</template>
						 </ul>
					  </li>
					<li><a class=""><i class="lnr lnr-license"></i> <span>***</span></a>
						<ul class="nav" style="background-color:#13599d;">
							<template v-if="user_technology_manager_power">
							<li><a
								href="<%=basePath%>DNA/DNAManagement_DNAManagementPage"><span>***</span></a></li>
							</template>
							<template v-if="user_technology_manager_power">
							<li><a
								href="<%=basePath%>Equipment/EquipmentManagement_EquipmentManagementPage"><span>器材装备录入</span></a></li>

							</template>
						</ul></li>
					<li><a class=""><i class="lnr lnr-license"></i> <span>周豪俊</span></a>
						<ul class="nav" style="background-color:#13599d;">
							<li><a
								href="<%=basePath%>train/train_toTrainlist"><span>培训列表</span></a></li>
							<li><a
								href="<%=basePath%>trainrecord/trainrecord_toTrainrecordlist"><span>培训记录</span></a></li>
							<li><a
								href="<%=basePath%>paper/paper_toPaperlist"><span>证书列表</span></a></li>
						</ul>
					</li>
				</ul>
				</nav>
			</div>
		</div>
		</div>
		<!-- END LEFT SIDEBAR -->
		<div id="totalPanel" style="width:1000px; background-color: white; height: 600px; margin: 90px auto;">
			<span>fdsjakjfldsa</span>
		</div>	
	</div>
		<!-- END WRAPPER -->

		<!-- END LEFT SIDEBAR -->
			<!-- MAIN -->
		<div class="main">
			<!-- MAIN CONTENT -->
			<div class="main-content">
				<div class="container-fluid">
					<!-- OVERVIEW -->
					<div class="panel panel-headline" >
					
						<div class="panel-heading">
						
						</div>
						<div class="panel-body">

						</div>
					</div>
					<!-- END OVERVIEW -->
				</div>
		<!-- END MAIN CONTENT -->
	</div>
	<!-- END MAIN -->
	</div>	
	<s:action name="user_implements_navbar" namespace="/user"
		executeResult="true" />
	<div id="totalPanel"
		style="width: 1100px; background-color: white; height: 600px; margin: 90px auto;">

	</div>
</body>
<script type="text/javascript">
	$(function() {
		$('.slimScrollDiv')
				.attr("style",
						"position: relative; overflow: hidden; width: auto; height: 100%;");
	});
</script>
</html>