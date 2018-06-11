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
		pw.write("deleteSuccess");
		pw.flush();
		pw.close();
	}
	//修改员工信息
	public void updataStaff() throws IOException{

		staff.setRlzy_staff_id(rlzy_staff_id);
		System.out.println(staff);
		staffService.updataStaff(staff);
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter pw = response.getWriter();
		pw.write("updataSuccess");
		pw.flush();
		pw.close();
	}
	//增加员工
	public void addStaff() throws IOException{
		staffService.addStaff(staff);
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter pw = response.getWriter();
		pw.write("addSuccess");
		pw.flush();
		pw.close();
	}
	/**
	 * @throws IOException 
	 * 
	 */
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
	
	private showStaffVO staffVO;
	private String staffNumber;
	private rlzy_staffinfo staff;
	private String rlzy_staff_id;//
//	private String staff_address;
//	private String staff_agreement_id;
//	private String staff_birth;
//	private String staff_depaterment;
//	private String staff_duty;
//	private String staff_name;
//	private String staff_number;
//	private String staff_record;
//	private String staff_sex;
//	private String staff_status;
	
	
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
