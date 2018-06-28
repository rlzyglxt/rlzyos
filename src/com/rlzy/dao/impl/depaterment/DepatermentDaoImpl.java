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
			hql = hql + " and staffdepartment_name like '" + "%" + depatermentVO.getQueryString() + "%" + "'";
		}
		long count = (long) getSession().createQuery(hql).uniqueResult();
		return (int) count;
	}

	//分页得到部门表
	public List<rlzy_depaterment> getDepatermentByPage(showDepatermentVO depatermentVO) {
		String query = "%" + depatermentVO.getQueryString() + "%";
		String hql = "from rlzy_depaterment where (staffdepartment_name like '" + query + "') ";
		Session session = this.getSession();
		List<rlzy_depaterment> list = session.createQuery(hql)
				.setFirstResult((depatermentVO.getCurrPage() - 1) * depatermentVO.getPageCount())
				.setMaxResults(depatermentVO.getPageCount()).list();

		return list;
	}
	
	// 判断部门是否存在
	public boolean judgeDepatermentByDepatermentname(String staffdepartment_name) {
		String hql = "from rlzy_depaterment where staffdepartment_name='" + staffdepartment_name + "'";
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
		String hql="delete from rlzy_depaterment where rlzy_staffdepartment_id = '" + depaterment_id + "'";
		Query query=getSession().createQuery(hql);
		query.executeUpdate();
	}

	//通过部门ID得到部门
	public rlzy_depaterment getDepatermentById(String rlzy_staffdepartment_id) {
		rlzy_depaterment ru = (rlzy_depaterment) getSession().get(rlzy_depaterment.class, rlzy_staffdepartment_id);
		return ru;
	}

	//修改部门信息
	public void updateDepaterment(rlzy_depaterment ru) {
		getSession().saveOrUpdate(ru);
	}
	//得到所有部门
	@Override
	public List<rlzy_depaterment> getAllDepaterment() {
		// TODO Auto-generated method stub
		String hql = "from rlzy_depaterment where 1=1";
		return getSession().createQuery(hql).list();
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
