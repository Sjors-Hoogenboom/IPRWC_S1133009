package com.Sjors_Hoogenboom.IPRWC.services;

import com.Sjors_Hoogenboom.IPRWC.dto.SignupRequest;

public interface AuthService {
    boolean createUser(SignupRequest signupRequest);
}
