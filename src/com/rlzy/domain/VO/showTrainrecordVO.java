package com.rlzy.domain.VO;

import java.util.List;
<<<<<<< HEAD
import com.rlzy.domain.DO.rlzy_stafftrain;


public class showTrainrecordVO {
	private int currPage;
	private int totalPage;
	private int count;
	private int pageSize;
	private String queryString;
	private List<rlzy_stafftrain> list;
=======
import com.rlzy.domain.DTO.Staff.staffTrainDTO;


public class showTrainrecordVO {
	private int currPage;// 当前页数
	private int totalPage;// 总页数
	private int totalCount;// 总记录数
	private int pageCount;// 一页显示条数
	private String staff_id;
	private List<staffTrainDTO> list;
>>>>>>> zhj
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
	public String getStaff_id() {
		return staff_id;
	}
	public void setStaff_id(String staff_id) {
		this.staff_id = staff_id;
	}
<<<<<<< HEAD
	public List<rlzy_stafftrain> getList() {
		return list;
	}
	public void setList(List<rlzy_stafftrain> list) {
=======
	public List<staffTrainDTO> getList() {
		return list;
	}
	public void setList(List<staffTrainDTO> list) {
>>>>>>> zhj
		this.list = list;
	}
	
	
	
}