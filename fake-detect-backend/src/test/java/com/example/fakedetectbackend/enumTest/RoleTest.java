package com.example.fakedetectbackend.enumTest;

import com.example.fakedetectbackend.model.enums.Role;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

@Slf4j
public class RoleTest {
    @Test
    public void testUser(){
        assertEquals("USER", Role.USER.toString());
    }
    @Test
    public void testAdmin(){
        assertEquals("ADMIN",Role.ADMIN.toString());
    }
}
