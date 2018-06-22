package com.rlzy.action.train;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import javax.servlet.http.HttpServletResponse;
import org.apache.struts2.ServletActionContext;
import com.google.gson.Gson;
import com.opensymphony.xwork2.ActionSupport;
import com.rlzy.domain.DO.rlzy_stafftrain;
import com.rlzy.domain.DO.rlzy_train;
import com.rlzy.domain.VO.showStaffTrainVO;
import com.rlzy.service.train.StaffTrainService;
import util.TeamUtil;

public class StaffTrainAction extends ActionSupport{
		private StaffTrainService staffTrainService;
		private rlzy_stafftrain stafftrain;
		private showStaffTrainVO staffTrainVO;
		private List<rlzy_stafftrain> staffTrains;
		private String rlzy_stafftrain_id;//培训记录ID
		private String stafftrain_staff;//员工id
		private String stafftrain_score;//成绩
		private String stafftrain_train;//培训类别
		private String stafftrain_certificate;//证书
		private String stafftrain_gmt_create;//创建时间
		private String stafftrain_gmt_modified;//修改时间

		
		
		//得到所有
		public void getAllStaffTrainByPage() throws IOException{
			System.out.println("1");
			System.out.println("页数"+staffTrainVO.getCurrPage());
			System.out.println(staffTrainVO.getPageCount());
			staffTrainService.getStaffTrainByPage(staffTrainVO);
			System.out.println("分页得到培训记录");
			Gson gson = new Gson();
			String result = gson.toJson(staffTrainVO);
			HttpServletResponse response = ServletActionContext.getResponse();
			response.setContentType("text/html;charset=utf-8");
			System.out.println("分页得到培训记录"+result);
			PrintWriter pw =response.getWriter();
			pw.write(result);
			pw.flush();
			pw.close();
		}
		//增加
		public void addStaffTrain() throws IOException{
			HttpServletResponse response = ServletActionContext.getResponse();
			response.setContentType("text/html;charset=utf-8");
			PrintWriter pw =response.getWriter();
			rlzy_stafftrain ru=new rlzy_stafftrain();
			ru.setRlzy_stafftrain_id(TeamUtil.getUuid());
			ru.setStafftrain_staff(stafftrain_staff);
			ru.setStafftrain_score(stafftrain_score);
			ru.setStafftrain_train(stafftrain_train);
			ru.setStafftrain_certificate(stafftrain_certificate);
			ru.setStafftrain_gmt_create(TeamUtil.getStringSecond());
			ru.setStafftrain_gmt_modified(TeamUtil.getStringSecond());
			staffTrainService.addStaffTrain(ru);
			pw.write("addsuccess");
			pw.flush();
			pw.close();
			
		}
		//删除一个信息
		public void deleteStaffTrain() throws IOException{
				staffTrainService.deleteStaffTrain(rlzy_stafftrain_id);
				HttpServletResponse response = ServletActionContext.getResponse();
				response.setContentType("text/html;charset=utf-8");
				PrintWriter pw = response.getWriter();
				pw.write("deleteSuccess");
				pw.flush();
				pw.close();
		}
		
		//删除全部信息
		public void deleteStaffTrains() throws IOException{
				staffTrainService.deleteStaffTrains(stafftrain.getStafftrain_staff());
				System.out.println("得到id"+stafftrain.getStafftrain_staff());
				System.out.println("删除多个履历");
				HttpServletResponse response = ServletActionContext.getResponse();
				response.setContentType("text/html;charset=utf-8");
				PrintWriter pw = response.getWriter();
				pw.write("履历deleteSuccess履历");
				pw.flush();
				pw.close();
		}
		
	//得到姓名
		public void getTrainName() throws IOException{
			HttpServletResponse response = ServletActionContext.getResponse();
			response.setContentType("text/html;charset=utf-8");
			List<rlzy_train> trains = staffTrainService.getTrainName();
			String result;
			Gson gson = new Gson();
			result = gson.toJson(trains);
			PrintWriter pw =response.getWriter();
			pw.write(result);
			pw.flush();
			pw.close();
		}
	
		//通过工号得到姓名
		public void getStaffNameByStaffNumber() throws IOException{
			HttpServletResponse response = ServletActionContext.getResponse();
			response.setContentType("text/html;charset=utf-8");
			String relsult = staffTrainService.getStaffNameByStaffNumber(stafftrain_staff);
			Gson gson = new Gson();
			String result = gson.toJson(relsult);
			PrintWriter pw =response.getWriter();
			pw.write(result);
			pw.flush();
			pw.close();
		}
		
