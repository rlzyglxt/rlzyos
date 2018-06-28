package com.rlzy.service.impl.staff;

import java.util.List;

import com.rlzy.dao.staff.StaffAgreementDao;
import com.rlzy.domain.DO.rlzy_staffagreement;
import com.rlzy.domain.DTO.Staff.staffAgreementDTO;
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
	public void addStaffAgreement(List<rlzy_staffagreement> staffagreements) {
		// TODO Auto-generated method stub
		for(rlzy_staffagreement rlzy_staffagreement : staffagreements ){
			rlzy_staffagreement.setRlzy_agreement_id(TeamUtil.getUuid());
			rlzy_staffagreement.setAgreement_gmt_create(TeamUtil.getStringSecond());
			rlzy_staffagreement.setAgreement_gmt_modified(TeamUtil.getStringSecond());
		}
		staffAgreementDao.addStaffAgreement(staffagreements);
	}

	@Override
	public void deleteStaffAgreements(String agreement_staff) {
		// TODO Auto-generated method stub
		staffAgreementDao.deleteStaffAgreements(agreement_staff);
	}

	@Override
	public void updataStaffAgreement(rlzy_staffagreement staffagreement) {
		// TODO Auto-generated method stub
		rlzy_staffagreement rs = staffAgreementDao.getStaffAgreementById(staffagreement.getRlzy_agreement_id());
		rs.setAgreement_content(staffagreement.getAgreement_content());
		rs.setAgreement_gmt_modified(TeamUtil.getStringSecond());
		rs.setAgreement_overtTime(staffagreement.getAgreement_overtTime());
		rs.setAgreement_startTime(staffagreement.getAgreement_startTime());
		rs.setAgreement_remark(staffagreement.getAgreement_remark());
//		staffAgreementDao.updataStaffAgreement(rs);
	}
	
	@Override
	public List<rlzy_staffagreement> getStaffAgreementByStaffId(String agreement_staff) {
		// TODO Auto-generated method stub
		return staffAgreementDao.getStaffAgreementByStaffId(agreement_staff);
	}

	@Override
	public void getStaffAgreementByPage(showAgreementVO showagreementVO) {
		// TODO Auto-generated method stub
		int count =staffAgreementDao.getStaffAgreementCount(showagreementVO);
		showagreementVO.setTotalPage((int) Math.ceil((double) count / (double) showagreementVO.getPageCount()));
		showagreementVO.setTotalCount(count);
		List<staffAgreementDTO> staffAgreement = staffAgreementDao.getStaffAgreementByPage(showagreementVO);
		showagreementVO.setStaffAgreements(staffAgreement);
	}

	@Override
	public rlzy_staffagreement getStaffAgreementById(String rlzy_agreement_id) {
		// TODO Auto-generated method stub
		return staffAgreementDao.getStaffAgreementById(rlzy_agreement_id);
	}

	@Override
	public void deleteStaffAgreement(String rlzy_agreement_id) {
		// TODO Auto-generated method stub
		staffAgreementDao.deleteStaffAgreement(rlzy_agreement_id);
	}
	
}
