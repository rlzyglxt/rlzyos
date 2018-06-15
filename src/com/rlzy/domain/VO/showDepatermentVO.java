package com.rlzy.domain.VO;

import java.util.List;

import com.rlzy.domain.DO.rlzy_depaterment;


public class showDepatermentVO {

	private int currPage;
	private int totalPage;
	private int count;
	private int pageSize;
	private String queryString;
	private List<rlzy_depaterment> list;
	public int getCurrPage() {
		System.out.println("VO");
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
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
	public int getPageSize() {
		return pageSize;
	}
	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
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
