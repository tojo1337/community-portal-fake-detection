package com.example.fakedetectbackend.controller;

import com.example.fakedetectbackend.model.complain.CompReq;
import com.example.fakedetectbackend.model.complain.ComplainDto;
import com.example.fakedetectbackend.service.ComplainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/comp/")
public class ComplainController {
    @Autowired
    private ComplainService comp;
    @PostMapping("make-complain")
    public HttpStatus saveComplain(@RequestBody CompReq req){
        comp.save(req);
        return HttpStatus.OK;
    }
    @GetMapping("all-complains")
    public List<ComplainDto> getAllComplains(){
        return comp.getAllComplains();
    }
    @GetMapping("delete-complain/{compId}")
    public HttpStatus deleteComplain(@PathVariable int compId){
        comp.delete(compId);
        return HttpStatus.OK;
    }
}
