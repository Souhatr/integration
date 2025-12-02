package com.mss.lieuRes.service.serviceLieux;



import com.mss.lieuRes.entities.Lieu;
import com.mss.lieuRes.repo.LieuRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LieuServiceImp implements LieuService {
    
    @Autowired
    private LieuRepository lieuRepository;
    
    
    @Override
    public Lieu saveLieu(Lieu lieu) {
        return lieuRepository.save(lieu);
    }
    
    @Override
    public Page<Lieu> getAllLieux(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return lieuRepository.findAll(pageable);
    }
    
    @Override
    public Optional<Lieu> getLieuById(int id) {
        return lieuRepository.findById(id);
    }
    
    @Override
    public void deleteLieu(int id) {
        lieuRepository.deleteById(id);
    }
    
    @Override
    public Page<Lieu> searchByNom(String nom, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return lieuRepository.findByNomContainingIgnoreCase(nom, pageable);
    }
    
    @Override
    public Page<Lieu> searchByCategorie(String categorie, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return lieuRepository.findByCategorieContainingIgnoreCase(categorie, pageable);
    }
}