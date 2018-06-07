package com.rlzy.action.depaterment;

import com.opensymphony.xwork2.ActionSupport;
import com.rlzy.service.depaterment.DepatermentService;

public class DepatermentAction extends ActionSupport{
	private DepatermentService depatermentService;
	public DepatermentService getDepatermentService() {
		return depatermentService;
	}
	public void setDepatermentService(DepatermentService depatermentService) {
		this.depatermentService = depatermentService;
	}

	public String toDepatermentlist() {
		return "toDepatermentlist";
	}
}
