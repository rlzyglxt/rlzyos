package com.rlzy.dao.impl.trainrecord;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import com.rlzy.dao.trainrecord.TrainrecordDao;
import com.rlzy.domain.DO.rlzy_stafftrain;

public class TrainrecordDaoImpl implements TrainrecordDao {
	
	//分页
	public int getTrainrecordCount(String queryString, int currPage) {
		String query = "%" + queryString + "%";
		String hql = "select count(*) from rlzy_trainrecord where (rlzy_record_id like '" + query + "')";
		System.out.println(hql);
		System.out.println("hqlcount");
		int count = ((Number) getSession().createQuery(hql).uniqueResult()).intValue();
		System.out.println(count);
		System.out.println("getTrainrecordcount");
		return count;
	}

	//分页得到培训表
	public List<rlzy_stafftrain> getTrainrecordByPage(String queryString, int currPage) {
		String query = "%" + queryString + "%";
		String hql = "from rlzy_trainrecord where (rlzy_record_id like '" + query + "') ";
		System.out.println(hql+"page");
		List<rlzy_stafftrain> list = getSession().createQuery(hql).setFirstResult((currPage - 1) * 10).setMaxResults(10).list();
		return list;
	}
	
	//添加培训
	public void addTrainrecord(rlzy_stafftrain ru) {
		getSession().save(ru);
	}

	//删除培训
	public void deleteTrainrecord(String record_id) {
		String hql="delete from rlzy_trainrecord where rlzy_record_id = '" + record_id + "'";
		Query query=getSession().createQuery(hql);
		query.executeUpdate();
	}

	//通过培训ID得到培训
	public rlzy_stafftrain getTrainrecordById(String rlzy_record_id) {
		rlzy_stafftrain ru = (rlzy_stafftrain) getSession().get(rlzy_stafftrain.class, rlzy_record_id);
		return ru;
	}

	//修改部门信息
	public void updateTrainrecord(rlzy_stafftrain ru) {
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
