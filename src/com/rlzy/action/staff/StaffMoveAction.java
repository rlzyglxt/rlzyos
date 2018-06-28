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
	private List<rlzy_staffmove> staffMoves;
	private rlzy_staffmove staffmove;
	private showStaffMoveVO staffMoveVO;
	private String staffMove_staff;
	private String staffMove_nowdepartment;
	private String staffMove_nowduty;
	private String rlzy_staffMove_id;
	
	
	
	//员工调动
	public void addStaffMove() throws IOException{
//		System.out.println("该员工id为"+staffmove.getStaffMove_staff());
		staffMoveService.addStaffMove(staffMoves);
		System.out.println("该员工原职务是为"+staffMove_nowduty);
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
	//删除一个调动
	public void deleteStaffMove() throws IOException{
		//System.out.println("调动记录id"+staffmove.getRlzy_staffMove_id());
		System.out.println("id"+staffmove.getRlzy_staffMove_id());
			staffMoveService.deleteStaffMove(staffmove.getRlzy_staffMove_id());
			HttpServletResponse response = ServletActionContext.getResponse();
			response.setContentType("text/html;charset=utf-8");
			PrintWriter pw = response.getWriter();
			pw.write("deleteSuccess");
			pw.flush();
			pw.close();
	}
	//删除全部记录
	public void deleteStaffMoves() throws IOException{
		staffMoveService.deleteStaffMoves(staffmove.getStaffMove_staff());
			HttpServletResponse response = ServletActionContext.getResponse();
			response.setContentType("text/html;charset=utf-8");
			PrintWriter pw = response.getWriter();
			pw.write("deleteSuccess");
			pw.flush();
			pw.close();
	}
	//通过id得到一个信息
	public void getStaffMoveById() throws IOException{
		rlzy_staffmove rs = staffMoveService.getStaffMoveById(rlzy_staffMove_id);
		HttpServletResponse response = ServletActionContext.getResponse();
		System.out.println(rlzy_staffMove_id);
		response.setContentType("text/html;charset=utf-8");
		Gson gson = new Gson();
		String result = gson.toJson(rs);
		PrintWriter pw =response.getWriter();
		pw.write(result);
		pw.flush();
		pw.close();
	}
	
	//通过员工id得到全部调动信息
	public void getStaffMoveByStaffId() throws IOException{
		List<rlzy_staffmove> rlzy_staffmove = staffMoveService.getStaffMoveByStaffId(staffmove.getStaffMove_staff());
		String result;
		if (rlzy_staffmove.size() < 0) {
			result = "staffMoveIsNull";
		} else {
			Gson gson = new Gson();
			result = gson.toJson(rlzy_staffmove);
		}
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter pw = response.getWriter();
		pw.write(result);
		pw.flush();
		pw.close();

	}
	//修改调动记录
	public void updataStaffMove() throws IOException{
		System.out.println("修改一下调动记录 ");
		staffMoveService.updataStaffMove(staffmove);;
		System.out.println(staffmove.getStaffMove_nowdepartment());
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter pw = response.getWriter();
		pw.write("updataSuccess");
		pw.flush();
		pw.close();
	}
	
	
	
	public String getRlzy_staffMove_id() {
		return rlzy_staffMove_id;
	}
	public void setRlzy_staffMove_id(String rlzy_staffMove_id) {
		this.rlzy_staffMove_id = rlzy_staffMove_id;
	}
	public StaffMoveService getStaffMoveService() {
		return staffMoveService;
	}
	public void setStaffMoveService(StaffMoveService staffMoveService) {
		this.staffMoveService = staffMoveService;
	}
	public StaffService getStaffService() {
		return staffService;
	}
	public void setStaffService(StaffService staffService) {
		this.staffService = staffService;
	}
	public String getStaff_number() {
		return staff_number;
	}
	public void setStaff_number(String staff_number) {
		this.staff_number = staff_number;
	}
	public List<rlzy_staffmove> getStaffMoves() {
		return staffMoves;
	}
	public void setStaffMoves(List<rlzy_staffmove> staffMoves) {
		this.staffMoves = staffMoves;
	}
	public rlzy_staffmove getStaffmove() {
		return staffmove;
	}
	public void setStaffmove(rlzy_staffmove staffmove) {
		this.staffmove = staffmove;
	}
	public showStaffMoveVO getStaffMoveVO() {
		return staffMoveVO;
	}
	public void setStaffMoveVO(showStaffMoveVO staffMoveVO) {
		this.staffMoveVO = staffMoveVO;
	}
	public String getStaffMove_staff() {
		return staffMove_staff;
	}
	public void setStaffMove_staff(String staffMove_staff) {
		this.staffMove_staff = staffMove_staff;
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

	
	
	
}
