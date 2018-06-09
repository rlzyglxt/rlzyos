package com.rlzy.dao.impl.depaterment;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;

import com.rlzy.dao.depaterment.DepatermentDao;
import com.rlzy.domain.DO.rlzy_depaterment;
import com.rlzy.domain.DO.rlzy_user;


public class DepatermentDaoImpl implements DepatermentDao {
	
	//分页
	public int getDepatermentCount(String queryString, int currPage) {
		String query = "%" + queryString + "%";
		String hql = "select count(*) from rlzy_depaterment where (depaterment_name like '" + query + "')";
		System.out.println(hql);
		System.out.println("hqlcount");
		int count = ((Number) getSession().createQuery(hql).uniqueResult()).intValue();
		System.out.println(count);
		System.out.println("getusercount");
		return count;
	}

	//分页得到部门表
	public List<rlzy_depaterment> getDepatermentByPage(String queryString, int currPage) {
		String query = "%" + queryString + "%";
		String hql = "from rlzy_depaterment where (depaterment_name like '" + query + "') ";
		System.out.println(hql+"page");
		List<rlzy_depaterment> list = getSession().createQuery(hql).setFirstResult((currPage - 1) * 10).setMaxResults(10).list();
		return list;
	}
	
	// 判断用户是否存在
	public boolean judgeDepatermentByDepatermentname(String depaterment_name) {
		String hql = "from rlzy_depaterment where depaterment_name='" + depaterment_name + "'";
		System.out.println("judge1");
		Query query =getSession().createQuery(hql);
		System.out.println("judge2");
		List<rlzy_depaterment> list=query.list();
		System.out.println("judge3");
		if(list.size() <= 0){
			return false;
		}else{
			return true;
		}
	}

	//添加部门
	public void addDepaterment(rlzy_depaterment ru) {
		getSession().save(ru);
	}

	//删除部门
	public void deleteDepaterment(String depaterment_id) {
		String hql="delete from rlzy_depaterment where rlzy_depaterment_id = '" + depaterment_id + "'";
		Query query=getSession().createQuery(hql);
		query.executeUpdate();
	}

	//通过部门ID得到部门
	public rlzy_depaterment getDepatermentById(String rlzy_depaterment_id) {
		rlzy_depaterment ru = (rlzy_depaterment) getSession().get(rlzy_depaterment.class, rlzy_depaterment_id);
		return ru;
	}

	//修改部门信息
	public void updateDepaterment(rlzy_depaterment ru) {
		getSession().saveOrUpdate(ru);
	}



	//-----------------------------------分割线------------------------------------------------>
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

	
}
