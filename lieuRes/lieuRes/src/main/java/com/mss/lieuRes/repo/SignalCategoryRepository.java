package com.mss.lieuRes.repo;

import com.mss.lieuRes.entities.SignalCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SignalCategoryRepository extends JpaRepository<SignalCategory, Integer> {
}
