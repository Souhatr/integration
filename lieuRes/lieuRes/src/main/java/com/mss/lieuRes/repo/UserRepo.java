package com.mss.lieuRes.repo;

import com.mss.lieuRes.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<User, Integer> {
    User findByUsername(String nomutilisateur);
    User findByEmail(String email);
}