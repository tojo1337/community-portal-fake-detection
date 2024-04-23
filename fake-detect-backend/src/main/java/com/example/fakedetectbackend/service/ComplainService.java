package com.example.fakedetectbackend.service;

import com.example.fakedetectbackend.model.complain.CompReq;
import com.example.fakedetectbackend.model.complain.ComplainDto;
import com.example.fakedetectbackend.repo.ComplainRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ComplainService {
    @Autowired
    private ComplainRepo compRepo;
    public List<ComplainDto> getAllComplains(){
        List<ComplainDto> li = compRepo.findAll();
        return li;
    }
    public void save(CompReq req){
        compRepo.save(
                ComplainDto
                        .builder()
                        .email(req.getEmail())
                        .complain(req.getComplain())
                        .build()
        );
    }
    public void delete(int id){
        Optional<ComplainDto> comp = compRepo.findById(id);
        if(comp.isPresent()){
            compRepo.delete(comp.get());
        }
    }
}
