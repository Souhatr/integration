package com.mss.lieuRes.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.mss.lieuRes.entities.Reservation;
import com.mss.lieuRes.entities.User;
public interface UserService {
    Page<User> getAllUsers(int page, int size);
    com.mss.lieuRes.entities.User getUserById(Integer id);
    boolean inscrire(User user);
    com.mss.lieuRes.entities.User login(String nomUser, String motdepasse);
    void logout(Integer idU);
    boolean saveRes(Integer idU, Reservation res);
    boolean updateRes(Integer idU, Reservation res, Integer idR);
    boolean suppRes(Integer idU, Integer idR);
    List<Reservation> getAllRes(Integer idU);
    User createUser(User user);
    User updateUser(Integer id, User user);
    void deleteUser(Integer id);

  
}
