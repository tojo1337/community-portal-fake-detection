package com.example.fakedetectbackend.service;
import com.example.fakedetectbackend.dto.jwt.JwtToken;
import com.example.fakedetectbackend.dto.user.MyUser;
import com.example.fakedetectbackend.repo.MyUserRepo;
import com.example.fakedetectbackend.repo.TokenRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

@Service
public class AuthService {
    private Logger log = Logger.getLogger(this.getClass().getName());
    @Autowired
    private MyUserRepo userRepo;
    @Autowired
    private TokenRepo tokenRepo;
    public void saveUserToken(UserDetails userDetails, String token){
        List<MyUser> userList = userRepo.findAll();
        MyUser placeHolderUser = null;
        for(MyUser myUser:userList){
            if(myUser.getName().equals(userDetails.getUsername())){
                placeHolderUser = myUser;
                break;
            }
        }
        JwtToken jwtToken = JwtToken.builder().user(placeHolderUser).token(token).expired(false).revoked(false).build();
        tokenRepo.save(jwtToken);
    }
    public void revokeAllUserToken(UserDetails userDetails){
        List<MyUser> userList = userRepo.findAll();
        MyUser user = null;
        for(MyUser tempUser:userList){
            if(tempUser.getName().equals(userDetails.getUsername())){
                user = tempUser;
                break;
            }
        }
        List<JwtToken> allTokens = tokenRepo.findAll();
        List<JwtToken> validTokens = new ArrayList<>();
        for(JwtToken token:allTokens){
            if(token.getUser().getId()==user.getId()){
                if(!token.isRevoked() && !token.isExpired()){
                    validTokens.add(token);
                }
            }
        }
        if(validTokens.isEmpty()){
            log.info("The list of tokens is empty");
            return;
        }else {
            log.info("The list of tokens contains something");
            validTokens.forEach(token->{
                token.setExpired(true);
                token.setRevoked(true);
            });
            tokenRepo.saveAll(validTokens);
        }
    }
}