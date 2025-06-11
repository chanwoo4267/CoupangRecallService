package dev.chanwoo4267.coupangrecallservicebackend.dto;

import lombok.Getter;

@Getter
public class UserInfoDto {
    private final String name;
    private final String email;

    public UserInfoDto(String name, String email) {
        this.name = name;
        this.email = email;
    }
}
