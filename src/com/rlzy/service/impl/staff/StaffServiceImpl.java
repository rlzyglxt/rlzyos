package com.rlzy.service.impl.staff;

import java.util.List;

import com.rlzy.dao.staff.StaffDao;
import com.rlzy.domain.DO.rlzy_staffinfo;
import com.rlzy.domain.DTO.Staff.staffListDTO;
import com.rlzy.domain.VO.showStaffVO;
import com.rlzy.service.staff.StaffService;

import util.TeamUtil;
import util.md5;

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
		int count =staffDao.getStaffCount(staffVO);
		staffVO.setPageCount(30);
		staffVO.setTotalPage((int) Math.ceil((double) count / (double) staffVO.getPageCount()));
		staffVO.setTotalCount(count);
		List<staffListDTO> staffs = staffDao.getStaffByPage(staffVO);
		staffVO.setStaffs(staffs);
//		System.out.println("setstaff");
//		return staffVO.getStaffs();
	}
	@Override
	public void addStaff(rlzy_staffinfo staff) {
		// TODO Auto-generated method stub
		staff.setRlzy_staff_id(TeamUtil.getUuid());
		staff.setStaff_inTime(TeamUtil.getStringDay());
		staff.setStaff_gmt_create(TeamUtil.getStringSecond());
		staff.setStaff_gmt_modified(TeamUtil.getStringSecond());
//		String poweradmin="jurisdiction_admin";
//		staff.setStaff_adminPower(poweradmin);
//		String poweruser="jurisdiction_user";
//		staff.setStaff_userPower(poweruser);
//		String powerstaff="jurisdiction_user";
//		staff.setStaff_staffPower(powerstaff);
//		String str="000000";
//		String password=md5.GetMD5Code(str);
//		staff.setStaff_password(password);
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
		staff.setStaff_gmt_modified(TeamUtil.getStringSecond());
		staffDao.updataStaff(staff);		
	}

	@Override
	public rlzy_staffinfo getStaffById(String rlzy_staff_id) {
		// TODO Auto-generated method stub
		return staffDao.getStaffById(rlzy_staff_id);
	}

	@Override
	public List<rlzy_staffinfo> getAllStaff() {
		// TODO Auto-generated method stub
		return staffDao.getAllStaff();
	}

	@Override
	public int getStaffData(showStaffVO showstaffVO) {
		// TODO Auto-generated method stub
		return staffDao.getStaffCount(showstaffVO);
	}
}		
