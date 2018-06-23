package com.rlzy.domain.VO;

import java.util.List;

import com.rlzy.domain.DTO.Staff.staffListDTO;


public class showStaffVO {
	
	private int currPage;// 当前页数
	private int totalPage; // 总页数
	private int totalCount;// 总记录数
	private int pageCount;// 一页显示条数
	private String staff_name; // 员工名字查询
	private String staff_sex; // 员工性别查询 
	private String staff_status;//员工状态筛选 
	private String staff_record;//学历
	private String staff_inTime="desc";//入职时间
	private List<staffListDTO> staffs;
	
	
	public String getStaff_record() {
		return staff_record;
	}
	public void setStaff_record(String staff_record) {
		this.staff_record = staff_record;
	}
	public String getStaff_inTime() {
		return staff_inTime;
	}
	public void setStaff_inTime(String staff_inTime) {
		this.staff_inTime = staff_inTime;
	}
	public String getStaff_sex() {
		return staff_sex;
	}
	public void setStaff_sex(String staff_sex) {
		this.staff_sex = staff_sex;
	}
	public String getStaff_name() {
		return staff_name;
	}
	public void setStaff_name(String staff_name) {
		this.staff_name = staff_name;
	}
	public String getStaff_status() {
		return staff_status;
	}
	public void setStaff_status(String staff_status) {
		this.staff_status = staff_status;
	}
	public int getTotalPage() {
		return totalPage;
	}
	public void setTotalPage(int totalPage) {
		this.totalPage = totalPage;
	}
	public int getCurrPage() {
		return currPage;
	}
	public void setCurrPage(int currPage) {
		this.currPage = currPage;
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
	
	
	public List<staffListDTO> getStaffs() {
		return staffs;
	}
	public void setStaffs(List<staffListDTO> staffs) {
		this.staffs = staffs;
	}
}