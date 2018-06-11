package com.rlzy.service.impl.trainrecord;

import java.util.List;

import com.rlzy.dao.trainrecord.TrainrecordDao;
import com.rlzy.domain.DO.rlzy_trainrecord;
import com.rlzy.domain.VO.showTrainrecordVO;
import com.rlzy.service.trainrecord.TrainrecordService;

public class TrainrecordServiceImpl implements TrainrecordService {

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
		List<rlzy_trainrecord> list = trainrecordDao.getTrainrecordByPage(queryString, currPage);
		suv.setList(list);
		System.out.println(suv);
		return suv;
	}
	
	//添加
	public void addTrainrecord(rlzy_trainrecord ru) {
		trainrecordDao.addTrainrecord(ru);
	}
	
	//删除
	public void deleteTrainrecord(String rlzy_trainrecord_id) {
		trainrecordDao.deleteTrainrecord(rlzy_trainrecord_id);
	}
	
	//ID得到
	public rlzy_trainrecord getTrainrecordById(String rlzy_trainrecord_id) {
		rlzy_trainrecord ru = trainrecordDao.getTrainrecordById(rlzy_trainrecord_id);
		return ru;
	}
	
	//修改信息
	public void updateTrainrecord(rlzy_trainrecord ru) {
		trainrecordDao.updateTrainrecord(ru);
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
