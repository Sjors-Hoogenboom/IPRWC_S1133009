package com.Sjors_Hoogenboom.IPRWC.controllers;

import com.Sjors_Hoogenboom.IPRWC.dto.LoginRequest;
import com.Sjors_Hoogenboom.IPRWC.dto.LoginResponse;
import com.Sjors_Hoogenboom.IPRWC.entities.User;
import com.Sjors_Hoogenboom.IPRWC.services.jwt.UserServiceImplementation;
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
    private final UserServiceImplementation userService;
    private final JwtUtil jwtUtil;

    @Autowired
    public LoginController(AuthenticationManager authenticationManager, UserServiceImplementation userService, JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
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

        User user = userService.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email " + loginRequest.getEmail()));

        String jwt = jwtUtil.generateToken(user.getEmail(), user.getName(), user.getUserRole());

        return ResponseEntity.ok(new LoginResponse(jwt));
    }
}
