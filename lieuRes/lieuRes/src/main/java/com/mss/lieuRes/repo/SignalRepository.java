package com.mss.lieuRes.repo;

import com.mss.lieuRes.entities.Signal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SignalRepository extends JpaRepository<Signal, Integer> {
    List<Signal> findByIdU(int idU);
}
