package com.rlzy.dao.impl.depaterment;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;

import com.rlzy.dao.depaterment.DepatermentDao;
import com.rlzy.domain.DO.rlzy_depaterment;
import com.rlzy.domain.VO.showDepatermentVO;


public class DepatermentDaoImpl implements DepatermentDao {
	
	//分页
	public int getDepatermentCount(showDepatermentVO depatermentVO) {
		String hql="select count(*) from rlzy_depaterment where 1=1";
		if(depatermentVO.getQueryString() !=null && depatermentVO.getQueryString().trim().length() > 0){
			hql = hql + " and depaterment_name like '" + "%" + depatermentVO.getQueryString() + "%" + "'";
		}
		long count = (long) getSession().createQuery(hql).uniqueResult();
		return (int) count;
	}

	//分页得到部门表
	public List<rlzy_depaterment> getDepatermentByPage(showDepatermentVO depatermentVO) {
		String query = "%" + depatermentVO.getQueryString() + "%";
		String hql = "from rlzy_depaterment where (depaterment_name like '" + query + "') ";
		Session session = this.getSession();
		List<rlzy_depaterment> list = session.createQuery(hql)
				.setFirstResult((depatermentVO.getCurrPage() - 1) * depatermentVO.getCount())
				.setMaxResults(depatermentVO.getCount()).list();

		return list;
	}
	
	// 判断用户是否存在
	public boolean judgeDepatermentByDepatermentname(String depaterment_name) {
		String hql = "from rlzy_depaterment where depaterment_name='" + depaterment_name + "'";
		Query query =getSession().createQuery(hql);
		List<rlzy_depaterment> list=query.list();
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
