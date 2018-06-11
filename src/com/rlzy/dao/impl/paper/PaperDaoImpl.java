package com.rlzy.dao.impl.paper;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import com.rlzy.dao.paper.PaperDao;
import com.rlzy.domain.DO.rlzy_paper;


public class PaperDaoImpl implements PaperDao {
	
	//分页
	public int getPaperCount(String queryString, int currPage) {
		String query = "%" + queryString + "%";
		String hql = "select count(*) from rlzy_paper where (paper_name like '" + query + "')";
		System.out.println(hql);
		System.out.println("hqlcount");
		int count = ((Number) getSession().createQuery(hql).uniqueResult()).intValue();
		System.out.println(count);
		System.out.println("getTraincount");
		return count;
	}

	//分页得到表
	public List<rlzy_paper> getPaperByPage(String queryString, int currPage) {
		String query = "%" + queryString + "%";
		String hql = "from rlzy_paper where (paper_name like '" + query + "') ";
		System.out.println(hql+"page");
		List<rlzy_paper> list = getSession().createQuery(hql).setFirstResult((currPage - 1) * 10).setMaxResults(10).list();
		return list;
	}

	//添加
	public void addPaper(rlzy_paper ru) {
		getSession().save(ru);
	}

	//删除
	public void deletePaper(String paper_id) {
		String hql="delete from rlzy_paper where rlzy_paper_id = '" + paper_id + "'";
		Query query=getSession().createQuery(hql);
		query.executeUpdate();
	}

	//通过ID得到
	public rlzy_paper getPaperById(String rlzy_paper_id) {
		rlzy_paper ru = (rlzy_paper) getSession().get(rlzy_paper.class, rlzy_paper_id);
		return ru;
	}

	//修改信息
	public void updatePaper(rlzy_paper ru) {
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
