package com.team3.todolist.service;

import com.team3.todolist.dto.SignupRequestDTO;
import com.team3.todolist.entity.UserEntity;
import com.team3.todolist.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public UserEntity login(String userid, String password) {
        return userRepository.findByUserid(userid)
                .filter(user -> user.getPassword().equals(password))
                .orElseThrow(() -> new RuntimeException("Invalid userid or password"));
    }

    // 회원가입
    public void register(SignupRequestDTO signupRequestDTO) {
        // userid 중복 검사
        boolean exists=userRepository.existsByUserid(signupRequestDTO.getUserid());

        // userid가 중복된다면 예외 던지기
        if(exists){
            throw new RuntimeException("User already exists (userid="+signupRequestDTO.getUserid()+")");
        }

        // User 엔티티 생성 (* 원래는 암호화해야 함)
        UserEntity newUser=UserEntity.builder()
                .username(signupRequestDTO.getUsername())
                .userid(signupRequestDTO.getUserid())
                .password(signupRequestDTO.getPassword())
                .build();

        // DB 저장
        userRepository.save(newUser);
    }
}
