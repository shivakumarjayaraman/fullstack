package com.training;

import com.training.dto.UserDTO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Session 06: Integration test — starts a real embedded server on a random port.
 * Uses TestRestTemplate to make actual HTTP calls end-to-end.
 * Note: /users endpoint requires authentication; this test focuses on auth + user creation flow.
 */
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
class UserIntegrationTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    private String baseUrl() {
        return "http://localhost:" + port;
    }

    @Test
    void helloEndpoint_returnsOk() {
        // TestRestTemplate hits the real server — context-path /api must be included
        ResponseEntity<String> response = restTemplate.getForEntity(baseUrl() + "/api/hello", String.class);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(response.getBody().contains("Hello"));
    }

    @Test
    void registerUser_thenLoginSucceeds() {
        UserDTO registerRequest = new UserDTO();
        registerRequest.setUsername("integrationuser");
        registerRequest.setEmail("integration@example.com");
        registerRequest.setPassword("password123");

        ResponseEntity<String> registerResponse = restTemplate.postForEntity(
                baseUrl() + "/api/auth/register",
                registerRequest,
                String.class
        );

        assertEquals(HttpStatus.OK, registerResponse.getStatusCode());
        assertNotNull(registerResponse.getBody());
        assertTrue(registerResponse.getBody().contains("token"));
    }
}
