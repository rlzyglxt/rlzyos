package com.rlzy.service.staff;

import java.util.List;

import org.w3c.dom.ls.LSInput;

import com.rlzy.domain.DO.rlzy_staffinfo;
import com.rlzy.domain.DO.rlzy_staffmove;
import com.rlzy.domain.VO.showStaffMoveVO;

public interface StaffMoveService {
	//添加调动记录
		void addStaffMove(List<rlzy_staffmove> staffMove);
		//通过工号得到值
		List<rlzy_staffinfo> getValueByNumber(String staff_number);
		//分页得到员工调动记录
		void getStaffMoveByPage(showStaffMoveVO staffMoveVO);
		//
		void updataStaffInfo(rlzy_staffinfo rs);
}
