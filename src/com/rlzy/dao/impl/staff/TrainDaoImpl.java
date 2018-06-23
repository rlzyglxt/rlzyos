package com.rlzy.dao.impl.staff;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;

import com.rlzy.dao.staff.TrainDao;
import com.rlzy.domain.DO.rlzy_train;
import com.rlzy.domain.VO.showTrainVO;

public class TrainDaoImpl implements TrainDao{
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

	@Override
	public rlzy_train getTrainById(String rlzy_train_id) {
		// TODO Auto-generated method stub
		return (rlzy_train) getSession().get(rlzy_train.class, rlzy_train_id);
	}

	@Override
	public void deleteTrain(String rlzy_train_id) {
		// TODO Auto-generated method stub
		rlzy_train train = new rlzy_train();
		train.setRlzy_train_id(rlzy_train_id);
		getSession().delete(train);
	}

	@Override
	public void addTrain(rlzy_train train) {
		// TODO Auto-generated method stub
		getSession().save(train);
	}

	@Override
	public void updataTrain(rlzy_train train) {
		// TODO Auto-generated method stub
		getSession().update(train);
	}

	@Override
	public List<rlzy_train> getTrainByPage(showTrainVO trainVO) {
		// TODO Auto-generated method stub
		String hql = "from rlzy_train where 1=1";
		if(trainVO.getTrain_name() !=null && trainVO.getTrain_name().trim().length() > 0){
			hql = hql + " and train_name like '" + "%" + trainVO.getTrain_name() + "%" + "'";
		}
		Session session = this.getSession();
		List<rlzy_train> list = session.createQuery(hql).setFirstResult((trainVO.getCurrPage() - 1) * trainVO.getPageCount()).setMaxResults(trainVO.getPageCount()).list();
		return list;
	}

	@Override
	public int getTrainCount(showTrainVO trainVO) {
		// TODO Auto-generated method stub
		String hql="select count(*) from rlzy_train where 1=1";
		if(trainVO.getTrain_name() !=null && trainVO.getTrain_name().trim().length() > 0){
			hql = hql + " and train_name like '" + "%" + trainVO.getTrain_name() + "%" + "'";
		}
		long count = (long) getSession().createQuery(hql).uniqueResult();
		System.out.println(count);
		return (int) count;
	}

	@Override
	public boolean judgeTrainByTrainname(String train_name) {
		// TODO Auto-generated method stub
		String hql = "from rlzy_train where train_name='" + train_name + "'";
		Query query =getSession().createQuery(hql);
		List<rlzy_train> list=query.list();
		if(list.size() <= 0){
			return false;
		}else{
			return true;
		}
	}
}
