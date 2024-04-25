package com.example.fakedetectbackend.service;

import com.example.fakedetectbackend.model.enums.Rate;
import com.example.fakedetectbackend.model.news.NewsBody;
import com.example.fakedetectbackend.model.news.NewsBodyDto;
import com.example.fakedetectbackend.model.threshold.ResPayload;
import com.example.fakedetectbackend.model.user.MyUser;
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
    @Autowired
    private ThresholdService thresholdService;
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
        int numberOfUsersToRate = 0;
        int additionOfAllRate = 0;
        for(NewsBodyDto news:newsList){
            if(news.getTitle().equals(body.getTitle())){
                List<MyUser> userList = news.getUser();
                numberOfUsersToRate = userList.size();
                additionOfAllRate = 0;
                for(MyUser user:userList){
                    for(NewsBodyDto newsDto: user.getRatings()){
                        additionOfAllRate += newsDto.getRatings().getRating();
                    }
                }
            }
        }
        if(numberOfUsersToRate>0){
            int averageRate = Math.round(additionOfAllRate/numberOfUsersToRate);
            // Do the Int to Enum conversion in here
            // Rate rt = Rate.valueOf(Integer.toString(averageRate));
            log.info(Integer.toString(averageRate));
            Rate rt = null;
            for(Rate val: Rate.values()){
                if(val.getRating()==averageRate){
                    rt = val;
                }
            }
            return rt;
        }else {
            return Rate.ZERO_STAR;
        }
    }

    public boolean saveNews(NewsBody newsBody){
        Calendar cal = Calendar.getInstance();
        List<NewsBodyDto> newsList = newsRepo.findAll();
        for(NewsBodyDto news:newsList){
            if(news.getTitle().equals(newsBody.getTitle())){
                return false;
            }
        }
        // The threshold value will be added in here
        ResPayload thresholdValue = thresholdService.getThresholdValue(newsBody.getMessageBody());
        NewsBodyDto news = NewsBodyDto.builder()
                .title(newsBody.getTitle())
                .messageBody(newsBody.getMessageBody())
                .timeStamp(cal.getTime())
                .classification(thresholdValue.getClassify())
                .threshold(thresholdValue.getThreshold())
                .build();
        newsRepo.save(news);
        return true;
    }

    // This method only allows us to get news of at least one day old
    public List<NewsBodyDto> getAllNews(){
        List<NewsBodyDto> retrievedNews = newsRepo.findAll();
        return retrievedNews;
    }

    //This method allows us to fetch the current news that are not supposed to have any ratings

    /*
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
    */

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


    public NewsBody getNewsById(int id){
        Optional<NewsBodyDto> returnNews = newsRepo.findById(id);
        NewsBodyDto temp = returnNews.get();
        return NewsBody.builder()
                .title(temp.getTitle())
                .messageBody(temp.getMessageBody())
                .build();
    }

    public boolean delNewsService(int newsId){
        Optional<NewsBodyDto> news = newsRepo.findById(newsId);
        if(news.isEmpty()){
            return false;
        }else {
            NewsBodyDto getNews = news.get();
            newsRepo.delete(getNews);
            return true;
        }
    }
    public ResPayload findThresholdById(int newsId){
        List<NewsBodyDto> li = newsRepo.findAll();
        Optional<NewsBodyDto> newsOption = li.stream().filter(data->data.getId()==newsId).findAny();
        if(newsOption.isPresent()){
            return ResPayload
                    .builder()
                    .classify(newsOption.get().getClassification())
                    .threshold(newsOption.get().getThreshold())
                    .build();
        }else {
            return ResPayload.builder().classify("").threshold(0).build();
        }
    }
}
