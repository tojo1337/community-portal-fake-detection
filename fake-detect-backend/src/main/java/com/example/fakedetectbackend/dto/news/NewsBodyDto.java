package com.example.fakedetectbackend.dto.news;

import com.example.fakedetectbackend.dto.enums.Rate;
import com.example.fakedetectbackend.dto.news.NewsBody;
import com.example.fakedetectbackend.dto.user.MyUser;
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
    private String messageBody;
    private Date timeStamp;
    private Rate ratings;
    @ManyToMany(fetch = FetchType.LAZY)
    private List<MyUser> user;
}
