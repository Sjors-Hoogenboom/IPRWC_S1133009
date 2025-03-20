package com.Sjors_Hoogenboom.IPRWC.services;

import com.Sjors_Hoogenboom.IPRWC.entities.Products;
import com.Sjors_Hoogenboom.IPRWC.exceptions.DuplicateProductException;
import com.Sjors_Hoogenboom.IPRWC.repository.ProductRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Products> getAllProducts() {
        return productRepository.findAll();
    }

    public Products addProduct(Products product) {
        if (productRepository.existsByName(product.getName())) {
            throw new DuplicateProductException("Duplicate product detected, change the name");
        }
        return productRepository.save(product);
    }

    public void deleteProduct(UUID id) {
        if (!productRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found");
        }
        productRepository.deleteById(id);
    }
}