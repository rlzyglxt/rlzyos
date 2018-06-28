package com.rlzy.service.impl.depaterment;

import java.util.List;

import com.rlzy.dao.depaterment.DepatermentDao;
import com.rlzy.domain.DO.rlzy_depaterment;
import com.rlzy.domain.VO.showDepatermentVO;
import com.rlzy.service.depaterment.DepatermentService;
public class DepatermentServiceImpl implements DepatermentService {
	private DepatermentDao depatermentDao;
	
	//分页查询部门
	public void getDepatermentByPage(showDepatermentVO depatermentVO) {
		int count = depatermentDao.getDepatermentCount(depatermentVO);
		depatermentVO.setTotalPage((int) Math.ceil((double) count / 10));
		depatermentVO.setTotalCount(count);
		List<rlzy_depaterment> list = depatermentDao.getDepatermentByPage(depatermentVO);
		depatermentVO.setList(list);

	}
	
	//判断用户是否存在
	public boolean judgeDepatermentByDepatermentname(String depaterment_name) {
		return depatermentDao.judgeDepatermentByDepatermentname(depaterment_name);
	}
	
	//添加用户
	public void addDepaterment(rlzy_depaterment ru) {
		depatermentDao.addDepaterment(ru);
	}
	
	//删除用户
	public void deleteDepaterment(String rlzy_depaterment_id) {
		depatermentDao.deleteDepaterment(rlzy_depaterment_id);
	}
	
	//部门ID得到部门
	public rlzy_depaterment getDepatermentById(String rlzy_depaterment_id) {
		rlzy_depaterment ru = depatermentDao.getDepatermentById(rlzy_depaterment_id);
		return ru;
	}
	
	//修改部门信息
	public void updateDeapterment(rlzy_depaterment ru) {
		depatermentDao.updateDepaterment(ru);
	}
	@Override
	public List<rlzy_depaterment> getAllDepaterment() {
		// TODO Auto-generated method stub
		return depatermentDao.getAllDepaterment();
	}
	
	
	
	
//-------------------------------------分割线----------------------------------------->


	public DepatermentDao getDepatermentDao() {
		return depatermentDao;
	}
	public void setDepatermentDao(DepatermentDao depatermentDao) {
		this.depatermentDao = depatermentDao;
	}

	


	
}		
