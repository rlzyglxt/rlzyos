package com.rlzy.service.staff;

import java.util.List;

import com.rlzy.domain.DO.rlzy_staffinfo;
import com.rlzy.domain.DO.rlzy_stafftrain;
import com.rlzy.domain.DO.rlzy_train;
import com.rlzy.domain.VO.showStaffTrainVO;

public interface StaffTrainService {
	//分页得到数据
	void getStaffTrainByPage(showStaffTrainVO staffTrainVO);
	
	void addStaffTrain(List<rlzy_stafftrain> rs);
	
	List<rlzy_stafftrain> getStaffTrains(String stafftrain_staff);

	rlzy_stafftrain getStaffTrainById(String rlzy_stafftrain_id);

	void upadteStaffTrain(rlzy_stafftrain rs);

	void deleteStaffTrains(String stafftrain_staff);

	void deleteStaffTrain(String rlzy_stafftrain_id);
	
	List<rlzy_staffinfo> getStaffNameByStaffNumber(String stafftrain_staff);

	List<rlzy_train> getTrainName();

}
