package com.rlzy.dao.impl.staff;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;

import com.rlzy.dao.staff.StaffMoveDao;
import com.rlzy.domain.DO.rlzy_staffinfo;
import com.rlzy.domain.DO.rlzy_staffmove;

public class StaffMoveDaoImpl implements StaffMoveDao{
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
	public void addStaffMove(rlzy_staffmove staffmove) {
		// TODO Auto-generated method stub
		getSession().save(staffmove);
	}

	@Override
	public rlzy_staffinfo getValueByNumber(String staff_number) {
		// TODO Auto-generated method stub
		String hql = "from rlzy_staffinfo where staff_number= '" + staff_number + "'";
		Query rs = getSession().createQuery(hql);
		System.out.println("调动");
		return (rlzy_staffinfo) rs;
	}

}
