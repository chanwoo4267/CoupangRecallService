package dev.chanwoo4267.coupangrecallservicebackend.controller;

import dev.chanwoo4267.coupangrecallservicebackend.dto.JwtResponseDto;
import dev.chanwoo4267.coupangrecallservicebackend.dto.LoginRequestDto;
import dev.chanwoo4267.coupangrecallservicebackend.dto.SignupRequestDto;
import dev.chanwoo4267.coupangrecallservicebackend.entity.UserInfo;
import dev.chanwoo4267.coupangrecallservicebackend.service.UserInfoService;
import dev.chanwoo4267.coupangrecallservicebackend.dto.UserInfoDto;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api/users")
public class UserInfoController {
    private final UserInfoService userInfoService;

    public UserInfoController(UserInfoService userInfoService) {
        this.userInfoService = userInfoService;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody SignupRequestDto signupRequestDto) {
        try {
            UserInfo registeredUser = userInfoService.registerUser(signupRequestDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(registeredUser);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // 로그인 API
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDto loginRequestDto) {
        try {
            String token = userInfoService.login(loginRequestDto);
            // 성공 시, JWT를 담은 DTO와 함께 200 OK 상태 코드 반환
            return ResponseEntity.ok(new JwtResponseDto(token));
        } catch (IllegalArgumentException e) {
            // 이메일 또는 비밀번호 불일치 시 401 Unauthorized 상태 코드 반환
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    // 현재 로그인된 사용자 정보 조회 API
    @GetMapping("/myinfo")
    public ResponseEntity<UserInfoDto> getCurrentUserInfo(Authentication authentication) {
        String email = authentication.getName();
        UserInfoDto userInfoDto = userInfoService.getUserInfoByEmail(email);
        return ResponseEntity.ok(userInfoDto);
    }
}
