package com.mss.lieuRes.repo;
import com.mss.lieuRes.entities.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Integer> {
    List<Reservation> findByIdU(Integer idU);
    List<Reservation> findByIdL(Integer idL);
}