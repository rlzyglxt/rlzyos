package com.rlzy.dao.user;

import java.util.List;

import com.rlzy.domain.DO.rlzy_user;

public interface UserDao {
	//判断用户是否存在
		public boolean judgeUserByUsername(String user_username);
		//by用户名得到用户
		public rlzy_user getUserByUsername(String user_username);
		//添加用户
		public void addUser(rlzy_user ru);
		//修改用户信息
		public void updateUser(rlzy_user ru);
		//删除用户信息
		public void deleteUser(String rlzy_user_id);
		// 得到用户id
		public rlzy_user getUserById(String rlzy_user_id);
		// 修改密码
		public void updatePassword(String rlzy_user_id, String newPassword);

		int getUserCount(String queryString, int currPage);

		List<rlzy_user> getUserByPage(String queryString, int currPage);
}
