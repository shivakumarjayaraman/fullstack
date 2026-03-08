package com.training.service;

import com.training.model.AuditLog;
import com.training.repository.AuditLogRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

/**
 * Session 10: Records audit log entries for significant actions.
 * Inject this into controllers or services and call log().
 */
@Component
public class AuditService {

    @Autowired
    private AuditLogRepository auditLogRepository;

    @Autowired
    private HttpServletRequest request;

    public void log(String action, String resource) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = (auth != null && auth.isAuthenticated()) ? auth.getName() : "anonymous";
        String ipAddress = request.getRemoteAddr();
        auditLogRepository.save(new AuditLog(username, action, resource, ipAddress));
    }
}
