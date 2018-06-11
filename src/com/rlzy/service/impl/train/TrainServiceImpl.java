package com.rlzy.service.impl.train;

import java.util.List;

import com.rlzy.dao.train.TrainDao;
import com.rlzy.domain.DO.rlzy_train;
import com.rlzy.domain.VO.showTrainVO;
import com.rlzy.service.train.TrainService;

public class TrainServiceImpl implements TrainService {

	//分页查询培训
	public showTrainVO getTrainByPage(String queryString, int currPage) {
		showTrainVO suv = new showTrainVO();
		System.out.println("跳转到Trainserviceimpl");
		suv.setCurrPage(currPage);
		suv.setQueryString(queryString);
		suv.setPageSize(10);
		int count = trainDao.getTrainCount(queryString, currPage);
		suv.setCount(count);
		System.out.println("userservice,"+count);
		double c = count;
		int totalPage = (int) Math.ceil(c / 10);
		suv.setTotalPage(totalPage);
		List<rlzy_train> list = trainDao.getTrainByPage(queryString, currPage);
		suv.setList(list);
		System.out.println(suv);
		return suv;
	}
	
	//判断培训名称是否存在
	public boolean judgeTrainByTrainname(String train_name) {
		return trainDao.judgeTrainByTrainname(train_name);
	}
	
	//添加用户
	public void addTrain(rlzy_train ru) {
		trainDao.addTrain(ru);
	}
	
	//删除用户
	public void deleteTrain(String rlzy_train_id) {
		trainDao.deleteTrain(rlzy_train_id);
	}
	
	//部门ID得到部门
	public rlzy_train getTrainById(String rlzy_train_id) {
		rlzy_train ru = trainDao.getTrainById(rlzy_train_id);
		return ru;
	}
	
	//修改部门信息
	public void updateTrain(rlzy_train ru) {
		trainDao.updateTrain(ru);
	}

	
	
	
	
//-------------------------------------分割线----------------------------------------->
	private TrainDao trainDao;


	public TrainDao getTrainDao() {
		return trainDao;
	}
	public void setTrainDao(TrainDao trainDao) {
		this.trainDao = trainDao;
	}



	
}		
