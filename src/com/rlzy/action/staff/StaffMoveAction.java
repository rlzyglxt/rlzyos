package com.rlzy.action.staff;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

import com.google.gson.Gson;
import com.opensymphony.xwork2.ActionSupport;
import com.rlzy.domain.DO.rlzy_staffinfo;
import com.rlzy.service.staff.StaffMoveService;

public class StaffMoveAction extends ActionSupport{
	private StaffMoveService staffMoveService;
	private String staff_number;
	
	public StaffMoveService getStaffMoveService() {
		return staffMoveService;
	}

	public void setStaffMoveService(StaffMoveService staffMoveService) {
		this.staffMoveService = staffMoveService;
	}
	
	public void addStaffMove(){
		
		
	}
	public void getValueByNumber() throws IOException{
		System.out.println("得到值");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		rlzy_staffinfo rs = staffMoveService.getValueByNumber(staff_number);
		Gson gson = new Gson();
		String result = gson.toJson(rs);
		PrintWriter pw =response.getWriter();
		pw.write(result);
		pw.flush();
		pw.close();
	}

	
	
	
	
	
	public String getStaff_number() {
		return staff_number;
	}

	public void setStaff_number(String staff_number) {
		this.staff_number = staff_number;
	}
	
	
	
	
}
