package com.rlzy.service.impl.paper;

import java.util.List;

import com.rlzy.dao.paper.PaperDao;
import com.rlzy.domain.DO.rlzy_paper;
import com.rlzy.domain.VO.showPaperVO;
import com.rlzy.service.paper.PaperService;

public class PaperServiceImpl implements PaperService {

	//分页查询
	public showPaperVO getPaperByPage(String queryString, int currPage) {
		showPaperVO suv = new showPaperVO();
		System.out.println("跳转到Trainserviceimpl");
		suv.setCurrPage(currPage);
		suv.setQueryString(queryString);
		suv.setPageSize(10);
		int count = paperDao.getPaperCount(queryString, currPage);
		suv.setCount(count);
		System.out.println("userservice,"+count);
		double c = count;
		int totalPage = (int) Math.ceil(c / 10);
		suv.setTotalPage(totalPage);
		List<rlzy_paper> list = paperDao.getPaperByPage(queryString, currPage);
		suv.setList(list);
		System.out.println(suv);
		return suv;
	}
	
	//添加
	public void addPaper(rlzy_paper ru) {
		paperDao.addPaper(ru);
	}
	
	//删除
	public void deletePaper(String rlzy_paper_id) {
		paperDao.deletePaper(rlzy_paper_id);
	}
	
	//ID得到
	public rlzy_paper getPaperById(String rlzy_paper_id) {
		rlzy_paper ru = paperDao.getPaperById(rlzy_paper_id);
		return ru;
	}
	
	//修改信息
	public void updatePaper(rlzy_paper ru) {
		paperDao.updatePaper(ru);
	}

	
	
	
	
//-------------------------------------分割线----------------------------------------->
	private PaperDao paperDao;


	public PaperDao getPaperDao() {
		return paperDao;
	}
	public void setPaperDao(PaperDao paperDao) {
		this.paperDao = paperDao;
	}



	
}		
