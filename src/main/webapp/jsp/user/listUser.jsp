<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<title></title>
		<link rel="stylesheet" href="<%=path %>/ligerUI/ligerUI/skins/Gray/css/all.css" type="text/css"></link>
		<link rel="stylesheet" href="<%=path %>/ligerUI/ligerUI/skins/Aqua/css/ligerui-all.css" type="text/css"></link>
		<script type="text/javascript" src="<%=path %>/ligerUI/jquery/jquery-1.5.2.min.js"></script>
		<script type="text/javascript" src="<%=path %>/ligerUI/ligerUI/js/core/base.js"></script>
		<script type="text/javascript" src="<%=path %>/ligerUI/ligerUI/js/ligerui.all.js"></script>
		<script type="text/javascript" src="<%=path %>/js/common.js"></script>
		<script type="text/javascript">
	        var manager, g;
			var checkmanager;
			//默认加载文本样式
			$(function(){
				checkmanager = $("#isExact").ligerCheckBox();
	           	//生成一个检索按钮
                $("#searchbtn").ligerButton({
                    click : function() {
                        searchGrids();//调用搜索的按钮
                    },
                    text : '检索',
                    width : 60
                });
                $("#pageloading").hide();
		  	})
		  	//条件查询事件
		  	function searchGrids(){
  				var name = delHtmlTag($("#name").val());
  				var address = delHtmlTag($("#address").val());
  				var isExact = checkmanager.getValue();//是否支持精确查询，true：精确，false：模糊
  				manager.set({
  					//数据请求地址
  					url:"<%=path %>/userController/queryList.do",
  					parms:[{name:"name",value:name},{name:"address",value:address},{name:"isExact",value:isExact},
  						   {name:"sortorder",value:"asc"}]
  				});
            }
			
           //初始化表格列表信息
	        $(function ()
	        {
	            window['g'] = manager = 
	            $("#maingrid").ligerGrid({
	                height: '100%',
	                columns: [
	                { display: '账户', name: 'name', width:90},
	                { display: '密码', name: 'pwd', width:90},
	                { display: '地址', name: 'address'}
	                ],
	                url:"<%=path %>/userController/queryList.do",
	                parms :{sortname:"id",sortorder:"asc"},
	                dataAction:'server',
	                pageSize: 20, rownumbers: false,isScroll:true,checkbox:true,
                	toolbar: {
	                    items: [
	                    { text: '增加', click: f_addTabItem, img: '<%=path %>/ligerUI/ligerUI/skins/icons/add.gif' },
	                   	{ line: true },
	                    { text: '修改', click: f_updateTabItem, img: '<%=path %>/ligerUI/ligerUI/skins/icons/modify.gif' },
	                	{ line: true },
	                	{ text: '删除', click: f_delete, img: '<%=path %>/ligerUI/ligerUI/skins/icons/delete.gif' }
	                    ]
	                
	                }
	            });
	            $("#pageloading").hide();
	        });
	        
			/*添加*/
			function f_addTabItem()
	        {
        		//参数：targetUrl,hederText,targetTabId
        		openTabItem('<%=path %>/jsp/user/addUser.jsp','添加用户','addUser');
	        }
	        //修改数据配置信息
			function f_updateTabItem(){
				var rows=manager.getSelectedRows();
				if(rows.length==0||rows.length>1){
					$.ligerDialog.warn("请选择一条记录进行操作!");
					return;
				}
		        //参数：managerGrid,ifTagetTabId,targetTabUrl,hederText
	        	updateTabItem(manager,'updateUser','<%=path %>/userController/queryUser.do','修改用户');
			}
			
			//删除数据配置信息，可多条删除
			function f_delete(){
				//参数：managerGrid,targetUrl
				deleteData(manager,'<%=path %>/userController/deleteUser.do');
			}
		</script>
	</head>
	<body style="overflow: hidden; padding: 2px;">
		<h2 style="color:red;">${message }</h2>
  		<form id="search_form">
	        <div id="searchbar">
	            <div class="l-panel-search-item">
	                                                        账户  &nbsp;<input type="text" name="name" id="name"/>&nbsp;
	                                                        地址  &nbsp;<input type="text" name="address" id="address"/>&nbsp;
	                                                        
	  				<input type="checkbox" id="isExact" name="isExact"/>是否精确查询&nbsp;
	                </div>
	            <div class="l-panel-search-item">
	                <div id="searchbtn"></div>
	            </div>
	            &nbsp;&nbsp;<input type="reset" value="清空" id="btnRes" class="l-button l-button-submit" /> 
	            &nbsp;&nbsp;<input type="button" value="刷新" id="btnLoad" class="l-button l-button-submit" onclick="reLoadData(manager);" /> 
	        </div>
	    </form>
		<div id="maingrid"></div>
	</body>
</html>