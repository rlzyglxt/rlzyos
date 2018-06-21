package com.rlzy.dao.impl.train;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;

import com.rlzy.dao.train.StaffTrainDao;
import com.rlzy.domain.DO.rlzy_stafftrain;
import com.rlzy.domain.DO.rlzy_train;
import com.rlzy.domain.DTO.Staff.staffTrainDTO;
import com.rlzy.domain.VO.showStaffTrainVO;

public class StaffTrainDaoImpl implements StaffTrainDao {
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

	//根据员工工号得到该员工所有信息
	@SuppressWarnings("all")
	public List<rlzy_stafftrain> getStaffTrains(String stafftrain_staff) {
		String hql="from rlzy_stafftrain where stafftrain_staff = '" + stafftrain_staff + "'";
		return getSession().createQuery(hql).list();
	}

	//根据ID得到一条信息
	public rlzy_stafftrain getStaffTrainById(String rlzy_stafftrain_id) {
		return (rlzy_stafftrain) getSession().get(rlzy_stafftrain.class, rlzy_stafftrain_id);
	}
	
	//删除一条信息
	public void deleteStaffTrain(String rlzy_stafftrain_id) {
		rlzy_stafftrain stafftrain = new rlzy_stafftrain();
		stafftrain.setRlzy_stafftrain_id(rlzy_stafftrain_id);
		getSession().delete(stafftrain);
	}
	
	//删除所有信息
	public void deleteStaffTrains(String stafftrain_staff) {
		String hql = "delete from rlzy_stafftrain where stafftrain_staff='" + stafftrain_staff + "'";
		getSession().createQuery(hql).executeUpdate();
	}

	
	//修改
	public void updataStaffTrain(rlzy_stafftrain rs) {
		getSession().update(rs);
	}

	//分页查询
	@SuppressWarnings("all")
	public List<staffTrainDTO> getStaffTrainByPage(showStaffTrainVO staffTrainVO) {
		System.out.println("3");
		String hql = "select new com.rlzy.domain.DTO.Staff.staffTrainDTO(train.rlzy_stafftrain_id as rlzy_stafftrain_id,"
				+ "staff.staff_number as staff_number,"
				+ "staff.staff_name as staff_name,"
				+ "train.stafftrain_score as record_grade,"
				+ "train.stafftrain_train as train_name,"
				+ "train.stafftrain_certificate as paper_name,"
				+ "train.stafftrain_gmt_create as staffTrain_gmt_create,"
				+ "train.stafftrain_gmt_modified as staffTrain_gmt_modified)"
				+ " from rlzy_staffinfo as staff,rlzy_stafftrain as train"
				+ " where staff.staff_number=train.stafftrain_staff and 1=1";
		if(staffTrainVO.getStaffTrain_staff() !=null && staffTrainVO.getStaffTrain_staff().trim().length() > 0){
			hql = hql + " and train.stafftrain_staff like '" + "%" + staffTrainVO.getStaffTrain_staff() + "%" + "'";
		}
		Session session = this.getSession();
		List<staffTrainDTO> list = session.createQuery(hql)
				.setFirstResult((staffTrainVO.getCurrPage() - 1) * staffTrainVO.getPageCount())
				.setMaxResults(staffTrainVO.getPageCount()).list();
		System.out.println(list);
		return list;
	}

	//分页总计
	public int getStaffTrainCount(showStaffTrainVO staffTrainVO) {
		String hql="select count(*) from rlzy_stafftrain where 1=1";
		if(staffTrainVO.getStaffTrain_staff() !=null && staffTrainVO.getStaffTrain_staff().trim().length() > 0){
			hql = hql + " and stafftrain_staff like '" + "%" + staffTrainVO.getStaffTrain_staff() + "%" + "'";
		}
		long count = (long) getSession().createQuery(hql).uniqueResult();
		System.out.println("2");
		return (int) count;
	}

	//通过员工工号查询姓名
	public String getStaffNameByStaffNumber(String stafftrain_staff){
		 String hql = " select staff_name from rlzy_staffinfo where staff_number= '" + stafftrain_staff + "'";
		 String staff_name = (String) getSession().createQuery(hql).uniqueResult();
		 return staff_name;
	 }

    //保存一条信息
	public void addStaffTrain(rlzy_stafftrain rs) {
		getSession().save(rs);
	}

	@SuppressWarnings("all")
	public List<rlzy_train> getTrainName() {
		String hql="from rlzy_train";
		return getSession().createQuery(hql).list();
	}


}
