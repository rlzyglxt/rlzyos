package com.rlzy.service.impl.trainrecord;

import java.util.List;

import com.rlzy.dao.trainrecord.TrainrecordDao;
<<<<<<< HEAD
import com.rlzy.domain.DO.rlzy_stafftrain;
=======
import com.rlzy.domain.DO.rlzy_trainrecord;
import com.rlzy.domain.DTO.Staff.staffTrainDTO;
>>>>>>> zhj
import com.rlzy.domain.VO.showTrainrecordVO;
import com.rlzy.service.trainrecord.TrainrecordService;

public class TrainrecordServiceImpl implements TrainrecordService {

<<<<<<< HEAD
	//分页查询
	public showTrainrecordVO getTrainrecordByPage(String queryString, int currPage) {
		showTrainrecordVO suv = new showTrainrecordVO();
		System.out.println("跳转到Trainserviceimpl");
		suv.setCurrPage(currPage);
		suv.setQueryString(queryString);
		suv.setPageSize(10);
		int count = trainrecordDao.getTrainrecordCount(queryString, currPage);
		suv.setCount(count);
		System.out.println("userservice,"+count);
		double c = count;
		int totalPage = (int) Math.ceil(c / 10);
		suv.setTotalPage(totalPage);
		List<rlzy_stafftrain> list = trainrecordDao.getTrainrecordByPage(queryString, currPage);
		suv.setList(list);
		System.out.println(suv);
		return suv;
	}
	
	//添加
	public void addTrainrecord(rlzy_stafftrain ru) {
		trainrecordDao.addTrainrecord(ru);
=======
	//保存多条信息
	public void saveTrainrecord(List<rlzy_trainrecord> trainrecords) {
		trainrecordDao.addTrainrecord(trainrecords);
	}
	
	//通过员工工号的到培训记录
	public List<rlzy_trainrecord> getTrainrecord(String staff_id) {
		return trainrecordDao.getTrainrecord(staff_id);
	}
	
	//保存记录
	public void addTrainrecord(rlzy_trainrecord rs) {
		trainrecordDao.addTrainrecord(rs);
	}
	
	//员工工号级联删除
	public void deleteTrainrecords(String staff_id) {
		trainrecordDao.deleteTrainrecords(staff_id);
>>>>>>> zhj
	}
	
	//删除
	public void deleteTrainrecord(String rlzy_record_id) {
		trainrecordDao.deleteTrainrecord(rlzy_record_id);
	}
	
<<<<<<< HEAD
	//ID得到
	public rlzy_stafftrain getTrainrecordById(String rlzy_trainrecord_id) {
		rlzy_stafftrain ru = trainrecordDao.getTrainrecordById(rlzy_trainrecord_id);
		return ru;
	}
	
	//修改信息
	public void updateTrainrecord(rlzy_stafftrain ru) {
		trainrecordDao.updateTrainrecord(ru);
=======
	//通过ID得到
	public rlzy_trainrecord getTrainrecordById(String rlzy_record_id) {
		return trainrecordDao.getTrainrecordById(rlzy_record_id);
	}
	
	//修改信息
	public void upadteTrainrecord(rlzy_trainrecord trainrecord) {
		trainrecordDao.updataTrainrecord(trainrecord);
	}
	
	//通过员工工号查员工姓名
	public String getStaffNameByStaffNumber(String staff_id) {
		return trainrecordDao.getStaffNameByStaffNumber(staff_id);
	}
	
	//分页查询
	public void getTrainrecordByPage(showTrainrecordVO trainrecordVO) {
		System.out.println("getpage");
		int count = trainrecordDao.getTrainrecordCount(trainrecordVO);
		System.out.println("staffserviceimp::"+count);
		trainrecordVO.setTotalPage((int) Math.ceil((double) count / (double) trainrecordVO.getPageCount()));
		trainrecordVO.setTotalCount(count);
		List<staffTrainDTO> list = trainrecordDao.getTrainrecordByPage(trainrecordVO);
		trainrecordVO.setList(list);
>>>>>>> zhj
	}

	
	
	
	
//-------------------------------------分割线----------------------------------------->
	private TrainrecordDao trainrecordDao;
	

	public TrainrecordDao getTrainrecordDao() {
		return trainrecordDao;
	}
	public void setTrainrecordDao(TrainrecordDao trainrecordDao) {
		this.trainrecordDao = trainrecordDao;
	}
	

	
}		
