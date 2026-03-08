package com.training;

import com.training.dto.UserDTO;
import com.training.exception.DuplicateUserException;
import com.training.model.User;
import com.training.repository.UserRepository;
import com.training.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

/**
 * Session 06: Unit test — isolates UserService using Mockito mocks.
 * No Spring context is loaded; all dependencies are mocked.
 */
@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    private User sampleUser;

    @BeforeEach
    void setUp() {
        sampleUser = new User("alice", "alice@example.com", "encoded-password");
        sampleUser.setId(1L);
        sampleUser.setFirstName("Alice");
        sampleUser.setLastName("Smith");
    }

    @Test
    void getAllUsers_returnsListOfDTOs() {
        when(userRepository.findAll()).thenReturn(List.of(sampleUser));

        List<UserDTO> result = userService.getAllUsers();

        assertEquals(1, result.size());
        assertEquals("alice", result.get(0).getUsername());
    }

    @Test
    void getUserById_found_returnsDTO() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(sampleUser));

        Optional<UserDTO> result = userService.getUserById(1L);

        assertTrue(result.isPresent());
        assertEquals("alice@example.com", result.get().getEmail());
    }

    @Test
    void getUserById_notFound_returnsEmpty() {
        when(userRepository.findById(99L)).thenReturn(Optional.empty());

        Optional<UserDTO> result = userService.getUserById(99L);

        assertFalse(result.isPresent());
    }

    @Test
    void createUser_success_returnsSavedDTO() {
        UserDTO dto = new UserDTO();
        dto.setUsername("bob");
        dto.setEmail("bob@example.com");
        dto.setPassword("password123");

        when(userRepository.existsByUsername("bob")).thenReturn(false);
        when(userRepository.existsByEmail("bob@example.com")).thenReturn(false);
        when(passwordEncoder.encode("password123")).thenReturn("hashed");
        when(userRepository.save(any(User.class))).thenAnswer(inv -> {
            User u = inv.getArgument(0);
            u.setId(2L);
            return u;
        });

        UserDTO result = userService.createUser(dto);

        assertNotNull(result);
        assertEquals("bob", result.getUsername());
        verify(userRepository).save(any(User.class));
    }

    @Test
    void createUser_duplicateUsername_throwsDuplicateUserException() {
        UserDTO dto = new UserDTO();
        dto.setUsername("alice");
        dto.setEmail("alice2@example.com");
        dto.setPassword("password");

        when(userRepository.existsByUsername("alice")).thenReturn(true);

        assertThrows(DuplicateUserException.class, () -> userService.createUser(dto));
        verify(userRepository, never()).save(any());
    }

    @Test
    void deleteUser_exists_returnsTrueAndDeletes() {
        when(userRepository.existsById(1L)).thenReturn(true);

        boolean result = userService.deleteUser(1L);

        assertTrue(result);
        verify(userRepository).deleteById(1L);
    }

    @Test
    void deleteUser_notExists_returnsFalse() {
        when(userRepository.existsById(99L)).thenReturn(false);

        boolean result = userService.deleteUser(99L);

        assertFalse(result);
        verify(userRepository, never()).deleteById(anyLong());
    }
}
