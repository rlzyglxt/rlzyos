package com.rlzy.action.staff;

import com.opensymphony.xwork2.ActionSupport;
import com.rlzy.service.staff.StaffAwardService;

public class StaffAwardAction extends ActionSupport{
	private StaffAwardService staffAwardService;

	public StaffAwardService getStaffAwardService() {
		return staffAwardService;
	}

	public void setStaffAwardService(StaffAwardService staffAwardService) {
		this.staffAwardService = staffAwardService;
	}

	
	
}
