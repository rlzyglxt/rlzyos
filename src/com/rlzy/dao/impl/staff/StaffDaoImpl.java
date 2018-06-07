package com.rlzy.dao.impl.staff;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;

import com.rlzy.dao.staff.StaffDao;
import com.rlzy.domain.DO.rlzy_staff;
import com.rlzy.domain.DTO.Staff.staffListDTO;
import com.rlzy.domain.VO.showStaffVO;


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
	public List<rlzy_staff> getAllStaff(String duty) {
		// TODO Auto-generated method stub
		String hql= "from rlzy_staff where 1=1";
		if(duty !=null && !"".equals(duty.trim())){
			hql= hql + "and staff_duty = '" + duty + "'";
		}
			Session session =getSession();
//			Query query = session.createQuery(hql);
//			List<rlzy_staff> list = query.list();
			return session.createQuery(hql).list();	
	}

	@Override
	public int getStaffCount(showStaffVO showstaffVO) {
		// TODO Auto-generated method stub
		String hql = "select count(*) from rlzy_staff where 1=1";
		if(showstaffVO.getStaff_name() !=null && showstaffVO.getStaff_name().trim().length() > 0){
			hql = hql + " and staff_name like '" + "%" + showstaffVO.getStaff_name() + "%" + "'";
		}
		if(showstaffVO.getStaff_sex() !=null && showstaffVO.getStaff_sex().trim().length() > 0){
			hql = hql + " and staff_number like '" + "%" + showstaffVO.getStaff_sex() + "%" + "'";
		}
		if(showstaffVO.getStaff_status() !=null && showstaffVO.getStaff_status().trim().length() > 0){
			hql = hql + " and staff_status like '" + "%" + showstaffVO.getStaff_status() + "%" + "'";
		}
		
		Session session=this.getSession();
		long count =(long) session.createQuery(hql).uniqueResult();
		System.out.println("getcount:"+count);
//		count = (long)
		System.out.println(count);
		return (int) count;
	}

	@Override
	public List<staffListDTO> getStaffByPage(showStaffVO showstaffVO) {
		// TODO Auto-generated method stub
		String hql = "select new com.rlzy.domain.DTO.Staff.staffListDTO(rlzy_staff_id as rlzy_staff_id,staff_name as staff_name,staff_birth as staff_birth,"
				+ "staff_status as staff_status,staff_tel as staff_tel,staff_sex as staff_sex,"
				+ "staff_record as staff_record,staff_address as staff_address,staff_depaterment as staff_depaterment) from rlzy_staff  where 1=1 ";
		if(showstaffVO.getStaff_name() !=null && showstaffVO.getStaff_name().trim().length() > 0){
			hql = hql + " and staff_name like '" + "%" + showstaffVO.getStaff_name() + "%" + "'";
		}
		if(showstaffVO.getStaff_sex() !=null && showstaffVO.getStaff_sex().trim().length() > 0){
			hql = hql + " and staff_number like '" + "%" + showstaffVO.getStaff_sex() + "%" + "'";
		}
		if(showstaffVO.getStaff_status() !=null && showstaffVO.getStaff_status().trim().length() > 0){
			hql = hql + " and staff_status like '" + "%" + showstaffVO.getStaff_status() + "%" + "'";
		}
		Session session = this.getSession();
		List<staffListDTO> staffs = session.createQuery(hql).setFirstResult((showstaffVO.getCurrPage() - 1) * showstaffVO.getPageCount()).setMaxResults(showstaffVO.getPageCount()).list();
		System.out.println("daoimplgetstaff");
		for (staffListDTO staffListDTO : staffs) {
			if (staffListDTO.getStaff_name() != null
					&& staffListDTO.getStaff_name().trim().length() > 0) {
				staffListDTO.setStaff_name(staffListDTO.getStaff_name().replaceAll(showstaffVO.getStaff_name(),
					"<span style='color:red;'>" + showstaffVO.getStaff_name() + "</span>"));
			}
		}
		return staffs;
	}

}
