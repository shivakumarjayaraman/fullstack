package com.training.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Set;

/**
 * Session 10: Restricts access to specific admin paths by IP address.
 * Add this filter before JwtAuthenticationFilter in SecurityConfig for admin endpoints.
 */
public class IpWhitelistFilter extends OncePerRequestFilter {

    private final Set<String> allowedIps;
    private final String protectedPath;

    public IpWhitelistFilter(Set<String> allowedIps, String protectedPath) {
        this.allowedIps = allowedIps;
        this.protectedPath = protectedPath;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        String uri = request.getRequestURI();
        if (uri.startsWith(protectedPath)) {
            String ip = request.getRemoteAddr();
            if (!allowedIps.contains(ip)) {
                response.setStatus(HttpStatus.FORBIDDEN.value());
                response.getWriter().write("{\"error\": \"Access denied from your IP address.\"}");
                return;
            }
        }
        filterChain.doFilter(request, response);
    }
}
