package com.rlzy.service.impl.staff;

import com.rlzy.dao.staff.StaffDao;
import com.rlzy.service.staff.StaffService;

public class StaffServiceImpl implements StaffService {
	private StaffDao staffDao;

	public StaffDao getStaffDao() {
		return staffDao;
	}

	public void setStaffDao(StaffDao staffDao) {
		this.staffDao = staffDao;
	}
	
}		
