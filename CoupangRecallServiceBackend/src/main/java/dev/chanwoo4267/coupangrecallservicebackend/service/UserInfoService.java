package dev.chanwoo4267.coupangrecallservicebackend.service;

import dev.chanwoo4267.coupangrecallservicebackend.dto.LoginRequestDto;
import dev.chanwoo4267.coupangrecallservicebackend.dto.SignupRequestDto;
import dev.chanwoo4267.coupangrecallservicebackend.entity.UserInfo;
import dev.chanwoo4267.coupangrecallservicebackend.repository.UserInfoRepository;
import dev.chanwoo4267.coupangrecallservicebackend.util.JwtUtil;
import dev.chanwoo4267.coupangrecallservicebackend.dto.UserInfoDto;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserInfoService {

    private final UserInfoRepository userInfoRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    public UserInfoService(UserInfoRepository userInfoRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil, AuthenticationManager authenticationManager) {
        this.userInfoRepository = userInfoRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
    }

    // 회원가입
    public UserInfo registerUser(SignupRequestDto signUpRequestDto) {
        if (userInfoRepository.findByEmail(signUpRequestDto.getEmail()).isPresent()) {
            throw new IllegalArgumentException("이미 사용 중인 이메일입니다.");
        }

        UserInfo newUser = new UserInfo();
        newUser.setUsername(signUpRequestDto.getName());
        newUser.setEmail(signUpRequestDto.getEmail());
        newUser.setPassword(passwordEncoder.encode(signUpRequestDto.getPassword()));

        return userInfoRepository.save(newUser);
    }

    // 로그인
    @Transactional(readOnly = true)
    public String login(LoginRequestDto loginRequestDto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequestDto.getEmail(), loginRequestDto.getPassword())
        );

        // 인증 성공
        return jwtUtil.generateToken(authentication.getName());
    }

    // 이메일로 사용자 정보 조회
    @Transactional(readOnly = true)
    public UserInfoDto getUserInfoByEmail(String email) {
        UserInfo userInfo = userInfoRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException(email + "을 가진 사용자를 찾을 수 없습니다."));
        return new UserInfoDto(userInfo.getUsername(), userInfo.getEmail());
    }

    // 이메일로 사용자 엔티티 조회
    @Transactional(readOnly = true)
    public UserInfo getUserInfoEntityByEmail(String email) {
        return userInfoRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException(email + "을 가진 사용자를 찾을 수 없습니다."));
    }
}
