package com.rlzy.service.impl.staff;

import com.rlzy.dao.staff.StaffAgreementDao;
import com.rlzy.service.staff.StaffAgreementService;

public class StaffAgreementServiceImpl implements StaffAgreementService {
	private StaffAgreementDao staffAgreementDao;

	public StaffAgreementDao getStaffAgreementDao() {
		return staffAgreementDao;
	}

	public void setStaffAgreementDao(StaffAgreementDao staffAgreementDao) {
		this.staffAgreementDao = staffAgreementDao;
	}
	
}
