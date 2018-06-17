package com.rlzy.dao.staff;


import com.rlzy.domain.DO.rlzy_staffinfo;
import com.rlzy.domain.DO.rlzy_staffmove;

public interface StaffMoveDao {
	//添加一条调动记录
	void addStaffMove(rlzy_staffmove staffmove);
	//得到值通过员工工号
	rlzy_staffinfo getValueByNumber(String staff_number);
}
