package com.Sjors_Hoogenboom.IPRWC.repository;

import com.Sjors_Hoogenboom.IPRWC.entities.Users;
import com.Sjors_Hoogenboom.IPRWC.enums.UserRole;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<Users, UUID> {

    boolean existsByEmail(String email);

    Optional<Users> findByEmail(String email);

    Users findByUserRole(UserRole userRole);
}