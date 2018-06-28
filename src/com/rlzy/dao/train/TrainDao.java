package com.rlzy.dao.train;

import java.util.List;
import com.rlzy.domain.DO.rlzy_train;
import com.rlzy.domain.VO.showTrainVO;

public interface TrainDao {

	//
	public rlzy_train getTrainById(String rlzy_train_id);
	//
	public void deleteTrain(String rlzy_train_id);

	public void addTrain(rlzy_train train);
	
	public void updataTrain(rlzy_train train);
	//
	List<rlzy_train> getTrainByPage(showTrainVO trainVO);
	//得到总数
	int getTrainCount(showTrainVO trainVO);
	
	public boolean judgeTrainByTrainname(String train_name);

	
}
