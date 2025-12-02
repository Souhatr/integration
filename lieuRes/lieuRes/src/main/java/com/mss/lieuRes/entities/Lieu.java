package com.mss.lieuRes.entities;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)
public  class Lieu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected int idL;
    
    protected String nom;
      
    @Column(length = 1000)
    protected String description;
    
    protected String adresse;
    protected String categorie;
    protected Double tarif;
    protected int idImage;
    protected Boolean disponible;
    @OneToMany(mappedBy = "lieu", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<PlageHoraire> plagesHoraires;
}
