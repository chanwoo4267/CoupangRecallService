package dev.chanwoo4267.coupangrecallservicebackend.repository;

import dev.chanwoo4267.coupangrecallservicebackend.entity.RecallItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecallItemRepository extends JpaRepository<RecallItem, Long> {

}
