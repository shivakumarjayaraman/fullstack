package com.training.controller;

import com.training.dto.AuthResponse;
import com.training.dto.LoginRequest;
import com.training.dto.RefreshTokenRequest;
import com.training.dto.UserDTO;
import com.training.security.JwtUtil;
import com.training.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
    private UserDetailsService userDetailsService;
    
    @Autowired
    private UserService userService;
    
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getUsername(), request.getPassword()
            )
        );
        
        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());
        String token = jwtUtil.generateToken(userDetails);
        
        // Get user DTO
        UserDTO userDTO = userService.getUserByUsername(request.getUsername())
                .orElse(null);
        
        AuthResponse response = new AuthResponse(token, userDTO);
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody UserDTO userDTO) {
        UserDTO createdUser = userService.createUser(userDTO);

        UserDetails userDetails = userDetailsService.loadUserByUsername(createdUser.getUsername());
        String token = jwtUtil.generateToken(userDetails);

        AuthResponse response = new AuthResponse(token, createdUser);
        return ResponseEntity.ok(response);
    }

    // Session 09: refresh token — POST /auth/refresh
    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refresh(@Valid @RequestBody RefreshTokenRequest request) {
        String username = jwtUtil.extractUsername(request.getToken());
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);

        if (jwtUtil.validateToken(request.getToken(), userDetails)) {
            String newToken = jwtUtil.generateToken(userDetails);
            UserDTO userDTO = userService.getUserByUsername(username).orElse(null);
            return ResponseEntity.ok(new AuthResponse(newToken, userDTO));
        }
        return ResponseEntity.badRequest().build();
    }

    // Session 09: get current user — GET /auth/me
    @GetMapping("/me")
    public ResponseEntity<UserDTO> getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        return userService.getUserByUsername(username)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
