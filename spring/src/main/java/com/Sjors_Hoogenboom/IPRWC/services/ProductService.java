package com.Sjors_Hoogenboom.IPRWC.services;

import com.Sjors_Hoogenboom.IPRWC.entities.Products;
import com.Sjors_Hoogenboom.IPRWC.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Products> getAllProducts() {
        return productRepository.findAll();
    }
}