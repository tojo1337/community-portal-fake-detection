package com.example.fakedetectbackend.model.user;

import com.example.fakedetectbackend.model.enums.Role;
import com.example.fakedetectbackend.model.jwt.JwtToken;
import com.example.fakedetectbackend.model.news.NewsBodyDto;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
//@Table(name = "_user")
public class MyUser {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String name;
    private String email;
    private String password;
    private String role;
    @OneToMany(mappedBy = "user")
    private List<JwtToken> token;
    @ManyToMany(fetch = FetchType.LAZY)
    private List<NewsBodyDto> ratings;
}
