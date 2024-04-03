package com.example.fakedetectbackend.model.jwt;

import lombok.*;

@Data
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class TokenRequest {
    private String token;
}
