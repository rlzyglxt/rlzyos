package com.rlzy.dao.depaterment;

import java.util.List;

import com.rlzy.domain.DO.rlzy_staff;
import com.rlzy.domain.DTO.Staff.staffListDTO;
import com.rlzy.domain.VO.showStaffVO;

public interface DepatermentDao {
	//得到所有员工
	List<rlzy_staff> getAllStaff(String duty);
	//得到员工数
	int getStaffCount(showStaffVO showstaffVO);
	
	List<staffListDTO> getStaffByPage(showStaffVO showstaffVO);
	
}
