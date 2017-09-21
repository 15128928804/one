package com.cs.controller.user;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cs.model.user.User;
import com.cs.service.user.UserService;

@Controller
@RequestMapping("userController")
public class UserController {
	
	@Autowired
	private UserService userService;

	/**
	 * 
	 * 功能简介：查询
	 * @data2017年9月20日上午10:18:07
	 * @param request
	 * @param rootKey
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/queryList")
	public Map<String,Object> queryList(HttpServletRequest request, User user) {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		
		try{
			
			int page = request.getParameter("page")==null?1:Integer.valueOf(request.getParameter("page"));
			if(page < 1)
				page = 1;
			int pageSize = request.getParameter("pagesize")==null?1:Integer.valueOf(request.getParameter("pagesize"));
			if(null == user.getIsExact()) {
				user.setIsExact("true");
			}
			user.setCurrentPage(page);
			user.setPageSize(pageSize);
			int total = userService.queryCount(user);
			if(total > 0) {
				user.setTotalCount(total);
				List<User> list = userService.queryList(user);
				
				resultMap.put("Total", total);
				resultMap.put("Rows", list);
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return resultMap;
	}
	
	/**
	 * 
	 * 功能简介：添加
	 * @data2017年9月20日上午11:52:22
	 * @param request
	 * @param rootKey
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/addUser")
	public Map<String,Object> addRootKey(HttpServletRequest request, User user) {
		
		Map<String,Object> resultMap = new HashMap<String, Object>();
		String status = "error";
		String message = "";
		
		try{
			
			User user2 = new User();
			user2.setIsExact("true");
			user2 = userService.queryUser(user);
			if(user2 != null) {
				status = "exist";
				message = "输入信息重复，请修改后提交。";
			} else {

				userService.addUser(user);
				status = "success";
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		
		resultMap.put("status", status);
		resultMap.put("message", message);
		return resultMap;
	}
	
	@RequestMapping("/queryUser")
	public String queryRootKey(ModelMap model, int primaryKeyId, String type) {
		
		try{
			User user = new User();
			user.setId(primaryKeyId);
			user = userService.queryUser(user);
			
			if(user != null) {
				if("update".equals(type)) {
					model.put("user", user);
					return "user/updateUser";
				}
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		
		return null;
	}
	
	/**
	 * 
	 * 功能简介：修改
	 * @data2017年9月20日下午3:13:27
	 * @param request
	 * @param rootKey
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/updateUser")
	public Map<String,Object> updateRootKey(HttpServletRequest request, User user) {
		
		Map<String,Object> resultMap = new HashMap<String, Object>();
		String status = "error";
		String message = "";
		
		try{
			
			User user2 = new User();
			user2.setIsExact("true");
			user2 = userService.queryUser(user);
			if(user2 != null) {
				status = "exist";
				message = "输入信息重复，请修改后提交。";
			} else {

				userService.updateUser(user);
				status = "success";
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		
		resultMap.put("status", status);
		resultMap.put("message", message);
		return resultMap;
	}
	
	/**
	 * 
	 * 功能简介：删除
	 * @data2017年9月20日下午3:13:58
	 * @param idStr
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/deleteUser")
	public Map<String,Object> deleteRootKey(String idStr) {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		String status = "error";
		
		try{
			
			if(null != idStr) {
				String[] idsArray = idStr.split(",");
				
				userService.deleteUser(idsArray);
				status = "success";
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		
		resultMap.put("status", status);
		return resultMap;
	}
}
