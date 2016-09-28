package com.microclient.project.controller;

import java.util.concurrent.Future;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.AsyncResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.microclient.project.service.UserService;

@RestController
@RequestMapping("/")
public class MainController {

	@Autowired
	private UserService userService;

	@Async
	public Future<ResponseEntity<?>> getUserAsync() throws InterruptedException {
		// Thread.sleep(1000);
		return new AsyncResult<ResponseEntity<?>>(userService.getAllUser());
	}

	@RequestMapping(value = "getusers", method = RequestMethod.GET)
	public ResponseEntity<?> getService() {
		return new ResponseEntity<>(userService.getAllUser(), HttpStatus.OK);
	}

	@RequestMapping(value = "isexist", method = RequestMethod.GET)
	public ResponseEntity<?> isExist() {
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
