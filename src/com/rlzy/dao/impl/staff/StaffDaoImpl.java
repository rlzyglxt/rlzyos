package com.rlzy.dao.impl.staff;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;

import com.rlzy.dao.staff.StaffDao;
import com.rlzy.domain.DO.rlzy_staffinfo;
import com.rlzy.domain.DTO.Staff.staffListDTO;
import com.rlzy.domain.VO.showStaffVO;

import util.TeamUtil;


public class StaffDaoImpl implements StaffDao {
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

	//得到所有员工
	@Override
	public List<rlzy_staffinfo> getAllStaff() {
		// TODO Auto-generated method stub
		String hql= "from rlzy_staffinfo where 1=1";
			Session session =getSession();
//			Query query = session.createQuery(hql);
//			List<rlzy_staff> list = query.list();
			return session.createQuery(hql).list();	
	}
	
	//得到员工数
	@Override
	public int getStaffCount(showStaffVO showstaffVO) {
		// TODO Auto-generated method stub
		String hql = "select count(*) from rlzy_staffinfo where 1=1";
		if(showstaffVO.getStaff_name() !=null && showstaffVO.getStaff_name().trim().length() > 0){
			hql = hql + " and staff_name like '" + "%" + showstaffVO.getStaff_name() + "%" + "'";
		}
		if(showstaffVO.getStaff_sex() !=null && showstaffVO.getStaff_sex().trim().length() > 0){
			hql = hql + " and staff_sex like '" + "%" + showstaffVO.getStaff_sex() + "%" + "'";
		}
		if(showstaffVO.getStaff_status() !=null && showstaffVO.getStaff_status().trim().length() > 0){
			hql = hql + " and staff_status like '" + "%" + showstaffVO.getStaff_status() + "%" + "'";
		}
		if(showstaffVO.getStaff_record() !=null && showstaffVO.getStaff_record().trim().length() > 0){
			hql = hql + " and staff_record like '" + "%" + showstaffVO.getStaff_record() + "%" + "'";
		}
		Session session=this.getSession();
		long count =(long) session.createQuery(hql).uniqueResult();
		return (int) count;
	}
	//得到员工通过page
	@Override
	public List<staffListDTO> getStaffByPage(showStaffVO showstaffVO) {
		// TODO Auto-generated method stub
		String hql = "select new com.rlzy.domain.DTO.Staff.staffListDTO(rlzy_staff_id as rlzy_staff_id,"
				+ "staff_number as staff_number,"
				+ "staff_name as staff_name,"
				+ "staff_birth as staff_birth,"
				+ "staff_cardid as staff_cardid,"
				+ "staff_age as staff_age,"
				+ "staff_duty as staff_duty,"
				+ "staff_status as staff_status,"
				+ "staff_tel as staff_tel,"
				+ "staff_sex as staff_sex,"
				+ "staff_record as staff_record,"
				+ "staff_address as staff_address,"
				+ "staff_depaterment as staff_depaterment,"
				+ "staff_inTime as staff_inTime,"
				+ "staff_leaveTime as staff_leaveTime,"
				+ "staff_leaveReason as staff_leaveReason) from rlzy_staffinfo  where 1=1 ";
		//姓名查询
		if(showstaffVO.getStaff_name() !=null && showstaffVO.getStaff_name().trim().length() > 0){
			hql = hql + " and staff_name like '" + "%" + showstaffVO.getStaff_name() + "%" + "'";
		}
		//性别筛选
		if(showstaffVO.getStaff_sex() !=null && showstaffVO.getStaff_sex().trim().length() > 0){
			hql = hql + " and staff_sex like '" + "%" + showstaffVO.getStaff_sex() + "%" + "'";
		}
		//状态筛选
		if(showstaffVO.getStaff_status() !=null && showstaffVO.getStaff_status().trim().length() > 0){
			hql = hql + " and staff_status like '" + "%" + showstaffVO.getStaff_status() + "%" + "'";
		}
		if(showstaffVO.getStaff_record() !=null && showstaffVO.getStaff_record().trim().length() > 0){
			hql = hql + " and staff_record like '" + "%" + showstaffVO.getStaff_record() + "%" + "'";
		}
		hql = hql + "order by staff_InTime " + showstaffVO.getStaff_inTime();
		Session session = this.getSession();
		List<staffListDTO> staffs = session.createQuery(hql).setFirstResult((showstaffVO.getCurrPage() - 1) * showstaffVO.getPageCount()).setMaxResults(showstaffVO.getPageCount()).list();
//		for (staffListDTO staffListDTO : staffs) {
//			if (staffListDTO.getStaff_name() != null
//					&& staffListDTO.getStaff_name().trim().length() > 0) {
//				staffListDTO.setStaff_name(staffListDTO.getStaff_name().replaceAll(showstaffVO.getStaff_name(),
//					"<span style='color:red;'>" + showstaffVO.getStaff_name() + "</span>"));
//			}
//		}
		return staffs;
	}
	
	//修改员工
	@Override
	public void updataStaff(rlzy_staffinfo staff) {
		// TODO Auto-generated method stub
		getSession().saveOrUpdate(staff);
	}
	
	//添加员工
	@Override
	public void addStaff(rlzy_staffinfo staff) {
		// TODO Auto-generated method stub
		getSession().save(staff);
	}
	
	//通过id得到员工
	@Override
	public rlzy_staffinfo getStaffById(String rlzy_staff_id) {
		// TODO Auto-generated method stub
		Session session = getSession();
		return (rlzy_staffinfo) session.get(rlzy_staffinfo.class,rlzy_staff_id);
	}

	//删除员工
	@Override
	public void deleteStaff(rlzy_staffinfo staff) {
		// TODO Auto-generated method stub
		Session session = getSession();
		session.delete(staff);
	}

}