package com.example.fakedetectbackend.model.news;

import com.example.fakedetectbackend.model.enums.Rate;
import jakarta.persistence.Column;
import lombok.*;

@Data
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class NewsBody {
    private String title;
    @Column(length = 1000)
    private String messageBody;
    private Rate ratings;
}
