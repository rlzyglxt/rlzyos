package com.rlzy.service.trainrecord;

import java.util.List;

import com.rlzy.domain.DO.rlzy_trainrecord;
import com.rlzy.domain.VO.showTrainrecordVO;

public interface TrainrecordService {
	
	void saveTrainrecord(List<rlzy_trainrecord> trainrecords);
	
	List<rlzy_trainrecord> getTrainrecord(String staff_id);
	//增加信息
	void addTrainrecord(rlzy_trainrecord rs);
	//删除该员工所有履历
	void deleteTrainrecords(String staff_id);
	//删除一个信息
	void deleteTrainrecord(String rlzy_record_id);
	//得到个人信息
	rlzy_trainrecord getTrainrecordById(String rlzy_record_id);
	//修改信息
	void upadteTrainrecord(rlzy_trainrecord trainrecord);
	//通过工号得到姓名
	String getStaffNameByStaffNumber(String staff_id);
	//得到信息
	void getTrainrecordByPage(showTrainrecordVO trainrecordVO);


	
	
}
