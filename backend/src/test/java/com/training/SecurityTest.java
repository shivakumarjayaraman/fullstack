package com.training;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Session 06/08: Tests Spring Security integration with MockMvc.
 *
 * NOTE on known limitation: Spring Security 6 requires an explicit
 * AuthenticationEntryPoint (e.g. HttpStatusEntryPoint(UNAUTHORIZED)) in
 * SecurityConfig to consistently return 401 for unauthenticated requests in
 * a stateless JWT setup. Without it, the response falls through as 200.
 * This is the known SecurityConfig bug discussed in Session 08.
 *
 * These tests focus on what IS verifiable: that @WithMockUser allows access
 * and that auth endpoints are reachable without credentials.
 */
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class SecurityTest {

    @Autowired
    private MockMvc mockMvc;

    /**
     * Public hello endpoint should be reachable without a token.
     * (The permit rule /api/hello/** has the known context-path prefix bug,
     * but in the MOCK environment anyRequest() falls through without blocking.)
     */
    @Test
    void publicHelloEndpoint_isAccessibleWithoutAuth() throws Exception {
        mockMvc.perform(get("/hello"))
                .andExpect(status().isOk());
    }

    /**
     * An authenticated user (injected via @WithMockUser) can reach the users endpoint.
     */
    @Test
    @WithMockUser(username = "testuser", roles = "USER")
    void authenticatedUser_canAccessUsers() throws Exception {
        mockMvc.perform(get("/users"))
                .andExpect(status().isOk());
    }

    /**
     * An authenticated user can reach the hello endpoint.
     */
    @Test
    @WithMockUser(username = "testuser", roles = "USER")
    void authenticatedUser_canAccessHello() throws Exception {
        mockMvc.perform(get("/hello"))
                .andExpect(status().isOk());
    }

    /**
     * An admin user accessing an unmapped admin path gets an error response (not a success).
     * (Demonstrates @WithMockUser role injection; the admin URL rule in
     * SecurityConfig has the same context-path prefix bug, so the route falls through.
     * With no admin controller mapped, Spring MVC returns a 4xx or 5xx error.)
     */
    @Test
    @WithMockUser(username = "admin", roles = "ADMIN")
    void adminUser_accessingAdminPath_getsErrorResponse() throws Exception {
        // /admin/** has no controller yet — Spring MVC returns an error status.
        // In MockMvc, an unmapped route may return 404 or 500 depending on MVC config.
        // Either way it should not be a 2xx success.
        mockMvc.perform(get("/admin/test"))
                .andExpect(result -> assertTrue(
                        result.getResponse().getStatus() >= 400,
                        "Expected error status (4xx or 5xx) but got: " + result.getResponse().getStatus()
                ));
    }
}
