package com.rlzy.domain.DTO.Staff;

public class staffMoveDTO {
	private String rlzy_staffMove_id;
	private String staff_number;
	private String staff_name;
	private String staffMove_time;
	private String staffMove_nowdepartment;
	private String staffMove_bfdepartment;
	private String staffMove_bfduty;
	private String staffMove_nowduty;
	private String staffMove_remark;
	public String getRlzy_staffMove_id() {
		return rlzy_staffMove_id;
	}
	public void setRlzy_staffMove_id(String rlzy_staffMove_id) {
		this.rlzy_staffMove_id = rlzy_staffMove_id;
	}
	public String getStaff_number() {
		return staff_number;
	}
	public void setStaff_number(String staff_number) {
		this.staff_number = staff_number;
	}
	public String getStaff_name() {
		return staff_name;
	}
	public void setStaff_name(String staff_name) {
		this.staff_name = staff_name;
	}
	public String getStaffMove_time() {
		return staffMove_time;
	}
	public void setStaffMove_time(String staffMove_time) {
		this.staffMove_time = staffMove_time;
	}
	public String getStaffMove_nowdepartment() {
		return staffMove_nowdepartment;
	}
	public void setStaffMove_nowdepartment(String staffMove_nowdepartment) {
		this.staffMove_nowdepartment = staffMove_nowdepartment;
	}
	public String getStaffMove_bfdepartment() {
		return staffMove_bfdepartment;
	}
	public void setStaffMove_bfdepartment(String staffMove_bfdepartment) {
		this.staffMove_bfdepartment = staffMove_bfdepartment;
	}
	public String getStaffMove_bfduty() {
		return staffMove_bfduty;
	}
	public void setStaffMove_bfduty(String staffMove_bfduty) {
		this.staffMove_bfduty = staffMove_bfduty;
	}
	public String getStaffMove_nowduty() {
		return staffMove_nowduty;
	}
	public void setStaffMove_nowduty(String staffMove_nowduty) {
		this.staffMove_nowduty = staffMove_nowduty;
	}
	public String getStaffMove_remark() {
		return staffMove_remark;
	}
	public void setStaffMove_remark(String staffMove_remark) {
		this.staffMove_remark = staffMove_remark;
	}
	@Override
	public String toString() {
		return "staffMoveDTO [rlzy_staffMove_id=" + rlzy_staffMove_id + ", staff_number=" + staff_number
				+ ", staff_name=" + staff_name + ", staffMove_time=" + staffMove_time + ", staffMove_nowdepartment="
				+ staffMove_nowdepartment + ", staffMove_bfdepartment=" + staffMove_bfdepartment + ", staffMove_bfduty="
				+ staffMove_bfduty + ", staffMove_nowduty=" + staffMove_nowduty + ", staffMove_remark="
				+ staffMove_remark + "]";
	}
	public staffMoveDTO(String rlzy_staffMove_id, String staff_number, String staff_name, String staffMove_time,
			String staffMove_nowdepartment, String staffMove_bfdepartment, String staffMove_bfduty,
			String staffMove_nowduty, String staffMove_remark) {
		super();
		this.rlzy_staffMove_id = rlzy_staffMove_id;
		this.staff_number = staff_number;
		this.staff_name = staff_name;
		this.staffMove_time = staffMove_time;
		this.staffMove_nowdepartment = staffMove_nowdepartment;
		this.staffMove_bfdepartment = staffMove_bfdepartment;
		this.staffMove_bfduty = staffMove_bfduty;
		this.staffMove_nowduty = staffMove_nowduty;
		this.staffMove_remark = staffMove_remark;
	}
	
	
	
}
