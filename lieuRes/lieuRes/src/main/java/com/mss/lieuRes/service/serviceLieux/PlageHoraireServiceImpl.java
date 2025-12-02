package com.mss.lieuRes.service.serviceLieux;


import com.mss.lieuRes.entities.Lieu;
import com.mss.lieuRes.entities.PlageHoraire;
import com.mss.lieuRes.repo.LieuRepository;
import com.mss.lieuRes.repo.PlageHoraireRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PlageHoraireServiceImpl implements ServicePlageHohaire {
    
    @Autowired
    private PlageHoraireRepository plageHoraireRepository;
    
    @Autowired
    private LieuRepository lieuRepository;
    
    @Override
    public PlageHoraire savePlageHoraire(PlageHoraire plageHoraire) {
        // Vérifier que le lieu existe
        Lieu lieu = lieuRepository.findById(plageHoraire.getLieu().getIdL())
            .orElseThrow(() -> new RuntimeException("Lieu non trouvé avec l'ID: " + plageHoraire.getLieu().getIdL()));
        
        plageHoraire.setLieu(lieu);
        return plageHoraireRepository.save(plageHoraire);
    }
    
    @Override
    public List<PlageHoraire> getPlagesHorairesByLieuId(int lieuId) {
        return plageHoraireRepository.findByLieuIdL(lieuId);
    }
    
    @Override
    public void deletePlageHoraire(Long id) {
        plageHoraireRepository.deleteById(id);
    }
}

