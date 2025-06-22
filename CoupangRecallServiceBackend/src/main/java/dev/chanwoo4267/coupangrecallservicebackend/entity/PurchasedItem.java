package dev.chanwoo4267.coupangrecallservicebackend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "purchased_item")
public class PurchasedItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "purchased_item_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private UserInfo userInfo;

    @Column(nullable = false)
    private String productName; // 상품명

    @Column(nullable = false)
    private LocalDate purchaseDate; // 주문일자

    @Column(nullable = false)
    private String orderNumber; // 주문번호

    @Column(nullable = false)
    private Integer totalAmount; // 총결제금액(원)

    @Column(nullable = false)
    private String platform; // 플랫폼 (예: "Coupang", "11번가", "G마켓" 등)
}
