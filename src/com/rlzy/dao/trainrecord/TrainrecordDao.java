package com.rlzy.dao.trainrecord;

import java.util.List;
import com.rlzy.domain.DO.rlzy_stafftrain;

public interface TrainrecordDao {
	
	//得到数
	int getTrainrecordCount(String queryString, int currPage);
	//得到表
	List<rlzy_stafftrain> getTrainrecordByPage(String queryString, int currPage);
	//添加
	public void addTrainrecord(rlzy_stafftrain ru);
	//删除
	public void deleteTrainrecord(String rlzy_trainrecord_id);
	//通过ID得到
	public rlzy_stafftrain getTrainrecordById(String rlzy_trainrecord_id);
	//修改信息
	public void updateTrainrecord(rlzy_stafftrain ru);
	
}
