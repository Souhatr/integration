package com.mss.lieuRes.restController;


import com.mss.lieuRes.entities.Lieu;
import com.mss.lieuRes.service.serviceLieux.LieuService;
import com.mss.lieuRes.security.AuthUtil;
import com.mss.lieuRes.entities.User;
import jakarta.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/lieux")
public class LieuController {
    
    @Autowired
    private LieuService lieuService;

    @Autowired
    private AuthUtil authUtil;
    
@GetMapping
    public Page<Lieu> getAllLieux(@RequestParam(defaultValue = "0") int page,
                                  @RequestParam(defaultValue = "10") int size) {
        return lieuService.getAllLieux(page, size);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Lieu> getLieuById(@PathVariable int id) {
        Optional<Lieu> lieu = lieuService.getLieuById(id);
        return lieu.map(ResponseEntity::ok)
                  .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<?> createLieu(@RequestBody Lieu lieu, HttpServletRequest request) {
        User req = authUtil.getRequester(request);
        if (!authUtil.isAdmin(req)) return ResponseEntity.status(403).body("Access denied");
        return ResponseEntity.ok(lieuService.saveLieu(lieu));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateLieu(@PathVariable int id, @RequestBody Lieu lieu, HttpServletRequest request) {
        User req = authUtil.getRequester(request);
        if (!authUtil.isAdmin(req)) return ResponseEntity.status(403).body("Access denied");
        Optional<Lieu> existing = lieuService.getLieuById(id);
        if (existing.isPresent()) {
            lieu.setIdL(id);
            Lieu updated = lieuService.saveLieu(lieu);
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/admin")
    public ResponseEntity<?> createLieuAdmin(@RequestBody Lieu lieu, HttpServletRequest request) {
        User req = authUtil.getRequester(request);
        if (!authUtil.isAdmin(req)) return ResponseEntity.status(403).body("Access denied");
        return ResponseEntity.ok(lieuService.saveLieu(lieu));
    }

    @PutMapping("/admin/{id}")
    public ResponseEntity<?> updateLieuAdmin(@PathVariable int id, @RequestBody Lieu lieu, HttpServletRequest request) {
        User req = authUtil.getRequester(request);
        if (!authUtil.isAdmin(req)) return ResponseEntity.status(403).body("Access denied");
        Optional<Lieu> existing = lieuService.getLieuById(id);
        if (existing.isPresent()) {
            lieu.setIdL(id);
            Lieu updated = lieuService.saveLieu(lieu);
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/admin/{id}")
    public ResponseEntity<?> deleteLieuAdmin(@PathVariable int id, HttpServletRequest request) {
        User req = authUtil.getRequester(request);
        if (!authUtil.isAdmin(req)) return ResponseEntity.status(403).body("Access denied");
        lieuService.deleteLieu(id);
        return ResponseEntity.ok().build();
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteLieu(@PathVariable int id, HttpServletRequest request) {
        User req = authUtil.getRequester(request);
        if (!authUtil.isAdmin(req)) return ResponseEntity.status(403).body("Access denied");
        lieuService.deleteLieu(id);
        return ResponseEntity.ok().build();
    }
    
    @GetMapping("/search/nom")
    public Page<Lieu> searchByNom(@RequestParam String nom,
                                  @RequestParam(defaultValue = "0") int page,
                                  @RequestParam(defaultValue = "10") int size) {
        return lieuService.searchByNom(nom, page, size);
    }
    
    @GetMapping("/search/categorie")
    public Page<Lieu> searchByCategorie(@RequestParam String categorie,
                                        @RequestParam(defaultValue = "0") int page,
                                        @RequestParam(defaultValue = "10") int size) {
        return lieuService.searchByCategorie(categorie, page, size);
    }
}