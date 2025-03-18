package com.Sjors_Hoogenboom.IPRWC.services;

import com.Sjors_Hoogenboom.IPRWC.dto.SignupRequest;
import com.Sjors_Hoogenboom.IPRWC.entities.Customer;
import com.Sjors_Hoogenboom.IPRWC.repository.CustomerRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImplementation implements AuthService {

    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthServiceImplementation(CustomerRepository customerRepository, PasswordEncoder passwordEncoder) {
        this.customerRepository = customerRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public boolean createCustomer(SignupRequest signupRequest) {
        if (customerRepository.existsByEmail(signupRequest.getEmail())) {
            return false;
        }

        Customer customer = new Customer();
        BeanUtils.copyProperties(signupRequest, customer);

        String hashedPassword = passwordEncoder.encode(signupRequest.getPassword());
        customer.setPassword(hashedPassword);
        customerRepository.save(customer);
        return true;
    }
}
