package com.example.fakedetectbackend.model.auth;

import lombok.*;

@Data
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class AuthRequest {
    private String user;
    private String email;
    private String pass;
}
