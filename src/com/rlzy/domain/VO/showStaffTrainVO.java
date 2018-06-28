package com.rlzy.domain.VO;

import java.util.List;

import com.rlzy.domain.DTO.Staff.staffTrainDTO;

public class showStaffTrainVO {
	private int currPage;// 当前页数
	private int totalPage; // 总页数
	private int totalCount;// 总记录数
	private int pageCount;// 一页显示条数
	private String staff_number;//工号查询
	private String train_name;//培训名称查询
	private String staff_name;//员工姓名查询
	private List<staffTrainDTO> staffTrains;
	
	
	public String getTrain_name() {
		return train_name;
	}
	public void setTrain_name(String train_name) {
		this.train_name = train_name;
	}
	public String getStaff_name() {
		return staff_name;
	}
	public void setStaff_name(String staff_name) {
		this.staff_name = staff_name;
	}
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
	public String getStaff_number() {
		return staff_number;
	}
	public void setStaff_number(String staff_number) {
		this.staff_number = staff_number;
	}
	public List<staffTrainDTO> getStaffTrains() {
		return staffTrains;
	}
	public void setStaffTrains(List<staffTrainDTO> staffTrains) {
		this.staffTrains = staffTrains;
	}
	
	
}
