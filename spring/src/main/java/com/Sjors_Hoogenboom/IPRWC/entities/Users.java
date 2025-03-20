package com.Sjors_Hoogenboom.IPRWC.entities;

import com.Sjors_Hoogenboom.IPRWC.enums.UserRole;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Entity
@Data
public class Users {
    @Setter
    @Getter
    @Id
    @GeneratedValue (strategy = GenerationType.UUID)
    private UUID id;
    @Setter
    @Getter
    @Column(nullable = false)
    private String name;
    @Setter
    @Getter
    @Column(nullable = false)
    private String password;
    @Setter
    @Getter
    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private UserRole userRole;
}
