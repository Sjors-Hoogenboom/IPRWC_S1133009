package com.Sjors_Hoogenboom.IPRWC.repository;

import com.Sjors_Hoogenboom.IPRWC.entities.Orders;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Orders, UUID> {
}
