package com.example.fakedetectbackend.dto.auth;

import lombok.*;

@Data
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class AuthRequest {
    private String user;
    private String pass;
}
