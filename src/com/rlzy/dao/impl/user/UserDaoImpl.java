package com.rlzy.dao.impl.user;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import com.rlzy.domain.DO.rlzy_user;
import com.rlzy.dao.user.UserDao;

public class UserDaoImpl implements UserDao{
	
	private SessionFactory sessionFactory;

	public Session getSession() {
		return sessionFactory.getCurrentSession();
	}

	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}

	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}
	//得到用户名
	public rlzy_user getUserByUsername(String user_username) {
		// TODO Auto-generated method stub
		String hql = "from rlzy_user where user_username = '" + user_username + "'";
		Query query = getSession().createQuery(hql);
		List<rlzy_user> list = query.list();
		return list.get(0);
	}

	// 判断用户是否存在
	public boolean judgeUserByUsername(String user_username) {
		// TODO Auto-generated method stub
		String hql = "from rlzy_user where user_username='" + user_username + "'";
		System.out.println("judge1");
		Query query =getSession().createQuery(hql);
		System.out.println("judge2");
		List<rlzy_user> list=query.list();
		System.out.println("judge3");
		if(list.size() <= 0){
			return false;
		}else{
			return true;
		}

	}
	//byid查询用户
	public rlzy_user getUserById(String rlzy_user_id) {
		// TODO Auto-generated method stub
		rlzy_user ru = (rlzy_user) getSession().get(rlzy_user.class, rlzy_user_id);
		return ru;
	}
	
	//添加用户
	public void addUser(rlzy_user ru) {
		// TODO Auto-generated method stub
		getSession().save(ru);
	}
	
	//更新用户
	public void updateUser(rlzy_user ru) {
		// TODO Auto-generated method stub
		getSession().update(ru);
	}
	//删除用户
	public void deleteUser(String user_id) {

		// TODO Auto-generated method stub
		String hql="delete from rlzy_user where rlzy_user_id = '" + user_id + "'";
		Query query=getSession().createQuery(hql);
		query.executeUpdate();
	}
	// 修改密码
	public void updatePassword(String rlzy_user_id, String newPassword) {
		// TODO Auto-generated method stub
		String hql = "update rlzy_user set user_password ='" + newPassword + "' where rlzy_user_id = '" + rlzy_user_id
				+ "'";
		getSession().createQuery(hql).executeUpdate();
	}
	
	@Override
	public int getUserCount(String queryString, int currPage) {
		// TODO Auto-generated method stub
		String query = "%" + queryString + "%";
		String hql = "select count(*) from rlzy_user where (user_username like '" + query + "' or user_gmt_create like '" + query + "' or user_name like '" + query + "')";
		System.out.println(hql);
		System.out.println("hqlcount");
		int count = ((Number) getSession().createQuery(hql).uniqueResult()).intValue();
		System.out.println(count);
		System.out.println("getusercount");
		return count;
	}

	@Override
	public List<rlzy_user> getUserByPage(String queryString, int currPage) {
		// TODO Auto-generated method stub
		String query = "%" + queryString + "%";
		String hql = "from rlzy_user where (user_name like '" + query + "' or user_username like '" + query + "'or user_telephone like '" + query + "') ";
		System.out.println(hql+"page");
		List<rlzy_user> list = getSession().createQuery(hql).setFirstResult((currPage - 1) * 10).setMaxResults(10).list();
		return list;
	}
}
