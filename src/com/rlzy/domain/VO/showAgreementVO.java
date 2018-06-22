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
	private List<staffAgreementDTO> staffAgreements;
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
