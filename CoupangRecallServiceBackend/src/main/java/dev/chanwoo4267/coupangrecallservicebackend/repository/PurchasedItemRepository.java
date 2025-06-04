package dev.chanwoo4267.coupangrecallservicebackend.repository;

import dev.chanwoo4267.coupangrecallservicebackend.entity.PurchasedItem;
import dev.chanwoo4267.coupangrecallservicebackend.entity.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PurchasedItemRepository extends JpaRepository<PurchasedItem, Long> {
    List<PurchasedItem> findByUserInfo(UserInfo userInfo);
}
