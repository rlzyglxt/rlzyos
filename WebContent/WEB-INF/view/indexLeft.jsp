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
</head>
<body>
	<div>
	<div class="slimScrollDiv" id="slimScrollDiv" position: relative; overflow: hidden; width: auto;">
		<!-- LEFT SIDEBAR #13599d-->
		<div id="sidebar-nav" class="sidebar"
			style="width: 240px; height: 100% !important; background-color:captiontext;">
			<div class="sidebar-scroll" style="height: 100% !important;">
				<nav>
				<ul class="nav">
					<li><a class=""><i class="lnr lnr-file-add"></i> <span>人员档案</span></a>
						<ul class="nav" style="background-color: #13599d;">
							<li><a href="<%=basePath%>staff/staff_page_StaffInfo"><span>人员基本信息</span></a></li>
							<li><a href="<%=basePath%>staff/staff_page_StaffExp"><span>员工履历</span></a></li>
							<li><a href="<%=basePath%>staff/BreakeCase_page_BreakCaseList"><span>员工合同</span></a></li>
							</template>
						</ul>
					</li>
					<li><a class=""><i class="lnr lnr-users"></i> <span></span></a>
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
					</ul>
				</nav>
			</div>
		</div>
		</div>
		</div>
</body>
<script type="text/javascript">
	$(function() {
		$('.slimScrollDiv')
				.attr("style",
						"position: relative; overflow: hidden; width: auto;");
	});
</script>
</html>