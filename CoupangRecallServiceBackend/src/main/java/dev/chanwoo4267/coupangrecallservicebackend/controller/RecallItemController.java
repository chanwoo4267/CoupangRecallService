package dev.chanwoo4267.coupangrecallservicebackend.controller;

import dev.chanwoo4267.coupangrecallservicebackend.service.RecallItemService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/recallitems")
public class RecallItemController {
    private final RecallItemService recallItemService;

    public RecallItemController(RecallItemService recallItemService) {
        this.recallItemService = recallItemService;
    }
}
