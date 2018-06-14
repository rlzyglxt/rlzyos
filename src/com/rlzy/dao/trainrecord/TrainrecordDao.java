package com.rlzy.dao.trainrecord;

import java.util.List;
import com.rlzy.domain.DO.rlzy_trainrecord;
import com.rlzy.domain.DTO.Staff.staffTrainDTO;
import com.rlzy.domain.VO.showTrainrecordVO;

public interface TrainrecordDao {
	//保存多条信息
	void addTrainrecord(List<rlzy_trainrecord> trainrecords);
	//通过员工工号的到培训记录
	List<rlzy_trainrecord> getTrainrecord(String staff_id);
	//保存记录
	void addTrainrecord(rlzy_trainrecord rs);
	//员工工号级联删除
	void deleteTrainrecords(String staff_id);
	//删除
	void deleteTrainrecord(String rlzy_record_id);
	//通过ID得到
	rlzy_trainrecord getTrainrecordById(String rlzy_record_id);
	//修改信息
	void updataTrainrecord(rlzy_trainrecord trainrecord);
	//通过员工工号查员工姓名
	String getStaffNameByStaffNumber(String staff_id);
	//分页查询
	int getTrainrecordCount(showTrainrecordVO trainrecordVO);
	List<staffTrainDTO> getTrainrecordByPage(showTrainrecordVO trainrecordVO);
	

}
