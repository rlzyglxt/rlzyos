package com.rlzy.domain.VO;

import java.util.List;
import com.rlzy.domain.DO.rlzy_train;


public class showTrainVO {
	
	private int currPage;// 当前页数
	private int totalPage; // 总页数
	private int totalCount;// 总记录数
	private int pageCount;// 一页显示条数
	private String train_name; //培训名字查询
	private List<rlzy_train> trains;
	
	
	public int getCurrPage() {
		return currPage;
	}
	public void setCurrPage(int currPage) {
		this.currPage = currPage;
	}
	public int getTotalPage() {
		return totalPage;
	}
	public void setTotalPage(int totalPage) {
		this.totalPage = totalPage;
	}
	public int getTotalCount() {
		return totalCount;
	}
	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}
	public int getPageCount() {
		return pageCount;
	}
	public void setPageCount(int pageCount) {
		this.pageCount = pageCount;
	}
	public String getTrain_name() {
		return train_name;
	}
	public void setTrain_name(String train_name) {
		this.train_name = train_name;
	}
	public List<rlzy_train> getTrains() {
		return trains;
	}
	public void setTrains(List<rlzy_train> trains) {
		this.trains = trains;
	}
	

	
	
}