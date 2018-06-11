package com.rlzy.action.staff;

import com.opensymphony.xwork2.ActionSupport;
import com.rlzy.service.staff.StaffAgreementService;

public class StaffAgreementAction extends ActionSupport{
	private StaffAgreementService staffAgreementService;

	public StaffAgreementService getStaffAgreementService() {
		return staffAgreementService;
	}

	public void setStaffAgreementService(StaffAgreementService staffAgreementService) {
		this.staffAgreementService = staffAgreementService;
	}
	
}
