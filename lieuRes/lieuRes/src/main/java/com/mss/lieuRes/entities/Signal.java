package com.mss.lieuRes.entities;

import java.util.Date;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "`signal`")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Signal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idS;

    private String title;

    @Column(length = 2000)
    private String description;

    // reporting user id
    private int idU;

    // optional related lieu
    private Integer idL;

    @Temporal(TemporalType.TIMESTAMP)
    private Date dateReported;

    @ManyToOne
    @JoinColumn(name = "idC")
    private SignalCategory category;

    private String status; // e.g., NEW, REVIEWED, CLOSED
}