		//通过id得到一个信息
		public void getStaffTrainById() throws IOException{
			rlzy_stafftrain rs = staffTrainService.getStaffTrainById(rlzy_stafftrain_id);
			HttpServletResponse response = ServletActionContext.getResponse();
			System.out.println(rlzy_stafftrain_id);
			response.setContentType("text/html;charset=utf-8");
			Gson gson = new Gson();
			String result = gson.toJson(rs);
			PrintWriter pw =response.getWriter();
			pw.write(result);
			pw.flush();
			pw.close();
		}
		
		//通过员工id得到全部信息
		public void getStaffTrainsByStaffId() throws IOException{
			List<rlzy_stafftrain> staffTrains = staffTrainService.getStaffTrains(stafftrain.getStafftrain_staff());
			String result;
			if (staffTrains.size() <= 0) {
				result = "staffTriansIsNull";
			} else {
				Gson gson = new Gson();
				result = gson.toJson(staffTrains);
			}
			HttpServletResponse response = ServletActionContext.getResponse();
			response.setContentType("text/html;charset=utf-8");
			PrintWriter pw = response.getWriter();
			pw.write(result);
			pw.flush();
			pw.close();
	
		}
		
		
		//修改工作信息
		public void updateStaffTrain() throws IOException{
			rlzy_stafftrain rs = staffTrainService.getStaffTrainById(rlzy_stafftrain_id);
			rs.setStafftrain_staff(stafftrain_staff);
			rs.setStafftrain_train(stafftrain_train);
			rs.setStafftrain_score(stafftrain_score);
			rs.setStafftrain_certificate(stafftrain_certificate);
			rs.setStafftrain_gmt_modified(TeamUtil.getStringSecond());
	//		System.out.println("修改记录");
			staffTrainService.upadteStaffTrain(rs);
			HttpServletResponse response = ServletActionContext.getResponse();
			response.setContentType("text/html;charset=utf-8");
			PrintWriter pw = response.getWriter();
			pw.write("updataExpSuccess");
			pw.flush();
			pw.close();
		}
	
		
		
		public StaffTrainService getStaffTrainService() {
			return staffTrainService;
		}
		public void setStaffTrainService(StaffTrainService staffTrainService) {
			this.staffTrainService = staffTrainService;
		}
		public rlzy_stafftrain getStafftrain() {
			return stafftrain;
		}
		public void setStafftrain(rlzy_stafftrain stafftrain) {
			this.stafftrain = stafftrain;
		}
		public List<rlzy_stafftrain> getStaffTrains() {
			return staffTrains;
		}
		public void setStaffTrains(List<rlzy_stafftrain> staffTrains) {
			this.staffTrains = staffTrains;
		}
		public String getRlzy_stafftrain_id() {
			return rlzy_stafftrain_id;
		}
		public void setRlzy_stafftrain_id(String rlzy_stafftrain_id) {
			this.rlzy_stafftrain_id = rlzy_stafftrain_id;
		}
		public String getStafftrain_staff() {
			return stafftrain_staff;
		}
		public void setStafftrain_staff(String stafftrain_staff) {
			this.stafftrain_staff = stafftrain_staff;
		}
		public String getStafftrain_score() {
			return stafftrain_score;
		}
		public void setStafftrain_score(String stafftrain_score) {
			this.stafftrain_score = stafftrain_score;
		}
		public String getStafftrain_train() {
			return stafftrain_train;
		}
		public void setStafftrain_train(String stafftrain_train) {
			this.stafftrain_train = stafftrain_train;
		}
		public String getStafftrain_certificate() {
			return stafftrain_certificate;
		}
		public void setStafftrain_certificate(String stafftrain_certificate) {
			this.stafftrain_certificate = stafftrain_certificate;
		}
		public String getStafftrain_gmt_create() {
			return stafftrain_gmt_create;
		}
		public void setStafftrain_gmt_create(String stafftrain_gmt_create) {
			this.stafftrain_gmt_create = stafftrain_gmt_create;
		}
		public String getStafftrain_gmt_modified() {
			return stafftrain_gmt_modified;
		}
		public void setStafftrain_gmt_modified(String stafftrain_gmt_modified) {
			this.stafftrain_gmt_modified = stafftrain_gmt_modified;
		}
		public showStaffTrainVO getStaffTrainVO() {
			return staffTrainVO;
		}
		public void setStaffTrainVO(showStaffTrainVO staffTrainVO) {
			this.staffTrainVO = staffTrainVO;
		}	
		
}
