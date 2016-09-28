package com.microusersv.project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.microusersv.project.model.User;
import com.microusersv.project.repository.UserRepository;

@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	private UserRepository userRepository;

	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public ResponseEntity<List<User>> getAllUser() throws InterruptedException {
		// Thread.sleep(10000);
		return new ResponseEntity<>(userRepository.findAll(), HttpStatus.OK);
	}
}
