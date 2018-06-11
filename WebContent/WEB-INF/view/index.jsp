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
		<s:action name="user_implements_navbar" namespace="/user" executeResult="true" />
		
		<s:action name="user_LeftIndex" namespace="/user" executeResult="true" />
		<!-- END LEFT SIDEBAR -->
	 	<div id="totalPanel" style="width:1000px; background-color: white; height: 600px; margin: 90px auto;">
			<span>欢迎来到人事资源管理系统</span>
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
	<%-- <div id="totalPanel" style="width: 1100px; background-color: white; height: 600px; margin: 90px auto;">
	<span>fdsjakjfldsa</span>
	</div> --%>
</body>
<%-- <script type="text/javascript">
	$(function() {
		$('.slimScrollDiv')
				.attr("style",
						"position: relative; overflow: hidden; width: auto; height: 100%;");
	});
</script> --%>
</html>