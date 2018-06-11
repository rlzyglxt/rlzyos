package com.rlzy.dao.trainrecord;

import java.util.List;
import com.rlzy.domain.DO.rlzy_trainrecord;

public interface TrainrecordDao {
	
	//得到数
	int getTrainrecordCount(String queryString, int currPage);
	//得到表
	List<rlzy_trainrecord> getTrainrecordByPage(String queryString, int currPage);
	//添加
	public void addTrainrecord(rlzy_trainrecord ru);
	//删除
	public void deleteTrainrecord(String rlzy_trainrecord_id);
	//通过ID得到
	public rlzy_trainrecord getTrainrecordById(String rlzy_trainrecord_id);
	//修改信息
	public void updateTrainrecord(rlzy_trainrecord ru);
	
}
