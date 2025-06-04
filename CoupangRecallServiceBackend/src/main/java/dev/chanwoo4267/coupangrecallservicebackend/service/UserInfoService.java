package dev.chanwoo4267.coupangrecallservicebackend.service;

import dev.chanwoo4267.coupangrecallservicebackend.repository.UserInfoRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class UserInfoService {

    private final UserInfoRepository userInfoRepository;

    public UserInfoService(UserInfoRepository userInfoRepository) {
        this.userInfoRepository = userInfoRepository;
    }
}
