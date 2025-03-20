package com.Sjors_Hoogenboom.IPRWC.repository;

import com.Sjors_Hoogenboom.IPRWC.entities.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, UUID> {
}