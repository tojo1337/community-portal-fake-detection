package com.example.fakedetectbackend.repo;

import com.example.fakedetectbackend.model.news.NewsBodyDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NewsRepo extends JpaRepository<NewsBodyDto,Integer> {
}
