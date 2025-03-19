package com.Sjors_Hoogenboom.IPRWC.controllers;

import com.Sjors_Hoogenboom.IPRWC.dto.LoginRequest;
import com.Sjors_Hoogenboom.IPRWC.dto.LoginResponse;
import com.Sjors_Hoogenboom.IPRWC.entities.Customer;
import com.Sjors_Hoogenboom.IPRWC.services.jwt.CustomerServiceImplementation;
import com.Sjors_Hoogenboom.IPRWC.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping(value = "/login", produces = "application/json")
public class LoginController {
    private final AuthenticationManager authenticationManager;
    private final CustomerServiceImplementation customerService;
    private final JwtUtil jwtUtil;

    @Autowired
    public LoginController(AuthenticationManager authenticationManager, CustomerServiceImplementation customerService, JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.customerService = customerService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Customer customer = customerService.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("Customer not found with email " + loginRequest.getEmail()));

        String jwt = jwtUtil.generateToken(customer.getEmail(), customer.getName());

        return ResponseEntity.ok(new LoginResponse(jwt));
    }
}
