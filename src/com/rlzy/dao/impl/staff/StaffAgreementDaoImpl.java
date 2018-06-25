package com.rlzy.dao.impl.staff;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;

import com.rlzy.dao.staff.StaffAgreementDao;
import com.rlzy.domain.DO.rlzy_staffagreement;
import com.rlzy.domain.DTO.Staff.staffAgreementDTO;
import com.rlzy.domain.VO.showAgreementVO;

public class StaffAgreementDaoImpl implements StaffAgreementDao {
	private SessionFactory sessionFactory;

	public Session getSession() {
		return sessionFactory.getCurrentSession();
	}

	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}

	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

	@Override
	public void addStaffAgreement(List<rlzy_staffagreement> staffagreement) {
		// TODO Auto-generated method stub
		for (rlzy_staffagreement rlzy_staffagreement : staffagreement) {

			getSession().saveOrUpdate(rlzy_staffagreement);
		}
	}

	@Override
	public void deleteStaffAgreements(String agreement_staff) {
		// TODO Auto-generated method stub
		
		String hql = "delete from rlzy_staffagreement where agreement_staff= '" + agreement_staff + "'";
		getSession().createQuery(hql).executeUpdate();
	}

	@Override
	public void updataStaffAgreement(rlzy_staffagreement staffagreement) {
		// TODO Auto-generated method stub
		getSession().saveOrUpdate(staffagreement);
	}

	@Override
	public List<rlzy_staffagreement> getStaffAgreementByStaffId(String agreement_staff) {
		// TODO Auto-generated method stub
		String hql="from rlzy_staffagreement where agreement_staff = '" + agreement_staff + "'";
		return getSession().createQuery(hql).list();
	}

	@Override
	public List<staffAgreementDTO> getStaffAgreementByPage(showAgreementVO showagreementVO) {
		// TODO Auto-generated method stub
		String hql = "select new com.rlzy.domain.DTO.Staff.staffAgreementDTO(agreement.rlzy_agreement_id as rlzy_agreement_id,staff.staff_number as staff_number,"
				+ "staff.staff_name as staff_name,"
				+ "staff.staff_duty as staff_duty,"
				+ "agreement.agreement_startTime as agreement_startTime,"
				+ "agreement.agreement_overtTime as agreement_overtTime,"
				+ "staff.staff_depaterment as agreement_department,"
				+ "agreement.agreement_content as agreement_content)"
				+ " from rlzy_staffinfo as staff,rlzy_staffagreement as agreement where staff.rlzy_staff_id=agreement.agreement_staff and 1=1";
		
		if (showagreementVO.getAgreement_startTime() != null && !"".equals(showagreementVO.getAgreement_startTime().trim()))
			hql = hql + " and agreement_startTime >= '" + showagreementVO.getAgreement_startTime() + "'";
		if (showagreementVO.getAgreement_overtTime() != null && !"".equals(showagreementVO.getAgreement_overtTime().trim()))
			hql = hql + " and agreement_overtTime <= '" + showagreementVO.getAgreement_overtTime() + "'";
	/*	if (showagreementVO.getQueryname() != null !="".equals(showagreementVO.getQueryname().trim()))
			hql = hql + "";*/
			
		
		Session session = this.getSession();
		List<staffAgreementDTO> staffagreementList = session.createQuery(hql)
				.setFirstResult((showagreementVO.getCurrPage() - 1) * showagreementVO.getPageCount())
				.setMaxResults(showagreementVO.getPageCount()).list();
		return staffagreementList;
	}

	@Override
	public int getStaffAgreementCount(showAgreementVO showagreementVO) {
		// TODO Auto-generated method stub
		String hql = "select count(*) from rlzy_staffagreement where 1=1";
		if (showagreementVO.getAgreement_startTime() != null && !"".equals(showagreementVO.getAgreement_startTime().trim()))
			hql = hql + " and agreement_startTime >= '" + showagreementVO.getAgreement_startTime() + "'";
		if (showagreementVO.getAgreement_overtTime() != null && !"".equals(showagreementVO.getAgreement_overtTime().trim()))
			hql = hql + " and agreement_overtTime <= '" + showagreementVO.getAgreement_overtTime() + "'";
		long count = (long) getSession().createQuery(hql).uniqueResult();
		return (int) count;
	}

	@Override
	public rlzy_staffagreement getStaffAgreementById(String rlzy_agreement_id) {
		// TODO Auto-generated method stub
		return (rlzy_staffagreement) this.getSession().get(rlzy_staffagreement.class, rlzy_agreement_id);
	}

	@Override
	public void deleteStaffAgreement(String rlzy_agreement_id) {
		// TODO Auto-generated method stub
		rlzy_staffagreement rs = new rlzy_staffagreement();
		rs.setRlzy_agreement_id(rlzy_agreement_id);
		getSession().delete(rs);
	}
}
