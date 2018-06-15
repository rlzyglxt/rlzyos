package com.rlzy.service.trainrecord;

<<<<<<< HEAD
import com.rlzy.domain.DO.rlzy_stafftrain;
import com.rlzy.domain.VO.showTrainrecordVO;

public interface TrainrecordService {


	//得到记录bypage
	public showTrainrecordVO getTrainrecordByPage(String queryString, int currPage);
	//添加记录
	public void addTrainrecord(rlzy_stafftrain ru);
	//删除记录
	public void deleteTrainrecord(String record_id);
	//记录id得到记录
	public rlzy_stafftrain getTrainrecordById(String record_id);
	//修改记录信息
	public void updateTrainrecord(rlzy_stafftrain ru);
	//增加用户
=======
import java.util.List;

import com.rlzy.domain.DO.rlzy_trainrecord;
import com.rlzy.domain.VO.showTrainrecordVO;

public interface TrainrecordService {
>>>>>>> zhj
	
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
