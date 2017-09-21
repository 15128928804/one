
 var tab;
 //初始化页面
$(function ()
{
	//获取主框架tab管理器
	tab = parent.liger.get("framecenter");
	tab = parent.$("#framecenter").ligerGetTabManager();
    $("form").ligerForm();
}); 
 
 //关闭窗口
 function closeWin(){
 	window.close();
 }


//设置按钮可用不可用，参数filetext:操作按钮文本；value:设置的value值true或false；
function setDisables(filetext,value) {
	filetext.disabled = value;
	if(value == true){
		filetext.value="已提交";
	}else{
		filetext.value="提交";
	}
	
}

//清空文本数据
function resetFormDate(disableBtn,disableBtnValue){
	//清空form文本框数据，同时释放提交按钮为可操作
	setDisables(document.getElementById(disableBtn),disableBtnValue);
}

//刷新数据
function reLoadData(managerGrid){
	managerGrid.loadData();
}

//关闭当前tab，跳转至某tab 页面标签“返回列表”
function switchTabAndCloseTab(switchTargetTabId,henderText,switchTargetTabUrl)
{
	//获取当前的tabId
	var selectedTabId = tab.getSelectedTabItemID();
	tab.removeTabItem(selectedTabId);
	//切换至指定tab
	alert(tab.isTabItemExist(switchTargetTabId));
	if(tab.isTabItemExist(switchTargetTabId) == false){
		tab.removeTabItem(switchTargetTabId);
		tab.addTabItem({url: switchTargetTabUrl,text:henderText,tabid:switchTargetTabId});
	}else{
		tab.selectTabItem(switchTargetTabId);
		tab.reload(switchTargetTabId);
	}
}

//提交
function submitEvent(managerGrid,params,url,methodType,disableBtn,disableBtnValue,dialog){
	var manager;
	
  	$.ajax({
    	type:"post",
       	url:url,
       	data:params,
       	async:"false",
       	contentType: "application/x-www-form-urlencoded; charset=UTF-8", 
       	success:function(data){
            manager.close();
         	if(data.status=='exist'){
        		$.ligerDialog.warn("友情提示："+data.message);
       		}else if(data.status == 'success'){
       			if(data.message == null || data.message == ""){
       				$.ligerDialog.success(methodType+'成功！');
       			}else{
       				$.ligerDialog.warn(data.message);
       			}
       			if(managerGrid != null){
       				managerGrid.loadData();
       			}
       			if(disableBtn != null){
	       			setDisables(document.getElementById(disableBtn),disableBtnValue);
       			}
       			if(dialog != null){
       				dialog.close();
       			}
       		}else{
       			if(data.message != null && data.message != ""){
       				$.ligerDialog.warn("友情提示："+data.message);
       			}else{
       				$.ligerDialog.warn(methodType+'失败！');
       			}
       		}
       		
       	},
       	beforeSend: function(){ 
       		manager = $.ligerDialog.waitting('正在处理中,请稍候...');
       	} 
	});
  	return true;
}

//提交，可以进行确认的提交方式,prompt确认提交的提示描述
function submitEventWithPrompt(managerGrid,params,url,methodType,disableBtn,disableBtnValue,dialog,prompt){
	var manager;
	$.ligerDialog.confirm(prompt, function (yes){
		if(yes){
		  	$.ajax({
		    	type:"post",
		       	url:url,
		       	data:params,
		       	async:"false",
		       	contentType: "application/x-www-form-urlencoded; charset=UTF-8", 
		       	success:function(data){
		         	manager.close();
		         	if(data.status=='exist'){
		        		$.ligerDialog.warn("友情提示："+data.message);
		       		}else if(data.status == 'success'){
		       			// 右下角提示框
		       			$.ligerDialog.success(methodType+'成功！');
		       			// 重新加载数据
		       			if(managerGrid != null){
		       				managerGrid.loadData();
		       			}
		       			// disable button
		       			if(disableBtn != null){
			       			setDisables(document.getElementById(disableBtn),disableBtnValue);
		       			}
		       			// 关闭dialog
		       			if(dialog != null){
		       				dialog.close();
		       			}
		       		}else{
		       			if(data.message != null && data.message != ""){
		       				$.ligerDialog.warn("友情提示："+data.message);
		       			}else{
		       				$.ligerDialog.warn(methodType+'失败！');
		       			}
		       		}
		       		
		       	},
		       	beforeSend: function(){ 
		       		manager = $.ligerDialog.waitting('正在处理中,请稍候...');
		       	} 
			});
		}
	});
}


