package com.rlzy.domain.VO;

import java.util.List;

import com.rlzy.domain.DO.rlzy_depaterment;


public class showDepatermentVO {

	private int currPage;
	private int totalPage;
	private int totalCount;// 总记录数
	private int pageCount;
	private String queryString;
	private List<rlzy_depaterment> list;
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
	public String getQueryString() {
		return queryString;
	}
	public void setQueryString(String queryString) {
		this.queryString = queryString;
	}
	public List<rlzy_depaterment> getList() {
		return list;
	}
	public void setList(List<rlzy_depaterment> list) {
		this.list = list;
	}
	
}
