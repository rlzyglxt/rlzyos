package com.rlzy.domain.DTO.Staff;

public class staffListDTO {
	private String rlzy_staff_id;
	private String staff_name;
	private String staff_birth;
	private String staff_status;
	private String staff_tel;
	private String staff_sex;//性别
	private String staff_record;//学历
	private String staff_address;//家庭住址
	private String staff_depaterment;//部门
	
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
	public String getRlzy_staff_id() {
		return rlzy_staff_id;
	}
	public void setRlzy_staff_id(String rlzy_staff_id) {
		this.rlzy_staff_id = rlzy_staff_id;
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
	@Override
	public String toString() {
		return "staffListDTO [rlzy_staff_id=" + rlzy_staff_id + ", staff_name=" + staff_name + ", staff_birth="
				+ staff_birth + ", staff_status=" + staff_status + ", staff_tel=" + staff_tel + ", staff_sex="
				+ staff_sex + ", staff_record=" + staff_record + ", staff_address=" + staff_address
				+ ", staff_depaterment=" + staff_depaterment + ", getStaff_sex()=" + getStaff_sex()
				+ ", getStaff_record()=" + getStaff_record() + ", getStaff_address()=" + getStaff_address()
				+ ", getStaff_depaterment()=" + getStaff_depaterment() + ", getRlzy_staff_id()=" + getRlzy_staff_id()
				+ ", getStaff_name()=" + getStaff_name() + ", getStaff_birth()=" + getStaff_birth()
				+ ", getStaff_status()=" + getStaff_status() + ", getStaff_tel()=" + getStaff_tel() + "]";
	}
	public staffListDTO(String rlzy_staff_id, String staff_name, String staff_birth, String staff_status,
			String staff_tel, String staff_sex, String staff_record, String staff_address, String staff_depaterment) {
		super();
		this.rlzy_staff_id = rlzy_staff_id;
		this.staff_name = staff_name;
		this.staff_birth = staff_birth;
		this.staff_status = staff_status;
		this.staff_tel = staff_tel;
		this.staff_sex = staff_sex;
		this.staff_record = staff_record;
		this.staff_address = staff_address;
		this.staff_depaterment = staff_depaterment;
	}
	
}