//添加数据配置信息
function addTabItem(targetUrl,hederText,targetTabId)
{
	tab.addTabItem({url: targetUrl,text: hederText,tabid: targetTabId});
 	
}

//添加一个tab
function openTabItem(targetUrl,hederText,targetTabId)
{
 	if(tab.isTabItemExist(targetTabId) == false){
   		tab.addTabItem({url: targetUrl,text: hederText,tabid: targetTabId});
   	}else{
   		//直接覆盖目标tab，js文件不好使，故使用先移除目标tab，再重新打开，以便获取最新数据
   		tab.removeTabItem(targetTabId);
   		tab.addTabItem({url: targetUrl,text: hederText,tabid: targetTabId});
   	}
}

//列表跳转至修改信息
function updateTabItem(managerGrid,ifTargetTabId,targetTabUrl,hederText){
	//获取选中的行数据
	var rows=managerGrid.getSelectedRows();
	//判断只能选择一条数据进行修改
    if(rows.length==0||rows.length>1){
		$.ligerDialog.warn("请选择一条记录进行操作!");
		return;
	}
	
	//从获取的行数据中解析出id主键
   	var jsonData = JSON.stringify(rows);
 	var obj = eval("("+jsonData+")");   
 	var primaryKeyId = obj[0].id;
 	//拼接路径+参数
 	targetTabUrl += "?primaryKeyId="+primaryKeyId+"&type=update";
  	//判断目标tabId是否存在，如果不存在打开新的tab，相反存在的话先移除目标tab，再重新打开，以便获取最新数据
  	if(tab.isTabItemExist(ifTargetTabId) == false){
   		tab.addTabItem({url: targetTabUrl,text: hederText,tabid: ifTargetTabId});
   	}else{
   		//直接覆盖目标tab，js文件不好使，故使用先移除目标tab，再重新打开，以便获取最新数据
   		tab.removeTabItem(ifTargetTabId);
   		tab.addTabItem({url: targetTabUrl,text: hederText,tabid: ifTargetTabId});
   	}
}

//删除数据,可多条删除
function deleteData(managerGrid,targetUrl){
    //获取选择的行数据
    var rows=managerGrid.getSelectedRows();
	if(rows.length==0){
		$.ligerDialog.warn("友情提示：请至少选择一条记录进行操作！");
		return;
	}
	var manager;
	$.ligerDialog.confirm('确定删除所选数据吗？', function (yes){
		if(yes){
			var idstr="";//拼接要删除id主键字符串
			for(var i in rows){
				idstr+=rows[i].id+","
			}
			
			$.ajax({
               	type:"post",
               	url:targetUrl,
               	data:{idStr:idstr},
               	async:"false",
               	contentType: "application/x-www-form-urlencoded; charset=UTF-8", 
               	success:function(data){
               		manager.close();
               		if(data.status == 'success'){
               			$.ligerDialog.success('删除成功！');
              			//删除后重新加载数据
               			managerGrid.loadData();
               		}else if(data.status == 'error'){
               			$.ligerDialog.warn('删除失败！');
               		}else{
               			$.ligerDialog.warn('友情提示：'+data.message);
               		}
               	},
              	beforeSend: function(){ 
		       		manager = $.ligerDialog.waitting('正在处理中,请稍候...');
		       	} 
            });
		}
	});
}




