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
<title>用户</title>
</head>
<body>
	<!-- 引入导航条 -->
	<s:action name="user_implements_navbar" namespace="/user"
		executeResult="true" />
	<!-- 内容div  -->
	<div id="totalPanel"
		style="width: 1100px; background-color: white; height: 600px; margin: 90px auto;">

	</div>
</body>
</html>