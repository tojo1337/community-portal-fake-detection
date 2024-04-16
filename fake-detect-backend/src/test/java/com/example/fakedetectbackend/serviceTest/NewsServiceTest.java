package com.example.fakedetectbackend.serviceTest;

import com.example.fakedetectbackend.model.enums.Rate;
import com.example.fakedetectbackend.model.news.NewsBody;
import com.example.fakedetectbackend.model.news.NewsBodyDto;
import com.example.fakedetectbackend.service.NewsService;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.test.context.support.WithAnonymousUser;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.context.support.WithUserDetails;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@Slf4j
@SpringBootTest
public class NewsServiceTest {
    // All the tests in this class have passed

    @Autowired
    private NewsService newsService;
    @Test
    public void saveNewsTest(){
        // Tests news saving
        NewsBody body = NewsBody.builder().title("Sample").messageBody("Sample").build();
        assertTrue(newsService.saveNews(body));
    }
    @Test
    public void getAllNewsTest(){
        // Tests if there is any news that is one day old
        List<NewsBodyDto> li = newsService.getAllNews();
        assertTrue(li.isEmpty());
    }
    @Test
    public void getNewsIdTestFail(){
        NewsBody news = NewsBody.builder().title("abc").messageBody("def").build();
        int id = newsService.getNewsId(news);
        assertEquals(-1,id);
    }
}
