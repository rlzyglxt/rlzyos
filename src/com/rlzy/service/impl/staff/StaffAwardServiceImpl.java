package com.rlzy.service.impl.staff;

import java.util.List;

import com.rlzy.dao.staff.StaffAwardDao;
import com.rlzy.domain.DO.rlzy_staffagreement;
import com.rlzy.domain.DO.rlzy_staffaward;
import com.rlzy.service.staff.StaffAwardService;

import util.TeamUtil;

public class StaffAwardServiceImpl implements StaffAwardService{
	private StaffAwardDao staffAwardDao;

	public StaffAwardDao getStaffAwardDao() {
		return staffAwardDao;
	}

	public void setStaffAwardDao(StaffAwardDao staffAwardDao) {
		this.staffAwardDao = staffAwardDao;
	}

	@Override
	public void addStaffAward(List<rlzy_staffaward> staffawards) {
		// TODO Auto-generated method stub
		for(rlzy_staffaward rlzy_staffaward : staffawards ){
			rlzy_staffaward.setRlzy_staffAward_id(TeamUtil.getUuid());
			rlzy_staffaward.setAward_gmt_create(TeamUtil.getStringSecond());
			rlzy_staffaward.setAward_gmt_modified(TeamUtil.getStringSecond());
		}
		staffAwardDao.addStaffAward(staffawards);
	}

	@Override
	public void deleteStaffAward(String rlzy_staffAward_id) {
		// TODO Auto-generated method stub
		staffAwardDao.deleteStaffAward(rlzy_staffAward_id);
	}

	@Override
	public void deleteStaffAwards(String award_staff) {
		// TODO Auto-generated method stub
		staffAwardDao.deleteStaffAwards(award_staff);
	}

	@Override
	public void updataStaffAward(rlzy_staffaward staffaward) {
		// TODO Auto-generated method stub
		rlzy_staffaward rs = staffAwardDao.getStaffAwardById(staffaward.getRlzy_staffAward_id());
		rs.setAward_amount(staffaward.getAward_amount());
		rs.setAward_gmt_modified(TeamUtil.getStringSecond());
		rs.setAward_provideReason(staffaward.getAward_provideReason());
		rs.setAward_provideDepartment(staffaward.getAward_provideDepartment());
		rs.setAward_provideTime(TeamUtil.getStringSecond());
	}

	@Override
	public List<rlzy_staffaward> getStaffAwardByStaffId(String award_staff) {
		// TODO Auto-generated method stub
		return staffAwardDao.getStaffAwardByStaffId(award_staff);
	}

	@Override
	public rlzy_staffaward getStaffAwardById(String rlzy_staffAward_id) {
		// TODO Auto-generated method stub
		return staffAwardDao.getStaffAwardById(rlzy_staffAward_id);
	}
	
}
