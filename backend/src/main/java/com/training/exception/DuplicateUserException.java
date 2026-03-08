package com.training.exception;

public class DuplicateUserException extends RuntimeException {

    public DuplicateUserException(String field, String value) {
        super(field + " '" + value + "' already exists");
    }
}
