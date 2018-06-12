package com.rlzy.service.impl.staff;

import java.util.List;

import com.rlzy.dao.staff.StaffAgreementDao;
import com.rlzy.domain.DO.rlzy_staffagreement;
import com.rlzy.domain.DTO.Staff.staffAgreementDTO;
import com.rlzy.domain.DTO.Staff.staffListDTO;
import com.rlzy.domain.VO.showAgreementVO;
import com.rlzy.service.staff.StaffAgreementService;

import util.TeamUtil;

public class StaffAgreementServiceImpl implements StaffAgreementService {
	private StaffAgreementDao staffAgreementDao;

	public StaffAgreementDao getStaffAgreementDao() {
		return staffAgreementDao;
	}

	public void setStaffAgreementDao(StaffAgreementDao staffAgreementDao) {
		this.staffAgreementDao = staffAgreementDao;
	}

	@Override
	public void addStaffAgreement(rlzy_staffagreement staffagreement) {
		// TODO Auto-generated method stub
		staffagreement.setRlzy_agreement_id(TeamUtil.getUuid());
		staffAgreementDao.addStaffAgreement(staffagreement);
	}

	@Override
	public void deleteStaffAgreement(String rlzy_agreement_id) {
		// TODO Auto-generated method stub
		staffAgreementDao.deleteStaffAgreement(rlzy_agreement_id);
	}

	@Override
	public void updataStaffAgreement(rlzy_staffagreement staffagreement) {
		// TODO Auto-generated method stub
		staffAgreementDao.updataStaffAgreement(staffagreement);
	}
	
	@Override
	public rlzy_staffagreement getStaffAgreementById(String rlzy_agreement_id) {
		// TODO Auto-generated method stub
		return staffAgreementDao.getStaffAgreementById(rlzy_agreement_id);
	}

	@Override
	public void getStaffAgreementByPage(showAgreementVO showagreementVO) {
		// TODO Auto-generated method stub
		int count =staffAgreementDao.getStaffAgreementCount(showagreementVO);
		System.out.println("staffserviceimp::"+count);
		showagreementVO.setTotalPage((int) Math.ceil((double) count / (double) showagreementVO.getPageCount()));
		showagreementVO.setTotalCount(count);
		List<staffAgreementDTO> staffAgreement = staffAgreementDao.getStaffAgreementByPage(showagreementVO);
		showagreementVO.setStaffAgreements(staffAgreement);
	}
	
}
