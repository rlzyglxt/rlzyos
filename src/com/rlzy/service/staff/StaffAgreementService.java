package com.rlzy.service.staff;

import java.util.List;

import com.rlzy.domain.DO.rlzy_staffagreement;
import com.rlzy.domain.VO.showAgreementVO;

public interface StaffAgreementService {
	//添加合同
	void addStaffAgreement(List<rlzy_staffagreement> staffagreement);
	//删除所有合同
	void deleteStaffAgreements(String agreement_staff);
	//修改合同
	void updataStaffAgreement(rlzy_staffagreement staffagreement);
	//得到员工by员工ID/
	List<rlzy_staffagreement> getStaffAgreementByStaffId(String agreement_staff);
	//分页显示
	void getStaffAgreementByPage(showAgreementVO showagreementVO);
	//得到一条记录通过id
	rlzy_staffagreement getStaffAgreementById(String rlzy_agreement_id);
	//删除一个合同
	void deleteStaffAgreement(String rlzy_agreement_id);
	
}
