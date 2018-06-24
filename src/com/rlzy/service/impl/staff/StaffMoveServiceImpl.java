package com.rlzy.service.impl.staff;

import java.util.List;

import com.rlzy.dao.staff.StaffMoveDao;
import com.rlzy.domain.DO.rlzy_staffaward;
import com.rlzy.domain.DO.rlzy_staffinfo;
import com.rlzy.domain.DO.rlzy_staffmove;
import com.rlzy.domain.DTO.Staff.staffMoveDTO;
import com.rlzy.domain.VO.showStaffMoveVO;
import com.rlzy.service.staff.StaffMoveService;

import util.TeamUtil;

public class StaffMoveServiceImpl implements StaffMoveService {
	private StaffMoveDao staffMoveDao;
	
	
	public StaffMoveDao getStaffMoveDao() {
		return staffMoveDao;
	}

	public void setStaffMoveDao(StaffMoveDao staffMoveDao) {
		this.staffMoveDao = staffMoveDao;
	}

	@Override
	public void addStaffMove(List<rlzy_staffmove> staffMove) {
		// TODO Auto-generated method stub
		for(rlzy_staffmove rs : staffMove ){
			rs.setRlzy_staffMove_id(TeamUtil.getUuid());
			rs.setStaffMove_gmt_create(TeamUtil.getStringSecond());
			rs.setStaffMove_gmt_modified(TeamUtil.getStringSecond());
		}		
		staffMoveDao.addStaffMove(staffMove);
	}

	@Override
	public List<rlzy_staffinfo> getValueByNumber(String staff_number) {
		// TODO Auto-generated method stub
		return staffMoveDao.getValueByNumber(staff_number);
	}

	@Override
	public void getStaffMoveByPage(showStaffMoveVO staffMoveVO) {
		// TODO Auto-generated method stub
		int count =staffMoveDao.getStaffMoveCount(staffMoveVO);
		staffMoveVO.setTotalPage((int) Math.ceil((double) count / (double) staffMoveVO.getPageCount()));
		staffMoveVO.setTotalCount(count);
		List<staffMoveDTO> staffmoves = staffMoveDao.getStaffMoveByPage(staffMoveVO);
		staffMoveVO.setStaffmoves(staffmoves);
	}

	@Override
	public void updataStaffInfo(rlzy_staffinfo rs) {
		// TODO Auto-generated method stub
		staffMoveDao.updataStaff(rs);
	}

	@Override
	public void deleteStaffMoves(String staffMove_staff) {
		// TODO Auto-generated method stub
		staffMoveDao.deleteStaffMoves(staffMove_staff);
	}

	@Override
	public void deleteStaffMove(String rlzy_staffMove_id) {
		// TODO Auto-generated method stub
		staffMoveDao.deleteStaffMove(rlzy_staffMove_id);
	}

	@Override
	public rlzy_staffmove getStaffMoveById(String rlzy_staffMove_id) {
		// TODO Auto-generated method stub
		return staffMoveDao.getStaffMoveById(rlzy_staffMove_id);
	}

	@Override
	public List<rlzy_staffmove> getStaffMoveByStaffId(String staffMove_staff) {
		// TODO Auto-generated method stub
		return staffMoveDao.getStaffMoveByStaffId(staffMove_staff);
	}

	@Override
	public void updataStaffMove(rlzy_staffmove staffmove) {
		// TODO Auto-generated method stub
		rlzy_staffmove rs = staffMoveDao.getStaffMoveById(staffmove.getRlzy_staffMove_id());
		rs.setStaffMove_nowdepartment(staffmove.getStaffMove_nowdepartment());
		rs.setStaffMove_gmt_modified(TeamUtil.getStringSecond());
		rs.setStaffMove_nowduty(staffmove.getStaffMove_nowduty());
		rs.setStaffMove_remark(staffmove.getStaffMove_remark());
		rs.setStaffMove_bfdepartment(staffmove.getStaffMove_bfdepartment());
		rs.setStaffMove_bfduty(staffmove.getStaffMove_bfduty());
	}
}
