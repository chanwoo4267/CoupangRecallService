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
@Table(name = "recall_item")
public class RecallItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "recall_item_id")
    private Long id;

    @Column(nullable = false)
    private String productName; // 제품명

    @Column
    private String modelName; // 모델명

    @Column
    private String productCompanyName; // 제조 회사

    @Lob // 본문 내용이 길 수 있으므로 CLOB 타입으로 지정
    @Column(columnDefinition = "TEXT")
    private String recallReason; // 리콜 사유

    @Column
    private LocalDate recallStartDate; // 리콜 게시일
}
