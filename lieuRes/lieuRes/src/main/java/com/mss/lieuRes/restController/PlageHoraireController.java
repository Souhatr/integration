package com.mss.lieuRes.restController;


import com.mss.lieuRes.entities.PlageHoraire;
import com.mss.lieuRes.service.serviceLieux.PlageHoraireServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/plages-horaires")
@CrossOrigin(origins = "*")
public class PlageHoraireController {
    
    @Autowired
    private  PlageHoraireServiceImpl plageHoraireService;
    
    @PostMapping
    public ResponseEntity<PlageHoraire> createPlageHoraire(@RequestBody PlageHoraire plageHoraire) {
        try {
            PlageHoraire savedPlageHoraire = plageHoraireService.savePlageHoraire(plageHoraire);
            return ResponseEntity.ok(savedPlageHoraire);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
    
    @GetMapping("/lieu/{lieuId}")
    public List<PlageHoraire> getPlagesHorairesByLieu(@PathVariable int lieuId) {
        return plageHoraireService.getPlagesHorairesByLieuId(lieuId);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlageHoraire(@PathVariable Long id) {
        plageHoraireService.deletePlageHoraire(id);
        return ResponseEntity.ok().build();
    }
}
