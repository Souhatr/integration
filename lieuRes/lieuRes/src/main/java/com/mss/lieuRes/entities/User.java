package com.mss.lieuRes.entities;

import lombok.*;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idU;
    
    private String nom;
    private String prenom;
    private String email;
    private String telephone;
    //private String role;
    
    @Temporal(TemporalType.DATE)
    private Date dateInscription;
    
    private String username;
    private String motdepasse;
    @Enumerated(EnumType.STRING)
    @Column(length = 50)
    private Role role;
    
}

