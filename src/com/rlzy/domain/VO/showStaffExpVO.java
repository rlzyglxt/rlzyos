package com.rlzy.domain.VO;

import java.util.List;

import com.rlzy.domain.DTO.Staff.staffExpDTO;

public class showStaffExpVO {
	private int currPage;// 当前页数
	private int totalPage; // 总页数
	private int totalCount;// 总记录数
	private int pageCount;// 一页显示条数
	private String staffExp_staff;//工号查询
	private List<staffExpDTO> staffExps;
	
	public int getCurrPage() {
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
	public String getStaffExp_staff() {
		return staffExp_staff;
	}
	public void setStaffExp_staff(String staffExp_staff) {
		this.staffExp_staff = staffExp_staff;
	}
	public List<staffExpDTO> getStaffExps() {
		return staffExps;
	}
	public void setStaffExps(List<staffExpDTO> staffExps) {
		this.staffExps = staffExps;
	}
	
}
