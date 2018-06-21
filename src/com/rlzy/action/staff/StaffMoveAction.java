package com.rlzy.action.staff;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

import com.google.gson.Gson;
import com.opensymphony.xwork2.ActionSupport;
import com.rlzy.domain.DO.rlzy_staffinfo;
import com.rlzy.domain.DO.rlzy_staffmove;
import com.rlzy.domain.VO.showStaffMoveVO;
import com.rlzy.service.staff.StaffMoveService;
import com.rlzy.service.staff.StaffService;

public class StaffMoveAction extends ActionSupport{
	private StaffMoveService staffMoveService;
	private StaffService staffService;
	private String staff_number;
	private List<rlzy_staffmove> staffMove;
	private showStaffMoveVO staffMoveVO;
	private String staffMove_staff;
	private String staffMove_nowdepartment;
	private String staffMove_nowduty;
	//员工调动
	public void addStaffMove() throws IOException{
		staffMoveService.addStaffMove(staffMove);
		System.out.println("该员工id为"+staffMove_staff);
		rlzy_staffinfo rs = staffService.getStaffById(staffMove_staff);
		rs.setStaff_duty(staffMove_nowduty);
		rs.setStaff_depaterment(staffMove_nowdepartment);
		staffMoveService.updataStaffInfo(rs);
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter pw = response.getWriter();
		pw.write("addMoveSuccess");
		pw.flush();
		pw.close();
	}
	//得到员工信息的值
	public void getValueByNumber() throws IOException{
		System.out.println("得到值");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		List<rlzy_staffinfo> rs =staffMoveService.getValueByNumber(staff_number);
		Gson gson = new Gson();
		String result = gson.toJson(rs);
		PrintWriter pw =response.getWriter();
		pw.write(result);
		pw.flush();
		pw.close();
	}
	public void getAllStaffMoveByPage() throws IOException{
		staffMoveService.getStaffMoveByPage(staffMoveVO);
		Gson gson = new Gson();
		String result = gson.toJson(staffMoveVO);
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		System.out.println(result);
		PrintWriter pw =response.getWriter();
		pw.write(result);
		pw.flush();
		pw.close();
	}

	
	public String getStaffMove_nowdepartment() {
		return staffMove_nowdepartment;
	}
	public void setStaffMove_nowdepartment(String staffMove_nowdepartment) {
		this.staffMove_nowdepartment = staffMove_nowdepartment;
	}
	public String getStaffMove_nowduty() {
		return staffMove_nowduty;
	}
	public void setStaffMove_nowduty(String staffMove_nowduty) {
		this.staffMove_nowduty = staffMove_nowduty;
	}
	public StaffService getStaffService() {
		return staffService;
	}
	public void setStaffService(StaffService staffService) {
		this.staffService = staffService;
	}
	public String getStaffMove_staff() {
		return staffMove_staff;
	}
	public void setStaffMove_staff(String staffMove_staff) {
		this.staffMove_staff = staffMove_staff;
	}
	public showStaffMoveVO getStaffMoveVO() {
		return staffMoveVO;
	}
	public void setStaffMoveVO(showStaffMoveVO staffMoveVO) {
		this.staffMoveVO = staffMoveVO;
	}
	public List<rlzy_staffmove> getStaffMove() {
		return staffMove;
	}
	public void setStaffMove(List<rlzy_staffmove> staffMove) {
		this.staffMove = staffMove;
	}
	public String getStaff_number() {
		return staff_number;
	}

	public void setStaff_number(String staff_number) {
		this.staff_number = staff_number;
	}
	
	public StaffMoveService getStaffMoveService() {
		return staffMoveService;
	}

	public void setStaffMoveService(StaffMoveService staffMoveService) {
		this.staffMoveService = staffMoveService;
	}
}
