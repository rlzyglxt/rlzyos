package com.rlzy.action.user;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletResponse;
import org.apache.struts2.ServletActionContext;
import com.google.gson.Gson;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
import com.rlzy.domain.DO.rlzy_user;
import com.rlzy.domain.VO.showUserVO;
import com.rlzy.service.user.UserService;

import util.TeamUtil;
import util.md5;

public class UserAction extends ActionSupport{
	private UserService userService;
	
	public String implements_navbar() {
		return "navbar";
	}

	public String intoIndex() {
		return "intoIndex";
	}

	public String LeftIndex() {
		return "LeftIndex";
	}
	public String intoMain() {
		return "intoMain";
	}

	public String skipToUser() {
		return "skipToUser";
	}

	// --------------------------以上为页面引入
	// 登录
		public void login() throws IOException {
			System.out.println(user_password);
			HttpServletResponse response = ServletActionContext.getResponse();
			response.setContentType("text/html;charset=utf-8");
			PrintWriter pw = response.getWriter();
			System.out.println(user_password);
			if (!userService.judgeUserByUsername(user_username)) {
				pw.write("userNoExist");
			} else {
					rlzy_user user = userService.getUserByUsername(user_username);
//					String password = md5.GetMD5Code(user_password);
					String password=user_password;
					System.out.println(password.equals(user.getUser_password()));
					if (user.getUser_password().equals(password)) {
						pw.write("loginSuccess");
						ActionContext.getContext().getSession().put("rlzy_user_id", user.getRlzy_user_id());
						ActionContext.getContext().getSession().put("user_name", user.getUser_name());	
					} else {
						pw.write("PasswordError");
					}
				}
			}
			
			public String logout(){
				ActionContext.getContext().getSession().remove("rlzy_user_id");
				ActionContext.getContext().getSession().remove("user_name");
				return "logoutSuccess";
			}
		
			//删除用户
			public void deleteUser() throws IOException{
				System.out.println(user_id);
				HttpServletResponse response=ServletActionContext.getResponse();
				response.setContentType("text/html;charset=utf-8");
				PrintWriter pw=response.getWriter();
				userService.deleteUser(user_id);
				pw.write("删除成功");
				pw.flush();
				pw.close();
			}
			//添加用户
			public void addUser() throws IOException{
				System.out.println("1");
				HttpServletResponse response=ServletActionContext.getResponse();
				response.setContentType("text/html;charset=utf-8");
				PrintWriter pw=response.getWriter();
				rlzy_user ru=new rlzy_user();
				ru.setRlzy_user_id(TeamUtil.getUuid());
				ru.setUser_name(user_name);
				ru.setUser_username(user_username);
				ru.setUser_telephone(user_telephone);
				ru.setUser_password(user_password);
				ru.setUser_gmt_create(TeamUtil.getStringSecond());
				ru.setUser_gmt_modified(TeamUtil.getStringSecond());
				/*md5.GetMD5Code(user_password)*/
				if(userService.judgeUserByUsername(user_username)){
					pw.write("用户名存在");
					System.out.println("用户名存在");
				}
				else{
					ru.setUser_username(user_username);
					userService.addUser(ru);
					System.out.println("添加成功");
					pw.write("添加成功");
				}
				pw.flush();
				pw.close();
			}
			// 修改密码
			public void updatePassword() throws IOException {
				HttpServletResponse response = ServletActionContext.getResponse();
				response.setContentType("text/html；charset=utf-8");
				PrintWriter pw = response.getWriter();
				String rlzy_user_id = (String) ActionContext.getContext().getSession().get("user_id");
				if (rlzy_user_id != null || rlzy_user_id != "") {
					rlzy_user ru = userService.getUserById(rlzy_user_id);
					if (ru.getUser_password().equals(oldPassword)) {
						System.out.println(rlzy_user_id);
						userService.updatePassword(rlzy_user_id, newPassword);
						
						pw.write("updateSuccess");
					} else {
						pw.write("oldPasswordError");
					}
				} else {
					pw.write("updateFail");
				}
			}
			//
			public void getUserById() throws IOException {
				HttpServletResponse response = ServletActionContext.getResponse();
				response.setContentType("text/html;charset=utf-8");
				PrintWriter pw = response.getWriter();
				rlzy_user ru = userService.getUserById(user_id);
				Gson gson = new Gson();
				String result = gson.toJson(ru);
				pw.write(result);
				pw.flush();
				pw.close();
			}
			
			public void getUser() throws IOException{
				showUserVO suv = userService.getUserByPage(queryString, currPage);
				Gson gson = new Gson();
				System.out.println("queryString的值"+queryString);
				String result = gson.toJson(suv);
				HttpServletResponse response = ServletActionContext.getResponse();
				response.setContentType("text/html;charset=utf-8");
				PrintWriter pw = response.getWriter();
				pw.write(result);
				pw.flush();
				pw.close();
			}
			//修改用户
			public void updateUser() throws IOException{
				rlzy_user ru=new rlzy_user();
				rlzy_user ruGet=userService.getUserById(user_id);
				ru.setRlzy_user_id(user_id);
				ru.setUser_username(user_username);
				ru.setUser_telephone(user_telephone);
				ru.setUser_gmt_modified(TeamUtil.getStringSecond());
				ru.setUser_name(user_name);
				if (user_password == "" || user_password.equals("")) {
					ru.setUser_password(ruGet.getUser_password());
				} else {
					ru.setUser_password(md5.GetMD5Code(user_password));
				}
				userService.updateUser(ru);
			}
			
			
		// --------------------------以下为setter/getter方法

		private String queryString;
		private int currPage;
		private String user_id; //用户id
		private String user_name; //用户姓名
		private String user_username; //用户名
		private String user_password; //用户密码
		private String user_telephone;
		private String oldPassword;
		private String newPassword;


		public String getUser_telephone() {
			return user_telephone;
		}

		public void setUser_telephone(String user_telephone) {
			this.user_telephone = user_telephone;
		}

		public UserService getUserService() {
			return userService;
		}

		public void setUserService(UserService userService) {
			this.userService = userService;
		}

		public String getQueryString() {
			return queryString;
		}

		public void setQueryString(String queryString) {
			this.queryString = queryString;
		}

		public int getCurrPage() {
			return currPage;
		}

		public void setCurrPage(int currPage) {
			this.currPage = currPage;
		}

		public String getUser_id() {
			return user_id;
		}

		public void setUser_id(String user_id) {
			this.user_id = user_id;
		}

		public String getUser_name() {
			return user_name;
		}

		public void setUser_name(String user_name) {
			this.user_name = user_name;
		}

		public String getUser_username() {
			return user_username;
		}

		public void setUser_username(String user_username) {
			this.user_username = user_username;
		}

		public String getUser_password() {
			return user_password;
		}

		public void setUser_password(String user_password) {
			this.user_password = user_password;
		}

		public String getOldPassword() {
			return oldPassword;
		}

		public void setOldPassword(String oldPassword) {
			this.oldPassword = oldPassword;
		}

		public String getNewPassword() {
			return newPassword;
		}

		public void setNewPassword(String newPassword) {
			this.newPassword = newPassword;
		}


}
