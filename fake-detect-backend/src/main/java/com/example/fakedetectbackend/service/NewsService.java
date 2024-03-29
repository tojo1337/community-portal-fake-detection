package com.example.fakedetectbackend.service;

import com.example.fakedetectbackend.dto.enums.Rate;
import com.example.fakedetectbackend.dto.news.NewsBody;
import com.example.fakedetectbackend.dto.news.NewsBodyDto;
import com.example.fakedetectbackend.dto.user.MyUser;
import com.example.fakedetectbackend.repo.MyUserRepo;
import com.example.fakedetectbackend.repo.NewsRepo;
import lombok.SneakyThrows;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Log
@Service
public class NewsService {
    @Autowired
    private NewsRepo newsRepo;
    @Autowired
    private MyUserRepo userRepo;
    /*
    * Need to add the custom logic to map news elements with users
    * So that the news rating can be mapped
    */
    @SneakyThrows
    public boolean saveRating(UserDetails userDetails, NewsBody newsBody,int newsId){
        Optional<NewsBodyDto> newsBodyOpt = newsRepo.findById(newsId);
        List<MyUser> userList = userRepo.findAll();
        MyUser demoUser = null;
        for(MyUser user:userList){
            if(user.getName().equals(userDetails.getUsername())){
                demoUser = user;
            }
        }
        if(demoUser==null){
            return false;
        }else if(demoUser!=null && demoUser.getRatings()
                .stream()
                .filter(entry->entry.getTitle().equals(newsBody.getTitle()))
                .collect(Collectors.toList()).isEmpty()!=true){
            // Add the checking that is needed to stop repeated voting
            // I hope that I don't forget the stream
            return false;
        }else {
            //Set the ratings in here
            NewsBodyDto newsBodyDto = newsBodyOpt.get();
            newsBodyDto.setRatings(newsBody.getRatings());

            //Many to Many mapping in here
            List<MyUser> li = newsBodyDto.getUser();
            li.add(demoUser);

            List<NewsBodyDto> newsList = demoUser.getRatings();
            newsList.add(newsBodyDto);

            //Saving the data at the very end
            newsRepo.save(newsBodyDto);
            userRepo.save(demoUser);
            return  true;
        }
    }
    @SneakyThrows
    public Rate totalRateOfNews(NewsBody body){
        List<NewsBodyDto> newsList = newsRepo.findAll();
        for(NewsBodyDto news:newsList){
            if(news.getTitle().equals(body.getTitle())){
                List<MyUser> userList = news.getUser();
                int numberOfUsersToRate = userList.size();
                int additionOfAllRate = 0;
                for(MyUser user:userList){
                    for(NewsBodyDto newsDto: user.getRatings()){
                        additionOfAllRate += newsDto.getRatings().getRating();
                    }
                }
                int averageRate = Math.round((additionOfAllRate/numberOfUsersToRate)*5);
                // Do the Int to Enum conversion in here
                Rate rt = Rate.valueOf(Integer.toString(averageRate));
                return rt;
            }
        }
        return Rate.ZERO_STAR;
    }
    @SneakyThrows
    public boolean saveNews(NewsBody newsBody){
        Calendar cal = Calendar.getInstance();
        List<NewsBodyDto> newsList = newsRepo.findAll();
        for(NewsBodyDto news:newsList){
            if(news.getTitle().equals(newsBody.getTitle())){
                return false;
            }
        }
        NewsBodyDto news = NewsBodyDto.builder()
                .title(newsBody.getTitle())
                .messageBody(newsBody.getMessageBody())
                .timeStamp(cal.getTime())
                .build();
        newsRepo.save(news);
        return true;
    }

    // This method only allows us to get news of at least one day old
    @SneakyThrows
    public List<NewsBodyDto> getAllNews(){
        Calendar cal = Calendar.getInstance();
        List<NewsBodyDto> allNews = newsRepo.findAll();
        List<NewsBodyDto> retrievedNews = new LinkedList<>();

        //Adding a way to calculate the date difference
        Date today = cal.getTime();
        cal.setTime(today);
        cal.add(Calendar.DAY_OF_YEAR,-1);
        Date yesterday = cal.getTime();

        for(NewsBodyDto news:allNews){
            if(news.getTimeStamp().before(yesterday)){
                retrievedNews.add(news);
            }
        }

        return retrievedNews;
    }

    //This method allows us to fetch the current news that are not supposed to have any ratings
    @SneakyThrows
    public List<NewsBodyDto> getUnvotedNews(){
        Calendar cal = Calendar.getInstance();
        List<NewsBodyDto> allNews = newsRepo.findAll();
        List<NewsBodyDto> unvotedList = new LinkedList<>();

        Date today = cal.getTime();
        cal.setTime(today);
        cal.add(Calendar.DAY_OF_YEAR,-1);
        Date yesterday = cal.getTime();

        for(NewsBodyDto news:allNews){
            if(news.getTimeStamp().after(yesterday)){
                unvotedList.add(news);
            }
        }

        return unvotedList;
    }
    public int getNewsId(NewsBody news){
        List<NewsBodyDto> list = newsRepo.findAll();
        int index = -1;
        for(NewsBodyDto temp:list){
            if(temp.getTitle().equals(news.getTitle())){
                index = temp.getId();
                break;
            }
        }
        return index;
    }
}
