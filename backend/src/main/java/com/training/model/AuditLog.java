package com.training.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * Session 10: Audit log entry — records who did what and when.
 */
@Entity
@Table(name = "audit_logs")
public class AuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String action;   // e.g. "CREATE_USER", "DELETE_USER"

    @Column
    private String resource; // e.g. "/users/5"

    @Column(name = "ip_address")
    private String ipAddress;

    @Column(nullable = false)
    private LocalDateTime timestamp;

    @PrePersist
    protected void onCreate() {
        timestamp = LocalDateTime.now();
    }

    public AuditLog() {}

    public AuditLog(String username, String action, String resource, String ipAddress) {
        this.username = username;
        this.action = action;
        this.resource = resource;
        this.ipAddress = ipAddress;
    }

    public Long getId() { return id; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }
    public String getResource() { return resource; }
    public void setResource(String resource) { this.resource = resource; }
    public String getIpAddress() { return ipAddress; }
    public void setIpAddress(String ipAddress) { this.ipAddress = ipAddress; }
    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}
