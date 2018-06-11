package com.rlzy.action.paper;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletResponse;
import org.apache.struts2.ServletActionContext;
import com.google.gson.Gson;
import com.opensymphony.xwork2.ActionSupport;
import com.rlzy.domain.DO.rlzy_paper;
import com.rlzy.domain.VO.showPaperVO;
import com.rlzy.service.paper.PaperService;
import util.TeamUtil;

public class PaperAction extends ActionSupport{
	
	//去到列表页面
	public String toPaperlist() {
		return "toPaperlist";
	}
	
	//获取所有
		public void getPaperByPage() throws IOException{
			System.out.println("fdsljfldsk");
			showPaperVO suv = paperService.getPaperByPage(queryString, currPage);
			System.out.println("wewewewewe");
			Gson gson = new Gson();
			String result = gson.toJson(suv);
			HttpServletResponse response = ServletActionContext.getResponse();
			response.setContentType("text/html;charset=utf-8");
			PrintWriter pw = response.getWriter();
			pw.write(result);
			pw.flush();
			pw.close();
			
		}
		
		//添加
		public void addPaper() throws IOException{
			System.out.println("1");
			HttpServletResponse response=ServletActionContext.getResponse();
			response.setContentType("text/html;charset=utf-8");
			PrintWriter pw=response.getWriter();
			rlzy_paper ru=new rlzy_paper();
			ru.setRlzy_paper_id(TeamUtil.getUuid());
			ru.setStaff_number(staff_number);
			ru.setStaff_name(staff_name);
			ru.setPaper_name(paper_name);
			ru.setPaper_time(paper_time);
			paperService.addPaper(ru);
			System.out.println("添加成功");
			pw.write("添加成功");
			pw.flush();
			pw.close();
		}
		
		//删除
		public void deletePaper() throws IOException{
			System.out.println(paper_id);
			HttpServletResponse response=ServletActionContext.getResponse();
			response.setContentType("text/html;charset=utf-8");
			PrintWriter pw=response.getWriter();
			paperService.deletePaper(paper_id);
			pw.write("删除成功");
			pw.flush();
			pw.close();
		}
		
		//通过ID查询
		public void getPaperById() throws IOException {
			HttpServletResponse response = ServletActionContext.getResponse();
			response.setContentType("text/html;charset=utf-8");
			PrintWriter pw = response.getWriter();
			rlzy_paper ru = paperService.getPaperById(paper_id);
			Gson gson = new Gson();
			String result = gson.toJson(ru);
			pw.write(result);
			pw.flush();
			pw.close();
		}
		
		//修改
		public void updatePaper() throws IOException{
			rlzy_paper ru=new rlzy_paper();
			rlzy_paper ruGet=paperService.getPaperById(paper_id);
			ru.setRlzy_paper_id(paper_id);
			ru.setStaff_number(staff_number);
			ru.setStaff_name(staff_name);
			ru.setPaper_name(paper_name);
			ru.setPaper_time(paper_time);
			paperService.updatePaper(ru);
		}
		
//-------------------------------------分割线------------------------------------------------>
	private PaperService paperService;
	private showPaperVO paperVO;
	private rlzy_paper paper;
	private String queryString;
	private int currPage;
	private String paper_id;
	private String staff_number;
	private String staff_name;
	private String paper_name;
	private String paper_time;
	
	public PaperService getPaperService() {
		return paperService;
	}
	public void setPaperService(PaperService paperService) {
		this.paperService = paperService;
	}
	public showPaperVO getPaperVO() {
		return paperVO;
	}
	public void setPaperVO(showPaperVO paperVO) {
		this.paperVO = paperVO;
	}
	public rlzy_paper getPaper() {
		return paper;
	}
	public void setPaper(rlzy_paper paper) {
		this.paper = paper;
	}

	public String getQueryString() {
		return queryString;
	}
	public void setQueryString(String queryString) {
		this.queryString = queryString;
	}
	public int getCurrPage() {
		return currPage;
	}
	public void setCurrPage(int currPage) {
		this.currPage = currPage;
	}
	public String getPaper_id() {
		return paper_id;
	}
	
	public void setPaper_id(String paper_id) {
		this.paper_id = paper_id;
	}
	public String getStaff_number() {
		return staff_number;
	}
	public void setStaff_number(String staff_number) {
		this.staff_number = staff_number;
	}
	public String getStaff_name() {
		return staff_name;
	}
	public void setStaff_name(String staff_name) {
		this.staff_name = staff_name;
	}
	public String getPaper_name() {
		return paper_name;
	}
	public void setPaper_name(String paper_name) {
		this.paper_name = paper_name;
	}
	public String getPaper_time() {
		return paper_time;
	}
	public void setPaper_time(String paper_time) {
		this.paper_time = paper_time;
	}
	
	
}
