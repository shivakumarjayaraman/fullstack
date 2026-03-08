package com.training.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Instant;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Session 10: Simple in-memory rate limiter — 10 requests per minute per IP.
 * For production, use Bucket4j with Redis for distributed rate limiting.
 */
public class RateLimitingFilter extends OncePerRequestFilter {

    private static final int MAX_REQUESTS = 10;
    private static final long WINDOW_MS = 60_000; // 1 minute

    private final ConcurrentHashMap<String, long[]> requestLog = new ConcurrentHashMap<>();

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        String ip = request.getRemoteAddr();
        long now = Instant.now().toEpochMilli();

        requestLog.compute(ip, (key, timestamps) -> {
            if (timestamps == null) {
                return new long[]{now, 1};
            }
            long windowStart = timestamps[0];
            long count = timestamps[1];
            if (now - windowStart > WINDOW_MS) {
                return new long[]{now, 1}; // reset window
            }
            return new long[]{windowStart, count + 1};
        });

        long[] entry = requestLog.get(ip);
        if (entry[1] > MAX_REQUESTS) {
            response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
            response.getWriter().write("{\"error\": \"Too many requests. Please slow down.\"}");
            return;
        }

        filterChain.doFilter(request, response);
    }
}
