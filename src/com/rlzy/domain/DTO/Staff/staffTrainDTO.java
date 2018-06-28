package com.rlzy.domain.DTO.Staff;

public class staffTrainDTO {
	private String rlzy_stafftrain_id;//记录id 
	private String staff_number;//员工工号
	private String staff_name;//员工姓名
	private String record_grade;//成绩
	private String train_name;//培训名称
	private String paper_name;//证书名称
	private String staffTrain_gmt_create;//创建时间
	private String staffTrain_gmt_modified;//修改时间
	
	public String getRlzy_stafftrain_id() {
		return rlzy_stafftrain_id;
	}
	public void setRlzy_stafftrain_id(String rlzy_stafftrain_id) {
		this.rlzy_stafftrain_id = rlzy_stafftrain_id;
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
	public String getRecord_grade() {
		return record_grade;
	}
	public void setRecord_grade(String record_grade) {
		this.record_grade = record_grade;
	}
	public String getTrain_name() {
		return train_name;
	}
	public void setTrain_name(String train_name) {
		this.train_name = train_name;
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
	@Override
	public String toString() {
		return "staffTrainDTO [rlzy_stafftrain_id=" + rlzy_stafftrain_id + ", staff_number=" + staff_number
				+ ", staff_name=" + staff_name + ", record_grade=" + record_grade + ", train_name=" + train_name
				+ ", paper_name=" + paper_name + ", staffTrain_gmt_create=" + staffTrain_gmt_create
				+ ", staffTrain_gmt_modified=" + staffTrain_gmt_modified + "]";
	}
	public staffTrainDTO(String rlzy_stafftrain_id, String staff_number, String staff_name, String record_grade,
			String train_name, String paper_name, String staffTrain_gmt_create, String staffTrain_gmt_modified) {
		super();
		this.rlzy_stafftrain_id = rlzy_stafftrain_id;
		this.staff_number = staff_number;
		this.staff_name = staff_name;
		this.record_grade = record_grade;
		this.train_name = train_name;
		this.paper_name = paper_name;
		this.staffTrain_gmt_create = staffTrain_gmt_create;
		this.staffTrain_gmt_modified = staffTrain_gmt_modified;
	}
	
	
}
