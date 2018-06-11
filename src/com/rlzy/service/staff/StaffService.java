package com.rlzy.service.staff;

import com.rlzy.domain.DO.rlzy_staffinfo;
import com.rlzy.domain.VO.showStaffVO;

public interface StaffService {
	//得到用户bypage
	void getStaffByPage(showStaffVO staffVO);
	//通过
	rlzy_staffinfo getStaffById(String rlzy_staff_id);
	//增加用户
	void addStaff(rlzy_staffinfo staff);
	//删除用户
	void deleteStaff(rlzy_staffinfo staff);
	//修改用户
	void updataStaff(rlzy_staffinfo staff);
}
