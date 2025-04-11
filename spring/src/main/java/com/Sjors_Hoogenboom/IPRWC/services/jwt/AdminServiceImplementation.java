package com.Sjors_Hoogenboom.IPRWC.services.jwt;

import com.Sjors_Hoogenboom.IPRWC.entities.Products;
import com.Sjors_Hoogenboom.IPRWC.entities.Users;
import com.Sjors_Hoogenboom.IPRWC.enums.UserRole;
import com.Sjors_Hoogenboom.IPRWC.repository.ProductRepository;
import com.Sjors_Hoogenboom.IPRWC.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdminServiceImplementation {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    @Value("${admin.email}")
    private String adminEmail;

    @Value("${admin.name}")
    private String adminName;

    @Value("${admin.password}")
    private String adminPassword;

    @Autowired
    public AdminServiceImplementation(UserRepository userRepository, ProductRepository productRepository) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    @PostConstruct
    public void init() {
        createAdminAccount();
    }

    public void createAdminAccount() {
        boolean adminExists = userRepository.findByEmail(adminEmail).isPresent();
        if (!adminExists) {
            Users admin = new Users();
            admin.setUserRole(UserRole.ADMIN);
            admin.setEmail(adminEmail);
            admin.setName(adminName);
            admin.setPassword(new BCryptPasswordEncoder().encode(adminPassword));
            userRepository.save(admin);
        }
    }

    public Products postProduct(Products products) {
        Products newProducts = new Products();
        newProducts.setName(products.getName());
        newProducts.setDescription(products.getDescription());
        newProducts.setPrice(products.getPrice());
        newProducts.setStock(products.getStock());
        newProducts.setImageUrl(products.getImageUrl());
        return productRepository.save(newProducts);
    }
}
