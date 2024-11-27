package com.team3.todolist;

import com.team3.todolist.entity.UserEntity;
import com.team3.todolist.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/login")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class LoginController {
    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            UserEntity user = userService.login(loginRequest.getUserid(), loginRequest.getPassword());
            return ResponseEntity.ok(new LoginResponse(user.getUsername()));
        } catch (RuntimeException e) {
            return ResponseEntity.status(403).body("Login failed: " + e.getMessage());
        }
    }
}

// LoginRequest DTO
class LoginRequest {
    private String userid;
    private String password;

    // Getters and Setters
    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

// LoginResponse DTO
class LoginResponse {
    private String username;

    public LoginResponse(String username) {
        this.username = username;
    }

    public String getUsername() {
        return username;
    }
}