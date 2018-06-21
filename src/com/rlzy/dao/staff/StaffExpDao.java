package com.rlzy.dao.staff;

import java.util.List;

import com.rlzy.domain.DO.rlzy_staffexp;
import com.rlzy.domain.DTO.Staff.staffExpDTO;
import com.rlzy.domain.VO.showStaffExpVO;

public interface StaffExpDao {
	//得到员工工作履历
	List<rlzy_staffexp> getStaffExps(String staffExp_staff);
	//
	rlzy_staffexp getStaffExpById(String rlzy_staffExp_id);
	//
	void deleteStaffExp(String rlzy_staffExp_id);
	//
	void deleteStaffExps(String staffExp_staff);
	
	void addStaffExps(List<rlzy_staffexp> staffExp);
	
	void updataStaffExp(rlzy_staffexp staffExp);
	//
	List<staffExpDTO> getStaffExpByPage(showStaffExpVO staffExpVO);
	//得到总数
	int getStaffExpCount(showStaffExpVO staffExpVO);
	
	String getStaffNameByStaffNumber(String staffExp_staff);
	
	void addStaffExp(rlzy_staffexp rs);
}
