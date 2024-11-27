package com.team3.todolist.controller;

import com.team3.todolist.dto.SignupRequestDTO;
import com.team3.todolist.dto.SignupResponseDTO;
import com.team3.todolist.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserService userService;

    /**
     * 회원가입 API
     * @param signupRequestDTO 회원가입 요청 정보 (닉네임, id, pw)
     * @return
     */
    @PostMapping(value = "/signup", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SignupResponseDTO> signup(@RequestBody SignupRequestDTO signupRequestDTO) {
        // 새로운 계정 생성 (회원가입)
        userService.register(signupRequestDTO);

        // 응답 생성
        SignupResponseDTO signupResponseDTO = SignupResponseDTO.builder()
                .message("signup successful")
                .build();

        return ResponseEntity.status(HttpStatus.CREATED).body(signupResponseDTO);
    }
}