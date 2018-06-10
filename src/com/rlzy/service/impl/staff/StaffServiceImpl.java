package com.rlzy.service.impl.staff;

import java.util.List;

import com.rlzy.dao.staff.StaffDao;
import com.rlzy.domain.DTO.Staff.staffListDTO;
import com.rlzy.domain.VO.showStaffVO;
import com.rlzy.service.staff.StaffService;

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

}		
