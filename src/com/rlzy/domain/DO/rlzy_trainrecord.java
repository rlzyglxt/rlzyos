package com.rlzy.domain.DO;


public class rlzy_trainrecord {
	private String rlzy_record_id;//培训记录ID
	private String staff_id;//员工ID
	private String train_id;//培训类别ID
	private String record_grade;//成绩
	private String paper_name;//证书名称
	private String staffTrain_gmt_create;//创建时间
	private String staffTrain_gmt_modified;//修改时间
	
	public String getRlzy_record_id() {
		return rlzy_record_id;
	}
	public void setRlzy_record_id(String rlzy_record_id) {
		this.rlzy_record_id = rlzy_record_id;
	}
	public String getRecord_grade() {
		return record_grade;
	}
	public void setRecord_grade(String record_grade) {
		this.record_grade = record_grade;
	}
	public String getStaff_id() {
		return staff_id;
	}
	public void setStaff_id(String staff_id) {
		this.staff_id = staff_id;
	}
	public String getTrain_id() {
		return train_id;
	}
	public void setTrain_id(String train_id) {
		this.train_id = train_id;
	}
	public String getPaper_name() {
		return paper_name;
	}
	public void setPaper_name(String paper_name) {
		this.paper_name = paper_name;
	}
	public String getStaffTrain_gmt_create() {
		return staffTrain_gmt_create;
	}
	public void setStaffTrain_gmt_create(String staffTrain_gmt_create) {
		this.staffTrain_gmt_create = staffTrain_gmt_create;
	}
	public String getStaffTrain_gmt_modified() {
		return staffTrain_gmt_modified;
	}
	public void setStaffTrain_gmt_modified(String staffTrain_gmt_modified) {
		this.staffTrain_gmt_modified = staffTrain_gmt_modified;
	}
	
	
	
	
}
	

