package com.rlzy.dao.impl.staff;

import java.util.List;

import org.apache.xmlbeans.impl.store.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;

import com.rlzy.dao.staff.StaffExpDao;
import com.rlzy.domain.DO.rlzy_staffexp;
import com.rlzy.domain.DTO.Staff.staffExpDTO;
import com.rlzy.domain.VO.showStaffExpVO;

public class StaffExpDaoImpl implements StaffExpDao {
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
	//得到员工个人的履历
	public List<rlzy_staffexp> getStaffExps(String staffExp_staff) {
		// TODO Auto-generated method stub
		//staffExp_staff是员工的id 外键
		String hql="from rlzy_staffexp where staffExp_staff = '" + staffExp_staff + "'";
		return getSession().createQuery(hql).list();
	}

	@Override
	//得到员工履历
	public rlzy_staffexp getStaffExpById(String rlzy_staffExp_id) {
		// TODO Auto-generated method stub
		return (rlzy_staffexp) getSession().get(rlzy_staffexp.class, rlzy_staffExp_id);
	}
	//删除一条员工履历
	@Override
	public void deleteStaffExp(String rlzy_staffExp_id) {
		// TODO Auto-generated method stub
		rlzy_staffexp staffexp = new rlzy_staffexp();
		staffexp.setRlzy_staffExp_id(rlzy_staffExp_id);
		getSession().delete(staffexp);
	}
	//删除该员工所有履历
	@Override
	public void deleteStaffExps(String staffExp_staff) {
		// TODO Auto-generated method stub
		String hql = "delete from rlzy_staffexp where staffExp_staff='" + staffExp_staff + "'";
		getSession().createQuery(hql).executeUpdate();
	}

	
	//保存员工履历
	@Override
	public void addStaffExps(List<rlzy_staffexp> staffExp) {
		for (rlzy_staffexp rlzy_staffexp : staffExp) {

			getSession().saveOrUpdate(rlzy_staffexp);
		}
		// TODO Auto-generated method stub
		
	}
	//修改员工履历
	@Override
	public void updataStaffExp(rlzy_staffexp staffExp) {
		// TODO Auto-generated method stub
		getSession().update(staffExp);
	}

	@Override
	public List<staffExpDTO> getStaffExpByPage(showStaffExpVO staffExpVO) {
		// TODO Auto-generated method stub
		String hql = "select new com.rlzy.domain.DTO.Staff.staffExpDTO(exp.rlzy_staffExp_id as rlzy_staffExp_id,"
				+ "staff.staff_number as staff_number,"
				+ "staff.staff_name as staff_name,"
				+ "exp.staffExp_address as staffExp_address,"
				+ "exp.staffExp_startTime as staffExp_startTime,"
				+ "exp.staffExp_overTime as staffExp_overTime,"
				+ "exp.staffExp_remark as staffExp_remark)"
				+ " from rlzy_staffinfo as staff,rlzy_staffexp as exp where staff.rlzy_staff_id=exp.staffExp_staff and 1=1 ";
//		if(staffExpVO.getStaffExp_staff() !=null && staffExpVO.getStaffExp_staff().trim().length() > 0){
//			hql = hql + " and staff_number like '" + "%" + staffExpVO.getStaffExp_staff() + "%" + "'";
//		}
		Session session = this.getSession();
		List<staffExpDTO> staffexp = session.createQuery(hql).setFirstResult((staffExpVO.getCurrPage() - 1) * staffExpVO.getPageCount()).setMaxResults(staffExpVO.getPageCount()).list();
		return staffexp;
	}

	@Override
	public int getStaffExpCount(showStaffExpVO staffExpVO) {
		// TODO Auto-generated method stub
		String hql="select count(*) from rlzy_staffexp where 1=1";
		if(staffExpVO.getStaffExp_staff() !=null && staffExpVO.getStaffExp_staff().trim().length() > 0){
			hql = hql + " and staffExp_staff like '" + "%" + staffExpVO.getStaffExp_staff() + "%" + "'";
		}
		long count = (long) getSession().createQuery(hql).uniqueResult();
		return (int) count;
	}
	@Override
	public String getStaffNameByStaffNumber(String staffExp_staff){
		 String hql = " select staff_name from rlzy_staffinfo where staff_number= '" + staffExp_staff + "'";
		 String staff_name = (String) getSession().createQuery(hql).uniqueResult();
		 return staff_name;
	 }

	@Override
	public void addStaffExp(rlzy_staffexp rs) {
		// TODO Auto-generated method stub
		getSession().save(rs);
	}
}
