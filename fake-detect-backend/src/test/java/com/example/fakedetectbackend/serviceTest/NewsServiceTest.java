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
    public void getUnvotedNewsTest(){
        // Tests if the news is just been posted
        List<NewsBodyDto> li = newsService.getUnvotedNews();
        log.info("The list is empty : "+li.isEmpty());
        assertTrue(!li.isEmpty());
    }
    @Test
    public void getAllNewsTest(){
        // Tests if there is any news that is one day old
        List<NewsBodyDto> li = newsService.getAllNews();
        assertTrue(li.isEmpty());
    }
    @Test
    public void getNewsIdTest(){
        // Gets the news id by searching the title
        List<NewsBodyDto> li = newsService.getUnvotedNews();
        NewsBody body = NewsBody.builder().title(li.get(0).getTitle()).messageBody(li.get(0).getMessageBody()).build();
        int id = newsService.getNewsId(body);
        log.info("The Id of the data is : "+Integer.toString(li.get(0).getId()));
        assertEquals(li.get(0).getId(),id);
    }
    @Test
    public void getNewsIdTestFail(){
        NewsBody news = NewsBody.builder().title("abc").messageBody("def").build();
        int id = newsService.getNewsId(news);
        assertEquals(-1,id);
    }
    @Test
    public void getNewsByIdTest(){
        List<NewsBodyDto> li = newsService.getUnvotedNews();
        Optional<NewsBody> news = Optional.ofNullable(newsService.getNewsById(li.get(0).getId()));
        assertTrue(!news.isEmpty());
    }
    @Test
    public void totalRateOfNewsTest(){
        List<NewsBodyDto> li = newsService.getUnvotedNews();
        NewsBody news = NewsBody.builder().title(li.get(0).getTitle()).messageBody(li.get(0).getMessageBody()).build();
        Rate rate = newsService.totalRateOfNews(news);
        assertEquals(Rate.ZERO_STAR, rate);
    }
    @Test
    @PreAuthorize("authenticated")
    @WithMockUser(username = "abc",password = "def",roles = {"User"})
    public void saveRatingTest(){
        // Can't do testing. Don't know how to make a mock userDetails
        UserDetails userDetails = (UserDetails) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();
        List<NewsBodyDto> li = newsService.getUnvotedNews();
        NewsBody sampleVote = NewsBody
                .builder()
                .title(li.get(0).getTitle())
                .messageBody(li.get(0).getMessageBody())
                .ratings(Rate.FOUR_STAR)
                .build();
        boolean res = newsService.saveRating(userDetails,sampleVote,li.get(0).getId());

        // It would return false since I don't have any way to create a userDetailsService entry
        // The method checks if the userDetails provided as param is a valid user or not
        // An invalid user will get a false return
        assertEquals(false,res);
    }
}
