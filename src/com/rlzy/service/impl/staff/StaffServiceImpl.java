package com.rlzy.service.impl.staff;

import java.util.List;

import com.rlzy.dao.staff.StaffDao;
import com.rlzy.dao.user.UserDao;
import com.rlzy.domain.DO.rlzy_staffinfo;
import com.rlzy.domain.DTO.Staff.staffListDTO;
import com.rlzy.domain.VO.showStaffVO;
import com.rlzy.service.staff.StaffService;

import util.TeamUtil;

public class StaffServiceImpl implements StaffService {
	private StaffDao staffDao;

	public StaffDao getStaffDao() {
		return staffDao;
	}

	public void setStaffDao(StaffDao staffDao) {
		this.staffDao = staffDao;
	}

	@Override
	public void getStaffByPage(showStaffVO staffVO) {
		// TODO Auto-generated method stub
		System.out.println("getpage");
		int count =staffDao.getStaffCount(staffVO);
		System.out.println("staffserviceimp::"+count);
		staffVO.setTotalPage((int) Math.ceil((double) count / (double) staffVO.getPageCount()));
		staffVO.setTotalCount(count);
		List<staffListDTO> staffs = staffDao.getStaffByPage(staffVO);
		staffVO.setStaffs(staffs);
		System.out.println("setstaff");
//		return staffVO.getStaffs();
	}

	@Override
	public void addStaff(rlzy_staffinfo staff) {
		// TODO Auto-generated method stub
		staff.setRlzy_staff_id(TeamUtil.getUuid());
		staffDao.addStaff(staff);;
	}

	@Override
	public void deleteStaff(rlzy_staffinfo staff) {
		// TODO Auto-generated method stub
		staffDao.deleteStaff(staff);
	}

	@Override
	public void updataStaff(rlzy_staffinfo staff) {
		// TODO Auto-generated method stub
//		staffDao.getStaffById(rlzy_staff_id)
		staffDao.updataStaff(staff);		
	}

	@Override
	public rlzy_staffinfo getStaffById(String rlzy_staff_id) {
		// TODO Auto-generated method stub
		return staffDao.getStaffById(rlzy_staff_id);
	}
	
}		
