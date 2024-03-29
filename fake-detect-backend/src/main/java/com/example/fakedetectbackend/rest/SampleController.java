package com.example.fakedetectbackend.rest;

import com.example.fakedetectbackend.dto.others.Sample;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SampleController {
    @GetMapping("/api/v1/")
    public Sample greet(){
        return new Sample("Hello world here");
    }
}
