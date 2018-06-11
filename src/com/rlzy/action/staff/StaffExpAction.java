package com.rlzy.action.staff;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.http.HttpServletResponse;
import org.apache.struts2.ServletActionContext;
import com.google.gson.Gson;
import com.rlzy.domain.DO.rlzy_staffexp;
import com.rlzy.domain.VO.showStaffExpVO;
import com.rlzy.service.staff.StaffExpService;
import util.TeamUtil;

public class StaffExpAction {
	private StaffExpService staffExpService;

	public StaffExpService getStaffExpService() {
		return staffExpService;
	}

	public void setStaffExpService(StaffExpService staffExpService) {
		this.staffExpService = staffExpService;
	}
	
	//增加工作履历信息
	public void addStaffExp() throws IOException{
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		rlzy_staffexp rs = new rlzy_staffexp();
		rs.setRlzy_staffExp_id(TeamUtil.getUuid());
		rs.setStaffExp_address(staffExp_address);
		rs.setStaffExp_overTime(staffExp_overTime);
		rs.setStaffExp_remark(staffExp_remark);
		rs.setStaffExp_staff(staffExp_staff);
		rs.setStaffExp_startTime(staffExp_startTime);
		staffExpService.addStaffExp(rs);
		PrintWriter pw =response.getWriter();
		pw.write("addsuccess");
		pw.flush();
		pw.close();
		
	}	
	//删除一个工作履历信息
	public void deleteStaffExp(){
		
	}
	//通过工号得到姓名
	public void getStaffNameByStaffNumber() throws IOException{
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		String relsult = staffExpService.getStaffNameByStaffNumber(staffExp_staff);
		Gson gson = new Gson();
		String result = gson.toJson(relsult);
		PrintWriter pw =response.getWriter();
		pw.write(result);
		pw.flush();
		pw.close();
	}
	
	//得到个人工作履历信息
	public void getStaffExpByExpId() throws IOException{
		rlzy_staffexp rs = staffExpService.getStaffExpById(rlzy_staffExp_id);
		HttpServletResponse response = ServletActionContext.getResponse();
		System.out.println(rlzy_staffExp_id);
		response.setContentType("text/html;charset=utf-8");
		Gson gson = new Gson();
		String result = gson.toJson(rs);
		PrintWriter pw =response.getWriter();
		pw.write(result);
		pw.flush();
		pw.close();
	}
	
	//得到所有员工的工作履历信息
	public void getAllStaffExpByPage() throws IOException{
		staffExpService.getStaffExpByPage(staffExpVO);
		Gson gson = new Gson();
		String result = gson.toJson(staffExpVO);
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		System.out.println(result);
		PrintWriter pw =response.getWriter();
		pw.write(result);
		pw.flush();
		pw.close();
	}
	
	//修改工作履历信息
	public void updataStaffExp() throws IOException{
		rlzy_staffexp staffexpp = staffExpService.getStaffExpById(rlzy_staffExp_id);
		staffexpp.setStaffExp_startTime(staffExp_startTime);
		staffexpp.setStaffExp_staff(staffExp_staff);
		staffexpp.setStaffExp_address(staffExp_address);
		staffexpp.setStaffExp_overTime(staffExp_overTime);
		staffexpp.setStaffExp_remark(staffExp_remark);
		staffExpService.upadteStaffExp(staffexpp);
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter pw = response.getWriter();
		pw.write("updataExpSuccess");
		pw.flush();
		pw.close();
	}

	private rlzy_staffexp staffExp;
	private showStaffExpVO staffExpVO;
	private String rlzy_staffExp_id;
	private String staffExp_staff;
	private String staff_name;
	private String staffExp_address;
	private String staffExp_startTime;
	private String staffExp_overTime;
	private String staffExp_remark;
	
	public String getStaff_name() {
		return staff_name;
	}

	public void setStaff_name(String staff_name) {
		this.staff_name = staff_name;
	}

	public String getStaffExp_address() {
		return staffExp_address;
	}

	public void setStaffExp_address(String staffExp_address) {
		this.staffExp_address = staffExp_address;
	}

	public String getStaffExp_startTime() {
		return staffExp_startTime;
	}

	public void setStaffExp_startTime(String staffExp_startTime) {
		this.staffExp_startTime = staffExp_startTime;
	}

	public String getStaffExp_overTime() {
		return staffExp_overTime;
	}

	public void setStaffExp_overTime(String staffExp_overTime) {
		this.staffExp_overTime = staffExp_overTime;
	}

	public String getStaffExp_remark() {
		return staffExp_remark;
	}

	public void setStaffExp_remark(String staffExp_remark) {
		this.staffExp_remark = staffExp_remark;
	}

	public String getStaffExp_staff() {
		return staffExp_staff;
	}

	public void setStaffExp_staff(String staffExp_staff) {
		this.staffExp_staff = staffExp_staff;
	}

	public String getRlzy_staffExp_id() {
		return rlzy_staffExp_id;
	}

	public void setRlzy_staffExp_id(String rlzy_staffExp_id) {
		this.rlzy_staffExp_id = rlzy_staffExp_id;
	}

	public rlzy_staffexp getStaffExp() {
		return staffExp;
	}

	public void setStaffExp(rlzy_staffexp staffExp) {
		this.staffExp = staffExp;
	}

	public showStaffExpVO getStaffExpVO() {
		return staffExpVO;
	}

	public void setStaffExpVO(showStaffExpVO staffExpVO) {
		this.staffExpVO = staffExpVO;
	}

	
}
