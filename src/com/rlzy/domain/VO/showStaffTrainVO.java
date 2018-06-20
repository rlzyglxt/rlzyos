package com.rlzy.domain.VO;

import java.util.List;

import com.rlzy.domain.DTO.Staff.staffTrainDTO;

public class showStaffTrainVO {
	private int currPage;// 当前页数
	private int totalPage; // 总页数
	private int totalCount;// 总记录数
	private int pageCount;// 一页显示条数
	private String staffTrain_staff;//工号查询
	private List<staffTrainDTO> list;
	
	public int getCurrPage() {
		System.out.println("3.2");
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
	public String getStaffTrain_staff() {
		return staffTrain_staff;
	}
	public void setStaffTrain_staff(String staffTrain_staff) {
		this.staffTrain_staff = staffTrain_staff;
	}
	public List<staffTrainDTO> getList() {
		return list;
	}
	public void setList(List<staffTrainDTO> list) {
		this.list = list;
	}
	

}
