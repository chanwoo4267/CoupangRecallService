package dev.chanwoo4267.coupangrecallservicebackend.controller;

import dev.chanwoo4267.coupangrecallservicebackend.dto.PurchasedItemDto;
import dev.chanwoo4267.coupangrecallservicebackend.service.PurchasedItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/purchaseditems")
@CrossOrigin(origins = "http://localhost:3000")
public class PurchasedItemController {

    private final PurchasedItemService purchasedItemService;

    public PurchasedItemController(PurchasedItemService purchasedItemService) {
        this.purchasedItemService = purchasedItemService;
    }

    // 현재 로그인한 사용자의 구매 내역 조회
    @GetMapping("/myitems")
    public ResponseEntity<List<PurchasedItemDto>> getMyPurchasedItems(Authentication authentication) {
        String userEmail = authentication.getName();
        List<PurchasedItemDto> purchasedItems = purchasedItemService.getPurchasedItemsByUserEmail(userEmail);
        return ResponseEntity.ok(purchasedItems);
    }

    // 현재 로그인한 사용자의 구매 내역 개수 조회
    @GetMapping("/myitems/count")
    public ResponseEntity<Long> getMyPurchasedItemsCount(Authentication authentication) {
        String userEmail = authentication.getName();
        long count = purchasedItemService.getPurchasedItemCountByUserEmail(userEmail);
        return ResponseEntity.ok(count);
    }
}
