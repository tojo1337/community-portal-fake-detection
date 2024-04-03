package com.example.fakedetectbackend.ws;

import com.example.fakedetectbackend.model.others.WsMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class WebSocketController {
    @MessageMapping("/message")
    @SendTo("/topic/chat")
    public WsMessage chatMapping(WsMessage message) throws Exception {
        return message;
    }
}
