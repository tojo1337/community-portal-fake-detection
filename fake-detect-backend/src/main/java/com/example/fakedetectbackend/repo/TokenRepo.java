package com.example.fakedetectbackend.repo;

import com.example.fakedetectbackend.model.jwt.JwtToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TokenRepo extends JpaRepository<JwtToken,Integer> {
    Optional<JwtToken> findByToken(String jwtToken);
}
