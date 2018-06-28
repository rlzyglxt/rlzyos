package com.rlzy.dao.staff;

import java.util.List;

import com.rlzy.domain.DO.rlzy_staffinfo;
import com.rlzy.domain.DO.rlzy_stafftrain;
import com.rlzy.domain.DO.rlzy_train;
import com.rlzy.domain.DTO.Staff.staffTrainDTO;
import com.rlzy.domain.VO.showStaffTrainVO;

public interface StaffTrainDao {
	//分页
	List<staffTrainDTO> getStaffTrainByPage(showStaffTrainVO staffTrainVO);
	//得到总数
	int getStaffTrainCount(showStaffTrainVO staffTrainVO);
	
	void addStaffTrain(List<rlzy_stafftrain> rs);
	//得到员工工作履历
	List<rlzy_stafftrain> getStaffTrains(String stafftrain_staff);
	//
	rlzy_stafftrain getStaffTrainById(String rlzy_stafftrain_id);
	//
	void deleteStaffTrain(String rlzy_stafftrain_id);
	//
	void deleteStaffTrains(String stafftrain_staff);
	
	void updataStaffTrain(rlzy_stafftrain rs);
	
//	String getStaffNameByStaffNumber(String stafftrain_staff);
	
	List<rlzy_train> getTrainName();
	
	List<rlzy_staffinfo> getValueByNumber(String staff_number);
}
