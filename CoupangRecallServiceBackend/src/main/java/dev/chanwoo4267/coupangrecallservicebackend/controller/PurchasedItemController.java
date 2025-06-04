package dev.chanwoo4267.coupangrecallservicebackend.controller;

import dev.chanwoo4267.coupangrecallservicebackend.service.PurchasedItemService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/purchaseditems")
public class PurchasedItemController {
    private final PurchasedItemService purchasedItemService;

    public PurchasedItemController(PurchasedItemService purchasedItemService) {
        this.purchasedItemService = purchasedItemService;
    }
}
