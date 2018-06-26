package com.rlzy.action.staff;

import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.struts2.ServletActionContext;
import com.google.gson.Gson;
import com.opensymphony.xwork2.ActionSupport;
import com.rlzy.domain.DO.rlzy_staffinfo;
import com.rlzy.domain.DTO.Staff.staffListDTO;
import com.rlzy.domain.VO.showStaffVO;
import com.rlzy.service.staff.StaffService;
import util.ExportExcelCollection;
import util.TeamUtil;

public class StaffAction extends ActionSupport{
	private StaffService staffService;
	private showStaffVO staffVO;
	private String staffNumber;
	private rlzy_staffinfo staff;
	private String rlzy_staff_id;
	
	public StaffService getStaffService() {
		return staffService;
	}

	public void setStaffService(StaffService staffService) {
		this.staffService = staffService;
	}
	//培训记录
	public String page_StaffTrain(){
		return "page_StaffTrain";
	}
	//进入员工信息页面
	public String page_StaffInfo() {
		return "page_StaffInfo";
	}
	//进入添加员工页面
	public String page_AddStaff(){
		return "page_AddStaff";
	}
	//进入修改员工页面
	public String page_UpdataStaff(){
		return "page_UpdataStaff";
	}
	//进入修改员工页面
	public String page_StaffExp(){
		return "page_StaffExp";
	}
	public String page_StaffAgreement(){
		return "page_StaffAgreement";
	}
	//员工调配
	public String page_StaffMove(){
		return "page_StaffMove";
	}
	//员工详情页
	public String page_staffDetails(){
		return "page_staffDetails";
	}
	//员工奖金
	public String page_StaffAward(){
		return "page_StaffAward";
	}
	//新进员工栏
	public String page_StaffNewIn(){
		return "page_StaffNewIn";
	}
	//离退员工栏
	public String page_StaffLeave(){
		return "page_StaffLeave";
	}
	//数据导出页面
	public String page_StaffExport(){
		return "page_StaffExport";
	}
	
	//分页获取所有员工
	public void getStaffByPage() throws IOException{
		staffService.getStaffByPage(staffVO);
		Gson gson = new Gson();
		String result = gson.toJson(staffVO);
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		System.out.println(result);
		PrintWriter pw =response.getWriter();
		pw.write(result);
		pw.flush();
		pw.close();
	}
	//删除员工
	public void deleteStaff() throws IOException{
		rlzy_staffinfo staff = staffService.getStaffById(rlzy_staff_id);
		staffService.deleteStaff(staff);
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter pw = response.getWriter();
		pw.write("deleteSuccess员工");
		pw.flush();
		pw.close();
	}
	//修改员工信息
	public void updataStaff() throws IOException{
		System.out.println("修改员工信息"+rlzy_staff_id);
		rlzy_staffinfo ruGet=staffService.getStaffById(rlzy_staff_id);
		System.out.println(staff);
		staff.setRlzy_staff_id(ruGet.getRlzy_staff_id());
		staff.setStaff_password(ruGet.getStaff_password());
		staff.setStaff_inTime(ruGet.getStaff_inTime());
		staff.setStaff_gmt_create(ruGet.getStaff_gmt_create());
		staff.setStaff_gmt_modified(TeamUtil.getStringSecond());
		staff.setStaff_userPower(ruGet.getStaff_userPower());
		staff.setStaff_adminPower(ruGet.getStaff_adminPower());
//		if(ruGet.getStaff_status()=="在职"){
//			staff.setStaff_leaveReason(ruGet.getStaff_leaveReason());
//			staff.setStaff_leaveTime(ruGet.getStaff_leaveTime());
//		}else if(ruGet){
//			
//		}
		staffService.updataStaff(staff);
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter pw = response.getWriter();
		pw.write("updataStaffSuccess");
		pw.flush();
		pw.close();
	}
	//增加员工
	public void addStaff() throws IOException{
		staffService.addStaff(staff);
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter pw = response.getWriter();
		pw.write(staff.getRlzy_staff_id());
		pw.flush();
		pw.close();
	}

