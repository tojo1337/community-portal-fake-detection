package com.example.fakedetectbackend.model.news;

import com.example.fakedetectbackend.model.threshold.ResPayload;
import lombok.*;

@Data
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class NewsThreshold {
    private ResPayload threshold;
}
