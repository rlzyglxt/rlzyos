package com.rlzy.dao.impl.user;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;

import com.rlzy.domain.DO.rlzy_staffinfo;
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
	public rlzy_staffinfo getUserByUsername(String user_username) {
		// TODO Auto-generated method stub
		String hql = "from rlzy_staffinfo where staff_number = '" + user_username + "'";
		Query query = getSession().createQuery(hql);
		List<rlzy_staffinfo> list = query.list();
		return list.get(0);
	}
	// 判断用户是否存在
	public boolean judgeUserByUsername(String user_username) {
		// TODO Auto-generated method stub
		String hql = "from rlzy_staffinfo where staff_number='" + user_username + "'";
		Query query =getSession().createQuery(hql);
		List<rlzy_user> list=query.list();
		if(list.size() <= 0){
			return false;
		}else{
			return true;
		}

	}
	//byid查询用户
	public rlzy_staffinfo getUserById(String rlzy_staff_id) {
		// TODO Auto-generated method stub
		rlzy_staffinfo ru = (rlzy_staffinfo) getSession().get(rlzy_staffinfo.class, rlzy_staff_id);
		return ru;
	}
	
	//删除用户
	public void deleteUser(String user_id) {

		// TODO Auto-generated method stub
		String hql="delete from rlzy_staffinfo where rlzy_staff_id = '" + user_id + "'";
		Query query=getSession().createQuery(hql);
		query.executeUpdate();
	}
	// 修改密码
	public void updatePassword(String rlzy_user_id, String newPassword) {
		// TODO Auto-generated method stub
		String hql = "update rlzy_staffinfo set staff_password ='" + newPassword + "' where rlzy_staff_id = '" + rlzy_user_id
				+ "'";
		getSession().createQuery(hql).executeUpdate();
	}
	
	@Override
	public int getUserCount(String queryString, int currPage) {
		// TODO Auto-generated method stub
		String query = "%" + queryString + "%";
		String hql = "select count(*) from rlzy_staffinfo where (staff_number like '" + query + "' or staff_gmt_create like '" + query + "' or staff_name like '" + query + "')";
		System.out.println(hql);
		System.out.println("hqlcount");
		int count = ((Number) getSession().createQuery(hql).uniqueResult()).intValue();
		System.out.println(count);
		System.out.println("getusercount");
		return count;
	}

	@Override
	public List<rlzy_staffinfo> getUserByPage(String queryString, int currPage) {
		// TODO Auto-generated method stub
		String query = "%" + queryString + "%";
		String hql = "from rlzy_staffinfo where (staff_number like '" + query + "' or staff_name like '" + query + "'or staff_tel like '" + query + "') ";
		System.out.println(hql+"page");
		List<rlzy_staffinfo> list = getSession().createQuery(hql).setFirstResult((currPage - 1) * 10).setMaxResults(10).list();
		return list;
	}
	//添加用户
	@Override
	public void addUser(rlzy_staffinfo ru) {
		// TODO Auto-generated method stub
		getSession().save(ru);
	}
	//修改用户
	@Override
	public void updateUser(rlzy_staffinfo ru) {
		// TODO Auto-generated method stub
		getSession().update(ru);
	}
}
