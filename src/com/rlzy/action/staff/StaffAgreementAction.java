package com.rlzy.action.staff;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

import com.google.gson.Gson;
import com.opensymphony.xwork2.ActionSupport;
import com.rlzy.domain.VO.showAgreementVO;
import com.rlzy.service.staff.StaffAgreementService;

public class StaffAgreementAction extends ActionSupport{
	private StaffAgreementService staffAgreementService;

	public StaffAgreementService getStaffAgreementService() {
		return staffAgreementService;
	}

	public void setStaffAgreementService(StaffAgreementService staffAgreementService) {
		this.staffAgreementService = staffAgreementService;
	}
	
	
	//分页获取所有合同
		public void getStaffAgreementByPage() throws IOException{
			staffAgreementService.getStaffAgreementByPage(showagreementVO);
			Gson gson = new Gson();
			String result = gson.toJson(showagreementVO);
			HttpServletResponse response = ServletActionContext.getResponse();
			response.setContentType("text/html;charset=utf-8");
			System.out.println(result);
			PrintWriter pw =response.getWriter();
			pw.write(result);
			pw.flush();
			pw.close();
		}
//		//删除员工
//		public void deleteStaff() throws IOException{
//			rlzy_staffinfo staff = staffAgreementService.getStaffById(rlzy_staff_id);
//			staffAgreementService.deleteStaff(staff);
//			HttpServletResponse response = ServletActionContext.getResponse();
//			response.setContentType("text/html;charset=utf-8");
//			PrintWriter pw = response.getWriter();
//			pw.write("deleteSuccess");
//			pw.flush();
//			pw.close();
//		}
//		//修改员工信息
//		public void updataStaff() throws IOException{
//			staff.setRlzy_staff_id(rlzy_staff_id);
//			System.out.println(staff);
//			staffAgreementService.updataStaff(staff);
//			HttpServletResponse response = ServletActionContext.getResponse();
//			response.setContentType("text/html;charset=utf-8");
//			PrintWriter pw = response.getWriter();
//			pw.write("updataSuccess");
//			pw.flush();
//			pw.close();
//		}
//		//增加员工
//		public void addStaff() throws IOException{
//			staffAgreementService.addStaff(staff);
//			HttpServletResponse response = ServletActionContext.getResponse();
//			response.setContentType("text/html;charset=utf-8");
//			PrintWriter pw = response.getWriter();
//			pw.write("addSuccess");
//			pw.flush();
//			pw.close();
//		}
//		
		private showAgreementVO showagreementVO;

		public showAgreementVO getShowagreementVO() {
			return showagreementVO;
		}

		public void setShowagreementVO(showAgreementVO showagreementVO) {
			this.showagreementVO = showagreementVO;
		}
		
}
