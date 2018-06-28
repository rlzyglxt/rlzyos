package com.rlzy.dao.impl.staff;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;

import com.rlzy.dao.staff.StaffMoveDao;
import com.rlzy.domain.DO.rlzy_staffexp;
import com.rlzy.domain.DO.rlzy_staffinfo;
import com.rlzy.domain.DO.rlzy_staffmove;
import com.rlzy.domain.DTO.Staff.staffMoveDTO;
import com.rlzy.domain.VO.showStaffMoveVO;

public class StaffMoveDaoImpl implements StaffMoveDao {
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
	//保存调动记录
	@Override
	public void addStaffMove(List<rlzy_staffmove> staffmove) {
		// TODO Auto-generated method stub
		for (rlzy_staffmove rlzy_staffmove : staffmove) {
			getSession().save(rlzy_staffmove);
			
		}
	}
	
	@Override
	public List<rlzy_staffinfo> getValueByNumber(String staff_number) {
		// TODO Auto-generated method stub
		String hql = "from rlzy_staffinfo where staff_number= '" + staff_number + "'";
		System.out.println(getSession().createQuery(hql).list());
		return getSession().createQuery(hql).list();
	}
	//得到总数
	@Override
	public int getStaffMoveCount(showStaffMoveVO staffMoveVO) {
		// TODO Auto-generated method stub
		String hql = "select count(*) from rlzy_staffmove,rlzy_staffinfo where 1=1";
		if(staffMoveVO.getStaff_name() !=null && staffMoveVO.getStaff_name().trim().length() > 0){
			hql = hql + " and staff_name like '" + "%" + staffMoveVO.getStaff_name() + "%" + "'";
		}
			if(staffMoveVO.getStaff_number() !=null && staffMoveVO.getStaff_number().trim().length() > 0){
			hql = hql + " and staff_number like '" + "%" + staffMoveVO.getStaff_number() + "%" + "'";
		}
		Session session=this.getSession();
		long count =(long) session.createQuery(hql).uniqueResult();
		System.out.println("count"+(int) count);
		return (int) count;
	}
	@Override
	public List<staffMoveDTO> getStaffMoveByPage(showStaffMoveVO staffMoveVO) {
		// TODO Auto-generated method stub
		String hql = "select new com.rlzy.domain.DTO.Staff.staffMoveDTO(move.rlzy_staffMove_id as rlzy_staffMove_id,"
				+ "staff.staff_number as staff_number,"
				+ "staff.staff_name as staff_name,"
				+ "move.staffMove_time as staffMove_time,"
				+ "move.staffMove_nowdepartment as staffMove_nowdepartment,"
				+ "move.staffMove_bfdepartment as staffMove_bfdepartment,"
				+ "move.staffMove_bfduty as staffMove_bfduty,"
				+ "move.staffMove_nowduty as staffMove_nowduty,"
				+ "move.staffMove_remark as staffMove_remark) from rlzy_staffinfo as staff,rlzy_staffmove as move where staff.rlzy_staff_id=move.staffMove_staff and 1=1 ";
		if(staffMoveVO.getStaff_name() !=null && staffMoveVO.getStaff_name().trim().length() > 0){
			hql = hql + " and staff_name like '" + "%" + staffMoveVO.getStaff_name() + "%" + "'";
		}
		if(staffMoveVO.getStaff_number() !=null && staffMoveVO.getStaff_number().trim().length() > 0){
			hql = hql + " and staff_number like '" + "%" + staffMoveVO.getStaff_number() + "%" + "'";
		}
		hql = hql + "order by staffMove_time " + staffMoveVO.getStaffMove_time();
		List<staffMoveDTO> staffMoves = getSession().createQuery(hql).setFirstResult((staffMoveVO.getCurrPage() - 1) * staffMoveVO.getPageCount()).setMaxResults(staffMoveVO.getPageCount()).list();
//		for (staffMoveDTO staffMoveDTO : staffMoves) {
//			if (staffMoveDTO.getStaff_name() != null
//					&& staffMoveDTO.getStaff_name().trim().length() > 0) {
//				staffMoveDTO.setStaff_name(staffMoveDTO.getStaff_name().replaceAll(staffMoveVO.getStaff_name(),
//					"<span style='color:red;'>" + staffMoveVO.getStaff_name() + "</span>"));
//			}
//		}
		return staffMoves;
	}
	

	@Override
	public void updataStaff(rlzy_staffinfo rs) {
		// TODO Auto-generated method stub
//		String hql = "update rlzy_staffinfo set rlzy_staffinfo.staff_depaterment=rlzy_staffmove.staffMove_nowdepartment,rlzy_staffinfo.staff_duty=rlzy_staffmove.staffMove_nowduty from rlzy_staffmove,rlzy_staffinfo where rlzy_staffinfo.rlzy_staff_id=rlzy_staffmove.staffMove_staff";
//		getSession().createQuery(hql);
		getSession().update(rs);
	}

	@Override
	public void deleteStaffMoves(String staffMove_staff) {
		// TODO Auto-generated method stub
		String hql = "delete from rlzy_staffmove where staffMove_staff='" + staffMove_staff + "'";
		getSession().createQuery(hql).executeUpdate();
	}

	@Override
	public void deleteStaffMove(String rlzy_staffMove_id) {
		// TODO Auto-generated method stub
//		rlzy_staffmove staffmove = new rlzy_staffmove();
//		staffmove.setStaffMove_staff(rlzy_staffMove_id);
//		System.out.println("hhhhh"+staffmove);
//		getSession().delete(staffmove);
//		String hql = "delete from rlzy_staffmove where rlzy_staffMove_id='" +rlzy_staffMove_id+ "'";
//		getSession().createQuery(hql).executeUpdate();
		rlzy_staffmove staffmove = new rlzy_staffmove();
		staffmove.setRlzy_staffMove_id(rlzy_staffMove_id);
		getSession().delete(staffmove);
	}

	@Override
	public rlzy_staffmove getStaffMoveById(String rlzy_staffMove_id) {
		// TODO Auto-generated method stub
		return (rlzy_staffmove) getSession().get(rlzy_staffmove.class, rlzy_staffMove_id);
	}

	@Override
	public List<rlzy_staffmove> getStaffMoveByStaffId(String staffMove_staff) {
		String hql="from rlzy_staffmove where staffMove_staff = '" + staffMove_staff + "'";
		return getSession().createQuery(hql).list();
	}

	@Override
	public void updataStaffMove(rlzy_staffmove staffmove) {
		// TODO Auto-generated method stub
		getSession().saveOrUpdate(staffmove);
	}
}