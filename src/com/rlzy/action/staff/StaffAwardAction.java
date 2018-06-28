package com.rlzy.action.staff;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

import com.google.gson.Gson;
import com.opensymphony.xwork2.ActionSupport;
import com.rlzy.domain.DO.rlzy_staffaward;
import com.rlzy.domain.VO.showAwardVO;

import com.rlzy.service.staff.StaffAwardService;

public class StaffAwardAction extends ActionSupport{
	private StaffAwardService staffAwardService;
	private List<rlzy_staffaward> staffAwards;
	private rlzy_staffaward staffAward;
	private showAwardVO staffAwardVO;
	
	//添加奖金
	public void addStaffAward() throws IOException{
		staffAwardService.addStaffAward(staffAwards);
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter pw = response.getWriter();
		pw.write("addstaffAwardSuccess");
		pw.flush();
		pw.close();
	}
	//得到一个员工所有的奖金记录
	public void getStaffAwardByStaffId() throws IOException{
		List<rlzy_staffaward> rs = staffAwardService.getStaffAwardByStaffId(staffAward.getAward_staff());
		String result;
		if(rs.size() < 0){
			result = "null";
		}else{
			Gson gson = new Gson();
			/*System.out.println("得到合同");*/
			result = gson.toJson(rs);
		}
		Gson gson = new Gson();
		/*System.out.println("得到奖金记录");*/
		result = gson.toJson(rs);
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter pw = response.getWriter();
		pw.write(result);
		pw.flush();
		pw.close();
	}
	//修改奖金记录
	public void updataStaffAward() throws IOException{
		/*System.out.println("修改一下奖金记录 ");*/
		staffAwardService.updataStaffAward(staffAward);
		/*System.out.println(staffAward.getAward_provideTime());*/
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter pw = response.getWriter();
		pw.write("updataSuccess");
		pw.flush();
		pw.close();
	}
	//删除一条奖金记录
	public void deleteStaffAward() throws IOException{
		staffAwardService.deleteStaffAward(staffAward.getRlzy_staffAward_id());
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter pw = response.getWriter();
		pw.write("deleteSuccess删除奖金");
		pw.flush();
		pw.close();
	}
	//删除所有奖金记录
	public void deleteStaffAwards() throws IOException{
		staffAwardService.deleteStaffAwards(staffAward.getAward_staff());
		HttpServletResponse response = ServletActionContext.getResponse();
		/*System.out.println(staffAward.getAward_staff());*/
		response.setContentType("text/html;charset=utf-8");
		PrintWriter pw = response.getWriter();
		pw.write("deleteSuccess删除奖金合同");
		pw.flush();
		pw.close();
	}
	
	//得到所有奖金记录
	public void getStaffAwardByPages() throws IOException{
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		staffAwardService.getStaffAwardByPage(staffAwardVO);
		Gson gson = new Gson();
		String result = gson.toJson(staffAwardVO);
		PrintWriter pw = response.getWriter();
		pw.write(result);
		pw.flush();
		pw.close();
	}
	
	
	
	
	public StaffAwardService getStaffAwardService() {
		return staffAwardService;
	}
	public void setStaffAwardService(StaffAwardService staffAwardService) {
		this.staffAwardService = staffAwardService;
	}
	public List<rlzy_staffaward> getStaffAwards() {
		return staffAwards;
	}
	public void setStaffAwards(List<rlzy_staffaward> staffAwards) {
		this.staffAwards = staffAwards;
	}
	public rlzy_staffaward getStaffAward() {
		return staffAward;
	}
	public void setStaffAward(rlzy_staffaward staffAward) {
		this.staffAward = staffAward;
	}
	public showAwardVO getStaffAwardVO() {
		return staffAwardVO;
	}
	public void setStaffAwardVO(showAwardVO staffAwardVO) {
		this.staffAwardVO = staffAwardVO;
	}
}
