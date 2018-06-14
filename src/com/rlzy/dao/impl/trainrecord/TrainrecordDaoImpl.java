package com.rlzy.dao.impl.trainrecord;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import com.rlzy.dao.trainrecord.TrainrecordDao;
import com.rlzy.domain.DO.rlzy_trainrecord;
import com.rlzy.domain.DTO.Staff.staffTrainDTO;
import com.rlzy.domain.VO.showTrainrecordVO;

public class TrainrecordDaoImpl implements TrainrecordDao {
	
	//保存多条信息
	public void addTrainrecord(List<rlzy_trainrecord> trainrecords) {
		getSession().saveOrUpdate(trainrecords);
	}
	//通过员工工号的到培训记录
	public List<rlzy_trainrecord> getTrainrecord(String staff_id) {
		String hql="from rlzy_trainrecord where staff_id = '" + staff_id + "'";
		return getSession().createQuery(hql).list();
	}
	//保存记录
	public void addTrainrecord(rlzy_trainrecord rs) {
		getSession().save(rs);
	}
	//员工工号级联删除
	public void deleteTrainrecords(String staff_id) {
		rlzy_trainrecord list = new rlzy_trainrecord();
		list.setStaff_id(staff_id);
		getSession().delete(list);
	}
	//删除
	public void deleteTrainrecord(String rlzy_record_id) {
		rlzy_trainrecord list = new rlzy_trainrecord();
		list.setRlzy_record_id(rlzy_record_id);
		getSession().delete(list);
	}
	//通过ID得到
	public rlzy_trainrecord getTrainrecordById(String rlzy_record_id) {
		return (rlzy_trainrecord) getSession().get(rlzy_trainrecord.class, rlzy_record_id);
	}
	//修改信息
	public void updataTrainrecord(rlzy_trainrecord trainrecord) {
		getSession().update(trainrecord);
	}
	//通过员工工号查员工姓名
	public String getStaffNameByStaffNumber(String staff_id) {
		 String hql = " select staff_name from rlzy_staffinfo where staff_id= '" + staff_id + "'";
		 String staff_name = (String) getSession().createQuery(hql).uniqueResult();
		 return staff_name;
	}
	//分页查询统计
	public int getTrainrecordCount(showTrainrecordVO trainrecordVO) {
		String hql="select count(*) from rlzy_trainrecord where 1=1";
		if(trainrecordVO.getStaff_id() !=null && trainrecordVO.getStaff_id().trim().length() > 0){
			hql = hql + " and staff_number like '" + "%" + trainrecordVO.getStaff_id() + "%" + "'";
		}
		long count = (long) getSession().createQuery(hql).uniqueResult();
		return (int) count;
	}
	
	//分页查询
	public List<staffTrainDTO> getTrainrecordByPage(showTrainrecordVO trainrecordVO) {
		String hql = "select new com.rlzy.domain.DTO.Staff.staffTrainDTO(rlzy_staffinfo.staff_number as staff_number,rlzy_train.train_name as train_name,"
				+ "rlzy_staffinfo.staff_name as staff_name"
				+ "rlzy_trainrecord.record_grade as record_grade,"
				+ "rlzy_trainrecord.paper_name as paper_name,"
				+ "rlzy_trainrecord.staffTrain_gmt_create as staffTrain_gmt_create,"
				+ "rlzy_trainrecord.staffTrain_gmt_modified as staffTrain_gmt_modified,"
				+ " from rlzy_staffinfo as staff,rlzy_trainrecord as trainrecord ,rlzy_train as train where staff.rlzy_staff_id=trainrecord.staff_id and train.rlzy_train_id=trainrecord.train_id and 1=1";
		Session session = this.getSession();
		List<staffTrainDTO> list = session.createQuery(hql)
				.setFirstResult((trainrecordVO.getCurrPage() - 1) * trainrecordVO.getPageCount())
				.setMaxResults(trainrecordVO.getPageCount()).list();
		return list;
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
