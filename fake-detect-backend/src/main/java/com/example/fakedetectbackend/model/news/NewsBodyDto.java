package com.example.fakedetectbackend.model.news;

import com.example.fakedetectbackend.model.enums.Rate;
import com.example.fakedetectbackend.model.user.MyUser;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@Entity
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class NewsBodyDto {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String title;
    @Column(length = 1000)
    private String messageBody;
    private Date timeStamp;
    private Rate ratings;
    @ManyToMany(fetch = FetchType.EAGER)
    private List<MyUser> user;
}
