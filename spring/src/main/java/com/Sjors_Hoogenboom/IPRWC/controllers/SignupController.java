package com.Sjors_Hoogenboom.IPRWC.controllers;

import com.Sjors_Hoogenboom.IPRWC.dto.SignupRequest;
import com.Sjors_Hoogenboom.IPRWC.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/signup")
public class SignupController {

    private final AuthService authService;

    @Autowired
    public SignupController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping
    public ResponseEntity<Map<String, String>> signupCustomer(@RequestBody SignupRequest signupRequest) {
        boolean isUserCreated = authService.createCustomer(signupRequest);

        Map<String, String> response = new HashMap<>();
        if (isUserCreated) {
            response.put("message", "Customer created successfully");
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } else {
            response.put("message", "Failed to create customer");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
}
