package com.example.fakedetectbackend.model.auth;

import lombok.*;

@Data
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class AuthCred {
    private String email;
    private String pass;
}
