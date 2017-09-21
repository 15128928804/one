package com.cs.common;

/**
 * 
 *
 * 功能简介：基础类  分页使用
 * @author Liu
 * @data 2017年8月29日上午11:58:04
 */
public class BaseDao {
	private int pageSize = 10;// 每页显示记录数

	private int totalCount; // 总记录数
	private int totalPage;// 总页数
	private int currentPage;// 当前页
	private String limitClause;// 记录数，比如limit 1,10
	private String orderByClause;// 排序字段，比如id desc
	private String sortname;// 排序字段，比如name
	private String sortorder;// 排序字段，比如 desc
	private String isExact;// 查询类别，true，代表准确，false 代表模糊
	private String[] idsArray;// 多个id的数组

	public String getIsExact() {
		return isExact;
	}

	public void setIsExact(String isExact) {
		this.isExact = isExact;
	}
	
	public String[] getIdsArray() {
		return idsArray;
	}

	public void setIdsArray(String[] idsArray) {
		this.idsArray = idsArray;
	}

	public String getSortname() {
		return sortname;
	}

	public void setSortname(String sortname) {
		this.sortname = sortname;
	}

	public String getSortorder() {
		return sortorder;
	}

	public void setSortorder(String sortorder) {
		this.sortorder = sortorder;
	}

	/**
	 * 返回排序的字段等
	 * <p>
	 * 功能描述：
	 * </p>
	 * 
	 * @return
	 */
	public String getOrderByClause() {
		if (sortname != null && sortorder != null) {
			if (sortname.indexOf(".") == -1) {
				return sortname + " " + sortorder;
			}
			return sortname + " " + sortorder;
		}
		return orderByClause;
	}

	public void setOrderByClause(String orderByClause) {
		this.orderByClause = orderByClause;
	}

	public String getLimitClause() {
		if (getStart() > -1 && getPageSize() > 0) {
			return " limit " + getStart() + "," + getPageSize();
		}
		
		return limitClause;
	}

	public void setLimitClause(String limitClause) {

		this.limitClause = limitClause;
	}

	public void setTotalPage(int totalPage) {
		this.totalPage = totalPage;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getTotalCount() {
		return totalCount;
	}

	public int getCurrentPage() {
		return currentPage;
	}

	public void setCurrentPage(int currentPage) {
		this.currentPage = currentPage;
	}

	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}

	public int getTotalPage() {

		if (totalCount % this.pageSize == 0) {
			this.totalPage = totalCount / this.pageSize;
		} else {
			this.totalPage = totalCount / this.pageSize + 1;
		}
		return this.totalPage;
	}

	public int getStart() {
		if (currentPage > getTotalPage())
			currentPage = 1;
		return (currentPage - 1) * pageSize;

	}

}