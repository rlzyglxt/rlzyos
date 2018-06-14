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
	
	private TrainrecordService trainrecordService;

	public TrainrecordService getTrainrecordService() {
		return trainrecordService;
	}

	public void setTrainrecordService(TrainrecordService trainrecordService) {
		this.trainrecordService = trainrecordService;
	}
	
	//去到列表页面
		public String toTrainrecordlist() throws IOException{
			return "toTrainrecordlist";
		}
	
	//增加信息
		public void addTrainrecord() throws IOException{
			HttpServletResponse response = ServletActionContext.getResponse();
			response.setContentType("text/html;charset=utf-8");
			PrintWriter pw =response.getWriter();
			rlzy_trainrecord rs = new rlzy_trainrecord();
			rs.setRlzy_record_id(TeamUtil.getUuid());
			rs.setStaff_id(staff_id);
			rs.setRecord_grade(record_grade);
			rs.setTrain_id(train_id);
			rs.setPaper_name(paper_name);
			rs.setStaffTrain_gmt_create(TeamUtil.getStringSecond());
			rs.setStaffTrain_gmt_modified(TeamUtil.getStringSecond());
			trainrecordService.addTrainrecord(rs);
			pw.write("addsuccess");
			pw.flush();
			pw.close();
		}	
		
		//删除一个信息
		public void deleteTrainrecord() throws IOException {
			System.out.println("delete_id="+rlzy_record_id);
			HttpServletResponse response=ServletActionContext.getResponse();
			response.setContentType("text/html;charset=utf-8");
			PrintWriter pw=response.getWriter();
			trainrecordService.deleteTrainrecord(rlzy_record_id);
			pw.write("delete");
			pw.flush();
			pw.close();
		}
		
		//修改信息
		public void updataTrainrecord() throws IOException{
			rlzy_trainrecord trainrecord = trainrecordService.getTrainrecordById(rlzy_record_id);
			trainrecord.setStaff_id(staff_id);
			trainrecord.setRecord_grade(record_grade);
			trainrecord.setTrain_id(train_id);
			trainrecord.setPaper_name(paper_name);
			trainrecord.setStaffTrain_gmt_modified(TeamUtil.getStringSecond());
			trainrecordService.upadteTrainrecord(trainrecord);
			HttpServletResponse response = ServletActionContext.getResponse();
			response.setContentType("text/html;charset=utf-8");
			PrintWriter pw = response.getWriter();
			pw.write("updataSuccess");
			pw.flush();
			pw.close();
		}
		
		//得到个人信息
		public void getTrainrecordByExpId() throws IOException{
			System.out.println("rlzy_record_id="+rlzy_record_id);
			rlzy_trainrecord rs = trainrecordService.getTrainrecordById(rlzy_record_id);
			HttpServletResponse response = ServletActionContext.getResponse();
			System.out.println("rlzy_record_id"+rlzy_record_id);
			response.setContentType("text/html;charset=utf-8");
			Gson gson = new Gson();
			String result = gson.toJson(rs);
			PrintWriter pw =response.getWriter();
			pw.write(result);
			pw.flush();
			pw.close();
		}
		
		//通过工号得到姓名
		public void getStaffNameByStaffNumber() throws IOException{
			HttpServletResponse response = ServletActionContext.getResponse();
			response.setContentType("text/html;charset=utf-8");
			String relsult = trainrecordService.getStaffNameByStaffNumber(staff_id);
			Gson gson = new Gson();
			String result = gson.toJson(relsult);
			PrintWriter pw =response.getWriter();
			pw.write(result);
			pw.flush();
			pw.close();
		}
		
		//得到信息
		public void getTrainrecordByPage() throws IOException{
			trainrecordService.getTrainrecordByPage(trainrecordVO);
			Gson gson = new Gson();
			String result = gson.toJson(trainrecordVO);
			HttpServletResponse response = ServletActionContext.getResponse();
			response.setContentType("text/html;charset=utf-8");
			System.out.println("分页得到"+result);
			PrintWriter pw =response.getWriter();
			pw.write(result);
			pw.flush();
			pw.close();
		}
	
	
	
	
		
//-------------------------------------分割线------------------------------------------------>
	private rlzy_trainrecord trainrecord;
	private showTrainrecordVO trainrecordVO;
	private String rlzy_record_id;
	private String staff_id;
	private String record_grade;
	private String train_id;
	private String paper_name;
	private String staffTrain_gmt_create;
	private String staffTrain_gmt_modified;
	

	public rlzy_trainrecord getTrainrecord() {
		return trainrecord;
	}
	public void setTrainrecord(rlzy_trainrecord trainrecord) {
		this.trainrecord = trainrecord;
	}
	public showTrainrecordVO getTrainrecordVO() {
		return trainrecordVO;
	}
	public void setTrainrecordVO(showTrainrecordVO trainrecordVO) {
		this.trainrecordVO = trainrecordVO;
	}
	public String getRlzy_record_id() {
		return rlzy_record_id;
	}
	public void setRlzy_record_id(String rlzy_record_id) {
		this.rlzy_record_id = rlzy_record_id;
	}
	public String getRecord_grade() {
		return record_grade;
	}
	public void setRecord_grade(String record_grade) {
		this.record_grade = record_grade;
	}
	public String getStaff_id() {
		return staff_id;
	}
	public void setStaff_id(String staff_id) {
		this.staff_id = staff_id;
	}
	public String getTrain_id() {
		return train_id;
	}
	public void setTrain_id(String train_id) {
		this.train_id = train_id;
	}

	public String getPaper_name() {
		return paper_name;
	}
	public void setPaper_name(String paper_name) {
		this.paper_name = paper_name;
	}
	public String getStaffTrain_gmt_create() {
		return staffTrain_gmt_create;
	}
	public void setStaffTrain_gmt_create(String staffTrain_gmt_create) {
		this.staffTrain_gmt_create = staffTrain_gmt_create;
	}
	public String getStaffTrain_gmt_modified() {
		return staffTrain_gmt_modified;
	}
	public void setStaffTrain_gmt_modified(String staffTrain_gmt_modified) {
		this.staffTrain_gmt_modified = staffTrain_gmt_modified;
	}
	

	
}
