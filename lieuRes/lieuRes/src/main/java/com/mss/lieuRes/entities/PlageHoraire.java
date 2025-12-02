
package com.mss.lieuRes.entities;
import java.util.Date;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonBackReference;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlageHoraire {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "lieu_id")
    @JsonBackReference
    private Lieu lieu;
    
    @Enumerated(EnumType.STRING)
    private JourSemaine jour;
    
    @Temporal(TemporalType.TIME)
    private Date heureDebut;
    
    @Temporal(TemporalType.TIME)
    private Date heureFin;
    
    private boolean actif = true;
}