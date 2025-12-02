package com.mss.lieuRes.repo;

import java.util.List;

import com.mss.lieuRes.entities.PlageHoraire;

public interface PlageHoraireRepository 
extends org.springframework.data.jpa.repository.JpaRepository<PlageHoraire, Long> {
                List<PlageHoraire> findByLieuIdL(int lieuId);

}
