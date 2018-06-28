<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="/struts-tags" prefix="s"%>

<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path+ "/";

%>
 

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">

<title>登录页面</title>
<link rel="stylesheet" href="http://cdn.static.runoob.com/libs/bootstrap/3.3.7/css/bootstrap.min.css">
<link rel="stylesheet" href="<%=basePath%>css/login.css">
<script src="http://cdn.static.runoob.com/libs/jquery/2.1.1/jquery.min.js"></script>
<script src="http://cdn.static.runoob.com/libs/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script type="text/javascript" src="<%=basePath%>js/user/login.js"></script>

</head>
<body>
	<div class="bg center-block">
	<br>	
	<h2 class="text-center" style="color: white;"></h2>

<title>用户登录界面</title>
<!--------------------------------------------------------------------------------->
<script type="text/javascript" src="<%=basePath%>js/jquery-3.1.1.min.js"></script>
<script type="text/javascript" src="<%=basePath%>js/bootstrap.min.js"></script>
<script type="text/javascript" src="<%=basePath%>js/user/login.js"></script>
<link rel="stylesheet" href="<%=basePath%>css/toastr.css" />
<!--------------------------------------------------------------------------------->

<!-------------------------------------------z-------------------------------------->

<script src="<%=basePath%>js/toastr.js"></script>
<!--------------------------------------------------------------------------------->
</head>
<body>
<div class="contain center-block">
	<!-- 导航 -->
	<nav id="navbar" class="navbar navbar-default navbar-fixed-top" 
	 style=" background-color: #C4C4C4;">
		<div style="width: auto; float: left; line-height: 70px; margin: 0 0 0 30px; font-size: 28px; color: white;">
			欢迎登陆
			</div>
	</nav>
	<div class="bg_center">
	<!-- 左DIV -->
<!-- 	<div class="left">
		<div class="login-left center-block">
		<h1 style="color: #13599d; font-size: 50px;">用户登录</h1> -->
		<h1 style="color: #13599d; font-size: 30px; text-align:center">人力资源管理系统</h1>

	<!-- 输入组 -->
		<div class="login-input-area ">
			<div class="input-group input-group-lg" >
			  	<span class="input-group-addon" id="basic-addon1" style="color: #13599d;"><span class=" glyphicon glyphicon-user "></span> 账户：</span>
			 	<input style="width:300px" id="login_username" type="text" class="form-control"  placeholder="请输入用户名">
			</div>
	<br>
			<div class="input-group input-group-lg">
				<span class="input-group-addon" id="basic-addon2" style="color: #13599d;"><span class="glyphicon glyphicon-lock"></span> 密码：</span>
				<input style="width:300px" id="login_password" type="password" class="form-control" placeholder="请输入密码">
			</div>
		</div>
	<br>
	<!-- 按钮组 -->
	 	<div class="login-button" style="left: -10px">
	 		<button style="margin: 10px;" class="btn btn-default btn-lg btn-info" onclick="login()">确认登录</button>
	 		<button style="margin: 10px;" class="btn btn-default btn-lg btn-info" onclick=$('#login_username,#login_password').val(''),toastr.info("已重置");>重置信息</button>
	 	</div>
   </div>
	    </div>		
	</div>
	
	<!-- 右DIV -->
<!-- 	<div class="right"> -->
<!-- 		<div class="login-right center-block">	 -->
<!-- 			<div class="picture"></div> -->
<!-- 		</div> -->
<!-- 	</div> -->
</div>
   </div>
</body>
</html>