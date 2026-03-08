package com.training.repository;

import com.training.dto.UserDTO;
import com.training.service.UserService;
import org.junit.Assert;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
public class UserRepoTest {
    @Autowired
    UserService service;

    @Test
    public void testUserCreation() {
        int initialUsers = service.getAllUsers().size();
        UserDTO dto = new UserDTO();
        dto.setUsername("sampleuser");
        dto.setEmail("sample@spjain.edu");
        dto.setPassword("samplepassword");
        UserDTO user = service.createUser(dto);
        System.out.println(user.getId());

        assertEquals(initialUsers+1, service.getAllUsers().size());
        service.deleteUser(user.getId());
        assertEquals(initialUsers, service.getAllUsers().size());

    }
}
