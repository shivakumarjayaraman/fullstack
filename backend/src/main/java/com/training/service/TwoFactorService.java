package com.training.service;

import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Session 10: Minimal TOTP-style OTP demo.
 * In production use a library like GoogleAuthenticator or a proper TOTP implementation.
 */
@Service
public class TwoFactorService {

    private final ConcurrentHashMap<String, String> otpStore = new ConcurrentHashMap<>();
    private final SecureRandom random = new SecureRandom();

    public String generateOTP(String username) {
        String otp = String.format("%06d", random.nextInt(1_000_000));
        otpStore.put(username, otp);
        // In a real app: send via SMS/email/authenticator app
        return otp;
    }

    public boolean validateOTP(String username, String otp) {
        String stored = otpStore.get(username);
        if (stored != null && stored.equals(otp)) {
            otpStore.remove(username); // one-time use
            return true;
        }
        return false;
    }
}
