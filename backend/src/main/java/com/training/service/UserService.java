package com.training.service;

import com.training.dto.UserDTO;
import com.training.exception.DuplicateUserException;
import com.training.exception.UserNotFoundException;
import com.training.model.User;
import com.training.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }
    
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    @Cacheable(value = "users", key = "#id")
    public Optional<UserDTO> getUserById(Long id) {
        return userRepository.findById(id)
                .map(this::convertToDTO);
    }

    // Session 05/12: paginated query
    public Page<UserDTO> getPagedUsers(int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("id").descending());
        return userRepository.findAll(pageRequest).map(this::convertToDTO);
    }
    
    public Optional<UserDTO> getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .map(this::convertToDTO);
    }
    
    public UserDTO createUser(UserDTO userDTO) {
        if (userRepository.existsByUsername(userDTO.getUsername())) {
            throw new DuplicateUserException("Username", userDTO.getUsername());
        }
        if (userRepository.existsByEmail(userDTO.getEmail())) {
            throw new DuplicateUserException("Email", userDTO.getEmail());
        }
        
        User user = convertToEntity(userDTO);
        User savedUser = userRepository.save(user);
        return convertToDTO(savedUser);
    }
    
    @CachePut(value = "users", key = "#id")
    public Optional<UserDTO> updateUser(Long id, UserDTO userDTO) {
        return userRepository.findById(id)
                .map(existingUser -> {
                    existingUser.setEmail(userDTO.getEmail());
                    existingUser.setFirstName(userDTO.getFirstName());
                    existingUser.setLastName(userDTO.getLastName());
                    if (userDTO.getPassword() != null && !userDTO.getPassword().isEmpty()) {
                        existingUser.setPassword(passwordEncoder.encode(userDTO.getPassword()));
                    }
                    User updatedUser = userRepository.save(existingUser);
                    return convertToDTO(updatedUser);
                });
    }
    
    @CacheEvict(value = "users", key = "#id")
    public boolean deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    // Helper methods for conversion
    private UserDTO convertToDTO(User user) {
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        // Don't include password in DTO
        return dto;
    }
    
    private User convertToEntity(UserDTO dto) {
        User user = new User();
        user.setUsername(dto.getUsername());
        user.setEmail(dto.getEmail());
        // Encode password before saving
        if (dto.getPassword() != null && !dto.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(dto.getPassword()));
        }
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        return user;
    }
}
