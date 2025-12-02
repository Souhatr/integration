package com.mss.lieuRes.service;

import java.util.List;
import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import com.mss.lieuRes.entities.User;
import com.mss.lieuRes.entities.Reservation;
import com.mss.lieuRes.entities.Role;
import com.mss.lieuRes.repo.ReservationRepository;
import com.mss.lieuRes.repo.UserRepo;

@Service
public class UserServiceImp implements UserService {
    
    @Autowired
    private UserRepo userRepo;
    
    @Autowired
    private ReservationRepository reservationRepository;
    
    @Override
    public Page<User> getAllUsers(int page, int size) {
        return userRepo.findAll(PageRequest.of(page, size));
    }
    
    @Override
    public User getUserById(Integer id) {
        return userRepo.findById(id).orElse(null);
    }
    
    @Override
    public boolean inscrire(User user) {
        user.setDateInscription(new Date());
        if (user.getRole() == null) user.setRole(Role.USER);
        userRepo.save(user);
        return true;
    }
    
    @Override
    public User login(String nomUser, String motdepasse) {
        User user = userRepo.findByUsername(nomUser);
        if (user != null && user.getMotdepasse().equals(motdepasse)) {
            return user;
        }
        return null;
    }
    
    @Override
    public void logout(Integer idU) {
        // Logout logic
    }
    
    @Override
    public boolean saveRes(Integer idU, Reservation res) {
        res.setIdU(idU);
        res.setDateReservation(new Date());
        reservationRepository.save(res);
        return true;
    }
    
    @Override
    public boolean updateRes(Integer idU, Reservation res, Integer idR) {
        if (reservationRepository.existsById(idR)) {
            res.setIdR(idR);
            res.setIdU(idU);
            reservationRepository.save(res);
            return true;
        }
        return false;
    }
    
    @Override
    public boolean suppRes(Integer idU, Integer idR) {
        if (reservationRepository.existsById(idR)) {
            reservationRepository.deleteById(idR);
            return true;
        }
        return false;
    }
    
    @Override
    public List<Reservation> getAllRes(Integer idU) {
        return reservationRepository.findByIdU(idU);
    }
    
    @Override
    public User createUser(User user) {
        user.setDateInscription(new Date());
        if (user.getRole() == null) user.setRole(Role.USER);
        return userRepo.save(user);
    }
    
    @Override
    public User updateUser(Integer id, User user) {
        user.setIdU(id);
        return userRepo.save(user);
    }
    
    @Override
    public void deleteUser(Integer id) {
        userRepo.deleteById(id);
    }
}