package com.example.fakedetectbackend.service;

import com.example.fakedetectbackend.model.auth.AuthRequest;
import com.example.fakedetectbackend.model.enums.Role;
import com.example.fakedetectbackend.model.user.MyUser;
import com.example.fakedetectbackend.model.user.MyUserDetails;
import com.example.fakedetectbackend.repo.MyUserRepo;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MyUserDetailsService implements UserDetailsService {
    @Autowired
    private MyUserRepo repo;
    @Autowired
    private JwtService jwtService;
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
            user.setEmail(authRequest.getEmail());
            user.setPassword(getPasswordEncoder().encode(authRequest.getPass()));
            user.setRole(Role.USER.toString());
            repo.save(user);
            return "User saved";
        }
    }
    @Bean
    public PasswordEncoder getPasswordEncoder(){
        return new BCryptPasswordEncoder();
    }
    // Adding a method to find username from email
    public String findUsernameFromEmail(String email){
        List<MyUser> li = repo.findAll();
        String username = null;
        for(MyUser user:li){
            if(user.getEmail().equals(email)){
                username = user.getName();
            }
        }
        return username;
    }

    @SneakyThrows
    public boolean delUserReq(int userId){
        Optional<MyUser> user = repo.findById(userId);
        if(user.isEmpty()){
            return false;
        }else {
            repo.delete(user.get());
            return true;
        }
    }
    @SneakyThrows
    public boolean isUserAdmin(String token){
        String name = jwtService.extractUsername(token);
        List<MyUser> li = repo.findAll();
        List<MyUser> user = li.stream().filter(data->data.getName().equals(name)).collect(Collectors.toList());
        List<MyUser> admin = user.stream().filter(data->data.getRole().equals(Role.ADMIN.toString())).collect(Collectors.toList());
        if(admin.isEmpty()){
            return false;
        }else {
            return true;
        }
    }
    @SneakyThrows
    public List<MyUser> getAllNonAdminUsers(){
        List<MyUser> li = repo.findAll();
        List<MyUser> lix = new LinkedList<>();
        for(MyUser user:li){
            if(user.getRole().equals(Role.USER.toString())){
                lix.add(user);
            }
        }
        return lix;
    }
}
