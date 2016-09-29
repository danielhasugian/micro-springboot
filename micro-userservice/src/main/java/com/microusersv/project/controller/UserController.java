package com.microusersv.project.controller;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.microusersv.project.repository.UserRepository;

@RestController
@RequestMapping("/user")
public class UserController {

	private final String appId = UUID.randomUUID().toString();

	@Autowired
	private UserRepository userRepository;

	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public ResponseEntity<Object> getAllUser() throws InterruptedException {
		// Thread.sleep(10000);
		Object[] object = new Object[2];
		object[0] = appId;
		object[1] = userRepository.findAll();
		return new ResponseEntity<>(object, HttpStatus.OK);
	}
}
