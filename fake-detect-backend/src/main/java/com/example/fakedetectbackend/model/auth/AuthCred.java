package com.example.fakedetectbackend.model.auth;

import lombok.*;

@Data
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class AuthCred {
    private String user;
    private String pass;
}
