package com.rlzy.dao.impl.staff;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;

import com.rlzy.dao.staff.StaffAwardDao;
import com.rlzy.domain.DO.rlzy_staffaward;

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

}
