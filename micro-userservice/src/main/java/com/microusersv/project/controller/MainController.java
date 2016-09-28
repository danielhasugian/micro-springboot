package com.microusersv.project.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("/")
public class MainController {

	@RequestMapping(value = "isexist")
	public ResponseEntity<?> isExist(){
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
}
