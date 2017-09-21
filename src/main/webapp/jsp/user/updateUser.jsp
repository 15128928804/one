<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
	String path = request.getContextPath();
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<title>添加用户</title>
		<link rel="stylesheet" href="<%=path %>/ligerUI/ligerUI/skins/Aqua/css/ligerui-all.css" type="text/css"></link>
		<link rel="stylesheet" href="<%=path %>/css/style.css" type="text/css"></link>
		<script type="text/javascript" src="<%=path %>/ligerUI/jquery/jquery-1.5.2.min.js"></script>
		<script type="text/javascript" src="<%=path %>/ligerUI/ligerUI/js/core/base.js"></script>
		<script type="text/javascript" src="<%=path %>/ligerUI/ligerUI/js/ligerui.all.js"></script>
	  	<script type="text/javascript" src="<%=path %>/js/common.js"></script>
	  	<script type="text/javascript" src="<%=path %>/js/chooseList.js"></script>
		<script type="text/javascript">
		//提交事件
        function subAdd(){
        	var name = delHtmlTag($("#name").val());
         	var pwd = delHtmlTag($("#pwd").val());
         	var address = delHtmlTag($("#address").val());
         	var id = delHtmlTag($("#id").val());
         	
         	if(checkRoleData("name",name,"账户不能为空")) return;
         	if(checkRoleData("pwd",pwd,"密码不能为空")) return;
         	if(checkRoleData("address",address,"地址不能为空")) return;
        	var params = {id:id,name:name,pwd:pwd,address:address};//,
        	var url = "<%=path %>/userController/updateUser.do";
        	submitEvent(null,params,url,'修改',"btnSub",true,null);
        }
    </script>
	</head>
	<body style="padding: 2px; height: 700px;">
		<form name="form1" id="form1" style="height: 100%">
			<input name="id" type="hidden" id="id" value="${user.id }" ltype="text"/>
			<div class="l-group l-group-hasicon" style="width: 100%;">
				<img src="<%=path %>/ligerUI/ligerUI/skins/icons/communication.gif"/>
				<span>账户信息</span>
			</div>
			<table cellpadding="0" cellspacing="0" class="l-table-edit"
				border="0">
				<tr>
					<td align="right" class="l-table-edit-td_1" width="160">
						账号&nbsp;
					</td>
					<td align="left" class="l-table-edit-td_1" style="color: red;" width="340">
						<div class="line_div">
							<input name="name" type="text" id="name" value="${user.name }" ltype="text"/>
						</div>&nbsp;* 账号不能为空
					</td>
				</tr>
				<tr>
					<td align="left" colspan="3" height="1px"></td>
				</tr>
				<tr>
					<td align="right" class="l-table-edit-td_1" width="160">
						密码&nbsp;
					</td>
					<td align="left" class="l-table-edit-td_1" style="color: red;" width="260">
						<div class="line_div">
							<input name="pwd" type="text" id="pwd" value="${user.pwd }" ltype="text"/>
						</div>&nbsp;* 密码不能为空
					</td>
				</tr>
				<tr>
					<td align="left" colspan="3" height="1px"></td>
				</tr>
				<tr>
					<td align="right" class="l-table-edit-td_1" width="160">
						地址&nbsp;
					</td>
					<td align="left" class="l-table-edit-td_1" style="color: red;" width="260">
						<div class="line_div">
							<input name="address" type="text" id="address" value="${user.address }" ltype="text"/>
						</div>&nbsp;* 地址不能为空
					</td>
				</tr>
				<tr>
					<td align="left" colspan="3" height="1px"></td>
				</tr>
				
			</table>
			<div align="center" style="height: 80px; line-height:80px; width: 750px;">
				<input type="button" value="提交" id="btnSub"
							class="l-button l-button-submit" onclick="subAdd();"/>&nbsp;&nbsp;
				
			</div>
			<br />
		</form>
	</body>
</html>