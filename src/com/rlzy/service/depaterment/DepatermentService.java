package com.rlzy.service.depaterment;

import java.util.List;

import com.rlzy.domain.DO.rlzy_depaterment;
import com.rlzy.domain.VO.showDepatermentVO;

public interface DepatermentService {


	//得到部门bypage
	public void getDepatermentByPage(showDepatermentVO depatermentVO);
	//判断用户是否存在
	public boolean judgeDepatermentByDepatermentname(String depaterment_name);
	//添加用户
	public void addDepaterment(rlzy_depaterment ru);
	//删除用户
	public void deleteDepaterment(String depaterment_id);
	//部门id得到部门
	public rlzy_depaterment getDepatermentById(String depaterment_id);
	//修改部门信息
	public void updateDeapterment(rlzy_depaterment ru);
	//得到所有部门
	public List<rlzy_depaterment> getAllDepaterment();
	
}
