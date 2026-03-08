package com.training.model;

import jakarta.persistence.*;

/**
 * Session 10: Fine-grained permission within a Role.
 * e.g. "user:read", "user:write", "user:delete"
 */
@Entity
@Table(name = "permissions")
public class Permission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String name; // e.g. "user:read"

    public Permission() {}

    public Permission(String name) {
        this.name = name;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}
