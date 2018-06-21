package com.rlzy.domain.VO;

import java.util.List;

import com.rlzy.domain.DTO.Staff.staffMoveDTO;

public class showStaffMoveVO {
	private int currPage;// 当前页数
	private int totalPage; // 总页数
	private int totalCount;// 总记录数
	private int pageCount;// 一页显示条数
	private String staff_name; // 员工名字查询
	private String staff_number;//工号查询
	private String staffMove_time="desc";//调动时间排序
	private List<staffMoveDTO> staffmoves;
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
	public String getStaff_name() {
		return staff_name;
	}
	public void setStaff_name(String staff_name) {
		this.staff_name = staff_name;
	}
	public String getStaff_number() {
		return staff_number;
	}
	public void setStaff_number(String staff_number) {
		this.staff_number = staff_number;
	}
	public String getStaffMove_time() {
		return staffMove_time;
	}
	public void setStaffMove_time(String staffMove_time) {
		this.staffMove_time = staffMove_time;
	}
	public List<staffMoveDTO> getStaffmoves() {
		return staffmoves;
	}
	public void setStaffmoves(List<staffMoveDTO> staffmoves) {
		this.staffmoves = staffmoves;
	}

	
	
}
