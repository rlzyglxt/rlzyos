package com.rlzy.action.depaterment;

import java.io.IOException;
import java.io.PrintWriter;

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
			showDepatermentVO suv = depatermentService.getDepatermentByPage(queryString, currPage);
			Gson gson = new Gson();
			String result = gson.toJson(suv);
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
			ru.setRlzy_depaterment_id(TeamUtil.getUuid());
			ru.setDepaterment_name(depaterment_name);
			ru.setDepaterment_duty(depaterment_duty);
			ru.setDepaterment_tel(depaterment_tel);
			ru.setDepaterment_num(depaterment_num);
			if(depatermentService.judgeDepatermentByDepatermentname(depaterment_name)){
				pw.write("部门名称存在");
			}
			else{
				ru.setDepaterment_name(depaterment_name);
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
			depatermentService.deleteDepaterment(depaterment_id);
			pw.write("删除成功");
			pw.flush();
			pw.close();
		}
		
		//通过部门ID查询部门
		public void getDepatermentById() throws IOException {
			HttpServletResponse response = ServletActionContext.getResponse();
			response.setContentType("text/html;charset=utf-8");
			PrintWriter pw = response.getWriter();
			rlzy_depaterment ru = depatermentService.getDepatermentById(depaterment_id);
			Gson gson = new Gson();
			String result = gson.toJson(ru);
			pw.write(result);
			pw.flush();
			pw.close();
		}
		
		//修改用户
		public void updateDepaterment() throws IOException{
			rlzy_depaterment ru=new rlzy_depaterment();
			rlzy_depaterment ruGet=depatermentService.getDepatermentById(depaterment_id);
			ru.setRlzy_depaterment_id(depaterment_id);
			ru.setDepaterment_name(depaterment_name);
			ru.setDepaterment_duty(depaterment_duty);
			ru.setDepaterment_tel(depaterment_tel);
			ru.setDepaterment_num(depaterment_num);
			depatermentService.updateDeapterment(ru);
		}
		
//-------------------------------------分割线------------------------------------------------>
	
	private showDepatermentVO depatermentVO;
	private String depatermentNumber;
	private rlzy_depaterment depaterment;
	private String queryString;
	private int currPage;
	private String depaterment_id;
	private String depaterment_name;
	private String depaterment_duty;
	private String depaterment_tel;
	private String depaterment_num;
	
	
	public String getDepaterment_id() {
		return depaterment_id;
	}
	public void setDepaterment_id(String depaterment_id) {
		this.depaterment_id = depaterment_id;
	}
	public String getDepaterment_name() {
		return depaterment_name;
	}
	public void setDepaterment_name(String depaterment_name) {
		this.depaterment_name = depaterment_name;
	}
	public String getDepaterment_duty() {
		return depaterment_duty;
	}
	public void setDepaterment_duty(String depaterment_duty) {
		this.depaterment_duty = depaterment_duty;
	}
	public String getDepaterment_tel() {
		return depaterment_tel;
	}
	public void setDepaterment_tel(String depaterment_tel) {
		this.depaterment_tel = depaterment_tel;
	}
	public String getDepaterment_num() {
		return depaterment_num;
	}
	public void setDepaterment_num(String depaterment_num) {
		this.depaterment_num = depaterment_num;
	}

	public String getQueryString() {
		return queryString;
	}
	public void setQueryString(String queryString) {
		this.queryString = queryString;
	}
	public int getCurrPage() {
		return currPage;
	}
	public void setCurrPage(int currPage) {
		this.currPage = currPage;
	}
	public showDepatermentVO getDepatermentVO() {
		return depatermentVO;
	}
	public void setDepatermentVO(showDepatermentVO depatermentVO) {
		this.depatermentVO = depatermentVO;
	}
	public String getDepatermentNumber() {
		return depatermentNumber;
	}
	public void setDepatermentNumber(String depatermentNumber) {
		this.depatermentNumber = depatermentNumber;
	}
	public rlzy_depaterment getDepaterment() {
		return depaterment;
	}
	public void setDepaterment(rlzy_depaterment depaterment) {
		this.depaterment = depaterment;
	}
	public DepatermentService getDepatermentService() {
		return depatermentService;
	}
	public void setDepatermentService(DepatermentService depatermentService) {
		this.depatermentService = depatermentService;
	}

	
}
