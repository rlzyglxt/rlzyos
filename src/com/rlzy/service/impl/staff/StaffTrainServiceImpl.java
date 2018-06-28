package com.rlzy.service.impl.staff;

import java.util.List;

import com.rlzy.dao.staff.StaffTrainDao;
import com.rlzy.domain.DO.rlzy_staffexp;
import com.rlzy.domain.DO.rlzy_staffinfo;
import com.rlzy.domain.DO.rlzy_stafftrain;
import com.rlzy.domain.DO.rlzy_train;
import com.rlzy.domain.DTO.Staff.staffTrainDTO;
import com.rlzy.domain.VO.showStaffTrainVO;
import com.rlzy.service.staff.StaffTrainService;

import util.TeamUtil;

public class StaffTrainServiceImpl implements StaffTrainService {
	private StaffTrainDao staffTrainDao;

	public StaffTrainDao getStaffTrainDao() {
		return staffTrainDao;
	}

	public void setStaffTrainDao(StaffTrainDao staffTrainDao) {
		this.staffTrainDao = staffTrainDao;
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
	
	@Override
	public void addStaffTrain(List<rlzy_stafftrain> stafftrains) {
		// TODO Auto-generated method stub
		for(rlzy_stafftrain rlzy_stafftrain : stafftrains ){
			rlzy_stafftrain.setRlzy_stafftrain_id(TeamUtil.getUuid());
			rlzy_stafftrain.setStafftrain_gmt_create(TeamUtil.getStringDay());
			rlzy_stafftrain.setStafftrain_gmt_modified(TeamUtil.getStringSecond());
		}
		// TODO Auto-generated method stub
		staffTrainDao.addStaffTrain(stafftrains);
		
	}

	@Override
	public List<rlzy_stafftrain> getStaffTrains(String stafftrain_staff) {
		// TODO Auto-generated method stub
		return staffTrainDao.getStaffTrains(stafftrain_staff);
	}

	@Override
	public rlzy_stafftrain getStaffTrainById(String rlzy_stafftrain_id) {
		// TODO Auto-generated method stub
		return staffTrainDao.getStaffTrainById(rlzy_stafftrain_id);
	}

	@Override
	public void upadteStaffTrain(rlzy_stafftrain rs) {
		// TODO Auto-generated method stub
		staffTrainDao.updataStaffTrain(rs);
	}

	@Override
	public void deleteStaffTrains(String stafftrain_staff) {
		// TODO Auto-generated method stub
		staffTrainDao.deleteStaffTrains(stafftrain_staff);
	}

	@Override
	public void deleteStaffTrain(String rlzy_stafftrain_id) {
		// TODO Auto-generated method stub
		staffTrainDao.deleteStaffTrain(rlzy_stafftrain_id);
	}

	@Override
	public List<rlzy_staffinfo> getStaffNameByStaffNumber(String stafftrain_staff) {
		// TODO Auto-generated method stub
		return staffTrainDao.getValueByNumber(stafftrain_staff);
	}

	@Override
	public List<rlzy_train> getTrainName() {
		// TODO Auto-generated method stub
		return staffTrainDao.getTrainName();
	}
	
}
