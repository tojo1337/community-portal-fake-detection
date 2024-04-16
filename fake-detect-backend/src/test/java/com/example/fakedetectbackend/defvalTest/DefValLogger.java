package com.example.fakedetectbackend.defvalTest;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
@Slf4j
public class DefValLogger {
    @Value("${user.name}")
    private String username;
    @Value("${user.password}")
    private String password;
    @Value("${user.email}")
    private String email;
    @Test
    public void showUser(){
        log.info(username);
    }
    @Test
    public void showEmail(){
        log.info(email);
    }
    @Test
    public void showPassword(){
        log.info(password);
    }
}
