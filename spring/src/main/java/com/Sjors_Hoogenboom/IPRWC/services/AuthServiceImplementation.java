package com.Sjors_Hoogenboom.IPRWC.services;

import com.Sjors_Hoogenboom.IPRWC.dto.SignupRequest;
import com.Sjors_Hoogenboom.IPRWC.entities.Users;
import com.Sjors_Hoogenboom.IPRWC.enums.UserRole;
import com.Sjors_Hoogenboom.IPRWC.repository.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImplementation implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthServiceImplementation(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public boolean createUser(SignupRequest signupRequest) {
        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            return false;
        }

        Users users = new Users();
        BeanUtils.copyProperties(signupRequest, users);

        users.setUserRole(UserRole.USER);
        String hashedPassword = passwordEncoder.encode(signupRequest.getPassword());
        users.setPassword(hashedPassword);
        userRepository.save(users);
        return true;
    }
}
