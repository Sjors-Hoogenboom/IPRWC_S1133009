package com.Sjors_Hoogenboom.IPRWC.repository;

import com.Sjors_Hoogenboom.IPRWC.entities.User;
import com.Sjors_Hoogenboom.IPRWC.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    boolean existsByEmail(String email);

    Optional<User> findByEmail(String email);

    User findByUserRole(UserRole userRole);
}