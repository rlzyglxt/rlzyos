package com.rlzy.dao.impl.staff;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;

import com.rlzy.dao.staff.StaffAwardDao;
import com.rlzy.domain.DO.rlzy_staffaward;
import com.rlzy.domain.DTO.Staff.staffAwardDTO;
import com.rlzy.domain.VO.showAwardVO;

public class StaffAwardDaoImpl implements StaffAwardDao{
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
	public void addStaffAward(List<rlzy_staffaward> staffawards) {
		// TODO Auto-generated method stub
		for (rlzy_staffaward rlzy_staffaward : staffawards) {
			getSession().saveOrUpdate(rlzy_staffaward);
		}
	}

	@Override
	public void deleteStaffAward(String rlzy_staffAward_id) {
		// TODO Auto-generated method stub
		rlzy_staffaward rs = new rlzy_staffaward();
		rs.setRlzy_staffAward_id(rlzy_staffAward_id);
		getSession().delete(rs);
	}

	@Override
	public void deleteStaffAwards(String award_staff) {
		// TODO Auto-generated method stub
		String hql = "delete from rlzy_staffaward where award_staff= '" + award_staff + "'";
		getSession().createQuery(hql).executeUpdate();
	}

	@Override
	public void updataStaffAward(rlzy_staffaward staffaward) {
		// TODO Auto-generated method stub
		getSession().saveOrUpdate(staffaward);
	}

	@Override
	public List<rlzy_staffaward> getStaffAwardByStaffId(String award_staff) {
		// TODO Auto-generated method stub
		String hql = "from rlzy_staffaward where award_staff= '" + award_staff + "'";
		return getSession().createQuery(hql).list();
	}

	@Override
	public rlzy_staffaward getStaffAwardById(String rlzy_staffAward_id) {
		// TODO Auto-generated method stub
		return (rlzy_staffaward) this.getSession().get(rlzy_staffaward.class, rlzy_staffAward_id);
	}

	@Override
	public List<staffAwardDTO> getStaffAwardByPage(showAwardVO showawardVO) {
		// TODO Auto-generated method stub
		String hql = "select new com.rlzy.domain.DTO.Staff.staffAwardDTO(award.rlzy_staffAward_id as rlzy_staffAward_id,"
				+ "staff.staff_number as staff_number,"
				+ "staff.staff_name as staff_name,"
				+ "staff.staff_duty as staff_duty,"
				+ "award.award_amount as award_amount,"
				+ "award.award_provideTime as award_provideTime,"
				+ "award.award_provideReason as award_provideReason,"
				+ "award.award_provideDepartment as award_provideDepartment,"
				+ "award.award_gmt_create as award_gmt_create,"
				+ "award.award_gmt_modified as award_gmt_modified)"
				+ " from rlzy_staffinfo as staff,rlzy_staffaward as award where award.award_staff=staff.rlzy_staff_id and 1=1";

		Session session = this.getSession();
		List<staffAwardDTO> staffawardList = session.createQuery(hql)
				.setFirstResult((showawardVO.getCurrPage() - 1) * showawardVO.getPageCount())
				.setMaxResults(showawardVO.getPageCount()).list();
		return staffawardList;
	}

	@Override
	public int getStaffAwardCount(showAwardVO showawardVO) {
		// TODO Auto-generated method stub
		String hql = "select count(*) from rlzy_staffaward where 1=1";
		long count = (long) getSession().createQuery(hql).uniqueResult();
		return (int) count;
	}

}
