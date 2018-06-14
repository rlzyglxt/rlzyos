package com.rlzy.dao.impl.train;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import com.rlzy.dao.train.TrainDao;
import com.rlzy.domain.DO.rlzy_train;
import com.rlzy.domain.DTO.Staff.staffTrainDTO;
import com.rlzy.domain.VO.showTrainVO;


public class TrainDaoImpl implements TrainDao {
	
	//分页
	public int getTrainCount(showTrainVO trainVO) {
		String hql="select count(*) from rlzy_train where 1=1";
		if(trainVO.getQueryString() !=null && trainVO.getQueryString().trim().length() > 0){
			hql = hql + " and train_name like '" + "%" + trainVO.getQueryString() + "%" + "'";
		}
		long count = (long) getSession().createQuery(hql).uniqueResult();
		return (int) count;
	}

	//分页得到培训表
	public List<rlzy_train> getTrainByPage(showTrainVO trainVO) {
		String query = "%" + trainVO.getQueryString() + "%";
		String hql = "from rlzy_train where (train_name like '" + query + "') ";
		Session session = this.getSession();
		List<rlzy_train> list = session.createQuery(hql)
				.setFirstResult((trainVO.getCurrPage() - 1) * trainVO.getCount())
				.setMaxResults(trainVO.getCount()).list();
		return list;
	}
	
	// 判断培训名是否存在
	public boolean judgeTrainByTrainname(String train_name) {
		String hql = "from rlzy_train where train_name='" + train_name + "'";
		System.out.println("judge1");
		Query query =getSession().createQuery(hql);
		System.out.println("judge2");
		List<rlzy_train> list=query.list();
		System.out.println("judge3");
		if(list.size() <= 0){
			return false;
		}else{
			return true;
		}
	}

	//添加培训
	public void addTrain(rlzy_train ru) {
		getSession().save(ru);
	}

	//删除培训
	public void deleteTrain(String train_id) {
		String hql="delete from rlzy_train where rlzy_train_id = '" + train_id + "'";
		Query query=getSession().createQuery(hql);
		query.executeUpdate();
	}

	//通过培训ID得到培训
	public rlzy_train getTrainById(String rlzy_train_id) {
		rlzy_train ru = (rlzy_train) getSession().get(rlzy_train.class, rlzy_train_id);
		return ru;
	}

	//修改部门信息
	public void updateTrain(rlzy_train ru) {
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
