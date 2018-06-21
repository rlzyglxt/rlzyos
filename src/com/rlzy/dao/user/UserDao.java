package com.rlzy.dao.user;

import java.util.List;

import com.rlzy.domain.DO.rlzy_staffinfo;
import com.rlzy.domain.DO.rlzy_user;

public interface UserDao {
	//判断用户是否存在
		public boolean judgeUserByUsername(String user_username);
		//by用户名得到用户
		public rlzy_staffinfo getUserByUsername(String user_username);
		//添加用户
		public void addUser(rlzy_staffinfo ru);
		//修改用户信息
		public void updateUser(rlzy_staffinfo ru);
		//删除用户信息
		public void deleteUser(String rlzy_staff_id);
		// 得到用户id
		public rlzy_staffinfo getUserById(String rlzy_staff_id);
		// 修改密码
		public void updatePassword(String rlzy_staff_id, String newPassword);

		int getUserCount(String queryString, int currPage);

		List<rlzy_staffinfo> getUserByPage(String queryString, int currPage);
}
