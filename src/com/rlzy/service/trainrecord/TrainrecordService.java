package com.rlzy.service.trainrecord;

import com.rlzy.domain.DO.rlzy_trainrecord;
import com.rlzy.domain.VO.showTrainrecordVO;

public interface TrainrecordService {


	//得到记录bypage
	public showTrainrecordVO getTrainrecordByPage(String queryString, int currPage);
	//添加记录
	public void addTrainrecord(rlzy_trainrecord ru);
	//删除记录
	public void deleteTrainrecord(String record_id);
	//记录id得到记录
	public rlzy_trainrecord getTrainrecordById(String record_id);
	//修改记录信息
	public void updateTrainrecord(rlzy_trainrecord ru);
	//增加用户
	

	
	//修改用户
	
	
}
