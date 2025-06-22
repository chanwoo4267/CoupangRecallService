package dev.chanwoo4267.coupangrecallservicebackend.repository;

import dev.chanwoo4267.coupangrecallservicebackend.entity.PurchasedItem;
import dev.chanwoo4267.coupangrecallservicebackend.entity.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PurchasedItemRepository extends JpaRepository<PurchasedItem, Long> {
    
    // 사용자별 구매 내역 조회
    List<PurchasedItem> findByUserInfoOrderByPurchaseDateDesc(UserInfo userInfo);
    
    // 사용자별 구매 내역 개수 조회
    long countByUserInfo(UserInfo userInfo);

    // UserInfo -> userInfo 필드, email -> email 필드 => findBy + UserInfo_Email + ...
    List<PurchasedItem> findByUserInfo_EmailOrderByPurchaseDateDesc(String email);

    // UserInfo 엔티티의 email 필드를 기반으로 개수 조회
    long countByUserInfo_Email(String email);
}
