package com.rlzy.dao.impl.train;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;

import com.rlzy.dao.train.TrainDao;
import com.rlzy.domain.DO.rlzy_depaterment;
import com.rlzy.domain.DO.rlzy_train;
import com.rlzy.domain.VO.showTrainVO;

public class TrainDaoImpl implements TrainDao {
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

	//得到
	public rlzy_train getTrainById(String rlzy_train_id) {
		return (rlzy_train) getSession().get(rlzy_train.class, rlzy_train_id);
	}
	//删除
	public void deleteTrain(String rlzy_train_id) {
		rlzy_train train = new rlzy_train();
		train.setRlzy_train_id(rlzy_train_id);
		getSession().delete(train);
	}


	
	//保存
	public void addTrain(rlzy_train train) {
			getSession().save(train);
	}
	
	//修改
	public void updataTrain(rlzy_train train) {
		getSession().update(train);
	}


	public List<rlzy_train> getTrainByPage(showTrainVO trainVO) {
		String hql = "from rlzy_train where 1=1";
		if(trainVO.getTrain_name() !=null && trainVO.getTrain_name().trim().length() > 0){
			hql = hql + " and train_name like '" + "%" + trainVO.getTrain_name() + "%" + "'";
		}
		Session session = this.getSession();
		List<rlzy_train> list = session.createQuery(hql).setFirstResult((trainVO.getCurrPage() - 1) * trainVO.getPageCount()).setMaxResults(trainVO.getPageCount()).list();
		return list;
	}

	public int getTrainCount(showTrainVO trainVO) {
		String hql="select count(*) from rlzy_train where 1=1";
		if(trainVO.getTrain_name() !=null && trainVO.getTrain_name().trim().length() > 0){
			hql = hql + " and train_name like '" + "%" + trainVO.getTrain_name() + "%" + "'";
		}
		long count = (long) getSession().createQuery(hql).uniqueResult();
		/*System.out.println(count);*/
		return (int) count;
	}

	
	public boolean judgeTrainByTrainname(String train_name) {
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
