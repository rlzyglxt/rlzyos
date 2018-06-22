package com.rlzy.service.impl.train;

import java.util.List;
import com.rlzy.dao.train.StaffTrainDao;
import com.rlzy.domain.DO.rlzy_stafftrain;
import com.rlzy.domain.DO.rlzy_train;
import com.rlzy.domain.DTO.Staff.staffTrainDTO;
import com.rlzy.domain.VO.showStaffTrainVO;
import com.rlzy.service.train.StaffTrainService;


public class StaffTrainServiceImpl implements StaffTrainService {
	
	private StaffTrainDao staffTrainDao;

	public StaffTrainDao getStaffTrainDao() {
		return staffTrainDao;
	}

	public void setStaffTrainDao(StaffTrainDao staffTrainDao) {
		this.staffTrainDao = staffTrainDao;
	}

	@Override
	public List<rlzy_stafftrain> getStaffTrains(String stafftrain_staff) {
		return staffTrainDao.getStaffTrains(stafftrain_staff);
	}

	@Override
	public rlzy_stafftrain getStaffTrainById(String rlzy_stafftrain_id) {
		return staffTrainDao.getStaffTrainById(rlzy_stafftrain_id);
	}
	
	//修改该员工履历
	public void upadteStaffTrain(rlzy_stafftrain rs) {
		System.out.println("jilu记录="+rs);
//		rlzy_stafftrain rs = staffTrainDao.getStaffTrainById(stafftrain.getRlzy_stafftrain_id());
//		rs.setStafftrain_train(stafftrain.getStafftrain_train());
//		rs.setStafftrain_score(stafftrain.getStafftrain_score());
//		rs.setStafftrain_certificate(stafftrain.getStafftrain_certificate());
//		rs.setStafftrain_gmt_modified(TeamUtil.getStringSecond());
		staffTrainDao.updataStaffTrain(rs);
	}
	//删除该员工所有
	@Override
	public void deleteStaffTrains(String stafftrain_staff) {
		staffTrainDao.deleteStaffTrains(stafftrain_staff);
	}
	//删除员工一条履历
	@Override
	public void deleteStaffTrain(String rlzy_stafftrain_id) {
		staffTrainDao.deleteStaffTrain(rlzy_stafftrain_id);
	}

//	@Override
//	public void getStaffTrainByPage(showStaffTrainVO staffTrainVO) {
//		System.out.println("getpage");
//		int count =staffTrainDao.getStaffTrainCount(staffTrainVO);
//		System.out.println("staffTrainserviceimp::"+count);
//		staffTrainVO.setTotalPage((int) Math.ceil((double) count / (double) staffTrainVO.getPageCount()));
//		staffTrainVO.setTotalCount(count);
//		List<staffTrainDTO> staffTrains = staffTrainDao.getStaffTrainByPage(staffTrainVO);
//		System.out.println("4");
//		staffTrainVO.setStaffTrains(staffTrains);
//	}

	public String getStaffNameByStaffNumber(String stafftrain_staff) {
		return staffTrainDao.getStaffNameByStaffNumber(stafftrain_staff);
	}

	public void  addStaffTrain(rlzy_stafftrain rs) {
		staffTrainDao.addStaffTrain(rs);
	}

	@Override
	public List<rlzy_train> getTrainName() {
		return staffTrainDao.getTrainName();
	}

	@Override
	public void getStaffTrainByPage(showStaffTrainVO staffTrainVO) {
		// TODO Auto-generated method stub
		System.out.println("getpage");
		int count =staffTrainDao.getStaffTrainCount(staffTrainVO);
		System.out.println("staffTrainserviceimp::"+count);
		staffTrainVO.setTotalPage((int) Math.ceil((double) count / (double) staffTrainVO.getPageCount()));
		staffTrainVO.setTotalCount(count);
		List<staffTrainDTO> staffTrains = staffTrainDao.getStaffTrainByPage(staffTrainVO);
		System.out.println("4");
		staffTrainVO.setStaffTrains(staffTrains);
	}
}
