package com.rlzy.action.staff;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

import com.google.gson.Gson;
import com.opensymphony.xwork2.ActionSupport;
import com.rlzy.domain.DO.rlzy_train;
import com.rlzy.domain.VO.showTrainVO;
import com.rlzy.service.staff.TrainService;

import util.TeamUtil;

public class TrainAction extends ActionSupport{
	private TrainService trainService;
	private showTrainVO trainVO;
	public TrainService getTrainService() {
		return trainService;
	}

	public void setTrainService(TrainService trainService) {
		this.trainService = trainService;
	}

	public String page_toTrainList(){
		return "page_toTrainList";
	}
	
	public String page_toStaffTrainList(){
		return "page_toStaffTrainList";
	}
	
	//得到信息
	public void getAllByPage() throws IOException{
		System.out.println("1");
		trainService.getTrainByPage(trainVO);
		Gson gson = new Gson();
		String result = gson.toJson(trainVO);
		HttpServletResponse response = ServletActionContext.getResponse();	
		response.setContentType("text/html;charset=utf-8");
		System.out.println("分页得到履历"+result);
		PrintWriter pw =response.getWriter();
		pw.write(result);
		pw.flush();
		pw.close();
	}
	//增加
	public void addTrain() throws IOException{
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter pw =response.getWriter();
		rlzy_train ru=new rlzy_train();
		ru.setRlzy_train_id(TeamUtil.getUuid());
		ru.setTrain_name(train_name);
		ru.setTrain_startTime(train_startTime);
		ru.setTrain_overTime(train_overTime);
		ru.setTrain_pay(train_pay);
		ru.setTrain_content(train_content);
		ru.setTrain_gmt_create(TeamUtil.getStringDay());
		ru.setTrain_gmt_modified(TeamUtil.getStringSecond());
		if(trainService.judgeTrainByTrainname(train_name)){
			pw.write("samename");
			System.out.print("培训名称存在");
		}
		else{
			ru.setTrain_name(train_name);
			trainService.saveTrain(ru);
			pw.write("添加成功");
		}
		pw.flush();
		pw.close();
		
	}
	//删除
	public void deleteTrain() throws IOException{
			trainService.deleteTrain(rlzy_train_id);
			HttpServletResponse response = ServletActionContext.getResponse();
			response.setContentType("text/html;charset=utf-8");
			PrintWriter pw = response.getWriter();
			pw.write("deleteSuccess");
			pw.flush();
			pw.close();
	}
	//通过id得到一个信息
		public void getTrainById() throws IOException{
			rlzy_train rs = trainService.getTrainById(rlzy_train_id);
			HttpServletResponse response = ServletActionContext.getResponse();
			System.out.println(rlzy_train_id);
			response.setContentType("text/html;charset=utf-8");
			Gson gson = new Gson();
			String result = gson.toJson(rs);
			PrintWriter pw =response.getWriter();
			pw.write(result);
			pw.flush();
			pw.close();
		}
		//修改信息
		public void updateTrain() throws IOException{
			rlzy_train ru = trainService.getTrainById(rlzy_train_id);
			ru.setTrain_name(train_name);
			ru.setTrain_startTime(train_startTime);
			ru.setTrain_overTime(train_overTime);
			ru.setTrain_pay(train_pay);
			ru.setTrain_content(train_content);
			ru.setTrain_gmt_modified(TeamUtil.getStringSecond());
			trainService.upadteTrain(ru);
			HttpServletResponse response = ServletActionContext.getResponse();
			response.setContentType("text/html;charset=utf-8");
			PrintWriter pw = response.getWriter();
			pw.write("updataExpSuccess");
			pw.flush();
			pw.close();
		}
	
	
	
	
		private String train_name;
		private String train_startTime;
		private String train_overTime;
		private String train_pay;
		private String train_content;
		private String rlzy_train_id;
		
		
		public String getRlzy_train_id() {
			return rlzy_train_id;
		}

		public void setRlzy_train_id(String rlzy_train_id) {
			this.rlzy_train_id = rlzy_train_id;
		}

		public String getTrain_name() {
			return train_name;
		}

		public void setTrain_name(String train_name) {
			this.train_name = train_name;
		}

		public String getTrain_startTime() {
			return train_startTime;
		}

		public void setTrain_startTime(String train_startTime) {
			this.train_startTime = train_startTime;
		}

		public String getTrain_overTime() {
			return train_overTime;
		}

		public void setTrain_overTime(String train_overTime) {
			this.train_overTime = train_overTime;
		}

		public String getTrain_pay() {
			return train_pay;
		}

		public void setTrain_pay(String train_pay) {
			this.train_pay = train_pay;
		}

		public String getTrain_content() {
			return train_content;
		}

		public void setTrain_content(String train_content) {
			this.train_content = train_content;
		}

		public showTrainVO getTrainVO() {
			return trainVO;
		}

		public void setTrainVO(showTrainVO trainVO) {
			this.trainVO = trainVO;
		}
		
		
		
}
