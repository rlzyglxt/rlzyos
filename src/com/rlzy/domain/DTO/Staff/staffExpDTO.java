package com.rlzy.domain.DTO.Staff;

public class staffExpDTO {
	private String rlzy_staffExp_id;//员工履历表id
	private String staff_number;//员工工号
	private String staff_name;//员工姓名
	private String staffExp_address;//工作地址
	private String staffExp_startTime;//开始时间
	private String staffExp_overTime;//结束时间
	private String staffExp_remark;//备注
	
	
	public String getRlzy_staffExp_id() {
		return rlzy_staffExp_id;
	}
	public void setRlzy_staffExp_id(String rlzy_staffExp_id) {
		this.rlzy_staffExp_id = rlzy_staffExp_id;
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
	public String getStaffExp_address() {
		return staffExp_address;
	}
	public void setStaffExp_address(String staffExp_address) {
		this.staffExp_address = staffExp_address;
	}
	public String getStaffExp_startTime() {
		return staffExp_startTime;
	}
	public void setStaffExp_startTime(String staffExp_startTime) {
		this.staffExp_startTime = staffExp_startTime;
	}
	public String getStaffExp_overTime() {
		return staffExp_overTime;
	}
	public void setStaffExp_overTime(String staffExp_overTime) {
		this.staffExp_overTime = staffExp_overTime;
	}
	public String getStaffExp_remark() {
		return staffExp_remark;
	}
	public void setStaffExp_remark(String staffExp_remark) {
		this.staffExp_remark = staffExp_remark;
	}
	@Override
	public String toString() {
		return "staffExpDTO [rlzy_staffExp_id=" + rlzy_staffExp_id + ", staff_number=" + staff_number + ", staff_name="
				+ staff_name + ", staffExp_address=" + staffExp_address + ", staffExp_startTime=" + staffExp_startTime
				+ ", staffExp_overTime=" + staffExp_overTime + ", staffExp_remark=" + staffExp_remark + "]";
	}
	public staffExpDTO(String rlzy_staffExp_id, String staff_number, String staff_name, String staffExp_address,
			String staffExp_startTime, String staffExp_overTime, String staffExp_remark) {
		super();
		this.rlzy_staffExp_id = rlzy_staffExp_id;
		this.staff_number = staff_number;
		this.staff_name = staff_name;
		this.staffExp_address = staffExp_address;
		this.staffExp_startTime = staffExp_startTime;
		this.staffExp_overTime = staffExp_overTime;
		this.staffExp_remark = staffExp_remark;
	}
	
	
}
