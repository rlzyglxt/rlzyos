package com.rlzy.service.train;

import java.util.List;

import com.rlzy.domain.DO.rlzy_stafftrain;
import com.rlzy.domain.DO.rlzy_train;
import com.rlzy.domain.VO.showStaffTrainVO;


public interface StaffTrainService {
	
	List<rlzy_stafftrain> getStaffTrains(String stafftrain_staff);

	rlzy_stafftrain getStaffTrainById(String rlzy_stafftrain_id);

	void upadteStaffTrain(rlzy_stafftrain rs);

	void deleteStaffTrains(String stafftrain_staff);

	void deleteStaffTrain(String rlzy_stafftrain_id);

	void getStaffTrainByPage(showStaffTrainVO staffTrainVO);
	
	String getStaffNameByStaffNumber(String stafftrain_staff);

	void addStaffTrain(rlzy_stafftrain rs);

	List<rlzy_train> getTrainName();

}
