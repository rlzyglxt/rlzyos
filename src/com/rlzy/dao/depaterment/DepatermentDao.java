package com.rlzy.dao.depaterment;

import java.util.List;

import com.rlzy.domain.DO.rlzy_depaterment;
import com.rlzy.domain.VO.showDepatermentVO;

public interface DepatermentDao {
	
	//得到部门数
	int getDepatermentCount(showDepatermentVO depatermentVO);
	//得到部门表
	List<rlzy_depaterment> getDepatermentByPage(showDepatermentVO depatermentVO);
	//判断部门是否存在
	public boolean judgeDepatermentByDepatermentname(String depaterment_name);
	//添加部门
	public void addDepaterment(rlzy_depaterment ru);
	//删除部门
	public void deleteDepaterment(String rlzy_depaterment_id);
	//通过部门ID得到部门
	public rlzy_depaterment getDepatermentById(String rlzy_depaterment_id);
	//修改部门信息
	public void updateDepaterment(rlzy_depaterment ru);
	//得到所有部门
	public List<rlzy_depaterment> getAllDepaterment();
	
}
