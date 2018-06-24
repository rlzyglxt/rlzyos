package com.rlzy.dao.staff;

import java.util.List;

import com.rlzy.domain.DO.rlzy_staffexp;
import com.rlzy.domain.DO.rlzy_staffinfo;
import com.rlzy.domain.DO.rlzy_staffmove;
import com.rlzy.domain.DTO.Staff.staffMoveDTO;
import com.rlzy.domain.VO.showStaffExpVO;
import com.rlzy.domain.VO.showStaffMoveVO;

public interface StaffMoveDao {
	//添加一条调动记录
		void addStaffMove(List<rlzy_staffmove> staffmove);
		//得到值通过员工工号
		List<rlzy_staffinfo> getValueByNumber(String staff_number);
		//分页得到
		List<staffMoveDTO> getStaffMoveByPage(showStaffMoveVO staffMoveVO);
		//得到总数
		int getStaffMoveCount(showStaffMoveVO staffMoveVO);
		//
		void updataStaff(rlzy_staffinfo rs);
		//删除该员工所有调动记录
		void deleteStaffMoves(String staffMove_staff);
		//删除该员工一条调动记录
		void deleteStaffMove(String rlzy_staffMove_id);
		//得到一个调动记录
		rlzy_staffmove getStaffMoveById(String rlzy_staffMove_id);
		//得到该员工所有调动记录
		List<rlzy_staffmove> getStaffMoveByStaffId(String staffMove_staff);
		//修改调配记录
		void updataStaffMove(rlzy_staffmove staffmove);
}
