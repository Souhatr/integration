package com.mss.lieuRes.service.serviceLieux;


import com.mss.lieuRes.entities.PlageHoraire;
import java.util.List;

public interface ServicePlageHohaire {
    PlageHoraire savePlageHoraire(PlageHoraire plageHoraire);
    List<PlageHoraire> getPlagesHorairesByLieuId(int lieuId);
    void deletePlageHoraire(Long id);
}