package dev.chanwoo4267.coupangrecallservicebackend.service;

import dev.chanwoo4267.coupangrecallservicebackend.dto.ManualEntryRequestDto;
import dev.chanwoo4267.coupangrecallservicebackend.dto.PurchasedItemDto;
import dev.chanwoo4267.coupangrecallservicebackend.entity.PurchasedItem;
import dev.chanwoo4267.coupangrecallservicebackend.entity.UserInfo;
import dev.chanwoo4267.coupangrecallservicebackend.repository.PurchasedItemRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class PurchasedItemService {

    private final PurchasedItemRepository purchasedItemRepository;
    private final UserInfoService userInfoService;

    public PurchasedItemService(PurchasedItemRepository purchasedItemRepository, UserInfoService userInfoService) {
        this.purchasedItemRepository = purchasedItemRepository;
        this.userInfoService = userInfoService;
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

    // 수동 입력으로 구매 내역 추가
    public PurchasedItemDto addManualEntry(String userEmail, ManualEntryRequestDto requestDto) {
        UserInfo userInfo = userInfoService.getUserInfoEntityByEmail(userEmail);

        PurchasedItem purchasedItem = new PurchasedItem();
        purchasedItem.setUserInfo(userInfo);
        purchasedItem.setProductName(requestDto.getProductName());
        purchasedItem.setPurchaseDate(requestDto.getPurchaseDate());
        purchasedItem.setOrderNumber(requestDto.getOrderNumber());
        purchasedItem.setTotalAmount(requestDto.getTotalAmount());
        purchasedItem.setPlatform(requestDto.getPlatform());

        PurchasedItem savedItem = purchasedItemRepository.save(purchasedItem);
        return PurchasedItemDto.from(savedItem);
    }
}
