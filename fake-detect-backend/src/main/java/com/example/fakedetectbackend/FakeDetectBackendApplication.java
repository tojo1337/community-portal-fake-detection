package com.example.fakedetectbackend;

import com.example.fakedetectbackend.model.enums.Role;
import com.example.fakedetectbackend.model.user.MyUser;
import com.example.fakedetectbackend.repo.MyUserRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@SpringBootApplication
public class FakeDetectBackendApplication implements CommandLineRunner {
	@Autowired
	private MyUserRepo userRepo;
	@Value("${user.admin}")
	private String username;
	@Value("${user.email}")
	private String email;
	@Value("${user.password}")
	private String password;


	public static void main(String[] args) {
		SpringApplication.run(FakeDetectBackendApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		List<MyUser> list = userRepo.findAll();
		List<MyUser> adminList = new LinkedList<>();
		for(MyUser user:adminList){
			if(user.getRole()==null){
				continue;
			}else if(user.getRole().equals(Role.ADMIN.toString())){
				adminList.add(user);
			}else {
				continue;
			}
		}
		if(adminList.isEmpty()){
			userRepo.save(
					MyUser.builder()
							.name(username)
							.email(email)
							.password(getAdminPAsswordEncoder().encode(password))
							.role(Role.ADMIN.toString())
							.build()
			);
			log.info("Default admin saved with name : "+username+" password : "+password+" email : "+email);
		}
	}
	public PasswordEncoder getAdminPAsswordEncoder(){
		return new BCryptPasswordEncoder();
	}
}
