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
    private String productName; // 제품명

    @Column
    private String modelName; // 모델명

    @Column
    private String productCompanyName; // 제조사

    @Column
    private Integer quantity; // 수량

    @Column
    private LocalDate purchaseDate; // 구매일자

    @Column
    private String orderNumber; // 주문번호

    @Column
    private String productNumber; // 상품번호
}
