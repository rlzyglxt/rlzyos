package com.rlzy.action.train;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletResponse;
import org.apache.struts2.ServletActionContext;
import com.google.gson.Gson;
import com.opensymphony.xwork2.ActionSupport;
import com.rlzy.domain.DO.rlzy_train;
import com.rlzy.domain.VO.showTrainVO;
import com.rlzy.service.train.TrainService;
import util.TeamUtil;

public class TrainAction extends ActionSupport{
	
	//去到列表页面
	public String toTrainlist() {
		return "toTrainlist";
	}
	
	//获取所有培训
		public void getTrainByPage() throws IOException{
			System.out.println("fdsljfldsk");
			showTrainVO suv = trainService.getTrainByPage(queryString, currPage);
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
		
		//添加用户
		public void addTrain() throws IOException{
			System.out.println("1");
			HttpServletResponse response=ServletActionContext.getResponse();
			response.setContentType("text/html;charset=utf-8");
			PrintWriter pw=response.getWriter();
			rlzy_train ru=new rlzy_train();
			ru.setRlzy_train_id(TeamUtil.getUuid());
			ru.setTrain_name(train_name);
			ru.setTrain_begintime(train_begintime);
			ru.setTrain_endtime(train_endtime);
			ru.setTrain_cost(train_cost);
			ru.setTrain_content(train_content);
			if(trainService.judgeTrainByTrainname(train_name)){
				pw.write("培训名称存在");
				System.out.println("培训名称存在");
			}
			else{
				ru.setTrain_name(train_name);
				trainService.addTrain(ru);
				System.out.println("添加成功");
				pw.write("添加成功");
			}
			pw.flush();
			pw.close();
		}
		
		//删除用户
		public void deleteTrain() throws IOException{
			System.out.println(train_id);
			HttpServletResponse response=ServletActionContext.getResponse();
			response.setContentType("text/html;charset=utf-8");
			PrintWriter pw=response.getWriter();
			trainService.deleteTrain(train_id);
			pw.write("删除成功");
			pw.flush();
			pw.close();
		}
		
		//通过部门ID查询部门
		public void getTrainById() throws IOException {
			HttpServletResponse response = ServletActionContext.getResponse();
			response.setContentType("text/html;charset=utf-8");
			PrintWriter pw = response.getWriter();
			rlzy_train ru = trainService.getTrainById(train_id);
			Gson gson = new Gson();
			String result = gson.toJson(ru);
			pw.write(result);
			pw.flush();
			pw.close();
		}
		
		//修改用户
		public void updateTrain() throws IOException{
			rlzy_train ru=new rlzy_train();
			rlzy_train ruGet=trainService.getTrainById(train_id);
			ru.setRlzy_train_id(train_id);
			ru.setTrain_name(train_name);
			ru.setTrain_begintime(train_begintime);
			ru.setTrain_endtime(train_endtime);
			ru.setTrain_cost(train_cost);
			ru.setTrain_content(train_content);
			trainService.updateTrain(ru);
		}
		
//-------------------------------------分割线------------------------------------------------>
	private TrainService trainService;
	private showTrainVO trainVO;
	private rlzy_train train;
	private String queryString;
	private int currPage;
	private String train_id;
	private String train_name;
	private String train_begintime;
	private String train_endtime;
	private String train_cost;
	private String train_content;
	
	public String getTrain_id() {
		return train_id;
	}
	public void setTrain_id(String train_id) {
		this.train_id = train_id;
	}
	public String getTrain_name() {
		return train_name;
	}
	public void setTrain_name(String train_name) {
		this.train_name = train_name;
	}
	public String getTrain_begintime() {
		return train_begintime;
	}
	public void setTrain_begintime(String train_begintime) {
		this.train_begintime = train_begintime;
	}
	public String getTrain_endtime() {
		return train_endtime;
	}
	public void setTrain_endtime(String train_endtime) {
		this.train_endtime = train_endtime;
	}
	public String getTrain_cost() {
		return train_cost;
	}
	public void setTrain_cost(String train_cost) {
		this.train_cost = train_cost;
	}
	public String getTrain_content() {
		return train_content;
	}
	public void setTrain_content(String train_content) {
		this.train_content = train_content;
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
	
	public showTrainVO getTrainVO() {
		return trainVO;
	}
	public void setTrainVO(showTrainVO trainVO) {
		this.trainVO = trainVO;
	}

	public rlzy_train getTrain() {
		return train;
	}
	public void setTrain(rlzy_train train) {
		this.train = train;
	}

	public TrainService getTrainService() {
		return trainService;
	}
	public void setTrainService(TrainService trainService) {
		this.trainService = trainService;
	}
	

	
}
