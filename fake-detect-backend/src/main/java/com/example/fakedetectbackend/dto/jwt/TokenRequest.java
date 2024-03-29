package com.example.fakedetectbackend.dto.jwt;

import lombok.*;

@Data
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class TokenRequest {
    private String token;
}
