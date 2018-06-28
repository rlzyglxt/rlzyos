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

//过滤一些敏感字符函数
function filterSqlStr(value){
	
	var sqlStr=sql_str().split(',');
	var flag=false;
	for(var i=0;i<sqlStr.length;i++){
		
		if(value.toLowerCase().indexOf(sqlStr[i])!=-1){
			flag=true;
			break;			
		}
	}
	return flag;
}

function sql_str(){
	var str="and,delete,or,exec,insert,select,union,update,count,*,',join,>,<";
	return str;

}
//登录
function login() {
	
	var user_username = document.getElementById("login_username").value;
	var user_password = document.getElementById("login_password").value;
	//过滤一些敏感字符函数
	re= /select|update|delete|exec|count|'|"|=|;|>|<|%/i;
	var str="and,delete,or,exec,insert,select,union,update,count,*,',join,>,<";
	if ( filterSqlStr(user_username) || filterSqlStr(user_password)){
		toastr.error("用户名或密码字符中包含了敏感字符"+sql_str()+",请重新输入！");
		return false;
	}else{
		getXmlHttp();
	
	xmlHttp.open("POST","/rlzyos/user/user_login",true);
	var formData = new FormData();
	formData.append("user_username", user_username);
	formData.append("user_password", user_password);
	xmlHttp.send(formData);
	xmlHttp.onreadystatechange = function() {
		if (isBack()) {
			var result = xmlHttp.responseText;
			/*alert(result);*/
			console.log(result);
//			switch (result) {
//			case "userNoExist":
//				toastr.warning("用户名不存在！");
//				break;
//			case "PasswordError":
//				toastr.error("密码错误！若忘记密码请联系管理员更改");
//				break;
//			case "loginSuccess":
			
				/*toastr.success("登陆成功！");
				window.location = "/rlzyos/user/user_intoIndex";
*/
			if(result=="userNoExist"){
				toastr.warning("用户名不存在！");
			}else if(result=="PasswordError"){
				toastr.error("密码错误！若忘记密码请联系管理员更改");
			}else if(result=="loginSuccess"){
				//得到数据
				getXmlHttp();
				xmlHttp.open("POST", "/rlzyos/staff/staff_getStaffData", true);
				xmlHttp.send();
				xmlHttp.onreadystatechange = function() {
					if (isBack()) {
						console.log("得到数据");
						alert("xixi");
						}
					}
				toastr.success("登陆成功！");
				window.location = "/rlzyos/user/user_intoIndex";
				
			
			}
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
