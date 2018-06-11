package com.rlzy.service.staff;

import java.util.List;

import com.rlzy.domain.DO.rlzy_staffexp;
import com.rlzy.domain.VO.showStaffExpVO;


public interface StaffExpService {
	
	List<rlzy_staffexp> getStaffExps(String staffExp_staff);

	rlzy_staffexp getStaffExpById(String rlzy_staffExp_id);
	//修改该员工的信息
	void upadteStaffExp(rlzy_staffexp staffexp);
	//删除该员工所有履历
	void deleteStaffExp(String staffExp_staff);
	//删除该员工一条履历
	void deleteStaffExps(String rlzy_staffExp_id);

	void saveStaffExp(List<rlzy_staffexp> staffexps);
	//分页得到工作履历
	void getStaffExpByPage(showStaffExpVO staffExpVO);
	
	String getStaffNameByStaffNumber(String staffExp_staff);

	void addStaffExp(rlzy_staffexp rs);
}
