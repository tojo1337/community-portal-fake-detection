package com.example.fakedetectbackend.controller;

import com.example.fakedetectbackend.model.auth.AuthCred;
import com.example.fakedetectbackend.model.auth.AuthRequest;
import com.example.fakedetectbackend.model.auth.AuthResponce;
import com.example.fakedetectbackend.model.jwt.TokenRequest;
import com.example.fakedetectbackend.model.others.Sample;
import com.example.fakedetectbackend.model.user.MyUser;
import com.example.fakedetectbackend.service.AuthService;
import com.example.fakedetectbackend.service.JwtService;
import com.example.fakedetectbackend.service.MyUserDetailsService;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Log
@RestController
@RequestMapping("/api/v1")
public class AuthController {
    /*
    * User registration will be controlled through this controller class
    */
    @Autowired
    private MyUserDetailsService userDetailsService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private AuthService authService;

    @PostMapping("/sign-in")
    public AuthResponce signIn(@RequestBody AuthRequest authRequest){
        log.info("signIn method invoked");
        String resp = userDetailsService.save(authRequest);
        return AuthResponce.builder().data(resp).build();
    }
    @PostMapping("/token")
    public AuthResponce genToken(@RequestBody AuthCred authRequest){
        log.info("getToken method invoked");
        String username = userDetailsService.findUsernameFromEmail(authRequest.getEmail());
        String password = authRequest.getPass();
        Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username,password));
        if(auth.isAuthenticated()){
            log.info("Authentication credentials matched");
            UserDetails userDetails = (UserDetails) auth.getPrincipal();
            log.info("Logged in username : "+userDetails.getUsername());
            String tokenStr = jwtService.generateToken(userDetails);
            authService.revokeAllUserToken(userDetails);
            authService.saveUserToken(userDetails,tokenStr);
            return AuthResponce.builder().data(tokenStr).build();
        }
        return AuthResponce.builder().data("Unable to create token").build();
    }
    @PostMapping("/refresh")
    public AuthResponce refreshToken(@RequestBody TokenRequest tokenRequest){
        String expiredToken = tokenRequest.getToken();
        String username = jwtService.extractUsername(expiredToken);
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        if(jwtService.isValidToken(expiredToken,userDetails)){
            String newToken = jwtService.generateToken(userDetails);
            authService.revokeAllUserToken(userDetails);
            authService.saveUserToken(userDetails,newToken);
            AuthResponce authResponce = AuthResponce.builder().data(newToken).build();
            return authResponce;
        }else {
            return AuthResponce.builder().data("The token is not valid").build();
        }
    }
    @GetMapping("/del-user/{userId}")
    public ResponseEntity<HttpStatus> delUser(@PathVariable int userId){
        if(userDetailsService.delUserReq(userId)){
            return new ResponseEntity<>(HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    @PostMapping("/is-admin")
    public ResponseEntity<Sample> isUserAdmin(@RequestBody TokenRequest tokenRequest){
        if(userDetailsService.isUserAdmin(tokenRequest.getToken())){
            return new ResponseEntity<>(new Sample("Admin"),HttpStatus.OK);
        }else {
            return new ResponseEntity<>(new Sample("Not Admin"),HttpStatus.OK);
        }
    }
    @GetMapping("/user-list")
    public ResponseEntity<List<MyUser>> getAllUsers(){
        return new ResponseEntity<>(userDetailsService.getAllNonAdminUsers(),HttpStatus.OK);
    }
}
