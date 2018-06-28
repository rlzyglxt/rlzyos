package com.rlzy.service.impl.staff;

import java.util.List;

import com.rlzy.dao.staff.TrainDao;
import com.rlzy.domain.DO.rlzy_train;
import com.rlzy.domain.VO.showTrainVO;
import com.rlzy.service.staff.TrainService;

import util.TeamUtil;

public class TrainServiceImpl implements TrainService{
	private TrainDao trainDao;
	
	public TrainDao getTrainDao() {
		return trainDao;
	}

	public void setTrainDao(TrainDao trainDao) {
		this.trainDao = trainDao;
	}

	
	@Override
	public rlzy_train getTrainById(String rlzy_train_id) {
		// TODO Auto-generated method stub
		return trainDao.getTrainById(rlzy_train_id);
	}

	@Override
	public void upadteTrain(rlzy_train train) {
		// TODO Auto-generated method stub
		rlzy_train rs = trainDao.getTrainById(train.getRlzy_train_id());
		rs.setTrain_name(train.getTrain_name());
		rs.setTrain_startTime(train.getTrain_startTime());
		rs.setTrain_overTime(train.getTrain_overTime());
		rs.setTrain_pay(train.getTrain_pay());
		rs.setTrain_content(train.getTrain_content());
		rs.setTrain_gmt_modified(TeamUtil.getStringSecond());
	}

	@Override
	public void deleteTrain(String rlzy_train_id) {
		// TODO Auto-generated method stub
		trainDao.deleteTrain(rlzy_train_id);
	}

	@Override
	public void saveTrain(rlzy_train ru) {
		// TODO Auto-generated method stub
		trainDao.addTrain(ru);
	}

	@Override
	public void getTrainByPage(showTrainVO trainVO) {
		// TODO Auto-generated method stub
		System.out.println("getpage");
		int count =trainDao.getTrainCount(trainVO);
		System.out.println("staffserviceimp::"+count);
		trainVO.setTotalPage((int) Math.ceil((double) count / (double) trainVO.getPageCount()));
		trainVO.setTotalCount(count);
		List<rlzy_train> trains = trainDao.getTrainByPage(trainVO);
		trainVO.setTrains(trains);
	}

	@Override
	public boolean judgeTrainByTrainname(String train_name) {
		// TODO Auto-generated method stub
		return trainDao.judgeTrainByTrainname(train_name);
	}

}
