package com.rlzy.domain.DO;
//员工基本信息表
public class rlzy_staffinfo {
	private String rlzy_staff_id;//员工id
	private String staff_number;//员工工号
	private String staff_name;//员工
	private String staff_sex;//员工性别
	private String staff_birth;//员工出生日期
	private String staff_tel;//电话
	private String staff_address;//地址
	private String staff_record;//学历
	private String staff_depaterment;//部门id外键
	private String staff_duty;//职务
	private String staff_status;//工作状态
	private String staff_inTime;//入职时间
	private String staff_leaveTime;//离职时间
	private String staff_leaveReason;//离职原因
	private String staff_gmt_create;//创建时间
	private String staff_gmt_modified;//修改时间
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
	public String getStaff_sex() {
		return staff_sex;
	}
	public void setStaff_sex(String staff_sex) {
		this.staff_sex = staff_sex;
	}
	public String getStaff_birth() {
		return staff_birth;
	}
	public void setStaff_birth(String staff_birth) {
		this.staff_birth = staff_birth;
	}
	public String getStaff_tel() {
		return staff_tel;
	}
	public void setStaff_tel(String staff_tel) {
		this.staff_tel = staff_tel;
	}
	public String getStaff_address() {
		return staff_address;
	}
	public void setStaff_address(String staff_address) {
		this.staff_address = staff_address;
	}
	public String getStaff_record() {
		return staff_record;
	}
	public void setStaff_record(String staff_record) {
		this.staff_record = staff_record;
	}
	public String getStaff_depaterment() {
		return staff_depaterment;
	}
	public void setStaff_depaterment(String staff_depaterment) {
		this.staff_depaterment = staff_depaterment;
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
	public String getStaff_gmt_create() {
		return staff_gmt_create;
	}
	public void setStaff_gmt_create(String staff_gmt_create) {
		this.staff_gmt_create = staff_gmt_create;
	}
	public String getStaff_gmt_modified() {
		return staff_gmt_modified;
	}
	public void setStaff_gmt_modified(String staff_gmt_modified) {
		this.staff_gmt_modified = staff_gmt_modified;
	}
	
	
	
}
