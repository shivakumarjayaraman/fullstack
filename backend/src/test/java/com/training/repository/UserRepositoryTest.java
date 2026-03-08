package com.training.repository;

import com.training.model.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Session 06: @DataJpaTest loads only the JPA slice — no web layer, no services.
 * Uses the H2 in-memory database automatically.
 */
@DataJpaTest
@ActiveProfiles("test")
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    void setUp() {
        userRepository.deleteAll();

        User u1 = new User("alice", "alice@example.com", "password1");
        u1.setAge(30);
        u1.setActive(true);

        User u2 = new User("bob", "bob@example.com", "password2");
        u2.setAge(25);
        u2.setActive(true);

        userRepository.saveAll(List.of(u1, u2));
    }

    @Test
    void findByUsername_returnsUser() {
        Optional<User> result = userRepository.findByUsername("alice");
        assertTrue(result.isPresent());
        assertEquals("alice@example.com", result.get().getEmail());
    }

    @Test
    void findByUsername_notFound_returnsEmpty() {
        Optional<User> result = userRepository.findByUsername("unknown");
        assertFalse(result.isPresent());
    }

    @Test
    void existsByUsername_true() {
        assertTrue(userRepository.existsByUsername("alice"));
    }

    @Test
    void existsByUsername_false() {
        assertFalse(userRepository.existsByUsername("charlie"));
    }

    @Test
    void findByEmail_returnsUser() {
        Optional<User> result = userRepository.findByEmail("bob@example.com");
        assertTrue(result.isPresent());
        assertEquals("bob", result.get().getUsername());
    }

    @Test
    void findByEmailContaining_returnsMatches() {
        List<User> result = userRepository.findByEmailContaining("example.com");
        assertEquals(2, result.size());
    }

    @Test
    void findByAgeGreaterThan_returnsMatches() {
        List<User> result = userRepository.findByAgeGreaterThan(26);
        assertEquals(1, result.size());
        assertEquals("alice", result.get(0).getUsername());
    }

    @Test
    void findActiveUsers_returnsAll() {
        List<User> result = userRepository.findActiveUsers();
        assertEquals(2, result.size());
    }
}
