package dev.chanwoo4267.coupangrecallservicebackend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class ManualEntryRequestDto {
    
    @NotBlank(message = "상품명은 필수입니다.")
    private String productName;
    
    @NotNull(message = "구매일자는 필수입니다.")
    private LocalDate purchaseDate;
    
    @NotBlank(message = "주문번호는 필수입니다.")
    private String orderNumber;
    
    @NotNull(message = "총결제금액은 필수입니다.")
    @Positive(message = "총결제금액은 0보다 커야 합니다.")
    private Integer totalAmount;
    
    @NotBlank(message = "플랫폼은 필수입니다.")
    private String platform;
} 