//AJAX删除通用方法
function ajaxDel(managerGrid,targetUrl,params,tipMesType){
	var manager;
	$.ajax({
       	type:"post",
       	url:targetUrl,
       	data:params,
       	async:"false",
       	contentType: "application/x-www-form-urlencoded; charset=UTF-8", 
       	success:function(data){
       		manager.close();
       		if(data.status == 'success'){
       			$.ligerDialog.success(tipMesType+'成功！');
      			//重新加载数据
       			managerGrid.loadData();
       		}else if(data.status == 'exist'){
       			$.ligerDialog.warn('友情提示：'+data.message);
       		}else{
       			$.ligerDialog.warn(tipMesType+'失败！');
       		}
       	},
        beforeSend: function(){ 
       		manager = $.ligerDialog.waitting('正在处理中,请稍候...');
       	}
    });
}


//去除前后空格
function delHtmlTag(str)
{
   var result=str.replace(/(^\s+)|(\s+$)/g,"");//去掉前后空格
   // result.replace(/\s/g,"");//去除文章中间空格
   return result
}

/*
  该例子实现 表单分页多选
 即利用onCheckRow将选中的行记忆下来，并利用isChecked将记忆下来的行初始化选中
*/
var checkedVals = [];
function findChecked(id) {
	for (var i = 0; i < checkedVals.length; i++) {
		if (checkedVals[i] == id) {
			return i;
		}
	}
	return -1;
}
function addChecked(id) {
	if (findChecked(id) == -1) {
		checkedVals.push(id);
	}
}
function removeChecked(id) {
	var i = findChecked(id);
	if (i == -1) {
		return;
	}
	checkedVals.splice(i, 1);
}
function f_isChecked(rowdata) {
	if (findChecked(rowdata.id) == -1) {
		return false;
	}
	return true;
}
function f_onCheckRow(checked, data) {
	if (checked) {
		addChecked(data.id);
	} else {
		removeChecked(data.id);
	}
}
function f_getChecked() {
	alert(checkedVals.join(","));
}
//之前的，暂留，最后删除
function setDisable(filetext) {
	filetext.disabled = true;
}

//用户名称校验，允许中英文数字下划线
function checkSpecialChData(paraName,paraValue,notNullTip,patternTip,length,lengthTip){
	var pattern = /^([\u4e00-\u9fa5\w]+|[a-zA-Z0-9]+)$/;
 	if(notNullTip.length !=0 &&(paraValue == null || paraValue == "")){
		$("#"+paraName+"Mes").css("color","red");
		$("#"+paraName+"Mes").html(notNullTip);
		$("#"+paraName).focus();
		return true;
	}else if(!pattern.test(paraValue)){
		$("#"+paraName+"Mes").css("color","red");
		$("#"+paraName+"Mes").html(patternTip);
		$("#"+paraName).focus();
		return true;
	}else if(paraValue.length > length){
		$("#"+paraName+"Mes").css("color","red");
		$("#"+paraName+"Mes").html(lengthTip+"长度不能大于"+length+"个字符。");
		$("#"+paraName).focus();
		return true;
	}else{
		$("#"+paraName+"Mes").html("");
	}
 	return false;
}

//验证数字，长度
function checkNumberDataWithZero(paraName,paraValue,notNullTip,length,lengthTip){
	var re =  /^[0-9]\d*$/;
 
 	if(paraValue == null || paraValue == ""){
		$("#"+paraName+"Mes").css("color","red");
		$("#"+paraName+"Mes").html(notNullTip);
		$("#"+paraName).focus();
		return true;
	}else if (!re.test(paraValue)) {
		$("#"+paraName+"Mes").css("color","red");
		$("#"+paraName+"Mes").html("只能输入0-9的正整数.");
		$("#"+paraName).select();
		 return true;
	}else if(paraValue.length > length){
		$("#"+paraName+"Mes").css("color","red");
		$("#"+paraName+"Mes").html(lengthTip+"长度不能大于"+length+"个字符。");
		$("#"+paraName).focus();
		return true;
	}else{
		$("#"+paraName+"Mes").html("");
	}
	return false;
}

