package com.mss.lieuRes.repo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.mss.lieuRes.entities.Lieu;


public interface LieuRepository extends org.springframework.data.jpa.repository.JpaRepository<Lieu, Integer> {
     Page<Lieu> findByNomContainingIgnoreCase(String nom, Pageable pageable);
    
    Page<Lieu> findByCategorieContainingIgnoreCase(String categorie, Pageable pageable);
}
