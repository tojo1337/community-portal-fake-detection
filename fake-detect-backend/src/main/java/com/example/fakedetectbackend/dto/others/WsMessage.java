package com.example.fakedetectbackend.dto.others;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class WsMessage {
    private String user;
    private String message;
    private String postingTime;
}
