package com.example.fakedetectbackend.controller;

import com.example.fakedetectbackend.model.enums.Rate;
import com.example.fakedetectbackend.model.news.NewsBody;
import com.example.fakedetectbackend.model.news.NewsBodyDto;
import com.example.fakedetectbackend.model.news.NewsRatings;
import com.example.fakedetectbackend.model.others.Sample;
import com.example.fakedetectbackend.service.JwtService;
import com.example.fakedetectbackend.service.MyUserDetailsService;
import com.example.fakedetectbackend.service.NewsService;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@Log
@RestController
@RequestMapping("/api/v1/")
@CrossOrigin(origins = "http://localhost:3000")
public class NewsController {
    @Autowired
    private NewsService newsService;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private MyUserDetailsService userDetailsService;
    @GetMapping("news-list")
    public List<NewsBodyDto> getAllNews(){
        return newsService.getAllNews();
    }
    @GetMapping("latest-news")
    public List<NewsBodyDto> getLatestNews(){
        return newsService.getUnvotedNews();
    }
    @PostMapping("new-news")
    public ResponseEntity<Sample> saveNewNews(@RequestBody NewsBody news) {
        log.info(news.toString());
        if(newsService.saveNews(news)){
            return new ResponseEntity<>(
                    new Sample("News was saved successfully"),
                    HttpStatus.OK
            );
        }else {
            return new ResponseEntity<>(
                    new Sample("News with the same topic already exist"),
                    HttpStatus.ALREADY_REPORTED
            );
        }
    }
    @PostMapping("rate-news")
    public ResponseEntity<Sample> rateNews(@RequestHeader("Authorization") String authHeader, @RequestBody NewsBody newsBody){
        String jwtToken = authHeader.substring(7);
        String user = jwtService.extractUsername(jwtToken);
        UserDetails userDetails = userDetailsService.loadUserByUsername(user);
        if(newsService.saveRating(userDetails,newsBody,newsService.getNewsId(newsBody))){
            return new ResponseEntity<>(
                    new Sample("Ratings saved perfectly"),
                    HttpStatus.OK
            );
        }else {
            return new ResponseEntity<>(
                    new Sample("Rating already existed form the user"),
                    HttpStatus.ALREADY_REPORTED
            );
        }
    }
    @GetMapping("get-news-rate/{rate}")
    public ResponseEntity<NewsRatings> newsRatingsQuery(@RequestParam int newsId){
        NewsBody news = newsService.getNewsById(newsId);
        Rate rate = newsService.totalRateOfNews(news);

        // Returns 403 forbidden if the resource is not found
        // Need to catch it when doing it with axios
        return new ResponseEntity<>(
                NewsRatings
                        .builder()
                        .value(rate)
                        .build(),
                HttpStatus.OK
        );
    }
}
