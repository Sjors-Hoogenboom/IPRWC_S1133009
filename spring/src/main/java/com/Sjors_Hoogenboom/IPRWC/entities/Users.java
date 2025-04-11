package com.Sjors_Hoogenboom.IPRWC.entities;

import com.Sjors_Hoogenboom.IPRWC.enums.UserRole;
import jakarta.persistence.*;
import java.util.UUID;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

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

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole userRole;
}
