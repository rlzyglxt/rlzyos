package com.rlzy.service.impl.staff;

import java.util.List;

import com.rlzy.dao.staff.StaffMoveDao;
import com.rlzy.domain.DO.rlzy_staffinfo;
import com.rlzy.domain.DO.rlzy_staffmove;
import com.rlzy.service.staff.StaffMoveService;

public class StaffMoveServiceImpl implements StaffMoveService{
	private StaffMoveDao staffMoveDao;

	public StaffMoveDao getStaffMoveDao() {
		return staffMoveDao;
	}

	public void setStaffMoveDao(StaffMoveDao staffMoveDao) {
		this.staffMoveDao = staffMoveDao;
	}

	@Override
	public void addStaffMove(rlzy_staffmove staffMove) {
		// TODO Auto-generated method stub
		staffMoveDao.addStaffMove(staffMove);
	}

	@Override
	public rlzy_staffinfo getValueByNumber(String staff_number) {
		// TODO Auto-generated method stub
		return staffMoveDao.getValueByNumber(staff_number);
	}
	
}
