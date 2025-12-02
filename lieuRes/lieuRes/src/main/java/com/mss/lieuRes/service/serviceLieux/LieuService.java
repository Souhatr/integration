package com.mss.lieuRes.service.serviceLieux;



import com.mss.lieuRes.entities.Lieu;
import org.springframework.data.domain.Page;

import java.util.Optional;

public interface LieuService {
     Lieu saveLieu(Lieu lieu);
    Page<Lieu> getAllLieux(int page, int size);
    Optional<Lieu> getLieuById(int id);
    void deleteLieu(int id);
    Page<Lieu> searchByNom(String nom, int page, int size);
    Page<Lieu> searchByCategorie(String categorie, int page, int size);
}