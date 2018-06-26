package com.rlzy.domain.DTO.Staff;

import util.AgeUtil;

public class staffListDTO {
	private String rlzy_staff_id;
	private String staff_number;//工号
	private String staff_name;//名字
	private String staff_birth;//生日
	private String staff_cardid;//身份证
	private String staff_age;//年龄
	private String staff_duty;//职务
	private String staff_status;//状态
	private String staff_tel;//电话
	private String staff_sex;//性别
	private String staff_record;//学历
	private String staff_address;//家庭住址
	private String staff_depaterment;//部门
	private String staff_inTime;//入职时间
	private String staff_leaveTime;//离职时间
	private String staff_leaveReason;//离职原因
	
	public String getRlzy_staff_id() {
		return rlzy_staff_id;
	}
	public void setRlzy_staff_id(String rlzy_staff_id) {
		this.rlzy_staff_id = rlzy_staff_id;
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
	public String getStaff_birth() {
		return staff_birth;
	}
	public void setStaff_birth(String staff_birth) {
		this.staff_birth = staff_birth;
	}
	public String getStaff_cardid() {
		return staff_cardid;
	}
	public void setStaff_cardid(String staff_cardid) {
		this.staff_cardid = staff_cardid;
	}
	public String getStaff_age() {
		return staff_age;
	}
	public void setStaff_age(String staff_age) {
		this.staff_age = staff_age;
	}
	public String getStaff_duty() {
		return staff_duty;
	}
	public void setStaff_duty(String staff_duty) {
		this.staff_duty = staff_duty;
	}
	public String getStaff_status() {
		return staff_status;
	}
	public void setStaff_status(String staff_status) {
		this.staff_status = staff_status;
	}
	public String getStaff_tel() {
		return staff_tel;
	}
	public void setStaff_tel(String staff_tel) {
		this.staff_tel = staff_tel;
	}
	public String getStaff_sex() {
		return staff_sex;
	}
	public void setStaff_sex(String staff_sex) {
		this.staff_sex = staff_sex;
	}
	public String getStaff_record() {
		return staff_record;
	}
	public void setStaff_record(String staff_record) {
		this.staff_record = staff_record;
	}
	public String getStaff_address() {
		return staff_address;
	}
	public void setStaff_address(String staff_address) {
		this.staff_address = staff_address;
	}
	public String getStaff_depaterment() {
		return staff_depaterment;
	}
	public void setStaff_depaterment(String staff_depaterment) {
		this.staff_depaterment = staff_depaterment;
	}
	public String getStaff_inTime() {
		return staff_inTime;
	}
	public void setStaff_inTime(String staff_inTime) {
		this.staff_inTime = staff_inTime;
	}
	public String getStaff_leaveTime() {
		return staff_leaveTime;
	}
	public void setStaff_leaveTime(String staff_leaveTime) {
		this.staff_leaveTime = staff_leaveTime;
	}
	public String getStaff_leaveReason() {
		return staff_leaveReason;
	}
	public void setStaff_leaveReason(String staff_leaveReason) {
		this.staff_leaveReason = staff_leaveReason;
	}
	@Override
	public String toString() {
		return "staffListDTO [rlzy_staff_id=" + rlzy_staff_id + ", staff_number=" + staff_number + ", staff_name="
				+ staff_name + ", staff_birth=" + staff_birth + ", staff_cardid=" + staff_cardid + ", staff_age="
				+ staff_age + ", staff_duty=" + staff_duty + ", staff_status=" + staff_status + ", staff_tel="
				+ staff_tel + ", staff_sex=" + staff_sex + ", staff_record=" + staff_record + ", staff_address="
				+ staff_address + ", staff_depaterment=" + staff_depaterment + ", staff_inTime=" + staff_inTime
				+ ", staff_leaveTime=" + staff_leaveTime + ", staff_leaveReason=" + staff_leaveReason + "]";
	}
	public staffListDTO(String rlzy_staff_id, String staff_number, String staff_name, String staff_birth,
			String staff_cardid, String staff_age, String staff_duty, String staff_status, String staff_tel,
			String staff_sex, String staff_record, String staff_address, String staff_depaterment, String staff_inTime,
			String staff_leaveTime, String staff_leaveReason) {
		super();
		this.rlzy_staff_id = rlzy_staff_id;
		this.staff_number = staff_number;
		this.staff_name = staff_name;
		this.staff_birth = staff_birth;
		this.staff_cardid = staff_cardid;
		this.staff_age = staff_age;
		this.staff_duty = staff_duty;
		this.staff_status = staff_status;
		this.staff_tel = staff_tel;
		this.staff_sex = staff_sex;
		this.staff_record = staff_record;
		this.staff_address = staff_address;
		this.staff_depaterment = staff_depaterment;
		this.staff_inTime = staff_inTime;
		this.staff_leaveTime = staff_leaveTime;
		this.staff_leaveReason = staff_leaveReason;
	}
	
	

}
