package com.example.fakedetectbackend.service;

import com.example.fakedetectbackend.dto.auth.AuthRequest;
import com.example.fakedetectbackend.dto.user.MyUser;
import com.example.fakedetectbackend.dto.user.MyUserDetails;
import com.example.fakedetectbackend.repo.MyUserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MyUserDetailsService implements UserDetailsService {
    @Autowired
    private MyUserRepo repo;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        List<MyUser> list = repo.findAll();
        MyUserDetails details = null;
        for(MyUser user:list){
            if(user.getName().equals(username)){
                details = new MyUserDetails(user);
                return (UserDetails) details;
            }
        }
        throw new UsernameNotFoundException("No user exists with the username : "+username);
    }

    // This method is to save the credentials
    public String save(AuthRequest authRequest){
        List<MyUser> list = repo.findAll();
        MyUser entry = null;
        for(MyUser data:list){
            if(data.getName().equals(authRequest.getUser())){
                entry = data;
                break;
            }
        }
        if(entry!=null){
            return "Username already exists";
        }else {
            MyUser user = new MyUser();
            user.setName(authRequest.getUser());
            user.setPassword(getPasswordEncoder().encode(authRequest.getPass()));
            repo.save(user);
            return "User saved";
        }
    }
    @Bean
    public PasswordEncoder getPasswordEncoder(){
        return new BCryptPasswordEncoder();
    }
}
