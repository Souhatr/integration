package com.mss.lieuRes.restController;

import com.mss.lieuRes.entities.Reservation;
import com.mss.lieuRes.entities.User;
import com.mss.lieuRes.repo.ReservationRepository;
import com.mss.lieuRes.security.AuthUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private AuthUtil authUtil;

    @GetMapping
    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    @GetMapping("/lieu/{idL}")
    public List<Reservation> getReservationsByLieu(@PathVariable Integer idL) {
        return reservationRepository.findByIdL(idL);
    }

    @PostMapping
    public ResponseEntity<?> createReservation(@RequestBody Reservation reservation, HttpServletRequest request) {
        User req = authUtil.getRequester(request);
        if (req == null) return ResponseEntity.status(401).body("Unauthenticated");

        // ensure the reservation is for the requester
        if (reservation.getIdU() != req.getIdU()) {
            return ResponseEntity.status(403).body("Cannot create reservation for another user");
        }

        List<Reservation> existing = reservationRepository.findByIdL(reservation.getIdL());
        for (Reservation r : existing) {
            if (r.getDateDebut() != null && reservation.getDateDebut() != null) {
                java.util.Date aStart = r.getDateDebut();
                java.util.Date aEnd = r.getDateFin() != null ? r.getDateFin() : aStart;
                java.util.Date bStart = reservation.getDateDebut();
                java.util.Date bEnd = reservation.getDateFin() != null ? reservation.getDateFin() : bStart;
                boolean overlap = !(bEnd.before(aStart) || bStart.after(aEnd));
                if (overlap) return ResponseEntity.status(409).body("Reservation conflict");
            }
        }

        Reservation saved = reservationRepository.save(reservation);
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteReservation(@PathVariable Integer id, HttpServletRequest request) {
        User req = authUtil.getRequester(request);
        if (req == null) return ResponseEntity.status(401).body("Unauthenticated");

        Optional<Reservation> existing = reservationRepository.findById(id);
        if (!existing.isPresent()) return ResponseEntity.notFound().build();
        Reservation r = existing.get();
        if (!authUtil.isAdmin(req) && r.getIdU() != req.getIdU()) {
            return ResponseEntity.status(403).body("Access denied");
        }
        reservationRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
