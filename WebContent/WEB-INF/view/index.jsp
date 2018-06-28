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
<script type="text/javascript"  src="<%=basePath%>js/Clock.js"></script>
<title>首页</title>
<link rel="stylesheet" type="text/css" href="<%=basePath%>css/simple-calendar.css">
<script type="text/javascript" src="<%=basePath%>js/simple-calendar.js"></script>
<script type="text/javascript" src="<%=basePath%>js/Clock.js"></script>

<!-- 时间 -->

<script type="text/javascript">
    var clock = new Clock();
    clock.display(document.getElementById("clock"));
	</script>
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
		<div class="main">
			<!-- MAIN CONTENT -->
			<div class="main-content">
				<div class="container-fluid">
				
							
					<!-- OVERVIEW -->
					<div class="panel panel-headline" >
					
						<div class="panel-heading">

							<h2 class="panel-title">欢迎 <%=request.getSession().getAttribute("user_name")%> 进入人力资源管理系统
								<i id="clock"></i>
								<script>
								   var clock = new Clock();
								   clock.display(document.getElementById("clock"));
								</script>
							</h2>

						</div>
						<%-- <!-- 日历 -->
						<div id='container' style="float:left;margin-top:21px" ></div>
									 <script>
									 		var myCalendar = new SimpleCalendar('#container');
									</script> --%>
						<div class="panel-body">
							<div style="height: 300px; width: 450px; margin: 20px;">
								<%-- <div style="border: 1px solid #BFBFBF; box-shadow: 0px 0px 10px 5px #aaa; width: 700px; height: 280px; margin-right: 10px;">
									<img alt="" src="<%=basePath%>img/img2.jpg">
								</div> --%>
							<span></span>
							<ul class="nav nav-pills nav-stacked">
									<li role="presentation" class="active"><a href="#">人员概况</a></li>
									
								 	<li role="presentation">
								 	<a href="#">当前有员工:<%=request.getSession().getAttribute("staffcount")%>  位</a></li>
  									<li role="presentation">
  									<a href="#">在职员工有:<%=request.getSession().getAttribute("staffcount1")%> 位</a></li>
  									<li role="presentation">
  									<a href="#">离职员工有:<%=request.getSession().getAttribute("staffcount2")%> 位</a></li>
							</ul>
							
							<br>
							<ul class="nav nav-pills">	
									<li role="presentation" class="active "><a href="#">快捷入口</a></li>
									<li role="presentation"><a href="#">个人信息</a></li>
									<li role="presentation"><a href="#">人员信息管理</a></li>
									<li role="presentation"><a href="#">培训类别管理</a></li>
									<li role="presentation"><a href="#">奖金管理</a></li>
							</ul>
				</div>
								
									
																			
								
						
							</div>	
						</div>
					</div>
					<!-- END OVERVIEW -->
				</div>
		<!-- END MAIN CONTENT -->
	</div>
	<!-- END MAIN -->
</div>
</div>
</body>
<script type="text/javascript">
    var clock = new Clock();
    clock.display(document.getElementById("clock"));
	</script>
 <script type="text/javascript">
	$(function() {
		$('.slimScrollDiv')
				.attr("style",
						"position: relative; overflow: hidden; width: auto; height: 100%;");
	});
</script> 

</html>