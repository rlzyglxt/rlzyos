package com.rlzy.action.staff;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.http.HttpServletResponse;
import org.apache.struts2.ServletActionContext;
import com.google.gson.Gson;
import com.opensymphony.xwork2.ActionSupport;
import com.rlzy.domain.DO.rlzy_staffinfo;
import com.rlzy.domain.VO.showStaffVO;
import com.rlzy.service.staff.StaffService;

public class StaffAction extends ActionSupport{
	private StaffService staffService;
	private showStaffVO staffVO;
	private String staffNumber;
	private rlzy_staffinfo staff;
	private String rlzy_staff_id;
	
	public StaffService getStaffService() {
		return staffService;
	}

	public void setStaffService(StaffService staffService) {
		this.staffService = staffService;
	}
	
	//进入员工信息页面
	public String page_StaffInfo() {
		return "page_StaffInfo";
	}
	//进入添加员工页面
	public String page_AddStaff(){
		return "page_AddStaff";
	}
	//进入修改员工页面
	public String page_UpdataStaff(){
		return "page_UpdataStaff";
	}
	//进入修改员工页面
	public String page_StaffExp(){
		return "page_StaffExp";
	}
	public String page_StaffAgreement(){
		return "page_StaffAgreement";
	}
	//员工调配
	public String page_StaffMove(){
		return "page_StaffMove";
	}
	//员工详情页
	public String page_staffDetails(){
		return "page_staffDetails";
	}
	
	//员工奖金
	public String page_StaffAward(){
		return "page_StaffAward";
	}
	
	//新进员工栏
	public String page_StaffNewIn(){
		return "page_StaffNewIn";
	}
	
	//新进员工栏
	public String page_StaffLeave(){
		return "page_StaffLeave";
	}
	

	
	//分页获取所有员工
	public void getStaffByPage() throws IOException{
		staffService.getStaffByPage(staffVO);
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
	//删除员工
	public void deleteStaff() throws IOException{
		rlzy_staffinfo staff = staffService.getStaffById(rlzy_staff_id);
		staffService.deleteStaff(staff);
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter pw = response.getWriter();
		pw.write("deleteSuccess员工");
		pw.flush();
		pw.close();
	}
	//修改员工信息
	public void updataStaff() throws IOException{
		System.out.println("修改员工信息");
		staff.setRlzy_staff_id(rlzy_staff_id);
		System.out.println(staff);
		staffService.updataStaff(staff);
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter pw = response.getWriter();
		pw.write("updataStaffSuccess");
		pw.flush();
		pw.close();
	}
	//增加员工
	public void addStaff() throws IOException{
		staffService.addStaff(staff);
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter pw = response.getWriter();
		pw.write(staff.getRlzy_staff_id());
		pw.flush();
		pw.close();
	}

	public void getStaffById() throws IOException{
		rlzy_staffinfo staff = staffService.getStaffById(rlzy_staff_id);
		Gson gson = new Gson();
		String result = gson.toJson(staff);
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter pw = response.getWriter();
		pw.write(result);
		pw.flush();
		pw.close();
	}
	

	
	
	public showStaffVO getStaffVO() {
		return staffVO;
	}

	public void setStaffVO(showStaffVO staffVO) {
		this.staffVO = staffVO;
	}

	public String getStaffNumber() {
		return staffNumber;
	}

	public void setStaffNumber(String staffNumber) {
		this.staffNumber = staffNumber;
	}

	public rlzy_staffinfo getStaff() {
		return staff;
	}

	public void setStaff(rlzy_staffinfo staff) {
		this.staff = staff;
	}

	public String getRlzy_staff_id() {
		return rlzy_staff_id;
	}

	public void setRlzy_staff_id(String rlzy_staff_id) {
		this.rlzy_staff_id = rlzy_staff_id;
	}
	

}
