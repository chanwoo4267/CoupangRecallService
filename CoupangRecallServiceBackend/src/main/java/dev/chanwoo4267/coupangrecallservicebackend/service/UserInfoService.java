package dev.chanwoo4267.coupangrecallservicebackend.service;

import dev.chanwoo4267.coupangrecallservicebackend.dto.LoginRequestDto;
import dev.chanwoo4267.coupangrecallservicebackend.dto.SignupRequestDto;
import dev.chanwoo4267.coupangrecallservicebackend.entity.UserInfo;
import dev.chanwoo4267.coupangrecallservicebackend.repository.UserInfoRepository;
import dev.chanwoo4267.coupangrecallservicebackend.util.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserInfoService {

    private final UserInfoRepository userInfoRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public UserInfoService(UserInfoRepository userInfoRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userInfoRepository = userInfoRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

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

    @Transactional(readOnly = true)
    public String login(LoginRequestDto loginRequestDto) {
        UserInfo userInfo = userInfoRepository.findByEmail(loginRequestDto.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("가입되지 않은 이메일입니다."));

        if (!passwordEncoder.matches(loginRequestDto.getPassword(), userInfo.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        return jwtUtil.generateToken(userInfo.getEmail());
    }
}
