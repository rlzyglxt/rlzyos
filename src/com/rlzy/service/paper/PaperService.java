package com.rlzy.service.paper;

import com.rlzy.domain.DO.rlzy_paper;
import com.rlzy.domain.VO.showPaperVO;

public interface PaperService {


	//得到bypage
	public showPaperVO getPaperByPage(String queryString, int currPage);
	//添加
	public void addPaper(rlzy_paper ru);
	//删除
	public void deletePaper(String paper_id);
	//id得到
	public rlzy_paper getPaperById(String paper_id);
	//修改信息
	public void updatePaper(rlzy_paper ru);
	
	
}
