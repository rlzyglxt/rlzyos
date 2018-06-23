package com.rlzy.domain.DO;
//奖金发放表
public class rlzy_staffaward {
	private String rlzy_staffAward_id;//奖金发放id
	private String award_staff;//奖金发放员工id
	private String award_amount;//奖金数额
	private String award_provideTime;//奖金发放时间
	private String award_provideReason;//发放理由
	private String award_provideDepartment;//发放部门
	private String award_gmt_create;//创建时间
	private String award_gmt_modified;//修改时间
	public String getRlzy_staffAward_id() {
		return rlzy_staffAward_id;
	}
	public void setRlzy_staffAward_id(String rlzy_staffAward_id) {
		this.rlzy_staffAward_id = rlzy_staffAward_id;
	}
	public String getAward_staff() {
		return award_staff;
	}
	public void setAward_staff(String award_staff) {
		this.award_staff = award_staff;
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
	
	
}
