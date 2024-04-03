package com.example.fakedetectbackend.config;

import com.example.fakedetectbackend.filter.JwtTokenFilter;
import com.example.fakedetectbackend.service.LogoutService;
import com.example.fakedetectbackend.service.MyUserDetailsService;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {
    @Autowired
    private MyUserDetailsService userDetailsService;
    @Autowired
    private LogoutService logoutService;
    @Value("${remote-host-name}")
    private String remoteUrl;

    // Add the apis that are not going to be protected
    private final String[] overlook = {
            "/api/v1/sign-in",
            "/api/v1/refresh",
            "/api/v1/token",
            "/api/v1/news-list",
            "/api/v1/get-news-rate/*",
            "/api/v1",
    };
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors(withDefaults()).csrf(withDefaults()).authorizeHttpRequests(req->{
            req.requestMatchers(overlook)
                    .permitAll()
                    .anyRequest()
                    .authenticated();
        }).sessionManagement(session->{
            session.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        }).authenticationProvider(authProvider())
                .addFilterBefore(
                        jwtTokenFilter(), UsernamePasswordAuthenticationFilter.class
                ).logout(logout->{
                    logout.logoutUrl("/api/v1/logout")
                            .addLogoutHandler(logoutService)
                            .logoutSuccessHandler(
                                    ((request, response, authentication)-> SecurityContextHolder.clearContext())
                            );
                });
        return http.build();
    }
    @Bean
    public JwtTokenFilter jwtTokenFilter(){
        return new JwtTokenFilter();
    }
    @Bean
    public AuthenticationProvider authProvider(){
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService);
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return authenticationProvider;
    }
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
    @Bean
    @SneakyThrows
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) {
        return authConfig.getAuthenticationManager();
    }
}
