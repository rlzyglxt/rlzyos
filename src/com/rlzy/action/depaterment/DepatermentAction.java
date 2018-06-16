package com.rlzy.action.depaterment;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.http.HttpServletResponse;
import org.apache.struts2.ServletActionContext;
import com.google.gson.Gson;
import com.opensymphony.xwork2.ActionSupport;
import com.rlzy.domain.DO.rlzy_depaterment;
import com.rlzy.domain.VO.showDepatermentVO;
import com.rlzy.service.depaterment.DepatermentService;
import util.TeamUtil;

public class DepatermentAction extends ActionSupport{
	private DepatermentService depatermentService;
	//去到列表页面
	public String toDepatermentlist() {
		return "toDepatermentlist";
	}
	
	//获取所有部门
		public void getDepatermentByPage() throws IOException{
			depatermentService.getDepatermentByPage(depatermentVO);
			Gson gson = new Gson();
			String result = gson.toJson(depatermentVO);
			HttpServletResponse response = ServletActionContext.getResponse();
			response.setContentType("text/html;charset=utf-8");
			PrintWriter pw = response.getWriter();
			pw.write(result);
			pw.flush();
			pw.close();

		}
		
		//添加用户
		public void addDepaterment() throws IOException{
			HttpServletResponse response=ServletActionContext.getResponse();
			response.setContentType("text/html;charset=utf-8");
			PrintWriter pw=response.getWriter();
			rlzy_depaterment ru=new rlzy_depaterment();
			ru.setRlzy_staffdepartment_id(TeamUtil.getUuid());
			ru.setStaffdepartment_name(staffdepartment_name);
			ru.setStaffdepartment_introduct(staffdepartment_introduct);
			ru.setStaffdepartment_tel(staffdepartment_tel);
			ru.setStaffdepartment_amount(staffdepartment_amount);
			if(depatermentService.judgeDepatermentByDepatermentname(staffdepartment_name)){
				pw.write("samename");
				System.out.print("培训名称存在");
			}
			else{
				ru.setStaffdepartment_name(staffdepartment_name);
				depatermentService.addDepaterment(ru);
				pw.write("添加成功");
			}
			pw.flush();
			pw.close();
		}
		
		//删除用户
		public void deleteDepaterment() throws IOException{
			HttpServletResponse response=ServletActionContext.getResponse();
			response.setContentType("text/html;charset=utf-8");
			PrintWriter pw=response.getWriter();
			depatermentService.deleteDepaterment(rlzy_staffdepartment_id);
			pw.write("删除成功");
			pw.flush();
			pw.close();
		}
		
		//通过部门ID查询部门
		public void getDepatermentById() throws IOException {
			HttpServletResponse response = ServletActionContext.getResponse();
			response.setContentType("text/html;charset=utf-8");
			PrintWriter pw = response.getWriter();
			rlzy_depaterment ru = depatermentService.getDepatermentById(rlzy_staffdepartment_id);
			Gson gson = new Gson();
			String result = gson.toJson(ru);
			pw.write(result);
			pw.flush();
			pw.close();
		}
		
		//修改用户
		public void updateDepaterment() throws IOException{
			rlzy_depaterment ru=depatermentService.getDepatermentById(rlzy_staffdepartment_id);
//			ru.setRlzy_staffdepartment_id(depaterment_id);
			ru.setStaffdepartment_name(staffdepartment_name);
			ru.setStaffdepartment_introduct(staffdepartment_introduct);
			ru.setStaffdepartment_tel(staffdepartment_tel);
			ru.setStaffdepartment_amount(staffdepartment_amount);
			System.out.println(ru.getStaffdepartment_name());
			depatermentService.updateDeapterment(ru);
			HttpServletResponse response = ServletActionContext.getResponse();
			response.setContentType("text/html;charset=utf-8");
			PrintWriter pw = response.getWriter();
			pw.write("updataSuccess");
			pw.flush();
			pw.close();
		}
		//获得所有部门
		public void getAllDepaterment() throws IOException{
			List<rlzy_depaterment> rd = depatermentService.getAllDepaterment();
			HttpServletResponse response = ServletActionContext.getResponse();
			response.setContentType("text/html;charset=utf-8");
			PrintWriter pw = response.getWriter();
			Gson gson = new Gson();
			System.out.println("得到所有");
			String result = gson.toJson(rd);
			pw.write(result);
			pw.flush();
			pw.close();
		}
		
//-------------------------------------分割线 set和get方法------------------------------------------------>
	
	private showDepatermentVO depatermentVO;
	private rlzy_depaterment depaterment;
	private String rlzy_staffdepartment_id;////部门id
	private String staffdepartment_name;//部门名称
	private String staffdepartment_introduct;//部门简介
	private String staffdepartment_tel;//部门联系电话
	private String staffdepartment_amount;//部门人数

	
	public DepatermentService getDepatermentService() {
		return depatermentService;
	}

	public void setDepatermentService(DepatermentService depatermentService) {
		this.depatermentService = depatermentService;
	}

	public showDepatermentVO getDepatermentVO() {
		return depatermentVO;
	}

	public void setDepatermentVO(showDepatermentVO depatermentVO) {
		this.depatermentVO = depatermentVO;
	}

	public rlzy_depaterment getDepaterment() {
		return depaterment;
	}

	public void setDepaterment(rlzy_depaterment depaterment) {
		this.depaterment = depaterment;
	}

	public String getRlzy_staffdepartment_id() {
		return rlzy_staffdepartment_id;
	}

	public void setRlzy_staffdepartment_id(String rlzy_staffdepartment_id) {
		this.rlzy_staffdepartment_id = rlzy_staffdepartment_id;
	}

	public String getStaffdepartment_name() {
		return staffdepartment_name;
	}

	public void setStaffdepartment_name(String staffdepartment_name) {
		this.staffdepartment_name = staffdepartment_name;
	}

	public String getStaffdepartment_introduct() {
		return staffdepartment_introduct;
	}

	public void setStaffdepartment_introduct(String staffdepartment_introduct) {
		this.staffdepartment_introduct = staffdepartment_introduct;
	}

	public String getStaffdepartment_tel() {
		return staffdepartment_tel;
	}

	public void setStaffdepartment_tel(String staffdepartment_tel) {
		this.staffdepartment_tel = staffdepartment_tel;
	}

	public String getStaffdepartment_amount() {
		return staffdepartment_amount;
	}

	public void setStaffdepartment_amount(String staffdepartment_amount) {
		this.staffdepartment_amount = staffdepartment_amount;
	}
	
	
	
	
}
