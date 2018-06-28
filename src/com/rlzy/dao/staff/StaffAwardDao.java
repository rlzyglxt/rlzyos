package com.rlzy.dao.staff;

import java.util.List;

import com.rlzy.domain.DO.rlzy_staffaward;
import com.rlzy.domain.DTO.Staff.staffAgreementDTO;
import com.rlzy.domain.DTO.Staff.staffAwardDTO;
import com.rlzy.domain.VO.showAgreementVO;
import com.rlzy.domain.VO.showAwardVO;

public interface StaffAwardDao {
	//添加奖金记录
	void addStaffAward(List<rlzy_staffaward> staffawards);
	//删除一条奖金记录
	void deleteStaffAward(String rlzy_staffAward_id);
	//删除该员工所有奖金记录
	void deleteStaffAwards(String award_staff);
	//修改奖金记录
	void updataStaffAward(rlzy_staffaward staffaward);
	//得到个人所有奖金记录
	List<rlzy_staffaward> getStaffAwardByStaffId(String award_staff);
	//得到奖金记录
	rlzy_staffaward getStaffAwardById(String rlzy_staffAward_id);
	
	//分页显示
	List<staffAwardDTO> getStaffAwardByPage(showAwardVO showawardVO);
	//得到数量
	int getStaffAwardCount(showAwardVO showawardVO);
}
