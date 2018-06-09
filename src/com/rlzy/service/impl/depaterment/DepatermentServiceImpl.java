package com.rlzy.service.impl.depaterment;

import java.util.List;

import com.rlzy.dao.depaterment.DepatermentDao;
import com.rlzy.domain.DO.rlzy_depaterment;
import com.rlzy.domain.VO.showDepatermentVO;
import com.rlzy.service.depaterment.DepatermentService;
public class DepatermentServiceImpl implements DepatermentService {

	//分页查询部门
	public showDepatermentVO getDepatermentByPage(String queryString, int currPage) {
		showDepatermentVO suv = new showDepatermentVO();
		System.out.println("跳转到depatermentserviceimpl");
		suv.setCurrPage(currPage);
		suv.setQueryString(queryString);
		suv.setPageSize(10);
		int count = depatermentDao.getDepatermentCount(queryString, currPage);
		suv.setCount(count);
		System.out.println("userservice,"+count);
		double c = count;
		int totalPage = (int) Math.ceil(c / 10);
		suv.setTotalPage(totalPage);
		List<rlzy_depaterment> list = depatermentDao.getDepatermentByPage(queryString, currPage);
		suv.setList(list);
		System.out.println(suv);
		return suv;
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

	
	
	
	
//-------------------------------------分割线----------------------------------------->
	private DepatermentDao depatermentDao;


	public DepatermentDao getDepatermentDao() {
		return depatermentDao;
	}
	public void setDepatermentDao(DepatermentDao depatermentDao) {
		this.depatermentDao = depatermentDao;
	}


	
}		
