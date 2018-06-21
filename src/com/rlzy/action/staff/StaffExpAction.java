package com.rlzy.action.staff;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.http.HttpServletResponse;
import org.apache.struts2.ServletActionContext;
import com.google.gson.Gson;
import com.opensymphony.xwork2.ActionSupport;
import com.rlzy.domain.DO.rlzy_staffexp;
import com.rlzy.domain.VO.showStaffExpVO;
import com.rlzy.service.staff.StaffExpService;

public class StaffExpAction extends ActionSupport{
	private StaffExpService staffExpService;
	private rlzy_staffexp staffExp;
	private showStaffExpVO staffExpVO;
	private List<rlzy_staffexp> staffExps;
	private String rlzy_staffExp_id;
	private String staffExp_staff;

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
		staffExpService.saveStaffExp(staffExps);
		PrintWriter pw =response.getWriter();
		pw.write("addsuccess");
		pw.flush();
		pw.close();
		
	}
	//删除一个工作履历信息
	public void deleteStaffExp() throws IOException{
			staffExpService.deleteStaffExp(staffExp.getRlzy_staffExp_id());
			HttpServletResponse response = ServletActionContext.getResponse();
			response.setContentType("text/html;charset=utf-8");
			PrintWriter pw = response.getWriter();
			pw.write("deleteSuccess");
			pw.flush();
			pw.close();
	}
	//删除全部该人工作履历信息
	public void deleteStaffExps() throws IOException{
			staffExpService.deleteStaffExps(staffExp.getStaffExp_staff());
			HttpServletResponse response = ServletActionContext.getResponse();
			response.setContentType("text/html;charset=utf-8");
			PrintWriter pw = response.getWriter();
			pw.write("履历deleteSuccess履历");
			pw.flush();
			pw.close();
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
	
	//通过履历表id得到一个工作履历信息
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
	//通过员工id得到履历
	public void getStaffExpsByStaffId() throws IOException{
		List<rlzy_staffexp> staffExps = staffExpService.getStaffExps(staffExp.getStaffExp_staff());
		String result;
		if (staffExps.size() < 0) {
			result = "staffExpIsNull";
		} else {
			Gson gson = new Gson();
			result = gson.toJson(staffExps);
		}
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter pw = response.getWriter();
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
		System.out.println("分页得到履历"+result);
		PrintWriter pw =response.getWriter();
		pw.write(result);
		pw.flush();
		pw.close();
	}
	
	//修改工作履历信息
	public void updataStaffExp() throws IOException{
//		rlzy_staffexp staffexpp = staffExpService.getStaffExpById(rlzy_staffExp_id);
//		staffexpp.setStaffExp_startTime(staffExp_startTime);
//		staffexpp.setStaffExp_staff(staffExp_staff);
//		staffexpp.setStaffExp_address(staffExp_address);
//		staffexpp.setStaffExp_overTime(staffExp_overTime);
//		staffexpp.setStaffExp_remark(staffExp_remark);
		staffExpService.upadteStaffExp(staffExp);
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter pw = response.getWriter();
		pw.write("updataExpSuccess");
		pw.flush();
		pw.close();
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

	public List<rlzy_staffexp> getStaffExps() {
		return staffExps;
	}

	public void setStaffExps(List<rlzy_staffexp> staffExps) {
		this.staffExps = staffExps;
	}

	public String getRlzy_staffExp_id() {
		return rlzy_staffExp_id;
	}

	public void setRlzy_staffExp_id(String rlzy_staffExp_id) {
		this.rlzy_staffExp_id = rlzy_staffExp_id;
	}

	public String getStaffExp_staff() {
		return staffExp_staff;
	}

	public void setStaffExp_staff(String staffExp_staff) {
		this.staffExp_staff = staffExp_staff;
	}
	
	
	
}
