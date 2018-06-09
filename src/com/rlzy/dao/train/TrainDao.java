package com.rlzy.dao.train;

import java.util.List;
import com.rlzy.domain.DO.rlzy_train;

public interface TrainDao {
	
	//得到部门数
	int getTrainCount(String queryString, int currPage);
	//得到部门表
	List<rlzy_train> getTrainByPage(String queryString, int currPage);
	//判断部门是否存在
	public boolean judgeTrainByTrainname(String train_name);
	//添加部门
	public void addTrain(rlzy_train ru);
	//删除部门
	public void deleteTrain(String rlzy_train_id);
	//通过部门ID得到部门
	public rlzy_train getTrainById(String rlzy_train_id);
	//修改部门信息
	public void updateTrain(rlzy_train ru);
	
}
