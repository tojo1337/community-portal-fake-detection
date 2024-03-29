package com.example.fakedetectbackend.dto.user;

import com.example.fakedetectbackend.dto.jwt.JwtToken;
import com.example.fakedetectbackend.dto.news.NewsBodyDto;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
//@Table(name = "_user")
public class MyUser {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String name;
    private String password;
    @OneToMany(mappedBy = "user")
    private List<JwtToken> token;
    @ManyToMany(fetch = FetchType.LAZY)
    private List<NewsBodyDto> ratings;
}
