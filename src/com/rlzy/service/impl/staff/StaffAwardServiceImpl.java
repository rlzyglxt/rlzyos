package com.rlzy.service.impl.staff;

import java.util.List;

import com.rlzy.dao.staff.StaffAwardDao;
import com.rlzy.domain.DO.rlzy_staffaward;
import com.rlzy.domain.DTO.Staff.staffAwardDTO;
import com.rlzy.domain.VO.showAwardVO;
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
			
			rlzy_staffaward.setAward_gmt_create(TeamUtil.getStringSecond());
			rlzy_staffaward.setAward_gmt_modified(TeamUtil.getStringSecond());
			rlzy_staffaward.setRlzy_staffAward_id(TeamUtil.getUuid());
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
		rs.setAward_provideTime(staffaward.getAward_provideTime());
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

	@Override
	public void getStaffAwardByPage(showAwardVO staffAwardVO) {
		// TODO Auto-generated method stub
		int count =staffAwardDao.getStaffAwardCount(staffAwardVO);
		staffAwardVO.setTotalPage((int) Math.ceil((double) count / (double) staffAwardVO.getPageCount()));
		staffAwardVO.setTotalCount(count);
		List<staffAwardDTO> staffAwards = staffAwardDao.getStaffAwardByPage(staffAwardVO);
		staffAwardVO.setStaffAwards(staffAwards);
	}
	
}
