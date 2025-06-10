package dev.chanwoo4267.coupangrecallservicebackend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignupRequestDto {
    private String name;
    private String email;
    private String password;

    public SignupRequestDto() {

    }

    public SignupRequestDto(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}
