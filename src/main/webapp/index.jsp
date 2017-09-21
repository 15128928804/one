<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%-- <jsp:forward page="\jsp\home\login.jsp"/> --%>
<%
 
  response.getWriter().write(
						"<html><head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"><script language=\"javascript\">window.top.location.href='" + request.getContextPath()
								+ "/jsp/home/index.jsp';</script></head><body></body></html>");
   %>
