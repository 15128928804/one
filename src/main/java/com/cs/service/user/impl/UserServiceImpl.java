package com.cs.service.user.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cs.mapper.user.UserMapper;
import com.cs.model.user.User;
import com.cs.service.user.UserService;

@Service("userService")
public class UserServiceImpl implements UserService{

	@Autowired
	private UserMapper userMapper;
	
	public int queryCount(User user) {
		int count = userMapper.queryCount(user);
		return count;
	}

	public List<User> queryList(User user) {
		List<User> list = userMapper.queryList(user);
		return list;
	}

	public User queryUser(User user) {
		User user2 = userMapper.queryUser(user);
		return user2;
	}

	public void addUser(User user) {

		userMapper.addUser(user);
	}

	public void updateUser(User user) {

		userMapper.updateUser(user);
	}

	public void deleteUser(String[] ids) {

		userMapper.deleteUser(ids);
	}

}
