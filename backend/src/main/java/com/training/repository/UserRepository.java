package com.training.repository;

import com.training.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // --- Basic finders ---
    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    // --- Session 05: derived query methods ---
    List<User> findByEmailContaining(String keyword);

    List<User> findByAgeGreaterThan(int age);

    List<User> findByAgeBetween(int min, int max);

    List<User> findByUsernameStartingWith(String prefix);

    // --- Session 05: JPQL queries ---
    @Query("SELECT u FROM User u WHERE u.email = :email OR u.username = :username")
    Optional<User> findByEmailOrUsername(@Param("email") String email, @Param("username") String username);

    @Query("SELECT u FROM User u WHERE u.age > :age")
    List<User> findUsersOlderThan(@Param("age") int age);

    @Query("SELECT u FROM User u WHERE u.active = true")
    List<User> findActiveUsers();

    // --- Session 05: projection ---
    @Query("SELECT u.username AS username, u.email AS email FROM User u")
    List<UserSummary> findAllUserSummaries();

    // --- Session 05: modifying query ---
    @Modifying
    @Query("UPDATE User u SET u.active = false WHERE u.active = true AND u.age > :age")
    int deactivateUsersOlderThan(@Param("age") int age);
}
