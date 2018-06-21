package com.rlzy.service.impl.user;

import java.util.List;

import com.rlzy.dao.user.UserDao;
import com.rlzy.domain.DO.rlzy_staffinfo;
import com.rlzy.domain.VO.showUserVO;
import com.rlzy.service.user.UserService;

public class UserServiceImpl implements UserService{
	private UserDao userDao;

	public UserDao getUserDao() {
		return userDao;
	}

	public void setUserDao(UserDao userDao) {
		this.userDao = userDao;
	}

	// 得到用户id
	public rlzy_staffinfo getUserById(String rlzy_staff_id) {
		// TODO Auto-generated method stub
		rlzy_staffinfo ru = userDao.getUserById(rlzy_staff_id);
		return ru;
	}

	// 得到用户名
	public rlzy_staffinfo getUserByUsername(String user_username) {
		// TODO Auto-generated method stub
		return userDao.getUserByUsername(user_username);
	}

	
	//判断用户是否存在
	public boolean judgeUserByUsername(String user_username) {
		return userDao.judgeUserByUsername(user_username);
	}
	

	// 添加用户
	public void addUser(rlzy_staffinfo ru) {
		// TODO Auto-generated method stub
		ru.setStaff_password(ru.getStaff_password());
		userDao.addUser(ru);
	}
	
	//修改用户信息
	public void updateUser(rlzy_staffinfo ru) {
		userDao.updateUser(ru);
	}

	// 删除用户
	public void deleteUser(String rlzy_user_id) {
		// TODO Auto-generated method stub
		userDao.deleteUser(rlzy_user_id);
	}
	
	public void updatePassword(String rlzy_user_id, String newPassword) {
		// TODO Auto-generated method stub
		userDao.updatePassword(rlzy_user_id, newPassword);

	}

	@Override
	public showUserVO getUserByPage(String queryString, int currPage) {
		// TODO Auto-generated method stub
		showUserVO suv = new showUserVO();
		System.out.println("跳转到userserviceimpl");
		suv.setCurrPage(currPage);
		suv.setQueryString(queryString);
		suv.setPageSize(10);
		int count = userDao.getUserCount(queryString, currPage);
		suv.setCount(count);
		System.out.println("userservice,"+count);
		double c = count;
		int totalPage = (int) Math.ceil(c / 10);
		suv.setTotalPage(totalPage);
		List<rlzy_staffinfo> list = userDao.getUserByPage(queryString, currPage);
		suv.setList(list);
		System.out.println(suv);
		return suv;
	}
}
