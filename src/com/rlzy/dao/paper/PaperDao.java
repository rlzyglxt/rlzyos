package com.rlzy.dao.paper;

import java.util.List;
import com.rlzy.domain.DO.rlzy_paper;

public interface PaperDao {
	
	//得到数
	int getPaperCount(String queryString, int currPage);
	//得到表
	List<rlzy_paper> getPaperByPage(String queryString, int currPage);
	//添加
	public void addPaper(rlzy_paper ru);
	//删除
	public void deletePaper(String rlzy_paper_id);
	//通过ID得到
	public rlzy_paper getPaperById(String rlzy_paper_id);
	//修改信息
	public void updatePaper(rlzy_paper ru);
	
}
