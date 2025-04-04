package com.Sjors_Hoogenboom.IPRWC.repository;

import com.Sjors_Hoogenboom.IPRWC.entities.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ProductRepository extends JpaRepository<Products, UUID> {
    boolean existsByName(String name);
}
