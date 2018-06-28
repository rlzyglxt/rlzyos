package com.rlzy.domain.DO;
//员工合同表
public class rlzy_staffagreement {
	private String rlzy_agreement_id;//合同id 
	private String agreement_staff;//员工id
	private String agreement_startTime;//合同开始时间
	private String agreement_overtTime;//合同结束时间
	private String agreement_duty;//员工职务
	private String agreement_content;//合同内容
	private String agreement_remark;
	private String agreement_gmt_create;//创建时间
	private String agreement_gmt_modified;//修改时间
	public String getRlzy_agreement_id() {
		return rlzy_agreement_id;
	}
	public void setRlzy_agreement_id(String rlzy_agreement_id) {
		this.rlzy_agreement_id = rlzy_agreement_id;
	}
	public String getAgreement_staff() {
		return agreement_staff;
	}
	public void setAgreement_staff(String agreement_staff) {
		this.agreement_staff = agreement_staff;
	}
	public String getAgreement_startTime() {
		return agreement_startTime;
	}
	public void setAgreement_startTime(String agreement_startTime) {
		this.agreement_startTime = agreement_startTime;
	}
	public String getAgreement_overtTime() {
		return agreement_overtTime;
	}
	public void setAgreement_overtTime(String agreement_overtTime) {
		this.agreement_overtTime = agreement_overtTime;
	}
	public String getAgreement_duty() {
		return agreement_duty;
	}
	public void setAgreement_duty(String agreement_duty) {
		this.agreement_duty = agreement_duty;
	}
	public String getAgreement_content() {
		return agreement_content;
	}
	public void setAgreement_content(String agreement_content) {
		this.agreement_content = agreement_content;
	}
	public String getAgreement_remark() {
		return agreement_remark;
	}
	public void setAgreement_remark(String agreement_remark) {
		this.agreement_remark = agreement_remark;
	}
	public String getAgreement_gmt_create() {
		return agreement_gmt_create;
	}
	public void setAgreement_gmt_create(String agreement_gmt_create) {
		this.agreement_gmt_create = agreement_gmt_create;
	}
	public String getAgreement_gmt_modified() {
		return agreement_gmt_modified;
	}
	public void setAgreement_gmt_modified(String agreement_gmt_modified) {
		this.agreement_gmt_modified = agreement_gmt_modified;
	}
	

}
