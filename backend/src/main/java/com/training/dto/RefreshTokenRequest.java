package com.training.dto;

import jakarta.validation.constraints.NotBlank;

public class RefreshTokenRequest {

    @NotBlank(message = "Token is required")
    private String token;

    public RefreshTokenRequest() {}

    public RefreshTokenRequest(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
