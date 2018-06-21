package com.rlzy.service.impl.staff;

import java.util.List;
import com.rlzy.dao.staff.StaffExpDao;
import com.rlzy.domain.DO.rlzy_staffexp;
import com.rlzy.domain.DTO.Staff.staffExpDTO;
import com.rlzy.domain.VO.showStaffExpVO;
import com.rlzy.service.staff.StaffExpService;

import util.TeamUtil;

public class StaffExpServiceImpl implements StaffExpService {
	private StaffExpDao staffExpDao;

	public StaffExpDao getStaffExpDao() {
		return staffExpDao;
	}

	public void setStaffExpDao(StaffExpDao staffExpDao) {
		this.staffExpDao = staffExpDao;
	}

	@Override
	public List<rlzy_staffexp> getStaffExps(String staffExp_staff) {
		// TODO Auto-generated method stub
		return staffExpDao.getStaffExps(staffExp_staff);
	}

	@Override
	public rlzy_staffexp getStaffExpById(String rlzy_staffExp_id) {
		// TODO Auto-generated method stub
		return staffExpDao.getStaffExpById(rlzy_staffExp_id);
	}
	//修改该员工履历
	@Override
	public void upadteStaffExp(rlzy_staffexp staffexp) {
		// TODO Auto-generated method stub
		rlzy_staffexp rs = staffExpDao.getStaffExpById(staffexp.getRlzy_staffExp_id());
		rs.setStaffExp_address(staffexp.getStaffExp_address());
		rs.setStaffExp_gmt_modified(TeamUtil.getStringSecond());
		rs.setStaffExp_overTime(staffexp.getStaffExp_overTime());
		rs.setStaffExp_remark(staffexp.getStaffExp_remark());
		rs.setStaffExp_startTime(staffexp.getStaffExp_startTime());
	}
	//删除该员工所有
	@Override
	public void deleteStaffExps(String staffExp_staff) {
		// TODO Auto-generated method stub
		staffExpDao.deleteStaffExps(staffExp_staff);
	}
	//删除员工一条履历
	@Override
	public void deleteStaffExp(String rlzy_staffExp_id) {
		// TODO Auto-generated method stub
		staffExpDao.deleteStaffExp(rlzy_staffExp_id);
	}
	//保存多条履历
	@Override
	public void saveStaffExp(List<rlzy_staffexp> staffexps) {
		for(rlzy_staffexp rlzy_staffexp : staffexps ){
			rlzy_staffexp.setRlzy_staffExp_id(TeamUtil.getUuid());
			rlzy_staffexp.setStaffExp_gmt_create(TeamUtil.getStringSecond());
			rlzy_staffexp.setStaffExp_gmt_modified(TeamUtil.getStringSecond());
		}
		// TODO Auto-generated method stub
		staffExpDao.addStaffExps(staffexps);
	}

	@Override
	public void getStaffExpByPage(showStaffExpVO staffExpVO) {
		// TODO Auto-generated method stub
		System.out.println("getpage");
		int count =staffExpDao.getStaffExpCount(staffExpVO);
		staffExpVO.setTotalPage((int) Math.ceil((double) count / (double) staffExpVO.getPageCount()));
		staffExpVO.setTotalCount(count);
		List<staffExpDTO> staffexps = staffExpDao.getStaffExpByPage(staffExpVO);
		staffExpVO.setStaffExps(staffexps);
	}

	@Override
	public String getStaffNameByStaffNumber(String staffExp_staff) {
		// TODO Auto-generated method stub
		return staffExpDao.getStaffNameByStaffNumber(staffExp_staff);
	}

	@Override
	public void  addStaffExp(rlzy_staffexp rs) {
		
		// TODO Auto-generated method stub
		staffExpDao.addStaffExp(rs);
	}
}
