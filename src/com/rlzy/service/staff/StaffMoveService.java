package com.rlzy.service.staff;

import java.util.List;

import com.rlzy.domain.DO.rlzy_staffinfo;
import com.rlzy.domain.DO.rlzy_staffmove;

public interface StaffMoveService {
	//添加调动记录
	void addStaffMove(rlzy_staffmove staffMove);
	//通过工号得到值
	rlzy_staffinfo getValueByNumber(String staff_number);
}
