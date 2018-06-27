package com.rlzy.action.user;

import java.io.IOException;
import java.io.PrintWriter;
import java.lang.reflect.InvocationTargetException;
import javax.servlet.http.HttpServletResponse;
import org.apache.struts2.ServletActionContext;
import com.google.gson.Gson;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
import com.rlzy.domain.DO.rlzy_staffinfo;
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
				HttpServletResponse response = ServletActionContext.getResponse();
				response.setContentType("text/html;charset=utf-8");
				PrintWriter pw = response.getWriter();
				if (!userService.judgeUserByUsername(user_username)) {
					pw.write("userNoExist");
				} else {
						rlzy_staffinfo user = userService.getUserByUsername(user_username);
						String password = md5.GetMD5Code(user_password);
//						String password=user_password;
						System.out.println(password.equals(user.getStaff_password()));
						if (user.getStaff_password().equals(password)) {
							pw.write("loginSuccess");
							ActionContext.getContext().getSession().put("rlzy_user_id", user.getRlzy_staff_id());
							ActionContext.getContext().getSession().put("user_name", user.getStaff_name());	
						} else {
							pw.write("PasswordError");
						}
					}
				pw.flush();
				pw.close();
				}
			public void judgePower() throws IOException, NoSuchMethodException, SecurityException, IllegalAccessException,
			IllegalArgumentException, InvocationTargetException {
						HttpServletResponse response = ServletActionContext.getResponse();
						response.setContentType("text/html;charset=utf-8");
						PrintWriter pw = response.getWriter();
						String user_id = (String) ActionContext.getContext().getSession().get("rlzy_user_id");
						if (user_id == null || user_id == "") {
						pw.write("exception");
						} else {
							rlzy_staffinfo rs = userService.getUserById(user_id);
							Gson gson = new Gson();
							String result = gson.toJson(rs);
							pw.write(result);
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
				rlzy_staffinfo ru=new rlzy_staffinfo();
//				ru.setRlzy_user_id(TeamUtil.getUuid());
//				ru.setUser_name(user_name);
//				ru.setUser_username(user_username);
//				ru.setUser_telephone(user_telephone);
//				ru.setUser_password(user_password);
//				ru.setUser_gmt_create(TeamUtil.getStringSecond());
//				ru.setUser_gmt_modified(TeamUtil.getStringSecond());
				/*md5.GetMD5Code(user_password)*/
				if(userService.judgeUserByUsername(user_username)){
					pw.write("用户名存在");
					System.out.println("用户名存在");
				}
				else{
					ru.setStaff_number(user_username);
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
				String rlzy_user_id = (String) ActionContext.getContext().getSession().get("rlzy_user_id");
				if (rlzy_user_id != null || rlzy_user_id != "") {
					rlzy_staffinfo ru = userService.getUserById(rlzy_user_id);
					if (ru.getStaff_password().equals(md5.GetMD5Code(oldPassword))) {
						System.out.println(rlzy_user_id);
						userService.updatePassword(rlzy_user_id, md5.GetMD5Code(newPassword));
						pw.write("updateSuccess");
					} else {
						pw.write("oldPasswordError");
					}
				} else {
					pw.write("updateFail");
				}
			}
			//通过用户ID查询用户
			public void getUserById() throws IOException {
				HttpServletResponse response = ServletActionContext.getResponse();
				response.setContentType("text/html;charset=utf-8");
				PrintWriter pw = response.getWriter();
				rlzy_staffinfo ru = userService.getUserById(user_id);
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
				rlzy_staffinfo ru=new rlzy_staffinfo();
				rlzy_staffinfo ruGet=userService.getUserById(user_id);
				ru.setStaff_number(user_username);//工号
				ru.setStaff_tel(user_telephone);//电话号码
				ru.setStaff_gmt_modified(TeamUtil.getStringSecond());
				ru.setStaff_userPower(staff_userPower);//使用权限
				ru.setStaff_adminPower(staff_adminPower);//管理权限
				ru.setStaff_staffPower(staff_staffPower);//查看权限
				ru.setStaff_name(user_name);
				ru.setRlzy_staff_id(ruGet.getRlzy_staff_id());
				ru.setStaff_address(ruGet.getStaff_address());
				ru.setStaff_birth(ruGet.getStaff_birth());
				ru.setStaff_sex(ruGet.getStaff_sex());
				ru.setStaff_inTime(ruGet.getStaff_inTime());
				ru.setStaff_age(ruGet.getStaff_age());
				ru.setStaff_cardid(ruGet.getStaff_cardid());
				ru.setStaff_depaterment(ruGet.getStaff_depaterment());
				ru.setStaff_record(ruGet.getStaff_record());
				ru.setStaff_gmt_create(ruGet.getStaff_gmt_create());
				ru.setStaff_leaveReason(ruGet.getStaff_leaveReason());
				ru.setStaff_leaveTime(ruGet.getStaff_leaveTime());
				ru.setStaff_status(ruGet.getStaff_status());
				ru.setStaff_duty(ruGet.getStaff_duty());
				
				System.out.println("身份证为"+ruGet.getStaff_cardid());
				if (user_password == "" || user_password.equals("")) {
					ru.setStaff_password(ruGet.getStaff_password());
				} else {
					ru.setStaff_password(md5.GetMD5Code(user_password));
				}
				userService.updateUser(ru);
			}
			
			
		// --------------------------以下为setter/getter方法

		private String queryString;
		private int currPage;
		private String user_id; //用户id
		private String user_name; //用户姓名
		private String user_username; //用户账号
		private String user_password; //用户密码
		private String user_telephone;
		private String oldPassword;
		private String newPassword;
		private String staff_userPower;
		private String staff_adminPower;
		private String staff_staffPower;

		
		public String getStaff_staffPower() {
			return staff_staffPower;
		}

		public void setStaff_staffPower(String staff_staffPower) {
			this.staff_staffPower = staff_staffPower;
		}

		public String getStaff_userPower() {
			return staff_userPower;
		}

		public void setStaff_userPower(String staff_userPower) {
			this.staff_userPower = staff_userPower;
		}

		public String getStaff_adminPower() {
			return staff_adminPower;
		}

		public void setStaff_adminPower(String staff_adminPower) {
			this.staff_adminPower = staff_adminPower;
		}

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
