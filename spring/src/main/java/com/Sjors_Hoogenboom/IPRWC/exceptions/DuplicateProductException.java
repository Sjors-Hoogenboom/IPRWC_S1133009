package com.Sjors_Hoogenboom.IPRWC.exceptions;

public class DuplicateProductException extends RuntimeException {
    public DuplicateProductException(String message) {
        super(message);
    }
}