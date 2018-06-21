package com.rlzy.domain.DTO.Staff;

public class staffAwardDTO {
	private String rlzy_staffAward_id;//id 
	private String staff_number;//员工工号
	private String staff_name;//员工姓名
	private String staff_duty;//员工职务
	private String award_amount;//数额
	private String award_provideTime;//发放时间
	private String award_provideReason;//发放理由
	private String award_provideDepartment;//部门
	private String award_gmt_create;//创建时间
	private String award_gmt_modified;//修改时间
	
	
	
	public String getRlzy_staffAward_id() {
		return rlzy_staffAward_id;
	}
	public void setRlzy_staffAward_id(String rlzy_staffAward_id) {
		this.rlzy_staffAward_id = rlzy_staffAward_id;
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
	public String getStaff_duty() {
		return staff_duty;
	}
	public void setStaff_duty(String staff_duty) {
		this.staff_duty = staff_duty;
	}
	public String getAward_amount() {
		return award_amount;
	}
	public void setAward_amount(String award_amount) {
		this.award_amount = award_amount;
	}
	public String getAward_provideTime() {
		return award_provideTime;
	}
	public void setAward_provideTime(String award_provideTime) {
		this.award_provideTime = award_provideTime;
	}
	public String getAward_provideReason() {
		return award_provideReason;
	}
	public void setAward_provideReason(String award_provideReason) {
		this.award_provideReason = award_provideReason;
	}
	public String getAward_provideDepartment() {
		return award_provideDepartment;
	}
	public void setAward_provideDepartment(String award_provideDepartment) {
		this.award_provideDepartment = award_provideDepartment;
	}
	public String getAward_gmt_create() {
		return award_gmt_create;
	}
	public void setAward_gmt_create(String award_gmt_create) {
		this.award_gmt_create = award_gmt_create;
	}
	public String getAward_gmt_modified() {
		return award_gmt_modified;
	}
	public void setAward_gmt_modified(String award_gmt_modified) {
		this.award_gmt_modified = award_gmt_modified;
	}
	@Override
	public String toString() {
		return "staffAwardDTO [rlzy_staffAward_id=" + rlzy_staffAward_id + ", staff_number=" + staff_number
				+ ", staff_name=" + staff_name + ", staff_duty=" + staff_duty + ", award_amount=" + award_amount
				+ ", award_provideTime=" + award_provideTime + ", award_provideReason=" + award_provideReason
				+ ", award_provideDepartment=" + award_provideDepartment + ", award_gmt_create=" + award_gmt_create
				+ ", award_gmt_modified=" + award_gmt_modified + "]";
	}
	
	public staffAwardDTO(String rlzy_staffAward_id, String staff_number, String staff_name, String staff_duty,
			String award_amount, String award_provideTime, String award_provideReason, String award_provideDepartment,
			String award_gmt_create, String award_gmt_modified) {
		super();
		this.rlzy_staffAward_id = rlzy_staffAward_id;
		this.staff_number = staff_number;
		this.staff_name = staff_name;
		this.staff_duty = staff_duty;
		this.award_amount = award_amount;
		this.award_provideTime = award_provideTime;
		this.award_provideReason = award_provideReason;
		this.award_provideDepartment = award_provideDepartment;
		this.award_gmt_create = award_gmt_create;
		this.award_gmt_modified = award_gmt_modified;
	}
	
	

}
