package com.rlzy.dao.impl.staff;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import com.rlzy.service.staff.StaffAwardService;

public class StaffAwardDaoImpl implements StaffAwardService {
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
