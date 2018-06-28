package com.rlzy.domain.DTO.Staff;

public class staffAgreementDTO {
	private String rlzy_agreement_id;//合同id 
	private String staff_number;//员工工号
	private String staff_name;//员工姓名
	private String staff_duty;//员工职务
	private String agreement_startTime;//合同开始时间
	private String agreement_overtTime;//合同结束时间
	private String agreement_department;//部门
	private String agreement_content;//内容
	
	
	public String getRlzy_agreement_id() {
		return rlzy_agreement_id;
	}
	public void setRlzy_agreement_id(String rlzy_agreement_id) {
		this.rlzy_agreement_id = rlzy_agreement_id;
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
	public String getAgreement_department() {
		return agreement_department;
	}
	public void setAgreement_department(String agreement_department) {
		this.agreement_department = agreement_department;
	}
	public String getAgreement_content() {
		return agreement_content;
	}
	public void setAgreement_content(String agreement_content) {
		this.agreement_content = agreement_content;
	}
	@Override
	public String toString() {
		return "staffAgreementDTO [rlzy_agreement_id=" + rlzy_agreement_id + ", staff_number=" + staff_number
				+ ", staff_name=" + staff_name + ", staff_duty=" + staff_duty + ", agreement_startTime="
				+ agreement_startTime + ", agreement_overtTime=" + agreement_overtTime + ", agreement_department="
				+ agreement_department + ", agreement_content=" + agreement_content + "]";
	}
	public staffAgreementDTO(String rlzy_agreement_id, String staff_number, String staff_name, String staff_duty,
			String agreement_startTime, String agreement_overtTime, String agreement_department,
			String agreement_content) {
		super();
		this.rlzy_agreement_id = rlzy_agreement_id;
		this.staff_number = staff_number;
		this.staff_name = staff_name;
		this.staff_duty = staff_duty;
		this.agreement_startTime = agreement_startTime;
		this.agreement_overtTime = agreement_overtTime;
		this.agreement_department = agreement_department;
		this.agreement_content = agreement_content;
	}
	
	
}
