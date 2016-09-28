package com.microusersv.project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.microusersv.project.model.User;

public interface UserRepository extends JpaRepository<User, Long>{
	public List<User> findByUserName(String userName);
}
