package com.rlzy.action.staff;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

import com.google.gson.Gson;
import com.opensymphony.xwork2.ActionSupport;
import com.rlzy.domain.DO.rlzy_staff;
import com.rlzy.domain.VO.showStaffVO;
import com.rlzy.service.staff.StaffService;

public class StaffAction extends ActionSupport{
	private StaffService staffService;
	public StaffService getStaffService() {
		return staffService;
	}

	public void setStaffService(StaffService staffService) {
		this.staffService = staffService;
	}
	
	public String page_StaffInfo() {
		return "page_StaffInfo";
	}
	
	
	private showStaffVO staffVO;
	private String staffNumber;
	private rlzy_staff staff;
	
	//获取所有员工
	public void getStaffByPage() throws IOException{
		
		System.out.println("fdsljfldsk");
		staffService.getStaffByPage(staffVO);
		System.out.println("wewewewewe");
		Gson gson = new Gson();
		String result = gson.toJson(staffVO);
	
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
	
		System.out.println(result);
		PrintWriter pw =response.getWriter();
		pw.write(result);
		
		pw.flush();
		pw.close();
	}
	
	public rlzy_staff getStaff() {
		return staff;
	}
	public void setStaff(rlzy_staff staff) {
		this.staff = staff;
	}
	public showStaffVO getStaffVO() {
		System.out.println("get值");
		return staffVO;
	}
	public void setStaffVO(showStaffVO staffVO) {
		System.out.println("set值");
		this.staffVO = staffVO;
	}
	
	public String getStaffNumber() {
		return staffNumber;
	}

	public void setStaffNumber(String staffNumber) {
		this.staffNumber = staffNumber;
	}
}
