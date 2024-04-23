package com.example.fakedetectbackend.model.complain;

import lombok.*;

@Data
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CompReq {
    private String email;
    private String complain;
}
