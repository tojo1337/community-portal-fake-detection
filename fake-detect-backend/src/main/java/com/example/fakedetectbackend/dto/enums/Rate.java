package com.example.fakedetectbackend.dto.enums;

public enum Rate {
    FIVE_STAR(5),
    FOUR_STAR(4),
    THREE_STAR(3),
    TWO_STAR(2),
    ONE_STAR(1),
    ZERO_STAR(0);
    private int rating;
    Rate(int rateVal){
        this.rating = rateVal;
    }
    public int getRating(){
        return this.rating;
    }
}
