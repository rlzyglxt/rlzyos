package com.rlzy.service.impl.train;

import java.util.List;
import com.rlzy.dao.train.TrainDao;
import com.rlzy.domain.DO.rlzy_train;
import com.rlzy.domain.VO.showTrainVO;
import com.rlzy.service.train.TrainService;

import util.TeamUtil;

public class TrainServiceImpl implements TrainService {
	private TrainDao trainDao;

	public TrainDao getTrainDao() {
		return trainDao;
	}

	public void setTrainDao(TrainDao trainDao) {
		this.trainDao = trainDao;
	}



	public rlzy_train getTrainById(String rlzy_train_id) {
		return trainDao.getTrainById(rlzy_train_id);
	}
	//修改
	public void upadteTrain(rlzy_train train) {
		rlzy_train rs = trainDao.getTrainById(train.getRlzy_train_id());
		rs.setTrain_name(train.getTrain_name());
		rs.setTrain_startTime(train.getTrain_startTime());
		rs.setTrain_overTime(train.getTrain_overTime());
		rs.setTrain_pay(train.getTrain_pay());
		rs.setTrain_content(train.getTrain_content());
		rs.setTrain_gmt_modified(TeamUtil.getStringSecond());
	}

	//删除
	public void deleteTrain(String rlzy_train_id) {
		// TODO Auto-generated method stub
		trainDao.deleteTrain(rlzy_train_id);
	}
	//保存
	public void saveTrain(rlzy_train ru) {
		trainDao.addTrain(ru);
	}

	public void getTrainByPage(showTrainVO trainVO) {
		System.out.println("getpage");
		int count =trainDao.getTrainCount(trainVO);
		System.out.println("staffserviceimp::"+count);
		trainVO.setTotalPage((int) Math.ceil((double) count / (double) trainVO.getPageCount()));
		trainVO.setTotalCount(count);
		List<rlzy_train> trains = trainDao.getTrainByPage(trainVO);
		trainVO.setTrains(trains);
	}
	public boolean judgeTrainByTrainname(String train_name) {
		return trainDao.judgeTrainByTrainname(train_name);
	}
}