	public void getStaffById() throws IOException{
		rlzy_staffinfo staff = staffService.getStaffById(rlzy_staff_id);
		Gson gson = new Gson();
		String result = gson.toJson(staff);
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=utf-8");
		PrintWriter pw = response.getWriter();
		pw.write(result);
		pw.flush();
		pw.close();
	}
	// --------------------------导出到员工表
		public void exportStaff() throws UnsupportedEncodingException {
	
//			System.out.println("导出员工姓名为"+new String(staffVO.getStaff_record().getBytes("ISO-8859-1")));
//			staffVO.setCurrPage(new Integer(staffVO.getCurrPage()));
			staffVO.setStaff_name(new String(staffVO.getStaff_name().getBytes("ISO-8859-1"), "utf-8"));
			staffVO.setStaff_record(new String(staffVO.getStaff_record().getBytes("ISO-8859-1"), "utf-8"));
			staffVO.setStaff_sex(new String(staffVO.getStaff_sex().getBytes("ISO-8859-1"), "utf-8"));
			staffVO.setStaff_status(new String(staffVO.getStaff_status().getBytes("ISO-8859-1"), "utf-8"));
			staffVO.setStaff_inTime(new String(staffVO.getStaff_inTime().getBytes("ISO-8859-1"), "utf-8"));
			
			String[] heard = { "工号", "姓名", "性别", "年龄", "身份证", "出生年月", "联系方式", "家庭住址","学历", "部门", "职务",
					"职业状态","入职时间","离职时间","离职原因" };
			staffService.getStaffByPage(staffVO);
			List<staffListDTO> dtoList = staffVO.getStaffs();
			System.out.println("dto"+dtoList);
			List<Map<String, String>> dataList = new ArrayList<Map<String, String>>();
			System.out.println("测试条——————————");
			for(staffListDTO staffListDTO : dtoList) {
				
				Map<String, String> map = new HashMap<String, String>();
				map.put("11", staffListDTO.getStaff_number());//工号
				map.put("12", staffListDTO.getStaff_name());//姓名
				map.put("13", staffListDTO.getStaff_sex());//性别
				map.put("14", staffListDTO.getStaff_age());//年龄
				map.put("0", staffListDTO.getStaff_cardid());
				map.put("1", staffListDTO.getStaff_birth());
				map.put("2", staffListDTO.getStaff_tel());
				map.put("3", staffListDTO.getStaff_address());
				map.put("4", staffListDTO.getStaff_record());
				map.put("5", staffListDTO.getStaff_depaterment());
				map.put("6", staffListDTO.getStaff_duty());
				map.put("7", staffListDTO.getStaff_status());
				map.put("8", staffListDTO.getStaff_inTime());
				map.put("9", "");
				map.put("10", "");
//				if (staffListDTO.getStaff_status() == "在职"){
//					System.out.println("判断");
//					map.put("13", "");
//					map.put("14", "");
//				}else{
//					map.put("13", staffListDTO.getStaff_leaveTime());
//					map.put("14", staffListDTO.getStaff_leaveReason());
//				}
				
				dataList.add(map);
			}
			XSSFWorkbook workbook = ExportExcelCollection.exportExcel(null, heard, dataList);
			HttpServletResponse response = ServletActionContext.getResponse();
			response.addHeader("Content-Disposition",
					"attachment;filename=\"" + new String("员工信息表".getBytes(), "ISO-8859-1") + ".xlsx\"");
			try {
				OutputStream os = response.getOutputStream();
				workbook.write(os);
				os.flush();
				os.close();
			} catch (IOException e) {
				e.printStackTrace();
			}

		}

	
	
	public showStaffVO getStaffVO() {
		return staffVO;
	}

	public void setStaffVO(showStaffVO staffVO) {
		this.staffVO = staffVO;
	}

	public String getStaffNumber() {
		return staffNumber;
	}

	public void setStaffNumber(String staffNumber) {
		this.staffNumber = staffNumber;
	}

	public rlzy_staffinfo getStaff() {
		return staff;
	}

	public void setStaff(rlzy_staffinfo staff) {
		this.staff = staff;
	}

	public String getRlzy_staff_id() {
		return rlzy_staff_id;
	}

	public void setRlzy_staff_id(String rlzy_staff_id) {
		this.rlzy_staff_id = rlzy_staff_id;
	}
	

}
