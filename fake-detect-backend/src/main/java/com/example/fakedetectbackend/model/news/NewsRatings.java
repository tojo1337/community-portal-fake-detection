package com.example.fakedetectbackend.model.news;

import com.example.fakedetectbackend.model.enums.Rate;
import lombok.*;

@Data
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class NewsRatings {
    private Rate value;
}
