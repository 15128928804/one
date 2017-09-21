package com.cs.service.user;

import java.util.List;

import com.cs.model.user.User;

public interface UserService {

int queryCount(User user);
	
	List<User> queryList(User user);
	
	User queryUser(User user);
	
	void addUser(User user);
	
	void updateUser(User user);
	
	void deleteUser(String[] ids);
}
