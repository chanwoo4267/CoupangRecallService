package dev.chanwoo4267.coupangrecallservicebackend.dto;

import dev.chanwoo4267.coupangrecallservicebackend.entity.PurchasedItem;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.AllArgsConstructor;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PurchasedItemDto {
    private Long id;
    private String productName;
    private LocalDate purchaseDate;
    private String orderNumber;
    private Integer totalAmount;
    private String platform;

    public static PurchasedItemDto from(PurchasedItem entity) {
        return PurchasedItemDto.builder()
                .id(entity.getId())
                .productName(entity.getProductName())
                .purchaseDate(entity.getPurchaseDate())
                .orderNumber(entity.getOrderNumber())
                .totalAmount(entity.getTotalAmount())
                .platform(entity.getPlatform())
                .build();
    }
} 