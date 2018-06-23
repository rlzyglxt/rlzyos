package com.rlzy.service.staff;

import com.rlzy.domain.DO.rlzy_train;
import com.rlzy.domain.VO.showTrainVO;

public interface TrainService {
	public rlzy_train getTrainById(String rlzy_train_id);
	//修改该员工的信息
	public void upadteTrain(rlzy_train train);
	//删除该员工
	public void deleteTrain(String rlzy_train_id);

	public void saveTrain(rlzy_train ru);
	//分页得到
	public void getTrainByPage(showTrainVO trainVO);
	
	public boolean judgeTrainByTrainname(String train_name);
}
