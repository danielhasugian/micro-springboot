package com.microusersv.project.controller;

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

	@Autowired
	private UserRepository userRepository;
	
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public ResponseEntity<?> getAllUser(){
		return new ResponseEntity<>(userRepository.findAll(), HttpStatus.OK);
	}
}
