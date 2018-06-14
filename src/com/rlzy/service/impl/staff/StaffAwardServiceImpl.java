package com.rlzy.service.impl.staff;

import com.rlzy.dao.staff.StaffAwardDao;
import com.rlzy.service.staff.StaffAwardService;

public class StaffAwardServiceImpl implements StaffAwardService {
	private StaffAwardDao staffAwardDao;

	public StaffAwardDao getStaffAwardDao() {
		return staffAwardDao;
	}

	public void setStaffAwardDao(StaffAwardDao staffAwardDao) {
		this.staffAwardDao = staffAwardDao;
	}
	
}
