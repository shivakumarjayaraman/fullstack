package com.training.repository;

/**
 * Interface-based projection — Session 05.
 * Spring Data JPA returns only these two columns without loading the full User entity.
 */
public interface UserSummary {
    String getUsername();
    String getEmail();
}
