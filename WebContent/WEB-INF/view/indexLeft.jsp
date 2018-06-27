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
			style="width: 228px; height: 100% !important; background-color:#9E9E9E;">
			<div class="sidebar-scroll" style="height: 100% !important;">
				<nav>
				<ul class="nav">
				<template v-if="user_staff_manager_power">
					<li><a class=""><i class="lnr lnr-file-add"></i> <span>个人信息</span></a>
						<ul class="nav" style="background-color: #9E9E9E;">
						
							<li><a href="<%=basePath%>staff/staff_page_staffDetails?rlzy_staff_id=<%=request.getSession().getAttribute("rlzy_user_id")%>"><span>个人基本信息</span></a></li>
						
						</ul>
					</li> <!-- #5CACEE -->
					</template>
					<template v-if="user_user_manager_power">
					<li><a class=""><i class="lnr lnr-file-add"></i> <span>人员档案</span></a>
						<ul class="nav" style="background-color: #9E9E9E;">
							<li><a href="<%=basePath%>staff/staff_page_StaffInfo"><span>人员基本信息</span></a></li>
							<li><a href="<%=basePath%>staff/staff_page_StaffExp"><span>员工履历</span></a></li>
							<li><a href="<%=basePath%>staff/staff_page_StaffAward"><span>奖金发放</span></a></li>
							<li><a href="<%=basePath%>staff/staff_page_StaffAgreement"><span>员工合同</span></a></li>
							
						</ul>
					</li>
					</template>
					<template v-if="user_user_manager_power">
					<li><a class=""><i class="lnr lnr-users"></i> <span>人事调动</span></a>
					<ul class="nav" style="background-color:#9E9E9E;">
						<li><a
							href="<%=basePath%>staff/staff_page_StaffMove"><span>员工调配</span></a></li>
						<li><a
							href="<%=basePath%>staff/staff_page_StaffNewIn"><span>新进员工栏</span></a></li>
						<li><a href="<%=basePath%>staff/staff_page_StaffLeave"><span>离退员工栏</span></a></li>
						
					</ul></li>
					</template>
			
					
				
					<template v-if="user_user_manager_power">
					<li><a class=""><i class="lnr lnr-license"></i> <span>教育培训</span></a>
					<ul class="nav" style="background-color:#9E9E9E;">
						<li><a
							href="<%=basePath%>train/train_page_toTrainList"><span>教育培训类别</span></a></li>
						<li><a
							href="<%=basePath%>staff/staff_page_StaffTrain"><span>教育培训记录</span></a></li>
						<%-- <li><a
							href="<%=basePath%>paper/paper_page_toPaperlist"><span>证书记录</span></a></li> --%>
					</ul></li>
					</template>
					</ul>
				</nav>
			</div>
		</div>
		</div>
		</div>
	<script type="text/javascript">
	var sliderVue = new Vue({
		el : '#sidebar-nav',
		data : userPowerDTO
	});
	</script>
	<script type="text/javascript">
	$(function() {
		$('.slimScrollDiv')
				.attr("style",
						"position: relative; overflow: hidden; width: auto;");
	});
</script>
</body>
</html>