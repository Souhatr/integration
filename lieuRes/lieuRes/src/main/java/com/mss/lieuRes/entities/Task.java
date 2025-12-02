package com.mss.lieuRes.entities;

import java.util.Date;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idT;

    private String title;

    @Column(length = 2000)
    private String description;

   
    private Integer assignedTo;

    @Enumerated(EnumType.STRING)
    private StatutTache status;
    
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @Temporal(TemporalType.TIMESTAMP)
    private Date dueDate;
}
