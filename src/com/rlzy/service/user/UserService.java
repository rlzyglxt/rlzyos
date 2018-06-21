package com.rlzy.service.user;

import com.rlzy.domain.DO.rlzy_staffinfo;
import com.rlzy.domain.VO.showUserVO;

public interface UserService {
	//判断用户是否存在
	public boolean judgeUserByUsername(String user_username);
	//by用户名得到用户
	public rlzy_staffinfo getUserByUsername(String user_username);
	//by用户id得到用户
	public rlzy_staffinfo getUserById(String user_id);
	//添加用户
	public void addUser(rlzy_staffinfo ru);
	//修改用户信息
	public void updateUser(rlzy_staffinfo ru);
	//删除用户信息
	public void deleteUser(String rlzy_staff_id);
	//修改密码
	public void updatePassword(String rlzy_staff_id, String newPassword);

	public showUserVO getUserByPage(String queryString, int currPage);
}
