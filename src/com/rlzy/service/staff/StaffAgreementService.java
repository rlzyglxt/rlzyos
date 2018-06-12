package com.rlzy.service.staff;

import com.rlzy.domain.DO.rlzy_staffagreement;
import com.rlzy.domain.VO.showAgreementVO;

public interface StaffAgreementService {
	//添加合同
	void addStaffAgreement(rlzy_staffagreement staffagreement);
	//删除合同
	void deleteStaffAgreement(String rlzy_agreement_id);
	//修改合同
	void updataStaffAgreement(rlzy_staffagreement staffagreement);
	//得到员工byID
	rlzy_staffagreement getStaffAgreementById(String rlzy_agreement_id);
	//分页显示
	void getStaffAgreementByPage(showAgreementVO showagreementVO);
	
	
}
