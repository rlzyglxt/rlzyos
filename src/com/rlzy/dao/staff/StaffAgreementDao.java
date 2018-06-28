package com.rlzy.dao.staff;

import java.util.List;

import com.rlzy.domain.DO.rlzy_staffagreement;
import com.rlzy.domain.DTO.Staff.staffAgreementDTO;
import com.rlzy.domain.VO.showAgreementVO;

public interface StaffAgreementDao {
	
	//删除所有合同
	void deleteStaffAgreements(String agreement_staff);
	
	void deleteStaffAgreement(String rlzy_agreement_id);
	
	rlzy_staffagreement getStaffAgreementById(String rlzy_agreement_id);
	//添加合同
	void addStaffAgreement(List<rlzy_staffagreement> staffagreement);

	//修改合同
	void updataStaffAgreement(rlzy_staffagreement staffagreement);
	//得到个人员工byID
	List<rlzy_staffagreement> getStaffAgreementByStaffId(String agreement_staff);
	//分页显示
	List<staffAgreementDTO> getStaffAgreementByPage(showAgreementVO showagreementVO);
	//
	int getStaffAgreementCount(showAgreementVO showagreementVO);
	

	
	
}
