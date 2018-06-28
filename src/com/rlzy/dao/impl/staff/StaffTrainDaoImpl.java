package com.rlzy.dao.impl.staff;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;

import com.rlzy.dao.staff.StaffTrainDao;
import com.rlzy.domain.DO.rlzy_staffexp;
import com.rlzy.domain.DO.rlzy_staffinfo;
import com.rlzy.domain.DO.rlzy_stafftrain;
import com.rlzy.domain.DO.rlzy_train;
import com.rlzy.domain.DTO.Staff.staffTrainDTO;
import com.rlzy.domain.VO.showStaffTrainVO;

public class StaffTrainDaoImpl implements StaffTrainDao{
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
	public List<staffTrainDTO> getStaffTrainByPage(showStaffTrainVO staffTrainVO) {
		// TODO Auto-generated method stub
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
				+ " where staff.rlzy_staff_id=train.stafftrain_staff and 1=1";
//		if(staffTrainVO.getStaff_number() !=null && staffTrainVO.getStaff_number().trim().length() > 0){
//			hql = hql + " and staff.staff_number like '" + "%" + staffTrainVO.getStaff_number() + "%" + "'";
//		}
//		if(staffTrainVO.getStaff_name() !=null && staffTrainVO.getStaff_name().trim().length() > 0){
//			hql = hql + " and staff.staff_name like '" + "%" + staffTrainVO.getStaff_name() + "%" + "'";
//		}
		if(staffTrainVO.getTrain_name() !=null && staffTrainVO.getTrain_name().trim().length() > 0){
			hql = hql + " and train.stafftrain_train like '" + "%" + staffTrainVO.getTrain_name() + "%" + "'";
		}
		Session session = this.getSession();
		List<staffTrainDTO> list = session.createQuery(hql)
				.setFirstResult((staffTrainVO.getCurrPage() - 1) * staffTrainVO.getPageCount())
				.setMaxResults(staffTrainVO.getPageCount()).list();
		System.out.println(list);
		return list;
	}

	@Override
	public int getStaffTrainCount(showStaffTrainVO staffTrainVO) {
		// TODO Auto-generated method stub
		System.out.println("count");
		String hql="select count(*) from rlzy_stafftrain where 1=1";
	/*	if(staffTrainVO.getStaff_number() !=null && staffTrainVO.getStaff_number().trim().length() > 0){
			hql = hql + " and staff_number like '" + "%" + staffTrainVO.getStaff_number() + "%" + "'";
		}
		if(staffTrainVO.getStaff_name() !=null && staffTrainVO.getStaff_name().trim().length() > 0){
			hql = hql + " and staff_name like '" + "%" + staffTrainVO.getStaff_name() + "%" + "'";
		}*/
		if(staffTrainVO.getTrain_name() !=null && staffTrainVO.getTrain_name().trim().length() > 0){
			hql = hql + " and stafftrain_train like '" + "%" + staffTrainVO.getTrain_name() + "%" + "'";
		}
		long count = (long) getSession().createQuery(hql).uniqueResult();
		System.out.println("2sss"+count);
		return (int) count;
	}

	@Override
	public void addStaffTrain(List<rlzy_stafftrain> stafftrain) {
		// TODO Auto-generated method stub
		for (rlzy_stafftrain rlzy_stafftrain : stafftrain) {

			getSession().saveOrUpdate(rlzy_stafftrain);
		}
	}

	@Override
	public List<rlzy_stafftrain> getStaffTrains(String stafftrain_staff) {
		// TODO Auto-generated method stub
		String hql="from rlzy_stafftrain where stafftrain_staff = '" + stafftrain_staff + "'";
		return getSession().createQuery(hql).list();
	}

	@Override
	public rlzy_stafftrain getStaffTrainById(String rlzy_stafftrain_id) {
		// TODO Auto-generated method stub
		return (rlzy_stafftrain) getSession().get(rlzy_stafftrain.class, rlzy_stafftrain_id);
	}

	@Override
	public void deleteStaffTrain(String rlzy_stafftrain_id) {
		// TODO Auto-generated method stub
		rlzy_stafftrain stafftrain = new rlzy_stafftrain();
		stafftrain.setRlzy_stafftrain_id(rlzy_stafftrain_id);
		getSession().delete(stafftrain);
	}

	@Override
	public void deleteStaffTrains(String stafftrain_staff) {
		// TODO Auto-generated method stub
		String hql = "delete from rlzy_stafftrain where stafftrain_staff='" + stafftrain_staff + "'";
		getSession().createQuery(hql).executeUpdate();
	}

	@Override
	public void updataStaffTrain(rlzy_stafftrain rs) {
		// TODO Auto-generated method stub
		getSession().update(rs);
	}

//	@Override
//	public String getStaffNameByStaffNumber(String stafftrain_staff) {
//		// TODO Auto-generated method stub
//		 String hql = " select staff_name from rlzy_staffinfo where staff_number= '" + stafftrain_staff + "'";
//		 String staff_name = (String) getSession().createQuery(hql).uniqueResult();
//		 return staff_name;
//	}
	@Override
	public List<rlzy_staffinfo> getValueByNumber(String staff_number) {
		// TODO Auto-generated method stub
		String hql = "from rlzy_staffinfo where staff_number= '" + staff_number + "'";
		System.out.println(getSession().createQuery(hql).list());
		System.out.println("人员调动");
		return getSession().createQuery(hql).list();
	}

	@Override
	public List<rlzy_train> getTrainName() {
		// TODO Auto-generated method stub
		String hql="from rlzy_train";
		return getSession().createQuery(hql).list();
	}
}
