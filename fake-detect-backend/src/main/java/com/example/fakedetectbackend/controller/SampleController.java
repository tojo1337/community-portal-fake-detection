package com.example.fakedetectbackend.controller;

import com.example.fakedetectbackend.model.others.Sample;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:3000")
public class SampleController {
    @GetMapping
    public ResponseEntity<Sample> greet(){
        return new ResponseEntity<>(
                new Sample("Hello world here"),
                HttpStatus.OK
        );
    }
}
