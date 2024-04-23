package com.example.fakedetectbackend.repo;

import com.example.fakedetectbackend.model.complain.ComplainDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ComplainRepo extends JpaRepository<ComplainDto,Integer> {
}