//验证数字，长度
function checkNumberData(paraName,paraValue,notNullTip,length,lengthTip){
	var re = /^[1-9]+[0-9]*]*$/;
 
 	if(paraValue == null || paraValue == ""){
		$("#"+paraName+"Mes").css("color","red");
		$("#"+paraName+"Mes").html(notNullTip);
		$("#"+paraName).focus();
		return true;
	}else if (!re.test(paraValue)) {
		$("#"+paraName+"Mes").css("color","red");
		$("#"+paraName+"Mes").html("只能输入0-9的正整数.");
		$("#"+paraName).select();
		 return true;
	}else if(paraValue.length > length){
		$("#"+paraName+"Mes").css("color","red");
		$("#"+paraName+"Mes").html(lengthTip+"长度不能大于"+length+"个字符。");
		$("#"+paraName).focus();
		return true;
	}else{
		$("#"+paraName+"Mes").html("");
	}
	return false;
}

//验证邮箱
function checkEmailData(isValidNull,paraName,paraValue,notNullTip){
    var pattern= /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;///^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;  
	if(isValidNull){
		if(paraValue == null || paraValue == ""){
			$("#"+paraName+"Mes").css("color","red");
			$("#"+paraName+"Mes").html(notNullTip);
			$("#"+paraName).focus();
			return true;
		}
	}
	if (!pattern.test(paraValue)) { 
		$("#"+paraName+"Mes").css("color","red");
		$("#"+paraName+"Mes").html("请输入正确的邮箱地址.");
		$("#"+paraName).select();
		return true;
	}else{
		$("#"+paraName+"Mes").html("");
	}
    return false; 
} 

//用户账号校验，以英文字母开头3-16位，可包含数字，下划线
function checkLetterOrData(paraName,paraValue,notNullTip,patternTip,minLength,maxLength,lengthTip){
    var pattern =/^[a-zA-z][a-zA-Z0-9_]{2,16}$/;
	if(paraValue == null || paraValue == ""){
		$("#"+paraName+"Mes").css("color","red");
		$("#"+paraName+"Mes").html(notNullTip);
		$("#"+paraName).focus();
		return true;
	}else if (!pattern.test(paraValue)) {
		$("#"+paraName+"Mes").css("color","red");
		$("#"+paraName+"Mes").html(patternTip);
		$("#"+paraName).select();
		return true;
	}else{
		$("#"+paraName+"Mes").html("");
	}
    return false; 
} 

//角色非空校验
function checkRoleData(paraName,paraValue,notNullTip) {
	
	if(paraValue == null || paraValue == "") {
		$("#"+paraName+"Mes").css("color","red");
		$("#"+paraName+"Mes").html(notNullTip);
		$("#"+paraName).focus();
		return true;
	} else {
		return false;
	}
}

//只能输入字母
function checkLetterData(isValidNull,paraName,paraValue,notNullTip){
    var pattern = /^[A-Za-z]+$/;
	if(isValidNull){
		if(paraValue == null || paraValue == ""){
			$("#"+paraName+"Mes").css("color","red");
			$("#"+paraName+"Mes").html(notNullTip);
			$("#"+paraName).focus();
			return true;
		}
	}
	if (!pattern.test(paraValue)) { 
		$("#"+paraName+"Mes").css("color","red");
		$("#"+paraName+"Mes").html("只能输入a-zA-Z,26个英文字母.");
		$("#"+paraName).select();
		return true;
	}else{
		$("#"+paraName+"Mes").html("");
	}
    return false; 
} 


//非空，非汉字
function checkNoChineseData(paraName,paraValue,notNullTip,patternTip){
    var pattern = /^[^\u4e00-\u9fa5]+$/;
	if(paraValue == null || paraValue == ""){
		$("#"+paraName+"Mes").css("color","red");
		$("#"+paraName+"Mes").html(notNullTip);
		$("#"+paraName).focus();
		return true;
	}else if(!pattern.test(paraValue)){
		$("#"+paraName+"Mes").css("color","red");
		$("#"+paraName+"Mes").html(patternTip);
		$("#"+paraName).select();
		return true;
	}else{
		$("#"+paraName+"Mes").html("");
	}
    return false; 
} 

//关闭tab
function closeTab(){
   	tab.removeTabItem(tab.getSelectedTabItemID());
}
