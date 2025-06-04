package dev.chanwoo4267.coupangrecallservicebackend.service;

import dev.chanwoo4267.coupangrecallservicebackend.repository.PurchasedItemRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class PurchasedItemService {
    private final PurchasedItemRepository purchasedItemRepository;

    public PurchasedItemService(PurchasedItemRepository purchasedItemRepository) {
        this.purchasedItemRepository = purchasedItemRepository;
    }
}
