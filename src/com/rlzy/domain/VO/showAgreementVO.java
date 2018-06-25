package com.rlzy.domain.VO;

import java.util.List;

import com.rlzy.domain.DTO.Staff.staffAgreementDTO;

public class showAgreementVO {
	private int currPage;// 当前页数
	private int totalPage; // 总页数
	private int totalCount;// 总记录数
	private int pageCount;// 一页显示条数
//	private String staff_name; // 员工名字查询
//	private String staff_sex; // 员工性别查询 
//	private String staff_status;//员工状态筛选 
	private String queryname;//查询的内容
	private String agreement_startTime;//合同开始时间
	private String agreement_overtTime;//合同结束时间
	private List<staffAgreementDTO> staffAgreements;
	
	

	public String getQueryname() {
		return queryname;
	}
	public void setQueryname(String queryname) {
		this.queryname = queryname;
	}
	public String getAgreement_startTime() {
		return agreement_startTime;
	}
	public void setAgreement_startTime(String agreement_startTime) {
		this.agreement_startTime = agreement_startTime;
	}
	public String getAgreement_overtTime() {
		return agreement_overtTime;
	}
	public void setAgreement_overtTime(String agreement_overtTime) {
		this.agreement_overtTime = agreement_overtTime;
	}
	public int getCurrPage() {
		System.out.println("hahha 测试");
		return currPage;
	}
	public void setCurrPage(int currPage) {
		this.currPage = currPage;
	}
	public int getTotalPage() {
		return totalPage;
	}
	public void setTotalPage(int totalPage) {
		this.totalPage = totalPage;
	}
	public int getTotalCount() {
		return totalCount;
	}
	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}
	public int getPageCount() {
		return pageCount;
	}
	public void setPageCount(int pageCount) {
		this.pageCount = pageCount;
	}
	public List<staffAgreementDTO> getStaffAgreements() {
		return staffAgreements;
	}
	public void setStaffAgreements(List<staffAgreementDTO> staffAgreements) {
		this.staffAgreements = staffAgreements;
	}


	
}
