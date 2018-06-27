package com.rlzy.dao.staff;

import java.util.List;

import com.rlzy.domain.DO.rlzy_staffinfo;
import com.rlzy.domain.DTO.Staff.staffListDTO;
import com.rlzy.domain.VO.showStaffVO;

public interface StaffDao {
	//得到所有员工
	List<rlzy_staffinfo> getAllStaff();
	//得到员工数
	int getStaffCount(showStaffVO showstaffVO);
	//得到员工bypage
	List<staffListDTO> getStaffByPage(showStaffVO showstaffVO);
	//删除员工
	void deleteStaff(rlzy_staffinfo staff);
	//修改员工
	void updataStaff(rlzy_staffinfo staff);
	//增加员工
	void addStaff(rlzy_staffinfo staff);
	//得到员工byid
	rlzy_staffinfo getStaffById(String rlzy_staff_id);
}
