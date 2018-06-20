package com.rlzy.service.train;

import java.util.List;

import com.rlzy.domain.DO.rlzy_stafftrain;
import com.rlzy.domain.DO.rlzy_train;
import com.rlzy.domain.VO.showStaffTrainVO;


public interface StaffTrainService {
	
	List<rlzy_stafftrain> getStaffTrains(String stafftrain_staff);

	rlzy_stafftrain getStaffTrainById(String rlzy_stafftrain_id);
	//修改该员工的信息
	void upadteStaffTrain(rlzy_stafftrain rs);
	//删除该员工所有履历
	void deleteStaffTrains(String stafftrain_staff);
	//删除该员工一条履历
	void deleteStaffTrain(String rlzy_stafftrain_id);
	//分页得到工作履历
	void getStaffTrainByPage(showStaffTrainVO staffTrainVO);
	
	String getStaffNameByStaffNumber(String stafftrain_staff);

	void addStaffTrain(rlzy_stafftrain rs);

	List<rlzy_train> getTrainName();

}
