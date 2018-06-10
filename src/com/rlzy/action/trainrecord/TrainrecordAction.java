package com.rlzy.action.trainrecord;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletResponse;
import org.apache.struts2.ServletActionContext;
import com.google.gson.Gson;
import com.opensymphony.xwork2.ActionSupport;
import com.rlzy.domain.DO.rlzy_trainrecord;
import com.rlzy.domain.VO.showTrainrecordVO;
import com.rlzy.service.trainrecord.TrainrecordService;

import util.TeamUtil;

public class TrainrecordAction extends ActionSupport{
	
	//去到列表页面
	public String toTrainrecordlist() throws IOException{
		return "toTrainrecordlist";
	}
	
	//获取所有
		public void getTrainrecordByPage() throws IOException{
			System.out.println("fdsljfldsk");
			showTrainrecordVO suv = trainrecordService.getTrainrecordByPage(queryString, currPage);
			System.out.println("wewewewewe");
			Gson gson = new Gson();
			String result = gson.toJson(suv);
			HttpServletResponse response = ServletActionContext.getResponse();
			response.setContentType("text/html;charset=utf-8");
			PrintWriter pw = response.getWriter();
			pw.write(result);
			pw.flush();
			pw.close();
			
		}
		
		//添加
		public void addTrainrecord() throws IOException{
			System.out.println("1");
			HttpServletResponse response=ServletActionContext.getResponse();
			response.setContentType("text/html;charset=utf-8");
			PrintWriter pw=response.getWriter();
			rlzy_trainrecord ru=new rlzy_trainrecord();
			ru.setRlzy_record_id(TeamUtil.getUuid());
			ru.setStaff_number(staff_number);
			ru.setStaff_name(staff_name);
			ru.setRecord_grade(record_grade);
			ru.setTrain_name(train_name);
			ru.setPaper_name(paper_name);
			trainrecordService.addTrainrecord(ru);
			System.out.println("添加成功");
			pw.write("添加成功");
			pw.flush();
			pw.close();
		}
		
		//删除
		public void deleteTrainrecord() throws IOException{
			System.out.println(record_id);
			HttpServletResponse response=ServletActionContext.getResponse();
			response.setContentType("text/html;charset=utf-8");
			PrintWriter pw=response.getWriter();
			trainrecordService.deleteTrainrecord(record_id);
			pw.write("删除成功");
			pw.flush();
			pw.close();
		}
		
		//通过ID查询
		public void getTrainrecordById() throws IOException {
			HttpServletResponse response = ServletActionContext.getResponse();
			response.setContentType("text/html;charset=utf-8");
			PrintWriter pw = response.getWriter();
			rlzy_trainrecord ru = trainrecordService.getTrainrecordById(record_id);
			Gson gson = new Gson();
			String result = gson.toJson(ru);
			pw.write(result);
			pw.flush();
			pw.close();
		}
		
		//修改
		public void updateTrainrecord() throws IOException{
			rlzy_trainrecord ru=new rlzy_trainrecord();
			rlzy_trainrecord ruGet=trainrecordService.getTrainrecordById(record_id);
			ru.setRlzy_record_id(record_id);
			ru.setStaff_number(staff_number);
			ru.setStaff_name(staff_name);
			ru.setRecord_grade(record_grade);
			ru.setTrain_name(train_name);
			ru.setPaper_name(paper_name);
			trainrecordService.updateTrainrecord(ru);
		}
		
//-------------------------------------分割线------------------------------------------------>
	private TrainrecordService trainrecordService;
	private showTrainrecordVO trainrecordVO;
	private rlzy_trainrecord trainrecord;
	private String queryString;
	private int currPage;
	private String record_id;
	private String staff_number;
	private String staff_name;
	private String record_grade;
	private String train_name;
	private String paper_name;
	
	public String getTrain_name() {
		return train_name;
	}
	public void setTrain_name(String train_name) {
		this.train_name = train_name;
	}
	public String getRecord_id() {
		return record_id;
	}
	public void setRecord_id(String record_id) {
		this.record_id = record_id;
	}
	public String getRecord_grade() {
		return record_grade;
	}
	public void setRecord_grade(String record_grade) {
		this.record_grade = record_grade;
	}
	public String getPaper_name() {
		return paper_name;
	}
	public void setPaper_name(String paper_name) {
		this.paper_name = paper_name;
	}
	public String getStaff_number() {
		return staff_number;
	}
	public void setStaff_number(String staff_number) {
		this.staff_number = staff_number;
	}
	public String getStaff_name() {
		return staff_name;
	}
	public void setStaff_name(String staff_name) {
		this.staff_name = staff_name;
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
	
	public TrainrecordService getTrainrecordService() {
		return trainrecordService;
	}
	public void setTrainrecordService(TrainrecordService trainrecordService) {
		this.trainrecordService = trainrecordService;
	}

	public showTrainrecordVO getTrainrecordVO() {
		return trainrecordVO;
	}
	public void setTrainrecordVO(showTrainrecordVO trainrecordVO) {
		this.trainrecordVO = trainrecordVO;
	}
	public rlzy_trainrecord getTrainrecord() {
		return trainrecord;
	}
	public void setTrainrecord(rlzy_trainrecord trainrecord) {
		this.trainrecord = trainrecord;
	}
	


	
}
