package com.rlzy.service.train;

import com.rlzy.domain.DO.rlzy_train;
import com.rlzy.domain.VO.showTrainVO;

public interface TrainService {


	//得到部门bypage
	public showTrainVO getTrainByPage(String queryString, int currPage);
	//判断用户是否存在
	public boolean judgeTrainByTrainname(String train_name);
	//添加用户
	public void addTrain(rlzy_train ru);
	//删除用户
	public void deleteTrain(String train_id);
	//部门id得到部门
	public rlzy_train getTrainById(String train_id);
	//修改部门信息
	public void updateTrain(rlzy_train ru);
	
	
	//增加用户
	

	
	//修改用户
	
	
}
