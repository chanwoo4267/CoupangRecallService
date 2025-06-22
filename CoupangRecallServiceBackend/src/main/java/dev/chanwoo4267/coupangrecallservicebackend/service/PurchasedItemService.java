package dev.chanwoo4267.coupangrecallservicebackend.service;

import dev.chanwoo4267.coupangrecallservicebackend.dto.PurchasedItemDto;
import dev.chanwoo4267.coupangrecallservicebackend.entity.PurchasedItem;
import dev.chanwoo4267.coupangrecallservicebackend.repository.PurchasedItemRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class PurchasedItemService {

    private final PurchasedItemRepository purchasedItemRepository;

    public PurchasedItemService(PurchasedItemRepository purchasedItemRepository) {
        this.purchasedItemRepository = purchasedItemRepository;
    }

    // 구매 내역 저장
    public PurchasedItem savePurchasedItem(PurchasedItem purchasedItem) {
        return purchasedItemRepository.save(purchasedItem);
    }

    // 사용자별 구매 내역 조회 (DTO 리스트 반환)
    public List<PurchasedItemDto> getPurchasedItemsByUserEmail(String email) {
        // 1. email로 직접 Repository 조회
        List<PurchasedItem> purchasedItems = purchasedItemRepository.findByUserInfo_EmailOrderByPurchaseDateDesc(email);

        // 2. 조회된 엔티티 리스트를 DTO 리스트로 변환하여 반환
        return purchasedItems.stream()
                .map(PurchasedItemDto::from) // DTO 변환
                .collect(Collectors.toList());
    }

    // 사용자별 구매 내역 개수 조회
    public long getPurchasedItemCountByUserEmail(String email) {
        // email로 직접 count 쿼리 실행
        return purchasedItemRepository.countByUserInfo_Email(email);
    }
}
