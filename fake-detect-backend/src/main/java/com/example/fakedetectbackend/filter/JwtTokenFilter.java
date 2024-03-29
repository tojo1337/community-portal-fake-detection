package com.example.fakedetectbackend.filter;

import com.example.fakedetectbackend.repo.TokenRepo;
import com.example.fakedetectbackend.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
@Log
public class JwtTokenFilter extends OncePerRequestFilter {
    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private TokenRepo tokenRepo;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String path = request.getServletPath();
        if(path.contains("/api/v1/sign-in")||path.contains("/api/v1/token")||path.contains("/api/v1/open")){
            filterChain.doFilter(request,response);
            return;
        }else {
            log.info("Once per request authentication filter reached");
            String authHeader = request.getHeader("Authorization");
            if(authHeader==null||!authHeader.startsWith("Bearer ")){
                filterChain.doFilter(request,response);
                return;
            }
            String jwtToken = authHeader.substring(7);
            String user = jwtService.extractUsername(jwtToken);
            if(user!=null && SecurityContextHolder.getContext().getAuthentication()==null){
                UserDetails userDetails = userDetailsService.loadUserByUsername(user);
                boolean isValidToken = tokenRepo.findByToken(jwtToken).map(token->!token.isExpired() && !token.isRevoked()).orElse(false);
                if(jwtService.isValidToken(jwtToken,userDetails) && isValidToken){
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }
            filterChain.doFilter(request,response);
            return;
        }
    }
}
