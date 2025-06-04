package dev.chanwoo4267.coupangrecallservicebackend.service;

import dev.chanwoo4267.coupangrecallservicebackend.repository.RecallItemRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class RecallItemService {
    private final RecallItemRepository recallItemRepository;

    public RecallItemService(RecallItemRepository recallItemRepository) {
        this.recallItemRepository = recallItemRepository;
    }
}
