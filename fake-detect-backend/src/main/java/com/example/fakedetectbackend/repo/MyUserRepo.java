package com.example.fakedetectbackend.repo;

import com.example.fakedetectbackend.model.user.MyUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MyUserRepo extends JpaRepository<MyUser,Integer> {
}
