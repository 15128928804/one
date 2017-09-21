<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<title>系统管理</title>
		<%response.setHeader("Pragma","No-cache"); 
			response.setHeader("Cache-Control","no-cache"); 
			response.setDateHeader("Expires", 0); 
			response.flushBuffer();%>
		<link rel="stylesheet" href="<%=path %>/ligerUI/ligerUI/skins/Aqua/css/ligerui-all.css" type="text/css"></link>
		<link rel="stylesheet" href="<%=path %>/css/index.css" type="text/css"></link>
		<script type="text/javascript" src="<%=path %>/ligerUI/jquery/jquery-1.9.0.min.js"></script>
		<script type="text/javascript" src="<%=path %>/ligerUI/ligerUI/js/ligerui.all.js"></script>
		<script type="text/javascript" src="<%=path %>/ligerUI/jquery.cookie.js"></script>
		<script type="text/javascript" src="<%=path %>/ligerUI/json2.js"></script>
		<script type="text/javascript" src="<%=path %>/js/index.js"></script>
		<script type="text/javascript" src="<%=path %>/js/common.js"></script>
		<script type="text/javascript">
		//退出登录
		 function loginOut(){
		 	tab.removeAll();
		 	window.location.href="<%=path%>/logController/logout.do";
		 }
		 
		 //下载
		 function downFile(filepath){
		 	window.location.href=filepath;
		 }
	</script>
	</head>
	<body style="padding: 0px; background: #EAEEF5;">
		<div id="pageloading"></div>
		<!-- 标题 -->
		<div id="topmenu" class="l-topmenu">
			<div class="l-topmenu-logo">
				
				
			</div>
			
			<div class="l-topmenu-welcome">
				<label>
					欢迎
				</label>
				<span class="space"> ${user.name } 登录！</span>&nbsp;
				<a href="javascript:loginOut();" class="l-link2">
					<img src="<%=path %>/imgs/user_logout.png" class="img_css"></img>退出
				</a>
			</div>
		</div>
		<div id="layout1"
			style="width: 99.2%; margin: 0 auto; margin-top: 4px;">
			
			<div position="left" title="主要菜单" id="accordion1">
			 	<div title="基础信息管理">
						<ul>
							<a class="l-link"
								href="javascript:f_addTab('用户管理','用户管理','/cs/jsp/user/listUser.jsp')"><li>
									用户管理
								</li>
							</a>
							<a class="l-link"
								href="javascript:f_addTab('角色管理','角色管理','/cs/jsp/user/listUser.jsp')"><li>
									角色管理
								</li>
							</a>
						</ul>
					</div>
				
			 		<div title="账户管理">
					
					</div>
			 		<div title="客户管理">
						
					</div>
			</div>
			<div position="center" id="framecenter">
				<div tabid="home" title="我的主页">
					<iframe frameborder="0" name="home" id="home" src="<%=path %>/welcome.jsp"></iframe>
				</div>
				
			</div>
			<div<script src="http://s21.cnzz.com/stat.php?id=2970137&web_id=2970137" language="JavaScript"></script>></div>
		</div>
			 
	</body>
</html>