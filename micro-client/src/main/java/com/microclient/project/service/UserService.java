package com.microclient.project.service;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@FeignClient("user-service")
public interface UserService {
	
	@RequestMapping(value = "/isexist", method = RequestMethod.GET)
	public ResponseEntity<?> isExist();
	
	@RequestMapping(value = "/user/list", method = RequestMethod.GET)
	public ResponseEntity<?> getAllUser();
}
