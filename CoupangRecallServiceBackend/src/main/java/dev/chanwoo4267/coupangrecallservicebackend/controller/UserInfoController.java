package dev.chanwoo4267.coupangrecallservicebackend.controller;

import dev.chanwoo4267.coupangrecallservicebackend.service.UserInfoService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserInfoController {
    private final UserInfoService userInfoService;

    public UserInfoController(UserInfoService userInfoService) {
        this.userInfoService = userInfoService;
    }
}
