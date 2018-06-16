package com.rlzy.action.staff;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.http.HttpServletResponse;
import org.apache.struts2.ServletActionContext;
import com.google.gson.Gson;
import com.opensymphony.xwork2.ActionSupport;
import com.rlzy.domain.DO.rlzy_staffagreement;
import com.rlzy.domain.VO.showAgreementVO;
import com.rlzy.service.staff.StaffAgreementService;

public class StaffAgreementAction extends ActionSupport{
		private StaffAgreementService staffAgreementService;
		private showAgreementVO showagreementVO;
		private String rlzy_agreement_id;
		private List<rlzy_staffagreement> staffagreements;
		private rlzy_staffagreement agreement;

		
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
	//得到员工个人合同
		public void getStaffAgreementByStaffId() throws IOException{
			List<rlzy_staffagreement> rs = staffAgreementService.getStaffAgreementByStaffId(agreement.getAgreement_staff());
			String result;
			if(rs.size() < 0){
				result = "null";
			}else{
				Gson gson = new Gson();
				System.out.println("得到合同");
				result = gson.toJson(rs);
			}
			HttpServletResponse response = ServletActionContext.getResponse();
			response.setContentType("text/html;charset=utf-8");
			PrintWriter pw = response.getWriter();
			pw.write(result);
			pw.flush();
			pw.close();
		}
	//修改合同
		public void updataStaffAgreement() throws IOException{
			System.out.println(agreement.getRlzy_agreement_id());
			System.out.println("修改一下合同");
			staffAgreementService.updataStaffAgreement(agreement);
			HttpServletResponse response = ServletActionContext.getResponse();
			response.setContentType("text/html;charset=utf-8");
			PrintWriter pw = response.getWriter();
			pw.write("updataSuccess");
			pw.flush();
			pw.close();
		}
		//删除该员工全部合同
		public void deleteStaffAgreements() throws IOException{
//			rlzy_staffagreement rlzy_staffagreement = staffAgreementService.getStaffAgreementById(rlzy_agreement_id);
			staffAgreementService.deleteStaffAgreements(agreement.getAgreement_staff());
			HttpServletResponse response = ServletActionContext.getResponse();
			response.setContentType("text/html;charset=utf-8");
			PrintWriter pw = response.getWriter();
			pw.write("deleteSuccess删除全部合同");
			pw.flush();
			pw.close();
		}
		//删除一个合同
		public void deleteStaffAgreement() throws IOException{
			staffAgreementService.deleteStaffAgreement(agreement.getRlzy_agreement_id());
			HttpServletResponse response = ServletActionContext.getResponse();
			response.setContentType("text/html;charset=utf-8");
			PrintWriter pw = response.getWriter();
			pw.write("deleteSuccess删除合同");
			pw.flush();
			pw.close();
			
		}
		//增加合同
		public void addStaffAgreement() throws IOException{
			staffAgreementService.addStaffAgreement(staffagreements);
			HttpServletResponse response = ServletActionContext.getResponse();
			response.setContentType("text/html;charset=utf-8");
			PrintWriter pw = response.getWriter();
			pw.write("addSuccess");
			pw.flush();
			pw.close();
		}
		
	
		
	
		public rlzy_staffagreement getAgreement() {
			return agreement;
		}

		public void setAgreement(rlzy_staffagreement agreement) {
			this.agreement = agreement;
		}

		public List<rlzy_staffagreement> getStaffagreements() {
			return staffagreements;
		}

		public void setStaffagreements(List<rlzy_staffagreement> staffagreements) {
			this.staffagreements = staffagreements;
		}

		
		public String getRlzy_agreement_id() {
			return rlzy_agreement_id;
		}

		public void setRlzy_agreement_id(String rlzy_agreement_id) {
			this.rlzy_agreement_id = rlzy_agreement_id;
		}

		public showAgreementVO getShowagreementVO() {
			return showagreementVO;
		}

		public void setShowagreementVO(showAgreementVO showagreementVO) {
			this.showagreementVO = showagreementVO;
		}
		
}
