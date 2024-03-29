package com.example.fakedetectbackend.ws;

import com.example.fakedetectbackend.dto.others.WsMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WebSocketController {
    @MessageMapping("/chat")
    @SendTo("/topic/chat")
    public WsMessage chatMapping(WsMessage message) throws Exception {
        return message;
    }
}
