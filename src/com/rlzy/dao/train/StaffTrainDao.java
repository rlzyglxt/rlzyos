package com.rlzy.dao.train;

import java.util.List;

import com.rlzy.domain.DO.rlzy_stafftrain;
import com.rlzy.domain.DO.rlzy_train;
import com.rlzy.domain.DTO.Staff.staffTrainDTO;
import com.rlzy.domain.VO.showStaffTrainVO;

public interface StaffTrainDao {
	//得到员工工作履历
	List<rlzy_stafftrain> getStaffTrains(String stafftrain_staff);
	//
	rlzy_stafftrain getStaffTrainById(String rlzy_stafftrain_id);
	//
	void deleteStaffTrain(String rlzy_stafftrain_id);
	//
	void deleteStaffTrains(String stafftrain_staff);
	
	void updataStaffTrain(rlzy_stafftrain rs);
	//
	List<staffTrainDTO> getStaffTrainByPage(showStaffTrainVO staffTrainVO);
	//得到总数
	int getStaffTrainCount(showStaffTrainVO staffTrainVO);
	
	String getStaffNameByStaffNumber(String stafftrain_staff);
	
	void addStaffTrain(rlzy_stafftrain rs);
	
	List<rlzy_train> getTrainName();
}
