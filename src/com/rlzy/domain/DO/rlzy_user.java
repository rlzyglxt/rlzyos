package com.rlzy.domain.DO;
//用户登陆表
public class rlzy_user {
	
	private String rlzy_user_id;//用户id
	private String user_name;//用户名
	private String user_username;//用户姓名
	private String user_password;//用户密码
	private String user_telephone;
	private String user_gmt_create;//用户创建时间
	private String user_gmt_modified;//用户修改时间
	
	
	
	public String getUser_telephone() {
		return user_telephone;
	}

	public void setUser_telephone(String user_telephone) {
		this.user_telephone = user_telephone;
	}

	public String getUser_gmt_create() {
		return user_gmt_create;
	}

	public void setUser_gmt_create(String user_gmt_create) {
		this.user_gmt_create = user_gmt_create;
	}

	public String getUser_gmt_modified() {
		return user_gmt_modified;
	}

	public void setUser_gmt_modified(String user_gmt_modified) {
		this.user_gmt_modified = user_gmt_modified;
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

	public String getRlzy_user_id() {
		return rlzy_user_id;
	}

	public void setRlzy_user_id(String rlzy_user_id) {
		this.rlzy_user_id = rlzy_user_id;
	}

	public String getUser_name() {
		return user_name;
	}

	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}
	
}
