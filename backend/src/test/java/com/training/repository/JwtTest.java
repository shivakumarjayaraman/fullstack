package com.training.repository;

import com.training.security.JwtUtil;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public class JwtTest {
    @Test
    public void testJwtGenerationAndValidation() {
        // Set secret and expiration for testing
        String secret = "testsecretkeythatshouldbe32byteslong!";
        System.out.println(secret.getBytes().length);
        long expiration = 1000L * 60 * 60; // 1 hour
        JwtUtil jwtUtil = new JwtUtil(secret, expiration);

        UserDetails userDetails = org.springframework.security.core.userdetails.User.builder()
                .username("testuser")
                .password("testpassword")
                .authorities("ROLE_USER")
                .build();
        String token = jwtUtil.generateToken(userDetails);
        System.out.println("Generated JWT: " + token);

        System.out.println("Username is " + jwtUtil.extractUsername(token));
        System.out.println("Expiration is " + jwtUtil.extractExpiration(token));
        jwtUtil.extractAllClaims(token).forEach((k, v) -> System.out.println(k + ": " + v));

        System.out.println(jwtUtil.validateToken(token, userDetails));

    }
}
