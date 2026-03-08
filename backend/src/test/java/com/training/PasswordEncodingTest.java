package com.training;

import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordEncodingTest {
    @Test
    public void testPasswordEncoding() {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String password = encoder.encode("password");
        System.out.println(password);
        password = encoder.encode("admin");
        System.out.println(password);
    }
}
