package com.example.fakedetectbackend.dto.news;

import com.example.fakedetectbackend.dto.enums.Rate;
import lombok.*;

@Data
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class NewsBody {
    private String title;
    private String messageBody;
    private Rate ratings;
}
