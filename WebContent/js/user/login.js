var xmlHttp;
//加载动画
window.onload=function() {
	 $(function(){
		    var div1=$('.login-left');
		    div1.animate({height:'400px',opacity:'1'},"slow");
		    var div2=$('.login-right');
		    div2.animate({opacity:'0.5'},"slow");
		  });
}
//回车事件
document.onkeydown = keyLogin;
function keyLogin(event) {
	if (event.keyCode == 13) {
		login();
	}
}
//登录
function login() {
	getXmlHttp();

	var user_username = document.getElementById("login_username").value;
	var user_password = document.getElementById("login_password").value;
	alert(user_username);
	alert(user_password);
	xmlHttp.open("POST","/rlzyos/user/user_login",true);
	var formData = new FormData();
	formData.append("user_username", user_username);
	formData.append("user_password", user_password);
	console.log(formData);
	xmlHttp.send(formData);
	
	xmlHttp.onreadystatechange = function() {
		if (isBack()) {
			var result = xmlHttp.responseText;
			console.log(result);
			alert(result)
			switch (result) {
			case "userNoExist":
				toastr.warning("用户名不存在！");
				break;
			case "passwordError":
				toastr.error("密码错误！若忘记密码请联系管理员更改");
				break;
			case "loginSuccess":

				window.location = "/rlzyos/user/user_intoIndex";

			}
		}
	}
}
function getXmlHttp() {
	if (window.XMLHttpRequest) {
		// IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
		xmlHttp=new XMLHttpRequest();
	} else {
		// IE6, IE5 浏览器执行代码
		xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
}
function isBack() {
	if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
		return true;
	} else {
		return false;
	}
}
